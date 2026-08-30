import type { Metadata } from 'next';
import { Anton } from 'next/font/google';

// Display: Anton (elegida por Alby 2026-08-28 — estira más, pegada de póster).
//
// NO se usa Gugi para texto corrido de titular porque su fichero latino NO
// contiene los glifos acentuados (á é í ó ú ñ ü ç) ni ¿ ¡ — verificado midiendo
// glifo a glifo contra el woff2 que sirve Google. El navegador cae al fallback
// carácter a carácter: ese era el defecto de tamaños que se veía.
// Gugi se mantiene SOLO para el wordmark, que no lleva acentos y además va
// como SVG con los trazados ya convertidos a curvas.
//
// Anton tiene un único peso (400), así que se reserva para los momentos
// grandes. Los encabezados pequeños van en Exo 2 700 (clase .sub).
const display = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-tk-display',
  display: 'swap',
  fallback: ['Impact', 'system-ui', 'sans-serif'],
});

export const metadata: Metadata = {
  title: 'Tinkilabs — Una máquina de verdad cada mes',
  description:
    'Cajas de ingeniería por suscripción para niños de 6 a 12 años. Madera, engranajes y mecanismos reales. Sin pantallas, sin pilas. Solo 100 plazas de Fundador.',
  openGraph: {
    title: 'Tinkilabs — Una máquina de verdad cada mes',
    description: 'Sin pantallas, sin pilas. Solo 100 plazas de Fundador.',
    type: 'website',
    locale: 'es_ES',
    siteName: 'Tinkilabs',
  },
  robots: 'noindex, nofollow',
};

export default function ConceptoCLayout({ children }: { children: React.ReactNode }) {
  return <div className={display.variable}>{children}</div>;
}
