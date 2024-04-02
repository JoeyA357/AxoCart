const colors = require('tailwindcss/colors');

module.exports = {
    content: [
        './src/**/*.{html,js,jsx}'
    ],
    theme: {
        extend: {
            colors: {
                primary: colors.indigo,
                secondary: colors.gray,
                // Add your custom colors here
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                // Add your custom fonts here
            },
            // Add more theme customizations as needed
        },
    },
    plugins: [],
};