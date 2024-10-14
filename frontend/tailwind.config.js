/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";

module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: 'media',
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            black: colors.black,
            white: colors.white,
            gray: colors.gray,
            emerald: colors.emerald,
            indigo: colors.indigo,
            yellow: colors.yellow,
            dark: "#1A1818"
        }
    },
    variants: {},
    plugins: [],
}