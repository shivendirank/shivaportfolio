'use client';

import { useRef, useEffect, useMemo, useState } from 'react';
import { cn } from "@/lib/utils";
import Link from 'next/link';

type IconComponentType = React.ElementType<{ className?: string }>;

export interface InteractiveMenuItem {
    label: string;
    icon: IconComponentType;
    href: string;
}

export interface InteractiveMenuProps {
    items: InteractiveMenuItem[];
    accentColor?: string;
    activePath?: string;
}

const defaultAccentColor = '#C8FF00';

const InteractiveMenu: React.FC<InteractiveMenuProps> = ({ items, accentColor, activePath }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    // Sync active index with current path
    useEffect(() => {
        const index = items.findIndex(item =>
            item.href === activePath ||
            (activePath?.startsWith(item.href) && item.href !== '/') ||
            (item.href.startsWith('#') && activePath !== '/')
        );
        if (index !== -1) {
            setActiveIndex(index);
        }
    }, [items, activePath]);

    const textRefs = useRef<(HTMLElement | null)[]>([]);
    const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

    useEffect(() => {
        const setLineWidth = () => {
            const activeTextElement = textRefs.current[activeIndex];
            const activeItemElement = itemRefs.current[activeIndex];

            if (activeItemElement && activeTextElement) {
                const textWidth = activeTextElement.offsetWidth;
                activeItemElement.style.setProperty('--lineWidth', `${textWidth}px`);
            }
        };

        setLineWidth();
        window.addEventListener('resize', setLineWidth);
        return () => window.removeEventListener('resize', setLineWidth);
    }, [activeIndex, items]);

    const navStyle = useMemo(() => {
        const activeColor = accentColor || defaultAccentColor;
        return { '--component-active-color': activeColor } as React.CSSProperties;
    }, [accentColor]);

    return (
        <nav
            className="menu"
            role="navigation"
            style={navStyle}
        >
            {items.map((item, index) => {
                const isActive = index === activeIndex;
                const IconComponent = item.icon;

                return (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={cn("menu__item", isActive && "active")}
                        ref={(el) => { itemRefs.current[index] = el; }}
                    >
                        <div className="menu__icon">
                            <IconComponent className="w-5 h-5" />
                        </div>
                        <strong
                            className={cn("menu__text", isActive && "active")}
                            ref={(el) => { textRefs.current[index] = el; }}
                        >
                            {item.label}
                        </strong>
                    </Link>
                );
            })}
        </nav>
    );
};

export { InteractiveMenu };
