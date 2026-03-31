import { motion } from 'framer-motion'

const HoverLink = ({ text, imageSrc }: { text: string; imageSrc: string }) => {
    return (
        <span className="relative group inline-block cursor-help font-semibold text-white underline decoration-[#C8FF00]/40 hover:decoration-[#C8FF00] underline-offset-4 decoration-2 transition-colors">
            {text}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 hidden group-hover:block z-50 animate-in fade-in slide-in-from-bottom-2 duration-200 pointer-events-none w-48 shadow-2xl rounded-xl border border-white/10 overflow-hidden bg-black/80 backdrop-blur-sm">
                <img src={imageSrc} alt={text} className="w-full h-auto object-cover aspect-[3/4]" />
            </div>
        </span>
    );
};

export default function About() {
    return (
        <section className="relative py-32 px-6 md:px-12 lg:px-20" id="about">
            <div className="w-full h-px mb-20" style={{ background: 'rgba(255,255,255,0.06)' }} />

            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="mb-24"
                >
                    <p className="text-xs tracking-[0.3em] uppercase mb-4 font-medium" style={{ color: '#C8FF00' }}>
                        Background
                    </p>
                    <div className="text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed text-neutral-300 space-y-8 mb-8">
                        <p>
                            I'm a cybersecurity engineering student at the <span className="text-white">University of Kansas</span> with a minor in Data Science. I specialize in building infrastructure and full-stack applications while focusing on cybersecurity. My work focuses on the intersection of data engineering, cloud infrastructure, and developer experience.
                        </p>
                        <p>
                            I believe in writing simple, maintainable code and building systems that are reliable and secure.
                        </p>
                        <p>
                            When I'm not coding, you'll find me watching my <HoverLink text="favorite shows" imageSrc="/images/suits.png" />, playing <HoverLink text="basketball/football" imageSrc="/images/lebron.png" />, competing in hackathons, or watching the <HoverLink text="latest movies" imageSrc="/images/dhurandhar2.png" />.
                        </p>
                    </div>
                </motion.div>

                {/* Experience */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="mb-20"
                >
                    <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">Experience</h3>
                    
                    <div className="space-y-12">
                        {/* Job 1 */}
                        <div className="group">
                            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                                <h4 className="text-xl font-bold text-white">Cybersecurity & Compliance Intern</h4>
                                <span className="text-sm font-medium" style={{ color: '#C8FF00' }}>Fortisense Consulting</span>
                            </div>
                            <p className="text-neutral-400 text-sm leading-relaxed">
                                Engaged SaaS companies in cybersecurity solutions through consultative selling; translated complex technical compliance requirements (SOC 2, ISO 27001) into accessible business value for decision makers. Conducted comprehensive gap analyses for SOC 2 Type II compliance, developing prioritized remediation roadmaps that reduced average client compliance timelines by 6 weeks.
                            </p>
                        </div>

                        {/* Job 2 */}
                        <div className="group">
                            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                                <h4 className="text-xl font-bold text-white">Security & Development Intern</h4>
                                <span className="text-sm font-medium" style={{ color: '#C8FF00' }}>Focus Research Labs</span>
                            </div>
                            <p className="text-neutral-400 text-sm leading-relaxed">
                                Collaborated with an offshore team to design secure enterprise applications serving 10,000+ users. Implemented Single Sign-On (SSO) using Apple ID API and OAuth 2.0 authentication protocols. Developed API test suites with 30+ test cases; identified vulnerabilities through security testing and created detailed technical documentation enabling knowledge transfer across teams.
                            </p>
                        </div>

                        {/* Job 3 */}
                        <div className="group">
                            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                                <h4 className="text-xl font-bold text-white">Mathematics Tutor & Entrepreneur</h4>
                                <span className="text-sm font-medium" style={{ color: '#C8FF00' }}>Math Nerds Tutoring</span>
                            </div>
                            <p className="text-neutral-400 text-sm leading-relaxed">
                                Provided personalized one-on-one tutoring to students in grades 5-10; built tutoring practice through self-marketing and client referrals while maintaining detailed progress tracking and parent communication.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Leadership & Activities */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-20"
                >
                    <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">Leadership & Activities</h3>
                    
                    <div className="space-y-12">
                        <div className="group">
                            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                                <h4 className="text-xl font-bold text-white">Chair, Facilities & Technology Subcommittee</h4>
                                <span className="text-sm font-medium" style={{ color: '#C8FF00' }}>Student Experience Engineering Council</span>
                            </div>
                            <p className="text-neutral-400 text-sm leading-relaxed">
                                Appointed to lead cross-functional subcommittee evaluating engineering infrastructure. Present quarterly reports directly to senior administrators synthesizing feedback from 200+ engineering students.
                            </p>
                        </div>

                        <div className="group">
                            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                                <h4 className="text-xl font-bold text-white">Multi-Track Hackathon Competitor</h4>
                                <span className="text-sm font-medium" style={{ color: '#C8FF00' }}>ETH Denver 2026 BUIDLathon</span>
                            </div>
                            <p className="text-neutral-400 text-sm leading-relaxed">
                                Earned 2nd Place in the Blockade Labs bounty track by building a decentralized AI-powered 3D world generation API and was named Finalist for Best Use of Kite AI API. Also awarded 2nd Place at the Monad Blitz side hackathon.
                            </p>
                        </div>
                        
                        <div className="group">
                            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                                <h4 className="text-xl font-bold text-white">Cohort Member & Hackathon Competitor</h4>
                                <span className="text-sm font-medium" style={{ color: '#C8FF00' }}>KU Blockchain Cohort</span>
                            </div>
                            <p className="text-neutral-400 text-sm leading-relaxed">
                                Selected for intensive blockchain technology program. Competed in regional hackathons developing innovative decentralized solutions for supply chain transparency, identity verification, and DeFi applications.
                            </p>
                        </div>
                    </div>
                </motion.div>
                
                {/* Education */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">Education</h3>
                    
                    <div className="group">
                        <h4 className="text-xl font-bold text-white mb-2">University of Kansas</h4>
                        <p className="text-neutral-400 text-sm leading-relaxed">
                            B.S. Cybersecurity Engineering (Class of 2029)
                        </p>
                    </div>
                </motion.div>

            </div>
        </section>
    )
}
