/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Lora', 'serif'],
        display: ['Playfair Display', 'serif'],
        sans: ['Libre Franklin', 'sans-serif'],
        script: ['Reenie Beanie', 'cursive'],
      },
    },
  },
  plugins: [],
}
