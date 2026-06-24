// ============================================================
// TINKILABS — Fichero central de diseño (Single Source of Truth)
// ============================================================
// Fuente canónica: Brand Guide - Tinkilabs.pdf (Lyana, v2, 42pp)
// Última actualización: 2026-06-23
// Para cambiar la apariencia de la web, editar SOLO este fichero.
// Afecta a: Tailwind, CSS global, componentes, tipografía, etc.
// ============================================================

// ─── Paletas de color ────────────────────────────────────────

export type PaletteName = 'tinkilabs' | 'ocean' | 'forest' | 'sunset';

interface Palette {
  name: string;
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  background: string;
  backgroundAlt: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  success: string;
  error: string;
  accent: string;
}

export const palettes: Record<PaletteName, Palette> = {
  tinkilabs: {
    name: 'Tinkilabs (Lyana v2)',
    // ─── Tinki Orange — primario, energía, CTAs
    primary: '#FF6B35',
    primaryLight: '#FF8C5A',
    primaryDark: '#E55A2B',
    // ─── Engineer Green — secundario, badges, eco, acentos técnicos
    secondary: '#2ECC71',
    secondaryLight: '#58D68D',
    secondaryDark: '#27AE60',
    // ─── Timber Brown — texto principal, ancla, contraste
    text: '#4B260E',
    // ─── Pure White — fondo principal, lienzo de legibilidad
    background: '#EDF8FB',
    surface: '#FFFFFF',
    // ─── Fondo oscuro / alternativo → Timber Brown
    backgroundAlt: '#4B260E',
    textMuted: '#6B7280',
    // ─── Birch Wood — acento editorial, madera clara
    accent: '#BF946C',
    border: 'rgba(75,38,14,0.08)',
    success: '#2ECC71',
    error: '#EF4444',
  },
  ocean: {
    name: 'Ocean',
    primary: '#0EA5E9',
    primaryLight: '#38BDF8',
    primaryDark: '#0284C7',
    secondary: '#22D3EE',
    secondaryLight: '#67E8F9',
    secondaryDark: '#06B6D4',
    background: '#F8FAFC',
    backgroundAlt: '#0F172A',
    surface: '#FFFFFF',
    text: '#0F172A',
    textMuted: '#64748B',
    border: 'rgba(148,163,184,0.15)',
    success: '#10B981',
    error: '#EF4444',
    accent: '#F59E0B',
  },
  forest: {
    name: 'Forest',
    primary: '#22C55E',
    primaryLight: '#4ADE80',
    primaryDark: '#16A34A',
    secondary: '#10B981',
    secondaryLight: '#34D399',
    secondaryDark: '#059669',
    background: '#F5F5F0',
    backgroundAlt: '#1A2E1A',
    surface: '#FFFFFF',
    text: '#1A2E1A',
    textMuted: '#6B7280',
    border: 'rgba(34,197,94,0.1)',
    success: '#22C55E',
    error: '#EF4444',
    accent: '#F59E0B',
  },
  sunset: {
    name: 'Sunset',
    primary: '#F59E0B',
    primaryLight: '#FBBF24',
    primaryDark: '#D97706',
    secondary: '#EF4444',
    secondaryLight: '#F87171',
    secondaryDark: '#DC2626',
    background: '#FFFBEB',
    backgroundAlt: '#1C1917',
    surface: '#FFFFFF',
    text: '#1C1917',
    textMuted: '#78716C',
    border: 'rgba(245,158,11,0.1)',
    success: '#10B981',
    error: '#EF4444',
    accent: '#A78BFA',
  },
};

// ─── Paleta activa — cambiar aquí para cambiar toda la web ───

export const activePalette: PaletteName = 'tinkilabs';
export const palette = palettes[activePalette];

// ─── Tipografía (Brand Guide Lyana v2) ───────────────────────

export const typography = {
  // Exo 2 — cuerpo, subtítulos, instrucciones (Google Fonts, 6 pesos)
  fontSans: ['Exo 2', 'sans-serif'],
  // Gugi — wordmark, hero headlines, accent callouts (Google Fonts, Regular)
  fontDisplay: ['Gugi', 'Exo 2', 'sans-serif'],
  fontMono: ['JetBrains Mono', 'Fira Code', 'monospace'],

  weights: {
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  scale: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
};

// ─── Espaciado y formas ─────────────────────────────────────

export const shapes = {
  radius: {
    sm: '0.5rem',    // 8px
    md: '0.75rem',   // 12px
    lg: '1rem',      // 16px
    xl: '1.5rem',    // 24px
    full: '9999px',  // Píldoras
  },
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 4px 6px -1px rgba(0,0,0,0.1)',
    lg: '0 10px 15px -3px rgba(0,0,0,0.1)',
    glow: (color: string) => `0 0 30px ${color}40`,
  },
};

// ─── Animaciones ────────────────────────────────────────────

export const motion = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    reveal: '800ms',
  },
  easing: {
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
  },
};

// ─── Utilidad: generar variables CSS ─────────────────────────

export function generateCSSVariables(): string {
  const p = palette;
  return `
    --color-primary: ${p.primary};
    --color-primary-light: ${p.primaryLight};
    --color-primary-dark: ${p.primaryDark};
    --color-secondary: ${p.secondary};
    --color-secondary-light: ${p.secondaryLight};
    --color-secondary-dark: ${p.secondaryDark};
    --color-background: ${p.background};
    --color-background-alt: ${p.backgroundAlt};
    --color-surface: ${p.surface};
    --color-text: ${p.text};
    --color-text-muted: ${p.textMuted};
    --color-border: ${p.border};
    --color-accent: ${p.accent};
    --color-success: ${p.success};
    --color-error: ${p.error};
    --font-mono: ${typography.fontMono.join(', ')};
    --radius-sm: ${shapes.radius.sm};
    --radius-md: ${shapes.radius.md};
    --radius-lg: ${shapes.radius.lg};
    --radius-xl: ${shapes.radius.xl};
    --radius-full: ${shapes.radius.full};
    --motion-fast: ${motion.duration.fast};
    --motion-normal: ${motion.duration.normal};
    --motion-slow: ${motion.duration.slow};
  `;
}
