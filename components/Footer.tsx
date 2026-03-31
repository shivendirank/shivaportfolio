import { useState } from 'react'
import { motion } from 'framer-motion'
import ContactModal from './ContactModal'

const socialLinks = [
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Twitter', href: 'https://twitter.com' },
    { label: 'Dribbble', href: 'https://dribbble.com' },
]

export default function Footer() {
    const year = new Date().getFullYear()
    const [isContactModalOpen, setIsContactModalOpen] = useState(false)

    return (
        <footer className="relative py-20 px-6 md:px-12 lg:px-20" id="contact">
            <div className="w-full h-px mb-20" style={{ background: 'rgba(255,255,255,0.06)' }} />

            <div className="max-w-7xl mx-auto">
                {/* CTA Block */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="mb-20 text-center"
                >
                    <p className="text-xs tracking-[0.3em] uppercase mb-4 font-medium" style={{ color: '#C8FF00' }}>
                        Let&#39;s Collaborate
                    </p>
                    <h2
                        className="font-black leading-none mb-8"
                        style={{
                            fontSize: 'clamp(3rem, 10vw, 10rem)',
                            background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.2) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        Get In Touch
                    </h2>
                    <motion.button
                        onClick={() => setIsContactModalOpen(true)}
                        className="inline-flex items-center gap-3 text-sm tracking-[0.15em] uppercase font-bold px-8 py-4 rounded-full transition-all duration-300"
                        style={{
                            background: '#C8FF00',
                            color: '#0a0a0a',
                        }}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                    >
                        Contact
                        <span>↗</span>
                    </motion.button>
                </motion.div>

                <ContactModal
                    isOpen={isContactModalOpen}
                    onClose={() => setIsContactModalOpen(false)}
                />

                {/* Bottom bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs" style={{ color: '#444' }}>
                        © {year} Shiva. Crafted with care.
                    </p>
                    <div className="flex items-center gap-8">
                        {socialLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs tracking-[0.15em] uppercase font-medium transition-colors duration-200"
                                style={{ color: '#444' }}
                                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#C8FF00')}
                                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#444')}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
