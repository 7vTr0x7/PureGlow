/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', "serif"],
      },
       backgroundImage: {
        'custom-gradient': `linear-gradient(to top left, gold, white), linear-gradient(to bottom right, lightgoldenrodyellow, gold)`,
      },
    },
  },
  plugins: [],
};
