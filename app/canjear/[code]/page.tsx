'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

interface GiftData {
  code: string;
  product: string;
  duration_months: number;
  price_cents: number;
  purchaser_name: string;
  recipient_name: string;
  recipient_email: string;
  message: string | null;
  send_date: string;
  status: string;
  redeemed_at: string | null;
  created_at: string;
}

export default function CanjearPage() {
  const params = useParams();
  const code = (params.code as string).toUpperCase();

  const [gift, setGift] = useState<GiftData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [redeeming, setRedeeming] = useState(false);
  const [redeemed, setRedeemed] = useState(false);
  const [redeemError, setRedeemError] = useState('');

  useEffect(() => {
    fetch(`/api/gift?code=${encodeURIComponent(code)}`)
      .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        if (!ok) throw new Error(data.error);
        setGift(data.gift);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [code]);

  const handleRedeem = async () => {
    setRedeeming(true);
    setRedeemError('');

    try {
      const res = await fetch('/api/gift/redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setRedeemed(true);
    } catch (err: any) {
      setRedeemError(err.message);
    } finally {
      setRedeeming(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center bg-tinki-light px-4 pt-20">
          <div className="text-center">
            <div className="animate-spin h-10 w-10 border-4 border-tinki-orange/25 border-t-tinki-orange rounded-full mx-auto mb-4" />
            <p className="text-tinki-dark/40">Verificando certificado...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Error / not found
  if (error || !gift) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center bg-tinki-light px-4 pt-20">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-6">🔍</div>
            <h1 className="text-3xl font-black text-tinki-dark mb-4">Código no encontrado</h1>
            <p className="text-tinki-dark/50 mb-2">{error || 'Ese código no existe.'}</p>
            <p className="text-sm text-tinki-dark/30 mb-8">
              Comprueba que has copiado el código completo (formato: TINKI-XXXX-XXXX).
            </p>
            <a href="/canjear" className="inline-block px-6 py-3 bg-tinki-orange text-white rounded-xl font-bold hover:opacity-90 transition-opacity">
              Probar otro código
            </a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Already redeemed
  if (gift.status === 'redeemed') {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center bg-tinki-light px-4 pt-20">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-6">✅</div>
            <h1 className="text-3xl font-black text-tinki-dark mb-4">Este regalo ya está activado</h1>
            <p className="text-tinki-dark/50 mb-8">
              La suscripción de <strong>{gift.recipient_name}</strong> ya está en marcha.
              Si crees que hay un error, escríbenos a hola@tinkilabs.com.
            </p>
            <a href="/" className="inline-block px-6 py-3 bg-tinki-orange text-white rounded-xl font-bold hover:opacity-90 transition-opacity">
              Volver al inicio
            </a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Redeemed successfully
  if (redeemed) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center bg-tinki-light px-4 pt-20">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-6">🚀</div>
            <h1 className="text-3xl font-black text-tinki-dark mb-4">
              ¡Bienvenido a Tinkilabs, {gift.recipient_name}!
            </h1>
            <p className="text-tinki-dark/50 mb-2">
              Tu suscripción <strong>{gift.product}</strong> por {gift.duration_months} meses está activada.
            </p>
            {gift.message && (
              <blockquote className="border-l-4 border-tinki-orange pl-4 italic text-tinki-dark/50 my-6 text-left">
                &ldquo;{gift.message}&rdquo;
                <footer className="text-sm text-tinki-dark/30 mt-1 not-italic">— {gift.purchaser_name}</footer>
              </blockquote>
            )}
            <p className="text-sm text-tinki-dark/30 mb-8">
              Tu primera caja llegará en 5-7 días. Te hemos enviado un email con todos los detalles.
            </p>
            <a href="/" className="inline-block px-6 py-3 bg-tinki-orange text-white rounded-xl font-bold hover:opacity-90 transition-opacity">
              Seguir explorando
            </a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Ready to redeem
  const productNames: Record<string, string> = {
    'tinki-maker': 'Tinki Maker',
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center bg-tinki-light px-4 pt-20">
        <div className="max-w-lg w-full">
          <div className="text-center mb-8">
            <div className="text-6xl mb-6">🎁</div>
            <h1 className="text-3xl font-black text-tinki-dark mb-3">
              ¡{gift.purchaser_name} te ha regalado Tinkilabs!
            </h1>
          </div>

          {/* Gift card details */}
          <div className="bg-white rounded-2xl border border-tinki-dark/5 p-6 mb-6">
            {gift.message && (
              <div className="mb-6 p-4 bg-tinki-orange/5 rounded-xl border border-tinki-orange/10">
                <p className="text-tinki-dark/70 italic text-center">&ldquo;{gift.message}&rdquo;</p>
              </div>
            )}

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-tinki-dark/40">Producto</span>
                <span className="font-bold text-tinki-dark">{productNames[gift.product] || gift.product}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-tinki-dark/40">Duración</span>
                <span className="font-bold text-tinki-dark">{gift.duration_months} meses</span>
              </div>
              <div className="flex justify-between">
                <span className="text-tinki-dark/40">Para</span>
                <span className="font-bold text-tinki-dark">{gift.recipient_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-tinki-dark/40">De parte de</span>
                <span className="font-bold text-tinki-dark">{gift.purchaser_name}</span>
              </div>
            </div>
          </div>

          {/* What you get */}
          <div className="bg-white rounded-2xl border border-tinki-dark/5 p-6 mb-6">
            <h3 className="font-bold text-tinki-dark mb-3">Esto es lo que te espera</h3>
            <ul className="space-y-2 text-sm text-tinki-dark/60">
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold mt-0.5">✓</span>
                Una caja distinta cada mes con un proyecto nuevo
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold mt-0.5">✓</span>
                Manual ilustrado paso a paso
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold mt-0.5">✓</span>
                Todas las piezas y materiales incluidos
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold mt-0.5">✓</span>
                Envío gratis a toda España peninsular
              </li>
            </ul>
          </div>

          {redeemError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
              {redeemError}
            </div>
          )}

          <button
            onClick={handleRedeem}
            disabled={redeeming}
            className="w-full py-4 bg-tinki-orange text-white font-black text-lg rounded-xl hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {redeeming ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Activando...
              </span>
            ) : (
              'Activar mi regalo 🚀'
            )}
          </button>
          <p className="text-center text-xs text-tinki-dark/25 mt-3">
            Al activar aceptas los <a href="/terminos" className="underline hover:text-tinki-orange">términos</a> y la <a href="/privacidad" className="underline hover:text-tinki-orange">política de privacidad</a>.
            Sin permanencia. Sin renovación automática.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
