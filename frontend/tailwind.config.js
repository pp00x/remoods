// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./public/index.html"
    ],
    theme: {
      extend: {
        animation: {
          'gradient-x': 'gradient-x 3s linear infinite',
          'starfall': 'starfall 3s linear infinite',
          'starfall-sparkle': 'starfall-sparkle 3s linear infinite',
          'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
          'float': 'float 6s ease-in-out infinite',
        },
        keyframes: {
          'gradient-x': {
            '0%, 100%': { transform: 'translateX(-50%)' },
            '50%': { transform: 'translateX(0%)' },
          },
          'starfall': {
            '0%': { transform: 'translateY(-10vh)', opacity: '0' },
            '50%': { opacity: '1' },
            '100%': { transform: 'translateY(110vh)', opacity: '0' },
          },
          'starfall-sparkle': {
            '0%': { transform: 'translateY(-10vh) rotate(0deg)', opacity: '0' },
            '50%': { opacity: '1', transform: 'translateY(50vh) rotate(180deg)' },
            '100%': { transform: 'translateY(110vh) rotate(360deg)', opacity: '0' },
          },
          'pulse-glow': {
            '0%, 100%': { opacity: '1' },
            '50%': { opacity: '0.5' },
          },
          'float': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          },
        },
        colors: {
          'synthwave': {
            primary: '#ff00ff',
            secondary: '#00ffff',
            dark: '#120458',
            light: '#f6f7f8',
          },
        },
        boxShadow: {
          'neon': '0 0 5px theme(colors.cyan.500), 0 0 20px theme(colors.cyan.500)',
          'neon-pink': '0 0 5px theme(colors.pink.500), 0 0 20px theme(colors.pink.500)',
          'neon-purple': '0 0 5px theme(colors.purple.500), 0 0 20px theme(colors.purple.500)',
        },
      },
    },
    plugins: [],
  }