<?php

namespace Database\Factories;

use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'type' => fake()->randomElement(['revenue', 'expense']),
            'description' => fake()->sentence(),
            'amount' => fake()->randomFloat(2, 1, 10000),
            'date' => fake()->dateTimeBetween('-1 year', 'now')->format('Y-m-d'),
        ];
    }

    /**
     * Indicate that the transaction is revenue.
     */
    public function revenue(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'revenue',
        ]);
    }

    /**
     * Indicate that the transaction is an expense.
     */
    public function expense(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'expense',
        ]);
    }
}
