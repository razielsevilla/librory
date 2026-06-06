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
        'paper-deep': 'var(--paper-deep)',
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        muted: 'var(--muted)',
        rule: 'var(--rule)',
        'rule-soft': 'var(--rule-soft)',
        accent: 'var(--accent)',
        'accent-soft': 'var(--accent-soft)',
        ember: 'var(--ember)',
        glow: 'var(--glow)',
        seal: 'var(--seal-mix)',
      },
      fontFamily: {
        serif: ['Lora', 'serif'],
        display: ['Playfair Display', 'serif'],
        sans: ['Libre Franklin', 'sans-serif'],
        script: ['Reenie Beanie', 'cursive'],
      },
      fontSize: {
        eyebrow: ['0.7rem', { lineHeight: '1.3', letterSpacing: '0.18em' }],
        caption: ['0.78rem', { lineHeight: '1.45' }],
        body: ['1.0625rem', { lineHeight: '1.78' }],
        dek: ['1.32rem', { lineHeight: '1.55' }],
        h3: ['1.85rem', { lineHeight: '1.2' }],
        h2: ['3rem', { lineHeight: '1.04', letterSpacing: '-0.01em' }],
        'h2-lg': ['4.25rem', { lineHeight: '1.0', letterSpacing: '-0.015em' }],
        h1: ['5.25rem', { lineHeight: '0.96', letterSpacing: '-0.02em' }],
        'h1-xl': ['7.5rem', { lineHeight: '0.92', letterSpacing: '-0.025em' }],
      },
      maxWidth: {
        page: '74rem',
        measure: '34rem',
        colophon: '18rem',
      },
      boxShadow: {
        'glow': '0 10px 24px var(--glow)',
        'glow-lg': '0 16px 34px var(--glow)',
        'seal': '0 1px 0 rgba(255,255,255,0.6) inset, 0 1px 2px rgba(42,31,20,0.04), 0 12px 32px -18px var(--seal-mix)',
        'seal-dark': '0 1px 0 rgba(255,255,255,0.04) inset, 0 1px 2px rgba(0,0,0,0.4), 0 16px 40px -20px var(--seal-mix)',
      },
      keyframes: {
        emberBreathe: {
          '50%': {
            transform: 'scale(1.06)',
            filter: 'drop-shadow(0 0 35px rgba(230, 145, 82, 0.55))',
          },
        },
      },
      animation: {
        'ember-breathe': 'emberBreathe 2s infinite ease-in-out',
      },
    },
  },
  plugins: [],
}
