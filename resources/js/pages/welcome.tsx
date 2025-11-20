import { dashboard, login } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { TrendingUp, TrendingDown, BarChart3, Users, DollarSign, Receipt, Code, Server } from 'lucide-react';
import AppLogo from '@/components/app-logo';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Quik Ledge">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col bg-gradient-to-br from-background via-background to-muted/20">
                <header className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="container mx-auto flex h-16 items-center justify-between px-4">
                        <div className="flex items-center">
                            <AppLogo />
                        </div>
                        <nav className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href={login()}
                                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                >
                                    Log in
                                </Link>
                            )}
                        </nav>
                    </div>
                </header>

                <main className="flex flex-1 items-center justify-center px-4 py-12 lg:py-20">
                    <div className="container mx-auto max-w-6xl">
                        <div className="flex flex-col items-center text-center">
                            {/* Hero Section */}
                            <div className="mb-12 max-w-3xl space-y-6">
                                <div className="flex flex-wrap items-center justify-center gap-3">
                                    <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                                        <Code className="h-4 w-4" />
                                        Open Source
                                    </span>
                                    <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                                        <Server className="h-4 w-4" />
                                        Self-Hosted
                                    </span>
                                </div>
                                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                                    Track Your
                                    <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent dark:from-green-400 dark:to-emerald-400">
                                        {' '}
                                        Revenue
                                        </span>
                                    {' '}
                                    &{' '}
                                    <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent dark:from-red-400 dark:to-rose-400">
                                        Expenses
                                    </span>
                                </h1>
                                <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
                                    A powerful, open-source, self-hosted ledger application to manage your financial
                                    transactions. Track revenue, monitor expenses, and gain
                                    insights into your financial health with beautiful
                                    visualizations. Deploy on your own infrastructure for complete control and privacy.
                                </p>
                                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                                    {auth.user ? (
                                        <Link
                                            href={dashboard()}
                                            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                        >
                                            Go to Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            <a
                                                href="https://github.com/OnyxWM/QuikLedge/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                            >
                                                Get Started
                                            </a>
                                            <Link
                                                href={login()}
                                                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-base font-medium shadow-xs transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                            >
                                                Log In
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Features Grid */}
                            <div className="mt-16 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                <div className="group rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20">
                                        <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                                    </div>
                                    <h3 className="mb-2 text-lg font-semibold">
                                        Revenue Tracking
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Easily record and monitor your revenue streams with
                                        detailed descriptions and dates. Link revenue to
                                        specific expenses for better financial insights.
                                    </p>
                                </div>

                                <div className="group rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/20">
                                        <TrendingDown className="h-6 w-6 text-red-600 dark:text-red-400" />
                                    </div>
                                    <h3 className="mb-2 text-lg font-semibold">
                                        Expense Management
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Keep track of all your expenses in one place. Categorize
                                        and organize your spending to understand where your money
                                        goes.
                                    </p>
                                </div>

                                <div className="group rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20">
                                        <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <h3 className="mb-2 text-lg font-semibold">
                                        Visual Analytics
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        View your financial data with interactive charts and
                                        graphs. See monthly trends, profit/loss calculations, and
                                        comprehensive financial summaries.
                                    </p>
                                </div>

                                <div className="group rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/20">
                                        <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <h3 className="mb-2 text-lg font-semibold">
                                        Shared Data
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Collaborate with your team. All transactions are shared
                                        across users, making it easy to work together on
                                        financial tracking.
                                    </p>
                                </div>

                                <div className="group rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/20">
                                        <DollarSign className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                                    </div>
                                    <h3 className="mb-2 text-lg font-semibold">
                                        Real-time Dashboard
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Get instant insights with a comprehensive dashboard
                                        showing revenue, expenses, profit/loss, and monthly
                                        trends at a glance.
                                    </p>
                                </div>

                                <div className="group rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100 dark:bg-teal-900/20">
                                        <Receipt className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                                    </div>
                                    <h3 className="mb-2 text-lg font-semibold">
                                        Transaction History
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Maintain a complete history of all your financial
                                        transactions with easy search, filter, and pagination
                                        capabilities.
                                    </p>
                                </div>
                            </div>

                            {/* Additional Info */}
                            <div className="mt-16 max-w-2xl space-y-4 text-center">
                                <h2 className="text-2xl font-semibold">
                                    Simple, Powerful, Collaborative
                                </h2>
                                <p className="text-muted-foreground">
                                    Whether you're tracking personal finances or managing a
                                    team's expenses, Quik Ledge provides the tools you need to stay
                                    on top of your financial data. As an open-source, self-hosted solution,
                                    you maintain complete control over your data and infrastructure. With shared transactions,
                                    beautiful visualizations, and an intuitive interface, you'll
                                    have complete visibility into your financial health.
                                </p>
                            </div>
                        </div>
                        </div>
                    </main>
            </div>
        </>
    );
}
