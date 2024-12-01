/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        footer: '#ff573a',
        background: '#9a9a9a',
        primary: '#ffffff',
        secondary: '#1f1f1f',
        input: '#363636',
        'arrow-badge': '#0b88f0',
      },
      backgroundColor: {
        background: '#9a9a9a',
        primary: '#ffffff',
        secondary: '#1f1f1f',
        input: '#363636',
        'arrow-badge': '#0b88f0',
        footer: '#ff573a',
      },
      textColor: {
        primary: '#FFFFFF',
        secondary: '#1f1f1f',
      },
    },
  },
  plugins: [],
}
