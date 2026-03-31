import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

import { ThemeProvider } from '@/components/ThemeProvider'
import BottomNav from '@/components/BottomNav'

export const metadata: Metadata = {
    title: 'Shiva Kabalee — Cybersecurity Engineering',
    description: 'Portfolio of Shiva Kabaleeswaran — Cybersecurity Engineering student, full-stack developer, and hackathon competitor.',
    keywords: ['portfolio', 'cybersecurity', 'engineering', 'full-stack', 'blockchain'],
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
            <body className={`${GeistSans.className} antialiased bg-[#0a0a0a]`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                    <BottomNav />
                </ThemeProvider>
            </body>
        </html>
    )
}
