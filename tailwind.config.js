/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'karda-void': '#050505',
                'karda-mud': '#1a1a1a',
                'karda-silver': '#E5E4E2',
            },
            fontFamily: {
                sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
            },
            animation: {
                'glow-pulse': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            backgroundImage: {
                'glow-radial': 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(5,5,5,0) 70%)',
            }
        },
    },
    plugins: [],
}
