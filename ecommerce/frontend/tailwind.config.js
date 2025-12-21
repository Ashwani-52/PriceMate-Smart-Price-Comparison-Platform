/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#1e40af',
                    light: '#3b82f6',
                    dark: '#1e3a8a',
                },
                secondary: {
                    DEFAULT: '#10b981',
                    light: '#34d399',
                    dark: '#059669',
                },
                accent: {
                    DEFAULT: '#6366f1',
                    light: '#818cf8',
                    dark: '#4f46e5',
                },
            },
            fontFamily: {
                sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
                'card-hover': '0 12px 40px rgba(0, 0, 0, 0.15)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'slide-up': 'slideUp 0.6s ease-out',
                'fade-in': 'fadeIn 0.8s ease-out',
            },
        },
    },
    plugins: [],
}
