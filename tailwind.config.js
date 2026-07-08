/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
    theme: {
      extend: {
        colors: {
          electric: '#C6FF00',
          'electric-foreground': '#0F1115',
          safety: '#FF5200',
          'safety-foreground': '#ffffff',
        },
      },
    },
    plugins: [],
  }