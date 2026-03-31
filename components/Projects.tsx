'use client'

import { motion } from 'framer-motion'
import { StackCard } from '@/components/ui/stack-card'

export default function Projects() {
    return (
        <section className="relative py-32 px-6 md:px-12 lg:px-20" id="work">
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true, margin: '-100px' }}
                className="mb-4 text-center"
            >
                <p className="text-xs tracking-[0.3em] uppercase mb-4 font-medium" style={{ color: '#C8FF00' }}>
                    Selected Work
                </p>
                <h2
                    className="font-bold leading-none"
                    style={{
                        fontSize: 'clamp(2.5rem, 6vw, 6rem)',
                        background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.5) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}
                >
                    Projects.
                </h2>
                <p
                    className="mt-4 text-sm tracking-wide mx-auto"
                    style={{ color: '#555', maxWidth: 420 }}
                >
                    Scroll to explore — each card springs in as you go.
                </p>
            </motion.div>

            {/* Stack Cards */}
            <StackCard />
        </section>
    )
}
