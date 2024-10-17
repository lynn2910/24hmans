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
            dark: "#1A1818",
            red: colors.red
        },
        extend: {
            boxShadow: {
                'red-700': '0px 0px 15px #D4002A',
                'blue-700': '0px 0px 15px #07327F',
                'green-700': '0px 0px 15px #2E7359',
            },
        },
    },
    variants: {},
    plugins: [],
}