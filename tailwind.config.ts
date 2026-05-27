import type { Config } from 'tailwindcss';
import { palette, typography, shapes, motion } from './lib/theme';

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
          orange: palette.primary,
          dark: palette.backgroundAlt,
          light: palette.background,
          'orange-light': palette.primaryLight,
          'orange-dark': palette.primaryDark,
        },
        brand: {
          primary: palette.primary,
          'primary-light': palette.primaryLight,
          'primary-dark': palette.primaryDark,
          bg: palette.background,
          'bg-alt': palette.backgroundAlt,
          surface: palette.surface,
          text: palette.text,
          'text-muted': palette.textMuted,
          border: palette.border,
          success: palette.success,
          error: palette.error,
        },
      },
      fontFamily: {
        sans: typography.fontSans,
        mono: typography.fontMono,
        display: typography.fontDisplay,
      },
      fontWeight: typography.weights,
      fontSize: typography.scale,
      borderRadius: {
        sm: shapes.radius.sm,
        md: shapes.radius.md,
        lg: shapes.radius.lg,
        xl: shapes.radius.xl,
        full: shapes.radius.full,
      },
      boxShadow: {
        'brand-sm': shapes.shadows.sm,
        'brand-md': shapes.shadows.md,
        'brand-lg': shapes.shadows.lg,
        'brand-glow': shapes.shadows.glow(palette.primary),
      },
      transitionDuration: {
        fast: motion.duration.fast,
        normal: motion.duration.normal,
        slow: motion.duration.slow,
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
