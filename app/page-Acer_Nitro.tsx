'use client'

import Navbar from '@/components/Navbar'
import ScrollyCanvas from '@/components/ScrollyCanvas'
import Overlay from '@/components/Overlay'
import ProjectsMinimal from '@/components/ProjectsMinimal'
import Currently from '@/components/Currently'
import Footer from '@/components/Footer'

export default function Home() {
    return (
        <main className="relative">
            {/* Fixed background canvas driven by scroll */}
            <ScrollyCanvas />

            {/* Navbar */}
            <Navbar />

            {/* Hero section — 800vh tall to drive the frame sequence */}
            <section style={{ height: '800vh', position: 'relative' }}>
                <Overlay />
            </section>

            {/* Content sections */}
            <div className="relative z-10 bg-[#0a0a0a]">
                <ProjectsMinimal />
                <Currently />
                <Footer />
            </div>
        </main>
    )
}
