import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { OrganizationSchema } from '@/components/JsonLd';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tinkilabs — Construye. Aprende. Alucina.',
  description:
    'Cajas de experimentos STEM por suscripción mensual para niños de 3 a 14 años. Recibe una caja cada mes, construye proyectos increíbles y descubre cómo funciona el mundo.',
  keywords: 'cajas STEM, experimentos niños, suscripción educativa, ciencia para niños, tecnología niños, Tinkilabs',
  openGraph: {
    title: 'Tinkilabs — Construye. Aprende. Alucina.',
    description:
      'Cajas de experimentos STEM por suscripción mensual para niños de 3 a 14 años.',
    type: 'website',
    locale: 'es_ES',
    siteName: 'Tinkilabs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tinkilabs — Construye. Aprende. Alucina.',
    description:
      'Cajas de experimentos STEM por suscripción mensual para niños de 3 a 14 años.',
  },
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-tinki-light font-sans text-tinki-dark antialiased">
        <OrganizationSchema />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
