/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'karda-void': '#FFFFFF',
                'karda-mud': '#F5F5F7',
                'karda-silver': '#111111',
            },
            fontFamily: {
                sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
            },
            animation: {
                'glow-pulse': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            backgroundImage: {
                'glow-radial': 'radial-gradient(circle, rgba(0,0,0,0.05) 0%, rgba(255,255,255,0) 70%)',
            }
        },
    },
    plugins: [],
}
