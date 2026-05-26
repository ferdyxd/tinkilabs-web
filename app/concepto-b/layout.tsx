import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tinkilabs — El taller de Tinki',
  description:
    'Todo empieza con una caja. Descubre cómo Tinkilabs convierte a los niños en inventores con cajas de experimentos STEM por suscripción.',
  openGraph: {
    title: 'Tinkilabs — El taller de Tinki',
    description: 'Todo empieza con una caja. Construye. Aprende. Alucina.',
    type: 'website',
    locale: 'es_ES',
    siteName: 'Tinkilabs',
  },
};

export default function ConceptoBLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
