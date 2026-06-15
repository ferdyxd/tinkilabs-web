import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { OrganizationSchema } from '@/components/JsonLd';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tinkilabs — Imagina. Construye. Alucina.',
  description:
    'Cajas de construcción mecánica por suscripción para niños de 6-9 años. Una máquina de verdad cada mes. Madera natural, sin pantallas. Hecho en España.',
  keywords: 'cajas construccion, maquinas niños, suscripcion mecanica, construye maquinas, regalo original niños, tinkilabs',
  openGraph: {
    title: 'Tinkilabs — Imagina. Construye. Alucina.',
    description:
      'Cajas de construcción mecánica por suscripción para niños de 6-9 años. Una máquina de verdad cada mes. Sin pantallas.',
    type: 'website',
    locale: 'es_ES',
    siteName: 'Tinkilabs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tinkilabs — Imagina. Construye. Alucina.',
    description:
      'Cajas de construcción mecánica por suscripción para niños de 6-9 años. Una máquina de verdad cada mes. Sin pantallas.',
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
        <a href="#main-content" className="skip-link">Saltar al contenido</a>
        <OrganizationSchema />
        <Navbar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
