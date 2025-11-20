<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTransactionRequest;
use App\Http\Requests\UpdateTransactionRequest;
use App\Models\Transaction;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $transactions = Transaction::query()
            ->with(['linkedExpense', 'user'])
            ->latest('date')
            ->latest('id')
            ->paginate(20);

        $summary = [
            'total_revenue' => Transaction::query()
                ->where('type', 'revenue')
                ->sum('amount'),
            'total_expenses' => Transaction::query()
                ->where('type', 'expense')
                ->sum('amount'),
        ];

        $summary['net'] = $summary['total_revenue'] - $summary['total_expenses'];

        return Inertia::render('Transactions/Index', [
            'transactions' => $transactions,
            'summary' => $summary,
        ]);
    }

    /**
     * Display a listing of revenue transactions.
     */
    public function revenueIndex(Request $request): Response
    {
        $transactions = Transaction::query()
            ->where('type', 'revenue')
            ->with(['linkedExpense', 'user'])
            ->latest('date')
            ->latest('id')
            ->paginate(20);

        $thirtyDaysAgo = now()->subDays(30);

        $summary = [
            'total_revenue' => Transaction::query()
                ->where('type', 'revenue')
                ->sum('amount'),
            'revenue_last_30_days' => Transaction::query()
                ->where('type', 'revenue')
                ->where('date', '>=', $thirtyDaysAgo)
                ->sum('amount'),
            'number_of_sales' => Transaction::query()
                ->where('type', 'revenue')
                ->count(),
        ];

        return Inertia::render('Transactions/Revenue/Index', [
            'transactions' => $transactions,
            'summary' => $summary,
        ]);
    }

    /**
     * Display a listing of expense transactions.
     */
    public function expenseIndex(Request $request): Response
    {
        $transactions = Transaction::query()
            ->where('type', 'expense')
            ->with('user')
            ->latest('date')
            ->latest('id')
            ->paginate(20);

        $thirtyDaysAgo = now()->subDays(30);

        $summary = [
            'total_expenses' => Transaction::query()
                ->where('type', 'expense')
                ->sum('amount'),
            'expenses_last_30_days' => Transaction::query()
                ->where('type', 'expense')
                ->where('date', '>=', $thirtyDaysAgo)
                ->sum('amount'),
            'number_of_expenses' => Transaction::query()
                ->where('type', 'expense')
                ->count(),
        ];

        return Inertia::render('Transactions/Expenses/Index', [
            'transactions' => $transactions,
            'summary' => $summary,
        ]);
    }

    /**
     * Show the form for creating a new revenue transaction.
     */
    public function createRevenue(Request $request): Response
    {
        $expenses = Transaction::query()
            ->where('type', 'expense')
            ->orderBy('date', 'desc')
            ->orderBy('id', 'desc')
            ->get(['id', 'description', 'amount', 'date']);

        return Inertia::render('Transactions/CreateRevenue', [
            'expenses' => $expenses,
        ]);
    }

    /**
     * Show the form for creating a new expense transaction.
     */
    public function createExpense(Request $request): Response
    {
        return Inertia::render('Transactions/CreateExpense');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTransactionRequest $request): RedirectResponse
    {
        $transaction = $request->user()->transactions()->create($request->validated());

        if ($transaction->type === 'revenue') {
            return to_route('transactions.revenue.index');
        }

        return to_route('transactions.expenses.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Transaction $transaction): Response
    {
        $expenses = Transaction::query()
            ->where('type', 'expense')
            ->where('id', '!=', $transaction->id)
            ->orderBy('date', 'desc')
            ->orderBy('id', 'desc')
            ->get(['id', 'description', 'amount', 'date']);

        return Inertia::render('Transactions/Edit', [
            'transaction' => $transaction->load(['linkedExpense', 'user']),
            'expenses' => $expenses,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTransactionRequest $request, Transaction $transaction): RedirectResponse
    {
        $data = $request->validated();

        // Clear linked_expense_id if type is not revenue
        if ($data['type'] !== 'revenue') {
            $data['linked_expense_id'] = null;
        }

        $transaction->update($data);

        if ($transaction->type === 'revenue') {
            return to_route('transactions.revenue.index');
        }

        return to_route('transactions.expenses.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Transaction $transaction): RedirectResponse
    {
        $type = $transaction->type;
        $transaction->delete();

        if ($type === 'revenue') {
            return to_route('transactions.revenue.index');
        }

        return to_route('transactions.expenses.index');
    }

    /**
     * Export revenue transactions as CSV.
     */
    public function exportRevenue(Request $request): StreamedResponse
    {
        $transactions = Transaction::query()
            ->where('type', 'revenue')
            ->with(['linkedExpense', 'user'])
            ->latest('date')
            ->latest('id')
            ->get();

        $filename = 'revenue-export-'.now()->format('Y-m-d').'.csv';

        return response()->streamDownload(function () use ($transactions) {
            $file = fopen('php://output', 'w');

            // Add CSV headers
            fputcsv($file, [
                'Date',
                'Description',
                'Amount',
                'Created By',
                'Linked Expense',
            ], ',', '"', '\\');

            // Add transaction data
            foreach ($transactions as $transaction) {
                fputcsv($file, [
                    $transaction->date->format('Y-m-d'),
                    $transaction->description,
                    number_format((float) $transaction->amount, 2, '.', ''),
                    $transaction->user?->name ?? 'Unknown',
                    $transaction->linkedExpense?->description ?? '',
                ], ',', '"', '\\');
            }

            fclose($file);
        }, $filename, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="'.$filename.'"',
        ]);
    }

    /**
     * Export expense transactions as CSV.
     */
    public function exportExpenses(Request $request): StreamedResponse
    {
        $transactions = Transaction::query()
            ->where('type', 'expense')
            ->with('user')
            ->latest('date')
            ->latest('id')
            ->get();

        $filename = 'expenses-export-'.now()->format('Y-m-d').'.csv';

        return response()->streamDownload(function () use ($transactions) {
            $file = fopen('php://output', 'w');

            // Add CSV headers
            fputcsv($file, [
                'Date',
                'Description',
                'Amount',
                'Created By',
            ], ',', '"', '\\');

            // Add transaction data
            foreach ($transactions as $transaction) {
                fputcsv($file, [
                    $transaction->date->format('Y-m-d'),
                    $transaction->description,
                    number_format((float) $transaction->amount, 2, '.', ''),
                    $transaction->user?->name ?? 'Unknown',
                ], ',', '"', '\\');
            }

            fclose($file);
        }, $filename, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="'.$filename.'"',
        ]);
    }
}
