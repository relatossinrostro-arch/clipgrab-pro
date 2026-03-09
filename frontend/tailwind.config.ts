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
                    primary: "#060816",
                    secondary: "#0B1220",
                },
                primary: "#3B82F6",
                secondary: "#8B5CF6",
                accent: "#22C55E",
                text: {
                    primary: "#F8FAFC",
                    secondary: "#94A3B8",
                },
                card: {
                    bg: "rgba(255, 255, 255, 0.06)",
                    border: "rgba(255, 255, 255, 0.10)",
                },
            },
            backgroundImage: {
                "main-gradient": "linear-gradient(135deg, #3B82F6, #8B5CF6)",
            },
            borderRadius: {
                "20px": "20px",
            },
        },
    },
    plugins: [],
};
