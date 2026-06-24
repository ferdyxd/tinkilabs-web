import type { Config } from 'tailwindcss';

// ⚠️ Los valores aquí deben coincidir con lib/theme.ts (paleta "tinkilabs").
// Fuente canónica: Brand Guide - Tinkilabs.pdf (Lyana v2, 42pp).
// Para cambiar de paleta, editar ambos ficheros o usar CSS vars (data-theme).

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/theme.ts',
  ],
  theme: {
    extend: {
      colors: {
        tinki: {
          // Paleta oficial — Brand Guide Lyana v2 (2026-06-23)
          orange: '#FF6B35',
          'orange-light': '#FF8C5A',
          'orange-dark': '#E55A2B',
          green: '#2ECC71',
          'green-light': '#58D68D',
          'green-dark': '#27AE60',
          brown: '#4B260E',
          'brown-light': '#6B3820',
          white: '#EDF8FB',
          wood: '#BF946C',
          'wood-light': '#D4B896',
          // ─── Backward compat (deprecated, migrar a nombres nuevos) ───
          dark: '#4B260E',   // → tinki-brown
          light: '#EDF8FB',  // → tinki-white
        },
      },
      fontFamily: {
        sans: ['var(--font-exo2)', 'sans-serif'],
        display: ['var(--font-gugi)', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        sm: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'counter': 'counter 2s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
