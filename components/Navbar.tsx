'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'

const navLinks = [
    { label: 'Work', href: '/work' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
    const [mounted, setMounted] = useState(false)
    const { scrollY } = useScroll()

    // All hooks must be called unconditionally — before any early return
    const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.92])
    const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.1])

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-50 px-4 md:px-10 py-4"
            initial={{ opacity: 0, y: -20 }}
            animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            <motion.div
                className="relative flex items-center justify-between max-w-7xl mx-auto rounded-2xl px-6 py-3"
                style={{
                    backgroundColor: useTransform(bgOpacity, (v) => `rgba(10,10,10,${v})`),
                    border: '1px solid',
                    borderColor: useTransform(borderOpacity, (v) => `rgba(255,255,255,${v})`),
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                }}
            >
                {/* Logo */}
                <Link
                    href="/"
                    className="text-sm font-extrabold tracking-[0.18em] uppercase"
                    style={{ color: '#f0f0f0' }}
                >
                    Shiva<span style={{ color: '#C8FF00' }}>.</span>
                </Link>

                {/* Nav Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="text-xs tracking-[0.22em] uppercase font-medium hover:text-white transition-colors duration-200"
                            style={{ color: '#666' }}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <motion.a
                    href="mailto:hello@shiva.dev"
                    className="text-xs tracking-[0.15em] uppercase font-bold px-5 py-2 rounded-full"
                    style={{ background: '#C8FF00', color: '#0a0a0a' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Resume
                </motion.a>
            </motion.div>
        </motion.nav>
    )
}
