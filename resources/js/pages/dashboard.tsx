import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, DollarSign, Receipt, TrendingDown, TrendingUp, BarChart3 } from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface MonthlyData {
    month: string;
    monthShort: string;
    revenue: number;
    expenses: number;
}

interface Stats {
    revenue_last_30_days: number;
    expenses_last_30_days: number;
    profit_loss: number;
}

interface Props {
    stats?: Stats;
    monthlyData?: MonthlyData[];
}

export default function Dashboard({ stats, monthlyData = [] }: Props) {
    const defaultStats: Stats = {
        revenue_last_30_days: 0,
        expenses_last_30_days: 0,
        profit_loss: 0,
    };

    const displayStats = stats || defaultStats;
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div>
                    <h1 className="text-2xl font-semibold">Dashboard</h1>
                    <p className="text-muted-foreground">
                        Overview of your financial activity
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Revenue (Last 30 Days)
                            </CardTitle>
                            <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {formatCurrency(displayStats.revenue_last_30_days)}
                    </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Expenses (Last 30 Days)
                            </CardTitle>
                            <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                                {formatCurrency(displayStats.expenses_last_30_days)}
                    </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Profit / Loss
                            </CardTitle>
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div
                                className={`text-2xl font-bold ${
                                    displayStats.profit_loss >= 0
                                        ? 'text-green-600 dark:text-green-400'
                                        : 'text-red-600 dark:text-red-400'
                                }`}
                            >
                                {formatCurrency(displayStats.profit_loss)}
                    </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5" />
                            Yearly Revenue & Expenses by Month
                        </CardTitle>
                        <CardDescription>
                            Monthly breakdown of revenue and expenses over the last 12 months
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {monthlyData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={monthlyData}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        className="stroke-muted"
                                    />
                                    <XAxis
                                        dataKey="monthShort"
                                        tick={{ fontSize: 12 }}
                                        className="text-muted-foreground"
                                    />
                                    <YAxis
                                        tick={{ fontSize: 12 }}
                                        tickFormatter={(value) =>
                                            `$${value.toLocaleString()}`
                                        }
                                        className="text-muted-foreground"
                                    />
                                    <Tooltip
                                        formatter={(value: number) =>
                                            formatCurrency(value)
                                        }
                                        labelFormatter={(label) => {
                                            const month = monthlyData.find(
                                                (m) => m.monthShort === label,
                                            );
                                            return month?.month || label;
                                        }}
                                        contentStyle={{
                                            backgroundColor: 'var(--card)',
                                            border: '1px solid var(--border)',
                                            borderRadius: '0.5rem',
                                        }}
                                    />
                                    <Legend />
                                    <Bar
                                        dataKey="revenue"
                                        fill="rgb(34 197 94)"
                                        name="Revenue"
                                    />
                                    <Bar
                                        dataKey="expenses"
                                        fill="rgb(239 68 68)"
                                        name="Expenses"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex h-[400px] items-center justify-center text-muted-foreground">
                                No data available. Add transactions to see your monthly breakdown.
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                                Revenue
                            </CardTitle>
                            <CardDescription>
                                View and manage your revenue
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href="/transactions/revenue">
                                <Button className="w-full" variant="outline">
                                    View Revenue
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
                                Expenses
                            </CardTitle>
                            <CardDescription>
                                View and manage your expenses
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href="/transactions/expenses">
                                <Button className="w-full" variant="outline">
                                    View Expenses
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                                Add Revenue
                            </CardTitle>
                            <CardDescription>
                                Record a new revenue transaction
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href="/transactions/revenue/create">
                                <Button className="w-full" variant="outline">
                                    <DollarSign className="mr-2 h-4 w-4" />
                                    Add Revenue
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
                                Add Expense
                            </CardTitle>
                            <CardDescription>
                                Record a new expense transaction
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href="/transactions/expense/create">
                                <Button className="w-full" variant="outline">
                                    <Receipt className="mr-2 h-4 w-4" />
                                    Add Expense
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
