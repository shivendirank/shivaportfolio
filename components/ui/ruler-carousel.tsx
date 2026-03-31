"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rewind, FastForward } from "lucide-react";

export interface CarouselItem {
    id: string | number;
    title: string;
}

// Create infinite items by triplicating the array
const createInfiniteItems = (originalItems: CarouselItem[]) => {
    const items: any[] = [];
    for (let i = 0; i < 3; i++) {
        originalItems.forEach((item, index) => {
            items.push({
                ...item,
                id: `${i}-${item.id}`,
                originalIndex: index,
                uniqueKey: `${i}-${index}`
            });
        });
    }
    return items;
};

const RulerLines = ({
    top = true,
    totalLines = 101, // Odd number for perfect center index 50
}: {
    top?: boolean;
    totalLines?: number;
}) => {
    const lines = [];
    const lineSpacing = 100 / (totalLines - 1);

    for (let i = 0; i < totalLines; i++) {
        const isFifth = i % 5 === 0;
        const isCenter = i === 50; // Index 50 is exact center of 101 lines

        let height = "h-3";
        let color = "bg-gray-500/30 dark:bg-gray-400/20";

        if (isCenter) {
            height = "h-8";
            color = "bg-[#C8FF00]";
        } else if (isFifth) {
            height = "h-4";
            color = "bg-gray-500/60 dark:bg-gray-400/40";
        }

        const positionClass = top ? "top-0" : "bottom-0";

        lines.push(
            <div
                key={i}
                className={`absolute w-0.5 ${height} ${color} ${positionClass} transition-colors duration-300`}
                style={{ left: `${i * lineSpacing}%` }}
            />
        );
    }

    return <div className="relative w-full h-8 px-4">{lines}</div>;
};

export function RulerCarousel({
    originalItems,
    activeIndex,
    setActiveIndex,
    onExpand,
}: {
    originalItems: CarouselItem[];
    activeIndex: number;
    setActiveIndex: (index: number) => void;
    onExpand?: () => void;
}) {
    const [isResetting, setIsResetting] = useState(false);
    const infiniteItems = createInfiniteItems(originalItems);
    const itemsPerSet = originalItems.length;

    const handleItemClick = (newIndex: number) => {
        if (isResetting) return;

        // Find the original item index
        const targetOriginalIndex = newIndex % itemsPerSet;

        // Find all instances of this item across the 3 copies
        const possibleIndices = [
            targetOriginalIndex,
            targetOriginalIndex + itemsPerSet,
            targetOriginalIndex + itemsPerSet * 2,
        ];

        // Find the closest index to current position
        let closestIndex = possibleIndices[0];
        let smallestDistance = Math.abs(possibleIndices[0] - activeIndex);

        for (const index of possibleIndices) {
            const distance = Math.abs(index - activeIndex);
            if (distance < smallestDistance) {
                smallestDistance = distance;
                closestIndex = index;
            }
        }

        if (closestIndex === activeIndex && onExpand) {
            onExpand();
        } else {
            setActiveIndex(closestIndex);
        }
    };

    const handlePrevious = () => {
        if (isResetting) return;
        setActiveIndex(activeIndex - 1);
    };

    const handleNext = () => {
        if (isResetting) return;
        setActiveIndex(activeIndex + 1);
    };

    // Handle infinite scrolling reset
    useEffect(() => {
        if (isResetting) return;

        if (activeIndex < itemsPerSet) {
            setIsResetting(true);
            setTimeout(() => {
                setActiveIndex(activeIndex + itemsPerSet);
                setIsResetting(false);
            }, 0);
        }
        else if (activeIndex >= itemsPerSet * 2) {
            setIsResetting(true);
            setTimeout(() => {
                setActiveIndex(activeIndex - itemsPerSet);
                setIsResetting(false);
            }, 0);
        }
    }, [activeIndex, itemsPerSet, isResetting, setActiveIndex]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (isResetting) return;
            if (event.key === "ArrowLeft") {
                event.preventDefault();
                handlePrevious();
            } else if (event.key === "ArrowRight") {
                event.preventDefault();
                handleNext();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isResetting, activeIndex]);

    // Target transition math: perfectly center the active index
    const itemWidth = 400;
    const gap = 100;
    const step = itemWidth + gap;

    // Position of item i's center relative to list start: (i * step) + (itemWidth / 2)
    // We want this center to be at 50vw. 
    // So the list start should be at 50vw - [(activeIndex * step) + (itemWidth / 2)]
    const targetX = `calc(50vw - ${(activeIndex * step) + (itemWidth / 2)}px)`;

    const currentPage = (activeIndex % itemsPerSet) + 1;
    const totalPages = itemsPerSet;

    return (
        <div className="w-full flex flex-col items-center justify-center py-12">
            <div className="w-full h-[240px] flex flex-col justify-center relative">
                <div className="flex items-center justify-center opacity-50">
                    <RulerLines top />
                </div>

                <div className="flex items-center justify-center w-full h-full relative overflow-hidden">
                    {/* Center indicator */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[120px] border-x border-[#C8FF00]/20 pointer-events-none z-10" />

                    <motion.div
                        className="flex items-center absolute left-0"
                        style={{ gap: `${gap}px` }}
                        animate={{ x: targetX }}
                        transition={
                            isResetting
                                ? { duration: 0 }
                                : { type: "spring", stiffness: 200, damping: 25, mass: 1 }
                        }
                    >
                        {infiniteItems.map((item, index) => {
                            const isActive = index === activeIndex;
                            return (
                                <motion.button
                                    key={item.uniqueKey}
                                    onClick={() => handleItemClick(index)}
                                    className={`text-4xl md:text-6xl font-bold whitespace-nowrap cursor-pointer flex items-center justify-center transition-all duration-500 ${isActive
                                        ? "text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                        : "text-white/20 hover:text-white/50"
                                        }`}
                                    animate={{
                                        scale: isActive ? 1 : 0.7,
                                        opacity: isActive ? 1 : 0.2,
                                        filter: isActive ? "blur(0px)" : "blur(2px)"
                                    }}
                                    transition={
                                        isResetting
                                            ? { duration: 0 }
                                            : { type: "spring", stiffness: 300, damping: 25 }
                                    }
                                    style={{ width: `${itemWidth}px` }}
                                >
                                    {item.title}
                                </motion.button>
                            );
                        })}
                    </motion.div>
                </div>

                <div className="flex items-center justify-center opacity-50">
                    <RulerLines top={false} />
                </div>
            </div>

            <div className="flex items-center justify-center gap-8 mt-6">
                <button
                    onClick={handlePrevious}
                    disabled={isResetting}
                    className="p-3 rounded-full border border-white/10 hover:border-[#C8FF00]/50 hover:text-[#C8FF00] transition-all disabled:opacity-30"
                    aria-label="Previous"
                >
                    <Rewind className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3 font-mono">
                    <span className="text-xl font-bold text-[#C8FF00]">
                        {currentPage.toString().padStart(2, '0')}
                    </span>
                    <span className="text-white/20">/</span>
                    <span className="text-sm text-white/40">
                        {totalPages.toString().padStart(2, '0')}
                    </span>
                </div>

                <button
                    onClick={handleNext}
                    disabled={isResetting}
                    className="p-3 rounded-full border border-white/10 hover:border-[#C8FF00]/50 hover:text-[#C8FF00] transition-all disabled:opacity-30"
                    aria-label="Next"
                >
                    <FastForward className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
