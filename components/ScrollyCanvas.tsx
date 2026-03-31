'use client'

import { useEffect, useRef } from 'react'

const TOTAL_FRAMES = 120

const FRAME_URL = (i: number) => {
    const padded = String(i).padStart(3, '0')
    return `/sequence/frame_${padded}_delay-0.066s.png`
}

function drawCover(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    cw: number,
    ch: number
) {
    const imgR = img.naturalWidth / img.naturalHeight
    const cvR = cw / ch
    let dw: number, dh: number, dx: number, dy: number
    if (imgR > cvR) {
        dh = ch; dw = ch * imgR; dx = (cw - dw) / 2; dy = 0
    } else {
        dw = cw; dh = cw / imgR; dx = 0; dy = (ch - dh) / 2
    }
    ctx.drawImage(img, dx, dy, dw, dh)
}

export default function ScrollyCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const imagesRef = useRef<HTMLImageElement[]>([])
    const currentFrameRef = useRef(0)
    const rafRef = useRef<number | null>(null)

    const drawFrame = (index: number) => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        const img = imagesRef.current[Math.round(index)]
        if (!img?.complete || img.naturalWidth === 0) return
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawCover(ctx, img, canvas.width, canvas.height)
    }

    // Preload all frames
    useEffect(() => {
        const images: HTMLImageElement[] = []
        imagesRef.current = images

        for (let i = 0; i < TOTAL_FRAMES; i++) {
            const img = new window.Image()
            img.src = FRAME_URL(i)
            img.onload = () => {
                if (i === currentFrameRef.current) drawFrame(i)
                if (i === 0) drawFrame(0)
            }
            images.push(img)
        }
        return () => { images.forEach(img => { img.onload = null }) }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Canvas resize handler
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            drawFrame(currentFrameRef.current)
        }
        resize()
        window.addEventListener('resize', resize)
        return () => window.removeEventListener('resize', resize)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Drive animation from scroll progress of the nearest scrolling ancestor
    // The canvas is inside an 800vh div; progress = scrollY / (800vh - 100vh)
    useEffect(() => {
        const onScroll = () => {
            const scrollableVH = 800 - 100   // 700vh of actual scrolling range
            const maxScroll = scrollableVH * window.innerHeight / 100
            const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1)

            const next = Math.min(
                Math.max(Math.round(progress * (TOTAL_FRAMES - 1)), 0),
                TOTAL_FRAMES - 1
            )
            if (next === currentFrameRef.current) return
            currentFrameRef.current = next

            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
            rafRef.current = requestAnimationFrame(() => drawFrame(next))
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()  // Set initial frame immediately
        return () => window.removeEventListener('scroll', onScroll)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // This component renders NOTHING — it only drives the canvas.
    // The parent (page.tsx) places this inside the 800vh div.
    // The sticky canvas is rendered via a portal to body.
    // Actually we render a fixed canvas here for simplicity.
    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0,
                background: '#0a0a0a',
                pointerEvents: 'none',
            }}
        />
    )
}
