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
        background: '#1f1f1f',
        primary: '#ffffff',
        secondary: '#1f1f1f',
        input: '#363636',
        blue: '#0b88f0',
        green: '#008849',
        yellow: '#ffb800',
      },
      backgroundColor: (theme) => theme('colors'),
      textColor: (theme) => theme('colors'),
    },
  },
  plugins: [],
}
