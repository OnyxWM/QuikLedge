<?php

use App\Models\Transaction;
use App\Models\User;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    $this->user = User::factory()->create();
});

it('can view the transactions index page', function () {
    actingAs($this->user)
        ->get(route('transactions.index'))
        ->assertSuccessful();
});

it('displays transactions for the authenticated user', function () {
    $transaction = Transaction::factory()
        ->for($this->user)
        ->create();

    actingAs($this->user)
        ->get(route('transactions.index'))
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->component('Transactions/Index')
            ->has('transactions.data', 1)
            ->where('transactions.data.0.id', $transaction->id)
        );
});

it('only shows transactions for the authenticated user', function () {
    $otherUser = User::factory()->create();
    $userTransaction = Transaction::factory()
        ->for($this->user)
        ->create();
    $otherTransaction = Transaction::factory()
        ->for($otherUser)
        ->create();

    actingAs($this->user)
        ->get(route('transactions.index'))
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->component('Transactions/Index')
            ->has('transactions.data', 1)
            ->where('transactions.data.0.id', $userTransaction->id)
        );
});

it('displays summary statistics', function () {
    Transaction::factory()
        ->for($this->user)
        ->revenue()
        ->create(['amount' => 1000.00]);

    Transaction::factory()
        ->for($this->user)
        ->expense()
        ->create(['amount' => 300.00]);

    $response = actingAs($this->user)
        ->get(route('transactions.index'))
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->component('Transactions/Index')
            ->has('summary')
        );

    $summary = $response->viewData('page')['props']['summary'];
    expect((float) $summary['total_revenue'])->toBe(1000.0)
        ->and((float) $summary['total_expenses'])->toBe(300.0)
        ->and((float) $summary['net'])->toBe(700.0);
});

it('can view the create transaction page', function () {
    actingAs($this->user)
        ->get(route('transactions.create'))
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->component('Transactions/Create')
        );
});

it('can create a revenue transaction', function () {
    actingAs($this->user)
        ->post(route('transactions.store'), [
            'type' => 'revenue',
            'description' => 'Salary',
            'amount' => 5000.00,
            'date' => '2024-01-15',
        ])
        ->assertRedirect(route('transactions.index'));

    expect(Transaction::where('user_id', $this->user->id)->count())->toBe(1);
    expect(Transaction::first())
        ->type->toBe('revenue')
        ->description->toBe('Salary')
        ->amount->toBe('5000.00')
        ->date->format('Y-m-d')->toBe('2024-01-15');
});

it('can create an expense transaction', function () {
    actingAs($this->user)
        ->post(route('transactions.store'), [
            'type' => 'expense',
            'description' => 'Groceries',
            'amount' => 150.50,
            'date' => '2024-01-15',
        ])
        ->assertRedirect(route('transactions.index'));

    expect(Transaction::where('user_id', $this->user->id)->count())->toBe(1);
    expect(Transaction::first())
        ->type->toBe('expense')
        ->description->toBe('Groceries')
        ->amount->toBe('150.50');
});

it('validates required fields when creating a transaction', function () {
    actingAs($this->user)
        ->post(route('transactions.store'), [])
        ->assertSessionHasErrors(['type', 'description', 'amount', 'date']);
});

it('validates transaction type is revenue or expense', function () {
    actingAs($this->user)
        ->post(route('transactions.store'), [
            'type' => 'invalid',
            'description' => 'Test',
            'amount' => 100.00,
            'date' => '2024-01-15',
        ])
        ->assertSessionHasErrors(['type']);
});

it('validates amount is positive', function () {
    actingAs($this->user)
        ->post(route('transactions.store'), [
            'type' => 'revenue',
            'description' => 'Test',
            'amount' => -100.00,
            'date' => '2024-01-15',
        ])
        ->assertSessionHasErrors(['amount']);

    actingAs($this->user)
        ->post(route('transactions.store'), [
            'type' => 'revenue',
            'description' => 'Test',
            'amount' => 0,
            'date' => '2024-01-15',
        ])
        ->assertSessionHasErrors(['amount']);
});

it('can view the edit transaction page', function () {
    $transaction = Transaction::factory()
        ->for($this->user)
        ->create();

    actingAs($this->user)
        ->get(route('transactions.edit', $transaction))
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->component('Transactions/Edit')
            ->where('transaction.id', $transaction->id)
        );
});

it('cannot view edit page for another users transaction', function () {
    $otherUser = User::factory()->create();
    $transaction = Transaction::factory()
        ->for($otherUser)
        ->create();

    actingAs($this->user)
        ->get(route('transactions.edit', $transaction))
        ->assertForbidden();
});

it('can update a transaction', function () {
    $transaction = Transaction::factory()
        ->for($this->user)
        ->create([
            'type' => 'revenue',
            'description' => 'Old Description',
            'amount' => 100.00,
        ]);

    actingAs($this->user)
        ->put(route('transactions.update', $transaction), [
            'type' => 'expense',
            'description' => 'New Description',
            'amount' => 200.00,
            'date' => '2024-01-20',
        ])
        ->assertRedirect(route('transactions.index'));

    $transaction->refresh();
    expect($transaction)
        ->type->toBe('expense')
        ->description->toBe('New Description')
        ->amount->toBe('200.00')
        ->date->format('Y-m-d')->toBe('2024-01-20');
});

it('cannot update another users transaction', function () {
    $otherUser = User::factory()->create();
    $transaction = Transaction::factory()
        ->for($otherUser)
        ->create();

    actingAs($this->user)
        ->put(route('transactions.update', $transaction), [
            'type' => 'revenue',
            'description' => 'Hacked',
            'amount' => 9999.00,
            'date' => '2024-01-15',
        ])
        ->assertForbidden();
});

it('can delete a transaction', function () {
    $transaction = Transaction::factory()
        ->for($this->user)
        ->create();

    actingAs($this->user)
        ->delete(route('transactions.destroy', $transaction))
        ->assertRedirect(route('transactions.index'));

    expect(Transaction::find($transaction->id))->toBeNull();
});

it('cannot delete another users transaction', function () {
    $otherUser = User::factory()->create();
    $transaction = Transaction::factory()
        ->for($otherUser)
        ->create();

    actingAs($this->user)
        ->delete(route('transactions.destroy', $transaction))
        ->assertForbidden();

    expect(Transaction::find($transaction->id))->not->toBeNull();
});
