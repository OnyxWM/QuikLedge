import TransactionController from '@/actions/App/Http/Controllers/TransactionController';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, Link } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import { index } from '@/routes/transactions';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Transactions',
        href: index().url,
    },
    {
        title: 'Create',
        href: '/transactions/create',
    },
];

interface Expense {
    id: number;
    description: string;
    amount: string;
    date: string;
}

interface Props {
    type?: 'revenue' | 'expense';
    expenses?: Expense[];
}

export default function Create({ type, expenses = [] }: Props) {
    const pageTitle = type
        ? `Create ${type === 'revenue' ? 'Revenue' : 'Expense'} Transaction`
        : 'Create Transaction';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={pageTitle} />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div>
                    <h1 className="text-2xl font-semibold">{pageTitle}</h1>
                    <p className="text-muted-foreground">
                        {type
                            ? `Add a new ${type === 'revenue' ? 'revenue' : 'expense'} entry`
                            : 'Add a new revenue or expense entry'}
                    </p>
                </div>

                <Form
                    {...TransactionController.store.form()}
                    className="max-w-2xl space-y-6"
                >
                    {({ processing, recentlySuccessful, errors, data }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="type">Type</Label>
                                <select
                                    id="type"
                                    name="type"
                                    defaultValue={data?.type || type || ''}
                                    required
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                >
                                    <option value="">Select type</option>
                                    <option value="revenue">Revenue</option>
                                    <option value="expense">Expense</option>
                                </select>
                                <InputError message={errors.type} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Input
                                    id="description"
                                    name="description"
                                    defaultValue={data?.description || ''}
                                    placeholder="Enter description"
                                    required
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="amount">Amount</Label>
                                <Input
                                    id="amount"
                                    name="amount"
                                    type="number"
                                    step="0.01"
                                    min="0.01"
                                    defaultValue={data?.amount || ''}
                                    placeholder="0.00"
                                    required
                                />
                                <InputError message={errors.amount} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="date">Date</Label>
                                <Input
                                    id="date"
                                    name="date"
                                    type="date"
                                    defaultValue={
                                        data?.date ||
                                        new Date().toISOString().split('T')[0]
                                    }
                                    required
                                />
                                <InputError message={errors.date} />
                            </div>

                            {type === 'revenue' && (
                                <div className="grid gap-2">
                                    <Label htmlFor="linked_expense_id">
                                        Link to Expense (Optional)
                                    </Label>
                                    <select
                                        id="linked_expense_id"
                                        name="linked_expense_id"
                                        defaultValue={data?.linked_expense_id || ''}
                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                    >
                                        <option value="">No expense linked</option>
                                        {expenses.map((expense) => (
                                            <option
                                                key={expense.id}
                                                value={expense.id}
                                            >
                                                {expense.description} -{' '}
                                                {new Intl.NumberFormat('en-US', {
                                                    style: 'currency',
                                                    currency: 'USD',
                                                }).format(Number(expense.amount))}{' '}
                                                ({new Date(expense.date).toLocaleDateString()})
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.linked_expense_id} />
                                </div>
                            )}

                            <div className="flex items-center gap-4">
                                <Button disabled={processing} type="submit">
                                    {processing ? 'Creating...' : 'Create Transaction'}
                                </Button>
                                <Link href={index().url}>
                                    <Button variant="outline" type="button">
                                        Cancel
                                    </Button>
                                </Link>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </AppLayout>
    );
}

