'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const PRODUCTOS = [
  { slug: 'tinki-maker', nombre: 'Tinki Maker', edad: '6-9 años', emoji: '🔧' },
];

const DURACIONES = [
  { meses: 3, precio: 74.70, label: '3 meses', desc: '3 cajas — ideal para probar' },
  { meses: 6, precio: 137.40, label: '6 meses', desc: '6 cajas — el más elegido', popular: true },
  { meses: 12, precio: 250.80, label: '12 meses', desc: '12 cajas — aventura completa' },
];

export default function RegaloPage() {
  const [producto, setProducto] = useState(PRODUCTOS[0]);
  const [duracion, setDuracion] = useState(DURACIONES[1]);
  const [purchaserName, setPurchaserName] = useState('');
  const [purchaserEmail, setPurchaserEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sendDate, setSendDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const total = duracion.precio.toFixed(2).replace('.', ',');
  const precioMes = (duracion.precio / duracion.meses).toFixed(2).replace('.', ',');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/gift', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: producto.slug,
          durationMonths: duracion.meses,
          priceCents: Math.round(duracion.precio * 100),
          purchaserName,
          purchaserEmail,
          recipientName,
          recipientEmail,
          message,
          sendDate,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al crear el certificado');

      setDone(true);
    } catch (err: any) {
      setError(err.message || 'Algo salió mal. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center bg-tinki-light px-4 pt-20">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-6">🎁✨</div>
            <h1 className="text-3xl font-black text-tinki-dark mb-4">¡Regalo creado!</h1>
            <p className="text-tinki-dark/60 mb-8 text-lg">
              El {sendDate.split('-').reverse().join('/')}, <strong>{recipientName}</strong> recibirá
              un email con tu regalo: <strong>{duracion.label}</strong> de <strong>{producto.nombre}</strong>.
            </p>
            {message && (
              <blockquote className="border-l-4 border-tinki-orange pl-4 italic text-tinki-dark/50 mb-8 text-left">
                &ldquo;{message}&rdquo;
              </blockquote>
            )}
            <p className="text-sm text-tinki-dark/40 mb-8">
              También te hemos enviado un email de confirmación a {purchaserEmail || 'tu correo'}.
              Cuando {recipientName} canjee el regalo, te avisaremos.
            </p>
            <div className="flex gap-4 justify-center">
              <a href="/" className="px-6 py-3 bg-tinki-orange text-white rounded-xl font-bold hover:opacity-90 transition-opacity">
                Volver al inicio
              </a>
              <a href="/regalo" className="px-6 py-3 border-2 border-tinki-dark/10 text-tinki-dark/60 rounded-xl font-bold hover:border-tinki-orange hover:text-tinki-orange transition-colors"
                onClick={(e) => { e.preventDefault(); setDone(false); }}>
                Regalar otro
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-tinki-light pt-24 pb-20">
        <div className="max-w-2xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-5xl mb-4 block">🎁</span>
            <h1 className="text-4xl font-black text-tinki-dark mb-3">Regala Tinkilabs</h1>
            <p className="text-lg text-tinki-dark/50 max-w-md mx-auto">
              Un regalo que se monta, se construye y se recuerda. Elige plan, escribe un
              mensaje y nosotros lo entregamos por email el día que tú decidas.
            </p>
            <p className="mt-3 text-sm text-tinki-dark/30 text-center">
              ¿Ya tienes un código?{' '}
              <a href="/canjear" className="underline font-bold hover:text-tinki-orange transition-colors">
                Canjéalo aquí
              </a>
            </p>
          </div>

          {/* Producto */}
          <section className="mb-10">
            <h2 className="text-sm font-bold text-tinki-dark/40 uppercase tracking-wider mb-4">1. Elige el plan</h2>
            <div className="bg-white rounded-2xl border border-tinki-dark/5 p-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl">{producto.emoji}</span>
                <div>
                  <h3 className="text-xl font-bold text-tinki-dark">{producto.nombre}</h3>
                  <p className="text-sm text-tinki-dark/40">{producto.edad}</p>
                </div>
                <span className="ml-auto text-xs bg-tinki-orange/10 text-tinki-orange px-3 py-1 rounded-full font-bold">
                  Caja mensual
                </span>
              </div>
            </div>

            {/* Duraciones */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {DURACIONES.map((d) => (
                <button
                  key={d.meses}
                  type="button"
                  onClick={() => setDuracion(d)}
                  className={`relative rounded-xl border-2 p-4 text-left transition-all ${
                    duracion.meses === d.meses
                      ? 'border-tinki-orange ring-2 ring-tinki-orange ring-offset-2'
                      : 'border-tinki-dark/5 hover:border-tinki-dark/20'
                  }`}
                >
                  {d.popular && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-tinki-orange text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                      Más elegido
                    </span>
                  )}
                  <div className="text-lg font-black text-tinki-dark">{d.label}</div>
                  <div className="text-xs text-tinki-dark/40 mt-0.5">{d.desc}</div>
                  <div className="text-sm font-bold text-tinki-orange mt-2">
                    {(d.precio / d.meses).toFixed(2).replace('.', ',')}€ <span className="text-tinki-dark/30 font-normal text-xs">/mes</span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Formulario */}
          <section className="mb-10">
            <h2 className="text-sm font-bold text-tinki-dark/40 uppercase tracking-wider mb-4">2. Datos del regalo</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Comprador */}
              <div className="bg-white rounded-2xl border border-tinki-dark/5 p-6 space-y-4">
                <h3 className="font-bold text-tinki-dark text-sm">¿Quién lo regala?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-tinki-dark/40 mb-1">Tu nombre *</label>
                    <input
                      type="text"
                      required
                      value={purchaserName}
                      onChange={(e) => setPurchaserName(e.target.value)}
                      placeholder="María García"
                      className="w-full rounded-xl border border-tinki-dark/10 px-4 py-3 text-tinki-dark placeholder:text-tinki-dark/25 focus:outline-none focus:ring-2 focus:ring-tinki-orange focus:border-transparent transition-shadow"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-tinki-dark/40 mb-1">Tu email</label>
                    <input
                      type="email"
                      value={purchaserEmail}
                      onChange={(e) => setPurchaserEmail(e.target.value)}
                      placeholder="maria@email.com"
                      className="w-full rounded-xl border border-tinki-dark/10 px-4 py-3 text-tinki-dark placeholder:text-tinki-dark/25 focus:outline-none focus:ring-2 focus:ring-tinki-orange focus:border-transparent transition-shadow"
                    />
                  </div>
                </div>
              </div>

              {/* Destinatario */}
              <div className="bg-white rounded-2xl border border-tinki-dark/5 p-6 space-y-4">
                <h3 className="font-bold text-tinki-dark text-sm">¿Quién lo recibe?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-tinki-dark/40 mb-1">Nombre del niño/a *</label>
                    <input
                      type="text"
                      required
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="Lucas"
                      className="w-full rounded-xl border border-tinki-dark/10 px-4 py-3 text-tinki-dark placeholder:text-tinki-dark/25 focus:outline-none focus:ring-2 focus:ring-tinki-orange focus:border-transparent transition-shadow"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-tinki-dark/40 mb-1">Email de sus padres *</label>
                    <input
                      type="email"
                      required
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      placeholder="padres@email.com"
                      className="w-full rounded-xl border border-tinki-dark/10 px-4 py-3 text-tinki-dark placeholder:text-tinki-dark/25 focus:outline-none focus:ring-2 focus:ring-tinki-orange focus:border-transparent transition-shadow"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-tinki-dark/40 mb-1">
                    Mensaje personalizado <span className="font-normal text-tinki-dark/25">(opcional, máx 200 caracteres)</span>
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value.slice(0, 200))}
                    placeholder="¡Feliz cumpleaños, Lucas! Prepárate para construir cosas alucinantes cada mes..."
                    rows={3}
                    className="w-full rounded-xl border border-tinki-dark/10 px-4 py-3 text-tinki-dark placeholder:text-tinki-dark/25 focus:outline-none focus:ring-2 focus:ring-tinki-orange focus:border-transparent transition-shadow resize-none"
                  />
                  <div className="text-right text-xs text-tinki-dark/25 mt-1">{message.length}/200</div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-tinki-dark/40 mb-1">Fecha de entrega del email</label>
                  <input
                    type="date"
                    required
                    value={sendDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSendDate(e.target.value)}
                    className="w-full sm:w-auto rounded-xl border border-tinki-dark/10 px-4 py-3 text-tinki-dark focus:outline-none focus:ring-2 focus:ring-tinki-orange focus:border-transparent transition-shadow"
                  />
                  <p className="text-xs text-tinki-dark/25 mt-1">
                    El destinatario recibirá el email este día. Puede canjearlo cuando quiera.
                  </p>
                </div>
              </div>

              {/* Resumen */}
              <div className="bg-tinki-dark text-white rounded-2xl p-6">
                <h3 className="font-bold text-sm text-white/60 uppercase tracking-wider mb-4">3. Resumen del pedido</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">{producto.nombre} × {duracion.label}</span>
                    <span>{total}€</span>
                  </div>
                  <div className="flex justify-between text-white/40 text-xs">
                    <span>{precioMes}€/mes durante {duracion.meses} meses</span>
                  </div>
                  <hr className="border-white/10 my-3" />
                  <div className="flex justify-between text-lg font-black">
                    <span>Total</span>
                    <span>{total}€</span>
                  </div>
                </div>

                {error && (
                  <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-200 text-sm text-center">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 w-full py-4 bg-tinki-orange text-white font-black text-lg rounded-xl hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Creando regalo...
                    </span>
                  ) : (
                    `Pagar ${total}€ — Tarjeta`
                  )}
                </button>
                <p className="text-center text-xs text-white/25 mt-3">
                  Pago seguro con Stripe. El certificado se enviará el {sendDate.split('-').reverse().join('/')}.
                </p>
              </div>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
