import type { Metadata } from 'next';
import { Anton } from 'next/font/google';

// Display: Anton (elegida por Alby 2026-08-28).
// Gugi queda reservada al wordmark: su fichero latino no contiene
// á é í ó ú ñ ü ç ¿ ¡ — verificado glifo a glifo contra el woff2 de Google.
const display = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-tk-display',
  display: 'swap',
  fallback: ['Impact', 'system-ui', 'sans-serif'],
});

export const metadata: Metadata = {
  title: 'Tinkilabs — Una caja cada mes, para inventores de 6 a 12 años',
  description:
    'Un kit nuevo cada mes. Lo monta con sus manos, funciona de verdad, y entiende por qué. Sin pantallas ni pilas. Solo 100 plazas de Fundador.',
  openGraph: {
    title: 'Tinkilabs — Una caja cada mes, para inventores de 6 a 12 años',
    description: 'Lo monta con sus manos. Funciona de verdad. Y entiende por qué.',
    type: 'website',
    locale: 'es_ES',
    siteName: 'Tinkilabs',
  },
  robots: 'noindex, nofollow',
};

export default function ConceptoDLayout({ children }: { children: React.ReactNode }) {
  return <div className={display.variable}>{children}</div>;
}
