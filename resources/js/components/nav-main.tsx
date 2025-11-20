import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { resolveUrl } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    
    const isActive = (item: typeof items[0]) => {
        const resolvedHref = resolveUrl(item.href);
        const currentUrl = page.url;
        
        // For Transactions, only match exact /transactions or /transactions?...
        // but not /transactions/revenue, /transactions/expenses, etc.
        if (resolvedHref === '/transactions') {
            return currentUrl === '/transactions' || 
                   (currentUrl.startsWith('/transactions/') && 
                    !currentUrl.startsWith('/transactions/revenue') &&
                    !currentUrl.startsWith('/transactions/expenses') &&
                    !currentUrl.startsWith('/transactions/expense'));
        }
        
        // For other items, use exact match or startsWith
        return currentUrl === resolvedHref || currentUrl.startsWith(resolvedHref + '/');
    };
    
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            isActive={isActive(item)}
                            tooltip={{ children: item.title }}
                        >
                            <Link href={item.href} prefetch>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
