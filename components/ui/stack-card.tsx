'use client'

import { useState } from 'react'
import * as motion from 'motion/react-client'
import { AnimatePresence } from 'framer-motion'
import type { Variants } from 'motion/react'

interface Project {
    id: string
    title: string
    category: string
    description: string
    tags: string[]
    year: string
    hueA: number
    hueB: number
    link?: string
    problem?: string
    solution?: string
}

const projects: Project[] = [
    {
        id: '01',
        title: 'Maat',
        category: 'ETH Denver 2026 · Blockchain / AI',
        description:
            'A 4-layer sovereign infrastructure turning unreliable AI agents into self-sovereign, accountable systems.',
        problem: 'AI agents can\'t be trusted — they have no persistent identity, transparency, or financial autonomy.',
        solution: 'A 4-layer sovereign infrastructure combining iNFTs for persistent identity, TEEs/FHE for verifiable privacy, 3D visual status rendering, and autonomous micropayments, turning unreliable agents into self-sovereign, accountable systems.',
        tags: ['iNFTs', 'TEE', 'FHE', 'Web3', 'Solidity'],
        year: '2026',
        hueA: 200,
        hueB: 240,
        link: 'https://lnkd.in/gMFvrhcu',
    },
    {
        id: '02',
        title: 'Confession Slice',
        category: 'ETH Denver 2026 · Monad · Social',
        description:
            'Anonymous confession app on Monad where every interaction earns Pizza Tokens redeemable for real pizza.',
        solution: 'Anonymous confession app built on Monad. Users post confessions and upvote others, with every interaction earning Pizza Tokens that can be redeemed for real pizza coupons. Leveraged Monad\'s high transaction speed for fast, cheap on-chain messaging.',
        tags: ['Monad', 'Solidity', 'ERC-20', 'React.js', 'IPFS'],
        year: '2026',
        hueA: 340,
        hueB: 20,
        link: 'https://lnkd.in/gzEDiXZp',
    },
    {
        id: '03',
        title: 'Flight Chain',
        category: 'ETH Denver 2026 · XRP · Aviation',
        description:
            'Replaced the aviation black box with a living on-chain system on the XRP Ledger.',
        problem: 'Aviation black boxes are physically fragile, centrally controlled, and can take years and millions of dollars to recover after a crash.',
        solution: 'Replaced black box with a living on-chain system that instantly anchors tamper-proof flight telemetry to IPFS, updates a Dynamic NFT on the XRP Ledger, and autonomously unlocks rescue funds the moment a crash is detected.',
        tags: ['XRP Ledger', 'IPFS', 'Dynamic NFT', 'TypeScript', 'Node.js'],
        year: '2026',
        hueA: 40,
        hueB: 70,
        link: 'https://lnkd.in/gwArcaCp',
    },
    {
        id: '04',
        title: 'Blockchain Basketball NFT',
        category: 'Full-Stack · Web3',
        description:
            'Decentralized marketplace for basketball trading card NFTs with offer negotiation and card battles.',
        solution: 'Independently architected and deployed a full-stack decentralized marketplace for basketball trading card NFTs. Developed 3 smart contracts using Solidity (ERC-721 standard) with a sophisticated offer negotiation system and a stats-based card battle feature. Optimized gas costs by 15%.',
        tags: ['React.js', 'Solidity', 'Hardhat', 'IPFS', 'Tailwind'],
        year: '2024–25',
        hueA: 260,
        hueB: 300,
    },
    {
        id: '05',
        title: 'Atlas Medical Supply Network',
        category: 'Healthcare · Backend',
        description:
            'HIPAA-compliant healthcare platform for supply chain optimization with microservices architecture.',
        solution: 'Designed a healthcare platform addressing supply chain optimization needs. Architected microservices using Node.js and TypeScript with JWT authentication and role-based access control supporting multiple user types. Developed a Redis-based queue system, implemented encryption, HIPAA compliance measures, and containerized application using Docker.',
        tags: ['Node.js', 'TypeScript', 'Redis', 'Docker', 'PostgreSQL'],
        year: '2024–25',
        hueA: 140,
        hueB: 180,
    },
    {
        id: '06',
        title: 'Fortisense Consulting',
        category: 'Cybersecurity · Compliance',
        description:
            'SOC 2 Type II compliance for 3 SaaS companies — cut average remediation timelines by 6 weeks.',
        solution: 'Engaged 3 SaaS companies in cybersecurity solutions through consultative selling. Translated complex technical compliance requirements (SOC 2, ISO 27001) into accessible business value. Conducted comprehensive gap analyses for SOC 2 Type II compliance and developed prioritized remediation roadmaps reducing average client compliance timeline by 6 weeks.',
        tags: ['SOC 2', 'ISO 27001', 'Risk Analysis', 'Compliance'],
        year: '2025',
        hueA: 20,
        hueB: 50,
    },
    {
        id: '07',
        title: 'Focus Research Labs',
        category: 'Security · Backend',
        description:
            'SSO system for 10,000+ users with OAuth 2.0 and 30+ API test suites catching production vulnerabilities.',
        solution: 'Collaborated with an offshore team in India to design secure enterprise applications serving 10,000+ users. Implemented Single Sign-On (SSO) using Apple ID API and OAuth 2.0 authentication protocols. Developed API test suites with 30+ test cases, identified API vulnerabilities through security testing, and created detailed technical documentation enabling knowledge transfer across development teams.',
        tags: ['OAuth 2.0', 'Apple ID API', 'API Testing', 'TypeScript'],
        year: '2025',
        hueA: 340,
        hueB: 20,
    },
    {
        id: '08',
        title: 'Password Strength Analyzer',
        category: 'Security · Python',
        description:
            'Security education tool using "Have I Been Pwned" API with entropy calculations and breach detection.',
        solution: 'Built a password security evaluation tool using Python as a learning project to explore cybersecurity concepts. Integrated the "Have I Been Pwned" API and implemented basic entropy calculations while developing skills in API integration and user input handling.',
        tags: ['Python', 'Have I Been Pwned API', 'Cryptography'],
        year: '2024',
        hueA: 80,
        hueB: 120,
    },
]

