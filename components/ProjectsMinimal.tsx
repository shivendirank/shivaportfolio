'use client'

import { useState } from 'react'
import { RulerCarousel, type CarouselItem } from '@/components/ui/ruler-carousel'
import { ExpandableCard } from '@/components/ui/expandable-card'
import { motion } from 'framer-motion'

interface Project {
    id: string
    title: string
    category: string
    description: string
    tags: string[]
    year: string
    image: string
    problem?: string
    solution?: string
    github?: string
    demo?: string
    displayType?: 'internship' | 'project-only' | 'solution-only' | 'full'
}

const projects: Project[] = [
    {
        id: '01',
        title: 'MAAT',
        category: 'ETH Denver 2026 · AI Infrastructure',
        description: 'Sovereign AI Infrastructure',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop',
        problem: 'AI agents lack persistent identity and financial autonomy, making them unreliable for long-term autonomous tasks.',
        solution: 'Built a 4-layer sovereign infrastructure using iNFTs for identity and TEEs for verifiable privacy, enabling agents to operate as self-sovereign entities.',
        tags: ['iNFTs', 'TEE', 'FHE', 'Web3'],
        year: '2026',
        demo: 'https://denverhackss.vercel.app/',
        displayType: 'full'
    },
    {
        id: '02',
        title: 'CONFESSION SLICE',
        category: 'ETH Denver 2026 · Social / Monad',
        description: 'Anonymous Web3 Social',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&h=800&fit=crop',
        solution: 'Anonymous confession app on Monad where interactions earn Pizza Tokens redeemable for real pizza. High-speed, low-cost on-chain social mapping.',
        tags: ['Monad', 'Solidity', 'ERC-20'],
        year: '2026',
        github: 'https://github.com/shivendirank/Monad-Blitz-Hackathon',
        demo: 'https://kubisigma1.vercel.app/',
        displayType: 'solution-only'
    },
    {
        id: '03',
        title: 'FLIGHT CHAIN',
        category: 'ETH Denver 2026 · XRP / Aviation',
        description: 'On-Chain Black Box',
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?w=1200&h=800&fit=crop',
        problem: 'Aviation black boxes are fragile and hard to recover physically in real-time.',
        solution: 'Replaced traditional black boxes with a living on-chain telemetry system on XRP Ledger, locking data to IPFS for instant tamper-proof access.',
        tags: ['XRP Ledger', 'IPFS', 'Dynamic NFT'],
        year: '2026',
        github: 'https://github.com/shivendirank/FlightChain-EthDenver-2026',
        displayType: 'full'
    },
    {
        id: '04',
        title: 'BLOCKCHAIN B-BALL',
        category: 'Web3 Marketplace',
        description: 'NFT Trading Marketplace',
        image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&h=800&fit=crop',
        solution: 'Full-stack marketplace for basketball NFTs. Features 3 Solidity smart contracts with offer negotiation and stats-based card battles.',
        tags: ['React', 'Solidity', 'Hardhat'],
        year: '2025',
        displayType: 'solution-only'
    },
    {
        id: '05',
        title: 'ATLAS MEDICAL',
        category: 'Healthcare Infrastructure',
        description: 'HIPAA Compliant Supply Network',
        image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=1200&h=800&fit=crop',
        solution: 'Microservices architecture for medical supply chains. Node.js/TypeScript backend with Redis queues and Docker containerization.',
        tags: ['Node.js', 'TypeScript', 'Redis', 'Docker'],
        year: '2025',
        github: 'https://github.com/shivendirank/MBC-Hackathon-Project',
        displayType: 'solution-only'
    },
    {
        id: '06',
        title: 'FORTISENSE',
        category: 'Cybersecurity Compliance',
        description: 'SOC 2 / ISO 27001 Audit',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=800&fit=crop',
        solution: 'Reduced SaaS compliance timelines by 6 weeks through automated gap analysis and prioritized remediation roadmaps for SOC 2 Type II.',
        tags: ['SOC 2', 'ISO 27001', 'Risk Analysis'],
        year: '2025',
        displayType: 'internship'
    },
    {
        id: '07',
        title: 'FOCUS LABS',
        category: 'Security Backend',
        description: 'OAuth 2.0 / SSO System',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=800&fit=crop',
        solution: 'Designed and implemented enterprise SSO for 10,000+ users using OAuth 2.0. Caught 30+ production vulnerabilities through automated API testing.',
        tags: ['OAuth 2.0', 'API Testing', 'TypeScript'],
        year: '2025',
        displayType: 'internship'
    },
    {
        id: '08',
        title: 'PW STRENGTH',
        category: 'Security Tool',
        description: 'Entropy & Breach Analysis',
        image: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?w=1200&h=800&fit=crop',
        solution: 'built a breach detection tool using "Have I Been Pwned" API. Implemented entropy math for academic password security evaluation.',
        tags: ['Python', 'Cryptography', 'API'],
        year: '2024',
        displayType: 'project-only'
    }
]

