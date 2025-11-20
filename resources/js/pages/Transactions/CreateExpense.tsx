import TransactionController from '@/actions/App/Http/Controllers/TransactionController';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, Link } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import { index as expensesIndex } from '@/routes/transactions/expenses';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Expenses',
        href: expensesIndex().url,
    },
    {
        title: 'Create',
        href: '/transactions/expense/create',
    },
];

export default function CreateExpense() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Expense Transaction" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div>
                    <h1 className="text-2xl font-semibold">Create Expense Transaction</h1>
                    <p className="text-muted-foreground">
                        Add a new expense entry
                    </p>
                </div>

                <Form
                    {...TransactionController.store.form()}
                    className="max-w-2xl space-y-6"
                >
                    {({ processing, recentlySuccessful, errors, data }) => (
                        <>
                            <input type="hidden" name="type" value="expense" />

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

                            <div className="flex items-center gap-4">
                                <Button disabled={processing} type="submit">
                                    {processing ? 'Creating...' : 'Create Expense'}
                                </Button>
                                <Link href={expensesIndex().url}>
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

