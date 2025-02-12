// tailwind.config.js
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Include all your React files
    "./node_modules/flowbite/**/*.js",
    flowbite.content(),
    // Enable Flowbite components
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbite.plugin()],
};
