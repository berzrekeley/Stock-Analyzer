/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"Roboto Mono"', '"JetBrains Mono"', 'monospace'],
      },
      colors: {
        bg: {
          root: '#0B0E1A',
          sidebar: '#0D1117',
          surface: '#111827',
          elevated: '#1C2535',
          input: '#1A2233',
        },
        border: {
          DEFAULT: '#1E2A3A',
          subtle: '#141D2E',
          active: '#10B981',
        },
        text: {
          primary: '#F8FAFC',
          secondary: '#94A3B8',
          muted: '#64748B',
          active: '#10B981',
        },
        bullish: {
          DEFAULT: '#22C55E',
          bg: 'rgba(34,197,94,0.12)',
          border: 'rgba(34,197,94,0.30)',
        },
        bearish: {
          DEFAULT: '#EF4444',
          bg: 'rgba(239,68,68,0.12)',
          border: 'rgba(239,68,68,0.30)',
        },
        neutral: {
          DEFAULT: '#F59E0B',
          bg: 'rgba(245,158,11,0.12)',
          border: 'rgba(245,158,11,0.30)',
        },
        accent: {
          DEFAULT: '#10B981',
          hover: '#059669',
          muted: 'rgba(16,185,129,0.10)',
        },
        metric: {
          blue: '#3B82F6',
          cyan: '#06B6D4',
          purple: '#8B5CF6',
          orange: '#F97316',
        },
      },
    },
  },
  plugins: [],
}
