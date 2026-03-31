'use client'

import ScrollyCanvas from '@/components/ScrollyCanvas'
import Overlay from '@/components/Overlay'
import Footer from '@/components/Footer'
import { VercelV0Chat } from '@/components/ui/v0-ai-chat'
import { motion } from 'framer-motion'

export default function Home() {
    return (
        <main className="relative">
            {/* Fixed background canvas driven by scroll */}
            <ScrollyCanvas />

            {/* Hero section — 800vh tall to drive the frame sequence */}
            <section style={{ height: '800vh', position: 'relative' }}>
                <Overlay />
            </section>

            {/* Navigation AI Chat Section */}
            <section className="relative z-10 bg-[#0a0a0a] py-32 px-6 md:px-12 lg:px-20 overflow-hidden">
                {/* Visual elements for depth */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px]"
                    style={{ background: 'linear-gradient(90deg, transparent, #C8FF00, transparent)', opacity: 0.2 }} />

                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#C8FF00]/5 blur-[120px] rounded-full -translate-y-1/2 pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <VercelV0Chat />
                </motion.div>
            </section>

            {/* Footer with Contact */}
            <div className="relative z-10 bg-[#0a0a0a]">
                <Footer />
            </div>
        </main>
    )
}
