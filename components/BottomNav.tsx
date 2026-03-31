'use client';

import { usePathname } from 'next/navigation';
import { Home, Briefcase, User, Mail } from 'lucide-react';
import { InteractiveMenu, InteractiveMenuItem } from '@/components/ui/modern-mobile-menu';

const navItems: InteractiveMenuItem[] = [
    { label: 'Home', icon: Home, href: '/' },
    { label: 'Work', icon: Briefcase, href: '/work' },
    { label: 'About', icon: User, href: '/about' },
    { label: 'Contact', icon: Mail, href: '#contact' },
];

export default function BottomNav() {
    const pathname = usePathname();

    // Hide on landing page
    if (pathname === '/') return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-8 pointer-events-none z-[100]">
            <div className="pointer-events-auto">
                <InteractiveMenu
                    items={navItems}
                    activePath={pathname}
                    accentColor="#C8FF00"
                />
            </div>
        </div>
    );
}
