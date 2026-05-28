import type { Config } from 'tailwindcss';

// ⚠️ Los valores aquí deben coincidir con lib/theme.ts (paleta "tinkilabs").
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
          orange: '#FF6B35',
          dark: '#08080F',
          light: '#FAFAFA',
          'orange-light': '#FF8C5A',
          'orange-dark': '#E55A2B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Geist Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Geist Sans', 'Inter', 'system-ui', 'sans-serif'],
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
