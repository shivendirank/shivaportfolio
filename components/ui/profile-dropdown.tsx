'use client'

import { useState, useEffect } from "react"
import { ChevronUp, Bell, MessageCircle, Trophy, Rocket, Shield, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from '@/lib/utils'

interface Activity {
    id: number
    icon: React.ReactNode
    title: string
    description: string
    time: string
}

const activities: Activity[] = [
    {
        id: 1,
        icon: <Trophy className="h-4 w-4" />,
        title: "Hackathon Milestone",
        description: "Competed in 5 hackathons, won 4 of them.",
        time: "Latest",
    },
    {
        id: 2,
        icon: <Rocket className="h-4 w-4" />,
        title: "Startup Venture",
        description: "Early stage startup coming soon.",
        time: "Ongoing",
    },
    {
        id: 3,
        icon: <Shield className="h-4 w-4" />,
        title: "AI & Blockchain",
        description: "Autonomously detecting AI bots in blockchain.",
        time: "In Dev",
    },
    {
        id: 4,
        icon: <MessageCircle className="h-4 w-4" />,
        title: "Leadership",
        description: "Fellow & Subcommittee Chair at KU Engineering.",
        time: "2025-26",
    },
]

export const ProfileCard = () => {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [isOpen, setIsOpen] = useState(true)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <div className="flex items-center justify-center p-4 font-sans antialiased">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md mx-auto overflow-hidden rounded-[2rem] bg-neutral-900 border border-white/5 shadow-2xl shadow-black"
            >
                {/* Activity Header */}
                <div
                    className="flex items-center gap-4 p-5 cursor-pointer select-none group border-b border-white/5"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-800 transition-all duration-300 group-hover:bg-neutral-700/50">
                        <Bell className={cn("h-5 w-5 text-neutral-400 group-hover:text-[#C8FF00] transition-colors", isOpen && "text-[#C8FF00]")} />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <h3 className="text-base font-bold text-white tracking-tight uppercase tracking-widest">Active Logs</h3>
                        <p
                            className={cn(
                                "text-xs text-neutral-500 font-medium",
                                "transition-all duration-500",
                                isOpen ? "opacity-0 max-h-0" : "opacity-100 max-h-6 mt-1",
                            )}
                        >
                            Recent professional highlights
                        </p>
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center border border-white/5 rounded-full">
                        <ChevronUp
                            className={cn(
                                "h-4 w-4 text-neutral-500 transition-transform duration-500",
                                isOpen ? "rotate-0" : "rotate-180",
                            )}
                        />
                    </div>
                </div>

                {/* Activity List Container */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="p-3">
                                <div className="space-y-1">
                                    {activities.map((activity, index) => (
                                        <motion.div
                                            key={activity.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="flex items-start gap-4 rounded-2xl p-4 hover:bg-neutral-800/50 transition-colors duration-200 border border-transparent hover:border-white/5"
                                        >
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-800 border border-white/5">
                                                <span className="text-neutral-300 group-hover:text-white transition-colors">
                                                    {activity.icon}
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="text-sm font-bold text-white tracking-tight leading-none mb-1">{activity.title}</h4>
                                                    <span className="text-[10px] text-[#C8FF00]/60 font-mono tracking-widest uppercase">
                                                        {activity.time}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-neutral-500 font-medium line-clamp-1">{activity.description}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Control Footer */}
                            <div className="flex items-center justify-between p-6 border-t border-white/5 bg-black/20">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#C8FF00] animate-pulse" />
                                    <span className="text-[10px] text-neutral-500 font-mono tracking-widest uppercase">system ready</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button onClick={() => setTheme('light')} className="p-1 text-neutral-600 hover:text-white transition-colors">
                                        <Sun className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => setTheme('dark')} className="p-1 text-[#C8FF00] transition-colors">
                                        <Moon className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}