const cardVariants: Variants = {
    offscreen: { y: 280 },
    onscreen: {
        y: 40,
        rotate: -4,
        transition: {
            type: 'spring',
            bounce: 0.35,
            duration: 0.85,
        },
    },
}

const hue = (h: number) => `hsl(${h}, 90%, 55%)`

export function StackCard() {
    const [selected, setSelected] = useState<Project | null>(null)

    return (
        <>
            <div className="w-full" style={{ margin: '0 auto', maxWidth: 580, paddingBottom: 20 }}>
                {projects.map((project, i) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        i={i}
                        isLast={i === projects.length - 1}
                        onClick={() => setSelected(project)}
                    />
                ))}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selected && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={() => setSelected(null)}
                            style={{
                                position: 'fixed',
                                inset: 0,
                                background: 'rgba(0,0,0,0.85)',
                                backdropFilter: 'blur(12px)',
                                zIndex: 1000,
                                cursor: 'pointer',
                            }}
                        />

                        {/* Modal container - ensures perfect centering */}
                        <div
                            style={{
                                position: 'fixed',
                                inset: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 1001,
                                pointerEvents: 'none',
                                padding: '20px',
                            }}
                        >
                            <motion.div
                                key="modal"
                                initial={{ opacity: 0, scale: 0.88, y: 40 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                                transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
                                style={{
                                    pointerEvents: 'auto',
                                    width: 'min(90vw, 560px)',
                                    maxHeight: '85vh',
                                    overflowY: 'auto',
                                    borderRadius: 24,
                                    background: '#111',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    padding: '36px 36px 32px',
                                    boxShadow: `0 0 0 1px rgba(255,255,255,0.05), 0 40px 120px rgba(0,0,0,0.8), 0 0 80px ${hue(selected.hueA)}22`,
                                    position: 'relative',
                                }}
                            >
                                {/* Accent glow */}
                                <div style={{
                                    position: 'absolute', top: 0, right: 0,
                                    width: 200, height: 200,
                                    background: `radial-gradient(circle, ${hue(selected.hueA)}18 0%, transparent 70%)`,
                                    pointerEvents: 'none',
                                }} />

                                {/* Header */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                                    <div>
                                        <p style={{
                                            fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
                                            color: hue(selected.hueA), fontWeight: 600, marginBottom: 8,
                                        }}>
                                            {selected.category}
                                        </p>
                                        <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 800, color: '#f0f0f0', lineHeight: 1.15 }}>
                                            {selected.title}
                                        </h2>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                                        <span style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#555' }}>
                                            {selected.year}
                                        </span>
                                        <button
                                            onClick={() => setSelected(null)}
                                            style={{
                                                background: 'rgba(255,255,255,0.07)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: 99,
                                                color: '#888',
                                                fontSize: 12,
                                                padding: '4px 12px',
                                                cursor: 'pointer',
                                                letterSpacing: '0.05em',
                                            }}
                                        >
                                            close ✕
                                        </button>
                                    </div>
                                </div>

                                <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 24 }} />

                                {/* Problem block */}
                                {selected.problem && (
                                    <div style={{ marginBottom: 20 }}>
                                        <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#f87171', fontWeight: 600, marginBottom: 8 }}>
                                            Problem
                                        </p>
                                        <p style={{ fontSize: 14, lineHeight: 1.7, color: '#aaa' }}>{selected.problem}</p>
                                    </div>
                                )}

                                {/* Solution / About block */}
                                <div style={{ marginBottom: 24 }}>
                                    <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: hue(selected.hueA), fontWeight: 600, marginBottom: 8 }}>
                                        {selected.problem ? 'Solution' : 'About'}
                                    </p>
                                    <p style={{ fontSize: 14, lineHeight: 1.7, color: '#aaa' }}>{selected.solution || selected.description}</p>
                                </div>

                                {/* Tags */}
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: selected.link ? 24 : 0 }}>
                                    {selected.tags.map((tag) => (
                                        <span key={tag} style={{
                                            fontSize: 11, padding: '5px 12px', borderRadius: 99,
                                            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                                            color: '#888', fontWeight: 500, letterSpacing: '0.05em',
                                        }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Link */}
                                {selected.link && (
                                    <>
                                        <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 20 }} />
                                        <a
                                            href={selected.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: 8,
                                                fontSize: 13,
                                                fontWeight: 600,
                                                color: hue(selected.hueA),
                                                textDecoration: 'none',
                                                letterSpacing: '0.05em',
                                                padding: '10px 20px',
                                                borderRadius: 99,
                                                background: `${hue(selected.hueA)}15`,
                                                border: `1px solid ${hue(selected.hueA)}30`,
                                            }}
                                        >
                                            View Project →
                                        </a>
                                    </>
                                )}
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}

