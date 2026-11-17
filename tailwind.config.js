/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#14243A',
          blue: '#3478E5',
          'blue-light': '#EAF2FF',
          teal: '#13B8A6',
          bg: '#F3F6FB',
          text: '#17243A',
          'text-secondary': '#74839A',
          border: '#E2E8F0',
        },
        status: {
          stable: '#16A36A',
          'stable-bg': '#E6F7EF',
          warning: '#EFA72F',
          'warning-bg': '#FFF4DF',
          critical: '#E5485D',
          'critical-bg': '#FDEBED',
          offline: '#8A96A8',
          'offline-bg': '#EEF1F5',
          info: '#3478E5',
          'info-bg': '#EAF2FF',
        },
        dark: {
          bg: '#0B132B',
          card: '#162238',
          elevated: '#1E2E4A',
          border: '#243552',
          text: '#F1F5F9',
          'text-secondary': '#94A3B8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'card': '0 2px 8px -2px rgba(20, 36, 58, 0.06), 0 1px 4px -1px rgba(20, 36, 58, 0.04)',
        'card-hover': '0 8px 24px -4px rgba(20, 36, 58, 0.12), 0 4px 8px -2px rgba(20, 36, 58, 0.06)',
        'drawer': '-8px 0 32px 0 rgba(11, 19, 43, 0.18)',
      }
    },
  },
  plugins: [],
}
