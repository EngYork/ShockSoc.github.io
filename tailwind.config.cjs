const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,json}"],
  theme: {
    extend: {
      colors: {
        uni: {
          blue: "#0095d6",
          green: "#65b32e",
          yellow: "#fbb800",
        },
      },
      screens: {
        "2xl": "1540px",
        "3xl": "1666px",
      },
    },
  },
  plugins: [],
};
