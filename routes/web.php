<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// Setup route (must be before auth middleware)
Route::get('setup', [\App\Http\Controllers\SetupController::class, 'show'])
    ->name('setup.show');
Route::post('setup', [\App\Http\Controllers\SetupController::class, 'store'])
    ->name('setup.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])
        ->name('dashboard');

    // Custom transaction routes (must come before resource route)
    Route::get('transactions/revenue', [\App\Http\Controllers\TransactionController::class, 'revenueIndex'])
        ->name('transactions.revenue.index');
    Route::get('transactions/revenue/create', [\App\Http\Controllers\TransactionController::class, 'createRevenue'])
        ->name('transactions.revenue.create');
    Route::get('transactions/revenue/export', [\App\Http\Controllers\TransactionController::class, 'exportRevenue'])
        ->name('transactions.revenue.export');
    Route::get('transactions/expenses', [\App\Http\Controllers\TransactionController::class, 'expenseIndex'])
        ->name('transactions.expenses.index');
    Route::get('transactions/expense/create', [\App\Http\Controllers\TransactionController::class, 'createExpense'])
        ->name('transactions.expense.create');
    Route::get('transactions/expenses/export', [\App\Http\Controllers\TransactionController::class, 'exportExpenses'])
        ->name('transactions.expenses.export');

    Route::resource('transactions', \App\Http\Controllers\TransactionController::class)
        ->except(['create', 'show']);
});

require __DIR__.'/settings.php';
