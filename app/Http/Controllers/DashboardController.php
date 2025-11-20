<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $thirtyDaysAgo = Carbon::now()->subDays(30);

        // Calculate last 30 days stats (all users)
        $revenueLast30Days = \App\Models\Transaction::query()
            ->where('type', 'revenue')
            ->where('date', '>=', $thirtyDaysAgo)
            ->sum('amount');

        $expensesLast30Days = \App\Models\Transaction::query()
            ->where('type', 'expense')
            ->where('date', '>=', $thirtyDaysAgo)
            ->sum('amount');

        $profitLoss = $revenueLast30Days - $expensesLast30Days;

        // Get monthly data for the last 12 months (all users)
        $monthlyData = [];
        $currentMonth = Carbon::now()->startOfMonth();

        for ($i = 11; $i >= 0; $i--) {
            $monthStart = $currentMonth->copy()->subMonths($i)->startOfMonth();
            $monthEnd = $currentMonth->copy()->subMonths($i)->endOfMonth();

            $monthlyRevenue = \App\Models\Transaction::query()
                ->where('type', 'revenue')
                ->whereBetween('date', [$monthStart, $monthEnd])
                ->sum('amount');

            $monthlyExpenses = \App\Models\Transaction::query()
                ->where('type', 'expense')
                ->whereBetween('date', [$monthStart, $monthEnd])
                ->sum('amount');

            $monthlyData[] = [
                'month' => $monthStart->format('M Y'),
                'monthShort' => $monthStart->format('M'),
                'revenue' => (float) $monthlyRevenue,
                'expenses' => (float) $monthlyExpenses,
            ];
        }

        $stats = [
            'revenue_last_30_days' => (float) $revenueLast30Days,
            'expenses_last_30_days' => (float) $expensesLast30Days,
            'profit_loss' => (float) $profitLoss,
        ];

        \Log::info('Dashboard data', [
            'stats' => $stats,
            'monthlyData_count' => count($monthlyData),
        ]);

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'monthlyData' => $monthlyData,
        ]);
    }
}
