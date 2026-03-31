'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

// 800vh total; hero occupies first 800vh.
// scrollYProgress from framer-motion (0→1 over entire document)
// Maps 0→1 over the full document scroll range.
// We need the fraction over the hero (800vh worth of document scroll).
// At the end of hero section, scrollY ≈ 800vh - 100vh = 700vh.
// So hero fraction = scrollY / (700vh).

interface OverlaySection {
    scrollStart: number  // 0→1 within the hero scroll range
    scrollEnd: number
    text: string
    sub?: string
    align: 'center' | 'left' | 'right'
}

const sections: OverlaySection[] = [
    {
        scrollStart: 0,
        scrollEnd: 0.16,
        text: 'Shiva Kabalee.',
        sub: 'Cybersecurity Engineering',
        align: 'center',
    },
    {
        scrollStart: 0.20,
        scrollEnd: 0.48,
        text: 'I secure systems. I ship products.',
        align: 'left',
    },
    {
        scrollStart: 0.52,
        scrollEnd: 0.80,
        text: 'Hack. Build. Repeat.',
        align: 'right',
    },
]

// Returns scroll progress (0→1) through the hero (first 800vh of page)
// relative to the window scroll position.
function useHeroProgress() {
    const { scrollY } = useScroll()
    // scrollable hero range: (800 - 100)vh = 700vh
    const maxHeroScroll = useTransform(scrollY, (v) => v) // just use scrollY
    return maxHeroScroll
}

function TextSection({ section }: { section: OverlaySection }) {
    const { scrollY } = useScroll()

    // The hero scrollable height in pixels is (800-100)vh = 700vh
    // We compute progress as scrollY / (700 * window.innerHeight / 100)
    // But useTransform can only map pixel ranges if we know window.innerHeight ahead of time.
    // Workaround: use a large fixed range and trust the transform clamping.
    // We'll map over [0, 7000] as a stand-in for 700vh (assuming 1000px vh).
    // Actually we use a MotionValue transformer that reads window.innerHeight dynamically.

    const progress = useTransform(scrollY, (v) => {
        const maxScroll = typeof window !== 'undefined' ? (window.innerHeight * 700) / 100 : 7000
        return Math.min(Math.max(v / maxScroll, 0), 1)
    })

    const peakIn = section.scrollStart + (section.scrollEnd - section.scrollStart) * 0.25
    const peakOut = section.scrollStart + (section.scrollEnd - section.scrollStart) * 0.75

    const opacity = useTransform(
        progress,
        [section.scrollStart, peakIn, peakOut, section.scrollEnd],
        [0, 1, 1, 0]
    )
    const y = useTransform(
        progress,
        [section.scrollStart, section.scrollEnd],
        ['24px', '-24px']
    )

    const alignClass =
        section.align === 'center'
            ? 'items-center text-center'
            : section.align === 'left'
                ? 'items-start text-left pl-10 md:pl-24 lg:pl-32'
                : 'items-end text-right pr-10 md:pr-24 lg:pr-32'

    return (
        <motion.div
            className={`absolute inset-0 flex flex-col justify-center ${alignClass} pointer-events-none`}
            style={{ opacity, y }}
        >
            <div className="max-w-4xl">
                {section.align === 'center' && (
                    <motion.p
                        className="text-xs tracking-[0.35em] uppercase font-semibold mb-4"
                        style={{ color: '#C8FF00' }}
                    >
                        Portfolio · 2026
                    </motion.p>
                )}
                <h1
                    className="font-black leading-none tracking-tight"
                    style={{
                        fontSize: 'clamp(3rem, 8vw, 8rem)',
                        background: 'linear-gradient(150deg, #ffffff 30%, rgba(255,255,255,0.45) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}
                >
                    {section.text}
                </h1>
                {section.sub && (
                    <p
                        className="mt-5 tracking-[0.3em] uppercase font-medium"
                        style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', color: '#C8FF00' }}
                    >
                        {section.sub}
                    </p>
                )}
                {section.align !== 'center' && (
                    <div
                        className="mt-6 h-px w-20"
                        style={{
                            background:
                                section.align === 'left'
                                    ? 'linear-gradient(to right, #C8FF00, transparent)'
                                    : 'linear-gradient(to left, #C8FF00, transparent)',
                        }}
                    />
                )}
            </div>
        </motion.div>
    )
}

function ScrollHint() {
    const { scrollY } = useScroll()
    const opacity = useTransform(scrollY, [0, 200], [1, 0])
    const y = useTransform(scrollY, [0, 200], ['0px', '-16px'])

    return (
        <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
            style={{ opacity, y, zIndex: 20 }}
        >
            <span className="text-[9px] tracking-[0.4em] uppercase font-semibold" style={{ color: '#555' }}>
                Scroll
            </span>
            <div
                className="w-px h-12"
                style={{ background: 'linear-gradient(to bottom, #C8FF00 0%, transparent 100%)' }}
            />
        </motion.div>
    )
}

export default function Overlay() {
    const { scrollY } = useScroll()

    // Hide overlay once past hero section
    const overlayOpacity = useTransform(scrollY, (v) => {
        if (typeof window === 'undefined') return 1;
        const heroEnd = (window.innerHeight * 800) / 100  // 800vh in px
        const fadeStart = heroEnd - window.innerHeight * 0.5  // start fading 0.5 screen before end
        return Math.min(Math.max(1 - (v - fadeStart) / (window.innerHeight * 0.5), 0), 1)
    })

    return (
        <motion.div
            className="fixed inset-0 pointer-events-none overflow-hidden"
            style={{ zIndex: 10, opacity: overlayOpacity }}
        >
            {sections.map((s, i) => (
                <TextSection key={i} section={s} />
            ))}
            <ScrollHint />
        </motion.div>
    )
}
