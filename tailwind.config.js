/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'os-main': '#FFFFFF',
        'os-secondary': '#E0E0E0',
        'os-window': '#FFFFFF',
        'os-border': '#111111',
        // Fallback to prevent crash while transitioning
        'os-bg-yellow': '#FFFFFF', 
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        'brutal-sm': '4px 4px 0px 0px #111111',
        'brutal-md': '6px 6px 0px 0px #111111',
        'brutal-lg': '8px 8px 0px 0px #111111',
        'brutal-active': '2px 2px 0px 0px #111111',
      },
      borderWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [],
}
