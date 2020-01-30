const tailwindcss = require('tailwindcss');
const purgecssConfig = require('./purgecss.config');

require('dotenv').config();

const purgecss = require('@fullhuman/postcss-purgecss')(purgecssConfig)

module.exports = {
    plugins: [
        tailwindcss('./tailwind.js'),
        require('autoprefixer'),
        ...process.env.REACT_APP_NODE_ENV === 'production'
    ? [purgecss]
    : []
    ],
};