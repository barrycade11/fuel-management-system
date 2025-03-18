/** @type {import('tailwindcss').Config} */
const { heroui } = require("@heroui/react");

export default {
    content: [
        "./app/root.tsx",
        "./app/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {},
    },
    plugins: [heroui()],
}

