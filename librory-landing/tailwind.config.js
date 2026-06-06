/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        page: 'var(--page)',
        paper: 'var(--paper)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        accent: 'var(--accent)',
        'accent-soft': 'var(--accent-soft)',
        glow: 'var(--glow)',
      },
      fontFamily: {
        serif: ['Lora', 'serif'],
        display: ['Playfair Display', 'serif'],
        sans: ['Libre Franklin', 'sans-serif'],
        script: ['Reenie Beanie', 'cursive'],
      },
      boxShadow: {
        'glow': '0 10px 24px var(--glow)',
        'glow-lg': '0 16px 34px var(--glow)',
      }
    },
  },
  plugins: [],
}
