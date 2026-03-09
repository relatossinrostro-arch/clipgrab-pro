/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: {
                    primary: "#0f172a",
                    secondary: "#1e293b",
                },
                card: {
                    bg: "rgba(30, 41, 59, 0.7)",
                    border: "rgba(255, 255, 255, 0.1)",
                },
                primary: "#6366f1",
                accent: "#6366f1",
                "accent-hover": "#4f46e5",
                text: {
                    primary: "#ffffff",
                    secondary: "#94a3b8",
                }
            },
            backgroundImage: {
                "main-gradient": "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                "glow-gradient": "radial-gradient(circle at center, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
            },
            borderRadius: {
                "xl-premium": "24px",
            },
            animation: {
                "glow-pulse": "glow-pulse 4s ease-in-out infinite",
            },
            keyframes: {
                "glow-pulse": {
                    "0%, 100%": { opacity: 0.3 },
                    "50%": { opacity: 0.6 },
                }
            }
        },
    },
    plugins: [],
};
