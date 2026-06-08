import landingConfig from '../librory-landing/tailwind.config.js';

/** @type {import('tailwindcss').Config} */
export default {
  ...landingConfig,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    ...landingConfig.theme,
    extend: {
      ...landingConfig.theme?.extend,
      fontSize: {
        ...landingConfig.theme?.extend?.fontSize,
        'mobile-h1': '2.25rem',
        'mobile-h2': '1.75rem',
      },
    },
  },
}