export default function ProjectsMinimal() {
    const itemsPerSet = projects.length
    // Infinite index starts in the middle set
    const [activeIndex, setActiveIndex] = useState(itemsPerSet + 4)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const carouselItems: CarouselItem[] = projects.map(p => ({
        id: p.id,
        title: p.title
    }))

    const selectedProjectIndex = activeIndex % itemsPerSet
    const selectedProject = projects[selectedProjectIndex]

    return (
        <section id="work" className="relative min-h-screen flex flex-col items-center justify-center bg-transparent pt-32 pb-64 overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C8FF00]/10 blur-[128px] rounded-full" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#C8FF00]/5 blur-[128px] rounded-full" />
            </div>

            <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-16 relative"
                >
                    <div className="absolute left-1/2 -top-24 -translate-x-1/2 select-none pointer-events-none w-screen overflow-hidden">
                        <motion.div
                            animate={{ x: [0, -1000] }}
                            transition={{
                                repeat: Infinity,
                                duration: 30,
                                ease: "linear"
                            }}
                            className="flex whitespace-nowrap gap-x-24"
                        >
                            {[...Array(6)].map((_, i) => (
                                <span key={i} className="text-[12rem] md:text-[16rem] font-black text-white/[0.03] uppercase leading-none tracking-tighter block">
                                    Projects
                                </span>
                            ))}
                        </motion.div>
                    </div>

                    <h2 className="relative z-10 text-[#C8FF00] font-mono text-xs tracking-[0.4em] uppercase mb-4">
                        Selected Works / 2025-2026
                    </h2>
                    <p className="relative z-10 text-white/40 text-sm max-w-sm mx-auto uppercase tracking-tighter">
                        Scroll or use arrows to navigate. Click the title to explore infrastructure and code.
                    </p>
                </motion.div>

                <RulerCarousel
                    originalItems={carouselItems}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    onExpand={() => setIsModalOpen(true)}
                />

                {/* Expand Trigger */}
                <motion.button
                    onClick={() => setIsModalOpen(true)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-8 px-10 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full hover:bg-[#C8FF00] transition-colors"
                >
                    Expand Details →
                </motion.button>
            </div>

            <ExpandableCard
                active={isModalOpen}
                setActive={setIsModalOpen}
                title={selectedProject.title}
                description={selectedProject.category}
                src={selectedProject.image}
            >
                {selectedProject.displayType === 'internship' ? (
                    <div>
                        <h4 className="text-[#C8FF00] font-mono text-sm tracking-widest uppercase mb-4">Internship</h4>
                        <p>{selectedProject.solution}</p>
                    </div>
                ) : selectedProject.displayType === 'project-only' ? (
                    <div>
                        <h4 className="text-[#C8FF00] font-mono text-sm tracking-widest uppercase mb-4">Project Details</h4>
                        <p>{selectedProject.solution}</p>
                    </div>
                ) : selectedProject.displayType === 'solution-only' ? (
                    <div>
                        <h4 className="text-[#C8FF00] font-mono text-sm tracking-widest uppercase mb-4">The Solution</h4>
                        <p>{selectedProject.solution}</p>
                    </div>
                ) : (
                    <>
                        <div>
                            <h4 className="text-[#C8FF00] font-mono text-sm tracking-widest uppercase mb-4">The Challenge</h4>
                            <p>{selectedProject.problem}</p>
                        </div>
                        <div>
                            <h4 className="text-[#C8FF00] font-mono text-sm tracking-widest uppercase mb-4">The Solution</h4>
                            <p>{selectedProject.solution}</p>
                        </div>
                    </>
                )}

                <div className="pt-8 flex flex-wrap gap-3">
                    {selectedProject.tags.map(tag => (
                        <span key={tag} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/60">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="pt-12 flex flex-wrap gap-4">
                    {selectedProject.github && (
                        <a
                            href={selectedProject.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-8 py-4 bg-white/10 text-white font-bold uppercase text-xs tracking-widest rounded-full hover:bg-white/20 transition-colors border border-white/10"
                        >
                            View Source →
                        </a>
                    )}
                    {selectedProject.demo && (
                        <a
                            href={selectedProject.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-8 py-4 bg-[#C8FF00] text-black font-bold uppercase text-xs tracking-widest rounded-full hover:bg-white transition-colors"
                        >
                            Live Demo →
                        </a>
                    )}
                </div>
            </ExpandableCard>
        </section>
    )
}
