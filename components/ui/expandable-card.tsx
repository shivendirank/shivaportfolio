"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

interface ExpandableCardProps {
    title: string;
    src: string;
    description: string;
    children?: React.ReactNode;
    className?: string;
    classNameExpanded?: string;
    active: boolean;
    setActive: (active: boolean) => void;
    [key: string]: any;
}

export function ExpandableCard({
    title,
    src,
    description,
    children,
    className,
    classNameExpanded,
    active,
    setActive,
    ...props
}: ExpandableCardProps) {
    const cardRef = React.useRef<HTMLDivElement>(null);
    const id = React.useId();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    React.useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setActive(false);
            }
        };

        if (active) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", onKeyDown);
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            window.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = "auto";
        };
    }, [active, setActive]);

    if (!mounted) return null;

    const modalContent = (
        <AnimatePresence>
            {active && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActive(false)}
                        className="fixed inset-0 bg-black/90 backdrop-blur-2xl h-full w-full z-[100] cursor-pointer"
                    />
                    <div className="fixed inset-0 grid place-items-center z-[110] p-4 sm:p-8 pointer-events-none">
                        <motion.div
                            layoutId={`card-${title}-${id}`}
                            ref={cardRef}
                            className={cn(
                                "w-full max-w-[900px] h-full max-h-[90vh] flex flex-col overflow-hidden rounded-3xl bg-[#0a0a0a] border border-white/10 shadow-2xl pointer-events-auto relative",
                                classNameExpanded,
                            )}
                            {...props}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setActive(false)}
                                className="absolute top-6 right-6 z-[120] p-2 rounded-full bg-black/50 border border-white/10 text-white/70 hover:text-white hover:border-[#C8FF00]/50 transition-all flex items-center justify-center"
                                aria-label="Close modal"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="flex flex-col md:flex-row h-full">
                                {/* Image Section */}
                                <motion.div
                                    layoutId={`image-${title}-${id}`}
                                    className="w-full md:w-2/5 h-64 md:h-auto relative shrink-0"
                                >
                                    <img
                                        src={src}
                                        alt={title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent md:bg-gradient-to-r" />
                                </motion.div>

                                {/* Content Section */}
                                <div className="flex flex-col flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar">
                                    <div>
                                        <motion.p
                                            layoutId={`description-${description}-${id}`}
                                            className="text-[#C8FF00] font-mono text-sm tracking-widest uppercase mb-2"
                                        >
                                            {description}
                                        </motion.p>
                                        <motion.h3
                                            layoutId={`title-${title}-${id}`}
                                            className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight"
                                        >
                                            {title}
                                        </motion.h3>
                                    </div>

                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-white/60 text-lg leading-relaxed space-y-6"
                                    >
                                        {children}
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
}
