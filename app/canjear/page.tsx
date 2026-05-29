'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function CanjearEntradaPage() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = code.trim().toUpperCase();
    if (!clean) {
      setError('Pega o escribe tu código de regalo');
      return;
    }
    if (!/^TINKI-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(clean)) {
      setError('El código tiene el formato TINKI-XXXX-XXXX. Revísalo.');
      return;
    }
    router.push(`/canjear/${clean}`);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center bg-tinki-light px-4 pt-20">
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-6">🎁</div>
          <h1 className="text-3xl font-black text-tinki-dark mb-3">¿Tienes un código de regalo?</h1>
          <p className="text-tinki-dark/50 mb-8">
            Te han regalado una suscripción Tinkilabs. Pega aquí tu código para activarla.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={code}
              onChange={(e) => { setCode(e.target.value.toUpperCase()); setError(''); }}
              placeholder="TINKI-XXXX-XXXX"
              maxLength={20}
              className="w-full rounded-xl border border-tinki-dark/10 px-5 py-4 text-center text-lg font-bold tracking-widest text-tinki-dark placeholder:text-tinki-dark/20 focus:outline-none focus:ring-2 focus:ring-tinki-orange focus:border-transparent transition-shadow uppercase"
            />
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
            <button
              type="submit"
              className="w-full py-4 bg-tinki-orange text-white font-black text-lg rounded-xl hover:opacity-90 transition-all active:scale-[0.98]"
            >
              Activar mi regalo 🚀
            </button>
          </form>

          <p className="text-xs text-tinki-dark/25 mt-6">
            ¿No tienes código?{' '}
            <a href="/regalo" className="underline hover:text-tinki-orange">Regala Tinkilabs</a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
