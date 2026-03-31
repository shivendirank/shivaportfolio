"use client";

import { useEffect, useRef, useCallback } from "react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ArrowUpIcon,
    Paperclip,
    PlusIcon,
    Briefcase,
    User,
    Mail,
} from "lucide-react";

interface UseAutoResizeTextareaProps {
    minHeight: number;
    maxHeight?: number;
}

function useAutoResizeTextarea({
    minHeight,
    maxHeight,
}: UseAutoResizeTextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = useCallback(
        (reset?: boolean) => {
            const textarea = textareaRef.current;
            if (!textarea) return;

            if (reset) {
                textarea.style.height = `${minHeight}px`;
                return;
            }

            // Temporarily shrink to get the right scrollHeight
            textarea.style.height = `${minHeight}px`;

            // Calculate new height
            const newHeight = Math.max(
                minHeight,
                Math.min(
                    textarea.scrollHeight,
                    maxHeight ?? Number.POSITIVE_INFINITY
                )
            );

            textarea.style.height = `${newHeight}px`;
        },
        [minHeight, maxHeight]
    );

    useEffect(() => {
        // Set initial height
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = `${minHeight}px`;
        }
    }, [minHeight]);

    // Adjust height on window resize
    useEffect(() => {
        const handleResize = () => adjustHeight();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [adjustHeight]);

    return { textareaRef, adjustHeight };
}

export function VercelV0Chat() {
    const [value, setValue] = useState("");
    const router = useRouter();
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 60,
        maxHeight: 200,
    });

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            const input = value.toLowerCase().trim();
            if (input) {
                // External links (open in new tab)
                if (/linkedin/.test(input)) {
                    window.open('https://www.linkedin.com/in/shivendirankabaleeswaran', '_blank');
                } else if (/github/.test(input)) {
                    window.open('https://github.com/shivendirank', '_blank');
                }
                // Intelligent internal routing
                else if (/work|project|build|portfolio|ship|experience|hack|tool|apps|code|stack/.test(input)) {
                    router.push('/work');
                } else if (/about|who|background|skills|bio|shiva|education|journey|like to do|hobby|fun|interest|story/.test(input)) {
                    router.push('/about');
                } else if (/contact|email|touch|reach|hire|message|social|say hi|talk|get in touch/.test(input)) {
                    router.push('#contact');
                }

                setValue("");
                adjustHeight(true);
            }
        }
    };

    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4 space-y-12">
            <h1 className="text-4xl md:text-5xl font-bold text-center tracking-tight text-white">
                What would you like to explore?
            </h1>

            <div className="w-full">
                <div className="relative bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                    <div className="overflow-y-auto">
                        <Textarea
                            ref={textareaRef}
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value);
                                adjustHeight();
                            }}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask a question about me, or try a button below."
                            className={cn(
                                "w-full px-5 py-4",
                                "resize-none",
                                "bg-transparent",
                                "border-none",
                                "text-white text-base md:text-lg",
                                "focus:outline-none",
                                "focus-visible:ring-0 focus-visible:ring-offset-0",
                                "placeholder:text-white/20 placeholder:text-base md:text-lg",
                                "min-h-[60px]"
                            )}
                            style={{
                                overflow: "hidden",
                            }}
                        />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/[0.02] border-t border-white/5">
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                className="group p-2 hover:bg-white/5 rounded-lg transition-colors flex items-center gap-1.5"
                            >
                                <Paperclip className="w-4 h-4 text-white/50 group-hover:text-white" />
                                <span className="text-xs text-white/30 hidden md:inline transition-opacity group-hover:text-white">
                                    Attach
                                </span>
                            </button>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                className="px-3 py-1.5 rounded-lg text-sm text-white/50 transition-colors border border-dashed border-white/10 hover:border-white/30 hover:bg-white/5 flex items-center gap-1.5"
                            >
                                <PlusIcon className="w-4 h-4" />
                                Project
                            </button>
                            <button
                                type="button"
                                className={cn(
                                    "p-2 rounded-lg transition-all duration-300",
                                    value.trim()
                                        ? "bg-[#C8FF00] text-black scale-105"
                                        : "bg-white/5 text-white/20"
                                )}
                            >
                                <ArrowUpIcon
                                    className="w-5 h-5"
                                />
                                <span className="sr-only">Send</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
                    <ActionButton
                        icon={<Briefcase className="w-4 h-4" />}
                        label="See my Work"
                        href="/work"
                    />
                    <ActionButton
                        icon={<User className="w-4 h-4" />}
                        label="About me"
                        href="/about"
                    />
                    <ActionButton
                        icon={<Mail className="w-4 h-4" />}
                        label="Get in touch"
                        href="#contact"
                    />
                </div>
            </div>
        </div>
    );
}

interface ActionButtonProps {
    icon: React.ReactNode;
    label: string;
    href: string;
}

function ActionButton({ icon, label, href }: ActionButtonProps) {
    return (
        <Link
            href={href}
            className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] hover:bg-white/[0.08] rounded-full border border-white/5 hover:border-[#C8FF00]/30 text-white/60 hover:text-white transition-all duration-300 group"
        >
            <span className="group-hover:text-[#C8FF00] transition-colors">{icon}</span>
            <span className="text-sm font-medium">{label}</span>
        </Link>
    );
}
