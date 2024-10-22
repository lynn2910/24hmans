/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";

module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: 'media',
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            dark: "#1A1818",
            ...colors
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