function ProjectCard({
    project,
    i,
    isLast,
    onClick,
}: {
    project: Project
    i: number
    isLast?: boolean
    onClick: () => void
}) {
    const background = `linear-gradient(306deg, ${hue(project.hueA)}, ${hue(project.hueB)})`

    return (
        <motion.div
            style={{
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                paddingTop: 20,
                marginBottom: isLast ? -80 : -140,
            }}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.3 }}
        >
            {/* Splash bg */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                background,
                clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
            }} />

            {/* Card */}
            <motion.div
                variants={cardVariants}
                onClick={onClick}
                whileHover={{ scale: 1.02, rotate: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{
                    width: 340,
                    minHeight: 360,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderRadius: 20,
                    background: '#111111',
                    border: '1px solid rgba(255,255,255,0.08)',
                    padding: '28px 28px 24px',
                    boxShadow: '0 0 1px hsl(0deg 0% 0% / 0.2), 0 4px 8px hsl(0deg 0% 0% / 0.3), 0 16px 48px hsl(0deg 0% 0% / 0.4)',
                    transformOrigin: '10% 60%',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                }}
            >
                {/* Accent gradient */}
                <div style={{
                    position: 'absolute', top: 0, right: 0,
                    width: 120, height: 120,
                    background: `radial-gradient(circle, ${hue(project.hueA)}22 0%, transparent 70%)`,
                    pointerEvents: 'none',
                }} />

                <div>
                    {/* Top row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                        <span style={{ fontSize: 42, fontWeight: 900, color: 'rgba(255,255,255,0.06)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
                            {project.id}
                        </span>
                        <span style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#555', fontWeight: 500, paddingTop: 6 }}>
                            {project.year}
                        </span>
                    </div>

                    <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: hue(project.hueA), fontWeight: 600, marginBottom: 8, opacity: 0.85 }}>
                        {project.category}
                    </p>

                    <h3 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.55rem)', fontWeight: 700, color: '#f0f0f0', marginBottom: 14, lineHeight: 1.25 }}>
                        {project.title}
                    </h3>

                    <p style={{ fontSize: 13, lineHeight: 1.65, color: '#777', marginBottom: 0 }}>
                        {project.description}
                    </p>
                </div>

                {/* Tags + tap hint */}
                <div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 20 }}>
                        {project.tags.map((tag) => (
                            <span key={tag} style={{
                                fontSize: 10, padding: '4px 10px', borderRadius: 99,
                                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                                color: '#888', fontWeight: 500, letterSpacing: '0.05em',
                            }}>
                                {tag}
                            </span>
                        ))}
                    </div>
                    <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', marginTop: 14, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        Tap to expand →
                    </p>
                </div>
            </motion.div>
        </motion.div>
    )
}
