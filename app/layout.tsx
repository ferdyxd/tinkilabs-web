import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { Exo_2, Gugi } from 'next/font/google';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';
import { OrganizationSchema } from '@/components/JsonLd';
import './globals.css';

// Brand Guide Lyana v2: Exo 2 (body, 6 pesos) + Gugi (display, Regular)
// Pesos Exo 2: ExtraLight 200 · Light 300 · Regular 400 · SemiBold 600 · Bold 700 · ExtraBold 800
const exo2 = Exo_2({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const gugi = Gugi({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

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
    <html lang="es" className={`${exo2.variable} ${gugi.variable}`}>
      <body className="min-h-screen bg-tinki-white font-sans text-tinki-brown antialiased">
        <a href="#main-content" className="skip-link">Saltar al contenido</a>
        <OrganizationSchema />
        <Navbar />
        {children}
        <Footer />
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
