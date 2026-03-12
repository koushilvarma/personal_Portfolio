/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'os-bg-yellow': 'var(--os-bg-yellow)',
        'os-bg-white': 'var(--os-bg-white)',
        'os-window': 'var(--os-window)',
        'os-border': 'var(--os-border)',
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
