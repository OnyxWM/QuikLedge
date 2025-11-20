import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Download } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { edit, destroy } from '@/routes/transactions';
import expensesRoutes from '@/routes/transactions/expenses';

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Expenses',
        href: '/transactions/expenses',
    },
];

interface User {
    id: number;
    name: string;
    email: string;
}

interface Transaction {
    id: number;
    type: 'revenue' | 'expense';
    description: string;
    amount: string;
    date: string;
    user?: User | null;
}

interface Summary {
    total_expenses: string | number;
    expenses_last_30_days: string | number;
    number_of_expenses: number;
}

interface Props {
    transactions: {
        data: Transaction[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
    summary: Summary;
}

export default function ExpensesIndex({ transactions, summary }: Props) {
    const formatCurrency = (amount: string | number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(Number(amount));
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this transaction?')) {
            router.delete(destroy.url(id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Expenses" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Expenses</h1>
                        <p className="text-muted-foreground">
                            Track your expenses
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <a href={expensesRoutes.export().url}>
                            <Button variant="outline">
                                <Download className="mr-2 h-4 w-4" />
                                Export CSV
                            </Button>
                        </a>
                        <Link href="/transactions/expense/create">
                            <Button>Add Expense</Button>
                        </Link>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardContent className="p-6">
                            <div className="text-sm font-medium text-muted-foreground">
                                Total Expenses
                            </div>
                            <div className="mt-2 text-2xl font-bold text-red-600 dark:text-red-400">
                                {formatCurrency(summary.total_expenses)}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="text-sm font-medium text-muted-foreground">
                                Expenses (Last 30 Days)
                            </div>
                            <div className="mt-2 text-2xl font-bold text-red-600 dark:text-red-400">
                                {formatCurrency(summary.expenses_last_30_days)}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="text-sm font-medium text-muted-foreground">
                                Number of Expenses
                            </div>
                            <div className="mt-2 text-2xl font-bold">
                                {summary.number_of_expenses}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="rounded-lg border bg-card">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                                        Description
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                                        Created By
                                    </th>
                                    <th className="px-6 py-3 text-right text-sm font-medium text-muted-foreground">
                                        Amount
                                    </th>
                                    <th className="px-6 py-3 text-right text-sm font-medium text-muted-foreground">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.data.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-12 text-center text-muted-foreground"
                                        >
                                            No expense transactions yet. Create your first
                                            expense transaction to get started.
                                        </td>
                                    </tr>
                                ) : (
                                    transactions.data.map((transaction) => (
                                        <tr
                                            key={transaction.id}
                                            className="border-b last:border-0 hover:bg-muted/50"
                                        >
                                            <td className="px-6 py-4 text-sm">
                                                {formatDate(transaction.date)}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                {transaction.description}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-muted-foreground">
                                                {transaction.user?.name || 'Unknown'}
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm font-medium text-red-600 dark:text-red-400">
                                                -{formatCurrency(transaction.amount)}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={edit(transaction.id).url}
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                        >
                                                            Edit
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            handleDelete(
                                                                transaction.id,
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {transactions.links.length > 3 && (
                        <div className="flex items-center justify-center gap-2 border-t p-4">
                            {transactions.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`rounded-md px-3 py-2 text-sm ${
                                        link.active
                                            ? 'bg-primary text-primary-foreground'
                                            : link.url
                                              ? 'hover:bg-muted'
                                              : 'cursor-not-allowed opacity-50'
                                    }`}
                                    disabled={!link.url}
                                >
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

