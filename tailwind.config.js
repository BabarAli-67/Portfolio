/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Deep-space surfaces
        base: '#05060B',
        surface: '#0B0E17',
        card: '#0E1320',
        elevated: '#131A2A',
        border: 'rgba(148, 163, 209, 0.12)',
        // Foreground
        ink: '#E7EDF7',
        muted: '#8593AC',
        faint: '#5A6883',
        // Neon accents
        neon: {
          cyan: '#22D3EE',
          blue: '#3B82F6',
          violet: '#A855F7',
          emerald: '#34D399',
          pink: '#F472B6',
        },
      },
      fontFamily: {
        display: ['Syne', 'Space Grotesk', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(34, 211, 238, 0.35)',
        'glow-violet': '0 0 40px -8px rgba(168, 85, 247, 0.4)',
        'glow-soft': '0 0 60px -20px rgba(34, 211, 238, 0.25)',
      },
      backgroundImage: {
        'grid-lines':
          'linear-gradient(rgba(148,163,209,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,209,0.06) 1px, transparent 1px)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-reverse 40s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2.4s cubic-bezier(0.4,0,0.6,1) infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
        blink: 'blink 1s step-end infinite',
      },
    },
  },
  plugins: [],
}
