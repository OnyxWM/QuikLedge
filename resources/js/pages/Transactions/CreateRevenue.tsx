import TransactionController from '@/actions/App/Http/Controllers/TransactionController';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, Link } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import { index } from '@/routes/transactions';
import { index as revenueIndex } from '@/routes/transactions/revenue';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Revenue',
        href: revenueIndex().url,
    },
    {
        title: 'Create',
        href: '/transactions/revenue/create',
    },
];

interface Expense {
    id: number;
    description: string;
    amount: string;
    date: string;
}

interface Props {
    expenses?: Expense[];
}

export default function CreateRevenue({ expenses = [] }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Revenue Transaction" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div>
                    <h1 className="text-2xl font-semibold">Create Revenue Transaction</h1>
                    <p className="text-muted-foreground">
                        Add a new revenue entry
                    </p>
                </div>

                <Form
                    {...TransactionController.store.form()}
                    className="max-w-2xl space-y-6"
                >
                    {({ processing, recentlySuccessful, errors, data }) => (
                        <>
                            <input type="hidden" name="type" value="revenue" />

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

                            <div className="flex items-center gap-4">
                                <Button disabled={processing} type="submit">
                                    {processing ? 'Creating...' : 'Create Revenue'}
                                </Button>
                                <Link href={revenueIndex().url}>
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

