import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
const config = {
    content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {},
    },
    plugins: [
        forms
    ],
};

export default config;