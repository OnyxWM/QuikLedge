import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { edit, destroy } from '@/routes/transactions';
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
        title: 'Transactions',
        href: '/transactions',
    },
];

interface LinkedExpense {
    id: number;
    description: string;
}

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
    linked_expense?: LinkedExpense | null;
    user?: User | null;
}

interface Summary {
    total_revenue: string;
    total_expenses: string;
    net: string;
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

export default function Index({ transactions, summary }: Props) {
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
            <Head title="Transactions" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Transactions</h1>
                        <p className="text-muted-foreground">
                            Track your revenue and expenses
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link href="/transactions/revenue/create">
                            <Button variant="outline">Add Revenue</Button>
                        </Link>
                        <Link href="/transactions/expense/create">
                            <Button>Add Expense</Button>
                        </Link>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border bg-card p-6">
                        <div className="text-sm font-medium text-muted-foreground">
                            Total Revenue
                        </div>
                        <div className="mt-2 text-2xl font-bold text-green-600 dark:text-green-400">
                            {formatCurrency(summary.total_revenue)}
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card p-6">
                        <div className="text-sm font-medium text-muted-foreground">
                            Total Expenses
                        </div>
                        <div className="mt-2 text-2xl font-bold text-red-600 dark:text-red-400">
                            {formatCurrency(summary.total_expenses)}
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card p-6">
                        <div className="text-sm font-medium text-muted-foreground">
                            Net
                        </div>
                        <div
                            className={`mt-2 text-2xl font-bold ${
                                Number(summary.net) >= 0
                                    ? 'text-green-600 dark:text-green-400'
                                    : 'text-red-600 dark:text-red-400'
                            }`}
                        >
                            {formatCurrency(summary.net)}
                        </div>
                    </div>
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
                                        Type
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
                                            colSpan={6}
                                            className="px-6 py-12 text-center text-muted-foreground"
                                        >
                                            No transactions yet. Create your first
                                            transaction to get started.
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
                                                <div className="flex flex-col gap-1">
                                                    <span>{transaction.description}</span>
                                                    {transaction.type === 'revenue' &&
                                                        transaction.linked_expense && (
                                                            <span className="text-xs text-muted-foreground">
                                                                Linked to:{' '}
                                                                {transaction.linked_expense.description}
                                                            </span>
                                                        )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge
                                                    variant={
                                                        transaction.type ===
                                                        'revenue'
                                                            ? 'default'
                                                            : 'destructive'
                                                    }
                                                    className={
                                                        transaction.type ===
                                                        'revenue'
                                                            ? 'bg-green-600 text-white border-transparent dark:bg-green-500'
                                                            : undefined
                                                    }
                                                >
                                                    {transaction.type ===
                                                    'revenue'
                                                        ? 'Revenue'
                                                        : 'Expense'}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-muted-foreground">
                                                {transaction.user?.name || 'Unknown'}
                                            </td>
                                            <td
                                                className={`px-6 py-4 text-right text-sm font-medium ${
                                                    transaction.type === 'revenue'
                                                        ? 'text-green-600 dark:text-green-400'
                                                        : 'text-red-600 dark:text-red-400'
                                                }`}
                                            >
                                                {transaction.type === 'expense'
                                                    ? '-'
                                                    : '+'}
                                                {formatCurrency(transaction.amount)}
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

