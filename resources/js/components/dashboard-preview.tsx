import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, BarChart3, LayoutGrid, Receipt } from 'lucide-react';
import AppLogoIcon from './app-logo-icon';

export default function DashboardPreview() {
    return (
        <div className="relative z-20 flex h-full items-center justify-center p-6">
            <div className="flex h-full max-h-[600px] w-full max-w-5xl overflow-hidden rounded-lg border border-neutral-700 bg-neutral-900 shadow-2xl">
                {/* Sidebar */}
                <div className="relative flex h-full w-56 flex-col border-r border-neutral-800 bg-neutral-950/50">
                    {/* Sidebar Header */}
                    <div className="border-b border-neutral-800 p-4">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-neutral-800">
                                <AppLogoIcon className="h-5 w-5 fill-current text-white" />
                            </div>
                            <span className="text-sm font-semibold text-white">Quik Ledge</span>
                        </div>
                    </div>

                    {/* Sidebar Navigation */}
                    <div className="flex-1 overflow-y-auto p-2">
                        <div className="mb-2 px-2 py-1 text-xs font-medium text-neutral-500">
                            Platform
                        </div>
                        <div className="space-y-1">
                            {[
                                { icon: LayoutGrid, label: 'Dashboard', active: true },
                                { icon: Receipt, label: 'Transactions', active: false },
                                { icon: TrendingUp, label: 'Revenue', active: false },
                                { icon: TrendingDown, label: 'Expenses', active: false },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm ${
                                        item.active
                                            ? 'bg-neutral-800 text-white'
                                            : 'text-neutral-400 hover:bg-neutral-800/50'
                                    }`}
                                >
                                    <item.icon className="h-4 w-4" />
                                    <span>{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar Footer - User */}
                    <div className="border-t border-neutral-800 p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-700 text-xs font-medium text-white">
                                JD
                            </div>
                            <div className="flex-1">
                                <div className="text-xs font-medium text-white">John Doe</div>
                                <div className="text-xs text-neutral-400">john@example.com</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto bg-neutral-900">
                    <div className="p-6">
                        {/* Header */}
                        <div className="mb-6">
                            <h1 className="text-xl font-semibold text-white">Dashboard</h1>
                            <p className="text-sm text-neutral-400">
                                Overview of your financial activity
                            </p>
                        </div>

                        {/* Stats Cards */}
                        <div className="mb-6 grid gap-4 sm:grid-cols-3">
                            <Card className="border-neutral-800 bg-neutral-800/50">
                                <CardHeader className="flex min-h-[2.5rem] flex-row items-center justify-between gap-2 pb-2">
                                    <CardTitle className="text-xs font-medium text-neutral-300">
                                        Revenue (30 Days)
                                    </CardTitle>
                                    <TrendingUp className="h-3 w-3 shrink-0 text-green-400" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-lg font-bold text-green-400">
                                        $12,450
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-neutral-800 bg-neutral-800/50">
                                <CardHeader className="flex min-h-[2.5rem] flex-row items-center justify-between gap-2 pb-2">
                                    <CardTitle className="text-xs font-medium text-neutral-300">
                                        Expenses (30 Days)
                                    </CardTitle>
                                    <TrendingDown className="h-3 w-3 shrink-0 text-red-400" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-lg font-bold text-red-400">
                                        $8,230
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-neutral-800 bg-neutral-800/50">
                                <CardHeader className="flex min-h-[2.5rem] flex-row items-center justify-between gap-2 pb-2">
                                    <CardTitle className="text-xs font-medium text-neutral-300">
                                        Profit / Loss
                                    </CardTitle>
                                    <BarChart3 className="h-3 w-3 shrink-0 text-green-400" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-lg font-bold text-green-400">
                                        $4,220
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Chart Preview */}
                        <Card className="border-neutral-800 bg-neutral-800/50">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-2 text-sm font-medium text-neutral-300">
                                        <BarChart3 className="h-4 w-4" />
                                        Yearly Revenue & Expenses by Month
                                    </CardTitle>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-green-500" />
                                            <span className="text-xs text-neutral-400">Revenue</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-red-500" />
                                            <span className="text-xs text-neutral-400">Expenses</span>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="h-48 w-full">
                                    {/* Mock Chart Bars */}
                                    <div className="flex h-full items-end justify-between gap-1.5 px-2">
                                        {[
                                            { revenue: 65, expense: 45 },
                                            { revenue: 80, expense: 60 },
                                            { revenue: 55, expense: 40 },
                                            { revenue: 90, expense: 70 },
                                            { revenue: 70, expense: 50 },
                                            { revenue: 85, expense: 65 },
                                            { revenue: 60, expense: 45 },
                                            { revenue: 75, expense: 55 },
                                            { revenue: 95, expense: 75 },
                                            { revenue: 70, expense: 50 },
                                            { revenue: 80, expense: 60 },
                                            { revenue: 88, expense: 68 },
                                        ].map((data, index) => {
                                            const maxValue = 100;
                                            const revenueHeight = (data.revenue / maxValue) * 100;
                                            const expenseHeight = (data.expense / maxValue) * 100;
                                            
                                            return (
                                                <div
                                                    key={index}
                                                    className="flex flex-1 flex-col items-center gap-1"
                                                >
                                                    <div className="relative flex h-40 w-full items-end justify-center gap-0.5">
                                                        <div
                                                            className="w-full rounded-t bg-green-500"
                                                            style={{ 
                                                                height: `${revenueHeight}%`,
                                                                minHeight: '4px'
                                                            }}
                                                        />
                                                        <div
                                                            className="w-full rounded-t bg-red-500"
                                                            style={{ 
                                                                height: `${expenseHeight}%`,
                                                                minHeight: '4px'
                                                            }}
                                                        />
                                                    </div>
                                                    <span className="mt-1 text-[9px] text-neutral-500">
                                                        {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][index]}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

