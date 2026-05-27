// ============================================================
// TINKILABS — Fichero central de diseño (Single Source of Truth)
// ============================================================
// Para cambiar la apariencia de la web, editar SOLO este fichero.
// Afecta a: Tailwind, CSS global, componentes, tipografía, etc.
// ============================================================

// ─── Paletas de color ────────────────────────────────────────
// Cambia "nombre" para alternar entre paletas

export type PaletteName = 'tinkilabs' | 'ocean' | 'forest' | 'sunset';

interface Palette {
  name: string;
  primary: string;       // Color principal (botones, links, acentos)
  primaryLight: string;  // Versión clara (hover, badges)
  primaryDark: string;   // Versión oscura (active, hover fuerte)
  background: string;    // Fondo principal
  backgroundAlt: string; // Fondo secundario (cards, secciones)
  surface: string;       // Superficie elevada (cards, modales)
  text: string;          // Texto principal
  textMuted: string;     // Texto secundario
  border: string;        // Bordes sutiles
  success: string;       // Éxito / confirmación
  error: string;         // Error / denegación
}

export const palettes: Record<PaletteName, Palette> = {
  tinkilabs: {
    name: 'Tinkilabs',
    primary: '#FF6B35',
    primaryLight: '#FF8C5A',
    primaryDark: '#E55A2B',
    background: '#FAFAFA',
    backgroundAlt: '#08080F',
    surface: '#FFFFFF',
    text: '#1A1A2E',
    textMuted: '#6B7280',
    border: 'rgba(255,255,255,0.05)',
    success: '#10B981',
    error: '#EF4444',
  },
  ocean: {
    name: 'Ocean',
    primary: '#0EA5E9',
    primaryLight: '#38BDF8',
    primaryDark: '#0284C7',
    background: '#F8FAFC',
    backgroundAlt: '#0F172A',
    surface: '#FFFFFF',
    text: '#0F172A',
    textMuted: '#64748B',
    border: 'rgba(148,163,184,0.15)',
    success: '#10B981',
    error: '#EF4444',
  },
  forest: {
    name: 'Forest',
    primary: '#22C55E',
    primaryLight: '#4ADE80',
    primaryDark: '#16A34A',
    background: '#F5F5F0',
    backgroundAlt: '#1A2E1A',
    surface: '#FFFFFF',
    text: '#1A2E1A',
    textMuted: '#6B7280',
    border: 'rgba(34,197,94,0.1)',
    success: '#22C55E',
    error: '#EF4444',
  },
  sunset: {
    name: 'Sunset',
    primary: '#F59E0B',
    primaryLight: '#FBBF24',
    primaryDark: '#D97706',
    background: '#FFFBEB',
    backgroundAlt: '#1C1917',
    surface: '#FFFFFF',
    text: '#1C1917',
    textMuted: '#78716C',
    border: 'rgba(245,158,11,0.1)',
    success: '#10B981',
    error: '#EF4444',
  },
};

// ─── Paleta activa — cambiar aquí para cambiar toda la web ───

export const activePalette: PaletteName = 'tinkilabs';
export const palette = palettes[activePalette];

// ─── Tipografía ─────────────────────────────────────────────

export const typography = {
  fontSans: ['Inter', 'Geist Sans', 'system-ui', 'sans-serif'] as const,
  fontMono: ['JetBrains Mono', 'Fira Code', 'monospace'] as const,
  fontDisplay: ['Geist Sans', 'Inter', 'system-ui', 'sans-serif'] as const,

  // Pesos
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  // Escala tipográfica (rem)
  scale: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem',// 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
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
    --color-background: ${p.background};
    --color-background-alt: ${p.backgroundAlt};
    --color-surface: ${p.surface};
    --color-text: ${p.text};
    --color-text-muted: ${p.textMuted};
    --color-border: ${p.border};
    --color-success: ${p.success};
    --color-error: ${p.error};
    --font-sans: ${typography.fontSans.join(', ')};
    --font-mono: ${typography.fontMono.join(', ')};
    --font-display: ${typography.fontDisplay.join(', ')};
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
