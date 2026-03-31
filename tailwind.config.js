/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
            },
            colors: {
                background: '#0a0a0a',
                surface: '#141414',
                accent: '#C8FF00',
                muted: '#888888',
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
}
