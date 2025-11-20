import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-10 items-center justify-center rounded-md text-sidebar-primary-foreground">
                <AppLogoIcon className="size-6 fill-current text-white dark:text-black" />
            </div>
            <div className="ml-1 grid flex-1 items-center text-left text-md">
                <span className="mb-0.5 truncate leading-tight font-bold">
                    Quik Ledge
                </span>
            </div>
        </>
    );
}
