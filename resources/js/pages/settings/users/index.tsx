import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import HeadingSmall from '@/components/heading-small';
import { index as usersIndex, create as createUser, edit, destroy } from '@/routes/settings/users';
import { UserPlus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: usersIndex().url,
    },
];

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
}

interface Props {
    users: {
        data: User[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
}

export default function UsersIndex({ users }: Props) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(destroy.url(id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />

            <SettingsLayout>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <HeadingSmall
                            title="Users"
                            description="Manage application users"
                        />
                        <Link href={createUser().url}>
                            <Button>
                                <UserPlus className="mr-2 h-4 w-4" />
                                Add User
                            </Button>
                        </Link>
                    </div>

                    <div className="rounded-lg border bg-card">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                                            Email
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                                            Role
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                                            Created At
                                        </th>
                                        <th className="px-6 py-3 text-right text-sm font-medium text-muted-foreground">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.data.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="px-6 py-12 text-center text-muted-foreground"
                                            >
                                                No users yet. Create your first user to get started.
                                            </td>
                                        </tr>
                                    ) : (
                                        users.data.map((user) => (
                                            <tr
                                                key={user.id}
                                                className="border-b last:border-0 hover:bg-muted/50"
                                            >
                                                <td className="px-6 py-4 text-sm">
                                                    {user.name}
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    {user.email}
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                                            user.role === 'admin'
                                                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                                                : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                                                        }`}
                                                    >
                                                        {user.role === 'admin'
                                                            ? 'Admin'
                                                            : 'User'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    {formatDate(user.created_at)}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link
                                                            href={edit(user.id).url}
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
                                                                    user.id,
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

                        {users.links.length > 3 && (
                            <div className="flex items-center justify-center gap-2 border-t p-4">
                                {users.links.map((link, index) => (
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
            </SettingsLayout>
        </AppLayout>
    );
}

