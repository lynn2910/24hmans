/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";

module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: 'media',
    theme: {
        extend: {
            colors: {
                current: 'currentColor',
                dark: "#1A1818",
            },
            boxShadow: {
                'red-700': '0px 0px 15px #D4002A',
                'blue-700': '0px 0px 15px #07327F',
                'green-700': '0px 0px 15px #2E7359',
            },
            dropShadow: {
                'all-white-700': '0px 0px 10px #FFFFFF',
                'all-red-700': '0px 0px 10px #D4002A',
            },
            backgroundImage: {
                login: 'url("@/assets/images/login.jpg")',
            }
        },
    },
    variants: {},
    plugins: [],
}