'use client';

import { useState, useRef } from 'react';

// ─── Datos ──────────────────────────────────────────────────────

const PRECIO_SINGLE = 27.0;

interface PlanInfo {
  slug: string;
  nombre: string;
  descripcion: string;
  meses: number;
  precioMes: number;
  precioTotal: number;
  ahorroVsSingle: string;
  ahorroTotal: string;
  popular?: boolean;
  badge?: string;
}

const PLANES: PlanInfo[] = [
  {
    slug: 'anual',
    nombre: '12 meses',
    descripcion: '1 caja al mes',
    meses: 12,
    precioMes: 19.9,
    precioTotal: 238.8,
    ahorroVsSingle: '7,10',
    ahorroTotal: '85,20',
    badge: 'Mejor precio',
  },
  {
    slug: 'semestral',
    nombre: '6 meses',
    descripcion: '1 caja al mes',
    meses: 6,
    precioMes: 20.9,
    precioTotal: 125.4,
    ahorroVsSingle: '6,10',
    ahorroTotal: '36,60',
    popular: true,
    badge: 'El favorito',
  },
  {
    slug: 'trimestral',
    nombre: '3 meses',
    descripcion: '1 caja al mes',
    meses: 3,
    precioMes: 22.9,
    precioTotal: 68.7,
    ahorroVsSingle: '4,10',
    ahorroTotal: '12,30',
    badge: 'Para probar',
  },
  {
    slug: 'single',
    nombre: 'Una sola caja',
    descripcion: 'Sin compromiso',
    meses: 1,
    precioMes: PRECIO_SINGLE,
    precioTotal: PRECIO_SINGLE,
    ahorroVsSingle: '0',
    ahorroTotal: '0',
    badge: 'Sin ataduras',
  },
];

// ─── Iconos SVG ──────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg className="h-5 w-5 shrink-0 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

// ─── Componente principal ────────────────────────────────────────

interface FormData {
  nombre: string;
  apellido: string;
  plan: PlanInfo;
  email: string;
  direccion: string;
  ciudad: string;
  cp: string;
  telefono: string;
}

export function KiwiCoFlow() {
  const [data, setData] = useState<FormData>({
    nombre: '',
    apellido: '',
    plan: PLANES[1],
    email: '',
    direccion: '',
    ciudad: '',
    cp: '',
    telefono: '',
  });
  const [seccionVisible, setSeccionVisible] = useState(1);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const s1Ref = useRef<HTMLDivElement>(null);
  const s2Ref = useRef<HTMLDivElement>(null);
  const s3Ref = useRef<HTMLDivElement>(null);

  const update = (partial: Partial<FormData>) => setData((d) => ({ ...d, ...partial }));

  const nombreValido = data.nombre.trim().length > 1;

  const envioValido =
    data.email.includes('@') &&
    data.direccion.trim().length > 0 &&
    data.ciudad.trim().length > 0 &&
    /^\d{5}$/.test(data.cp.trim());

  const puedePagar = nombreValido && envioValido;
  const isSingle = data.plan.slug === 'single';

  const irA = (n: number) => {
    setSeccionVisible(n);
    setTimeout(() => {
      const ref = n === 2 ? s2Ref : n === 3 ? s3Ref : s1Ref;
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  };

  const validarPaso1 = (): boolean => {
    const errs: Record<string, string> = {};
    if (data.nombre.trim().length < 2) errs.nombre = 'Escribe el nombre del peque';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validarPaso3 = (): boolean => {
    const errs: Record<string, string> = {};
    if (!data.email.includes('@')) errs.email = 'Un email válido, por favor';
    if (data.direccion.trim().length === 0) errs.direccion = 'Indícanos la dirección de envío';
    if (data.ciudad.trim().length === 0) errs.ciudad = '¿En qué ciudad vives?';
    if (!/^\d{5}$/.test(data.cp.trim())) errs.cp = 'Código postal (5 dígitos)';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const limpiarError = (campo: string) => {
    if (errors[campo]) {
      const nuevos = { ...errors };
      delete nuevos[campo];
      setErrors(nuevos);
    }
  };

  const handleSubmit = async () => {
    if (!puedePagar) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          modo: isSingle ? 'single' : 'sub',
          nombreNino: data.nombre,
          linea: 'maker',
          plan: isSingle ? 'single' : data.plan.slug,
          email: data.email,
          direccion: data.direccion,
          ciudad: data.ciudad,
          cp: data.cp,
          telefono: data.telefono,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Error');
      setDone(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ─── Confirmación ──────────────────────────────────────────

  if (done) {
    return (
      <div className="max-w-lg mx-auto text-center py-20 px-4">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-500 mb-6">
          <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="text-3xl font-black text-tinki-dark mb-3">
          {isSingle ? `¡${data.nombre}, tu caja está en camino!` : `¡${data.nombre}, bienvenido a Tinkilabs!`}
        </h2>
        {isSingle ? (
          <>
            <p className="text-lg text-tinki-dark/50 mb-2">
              Tu caja <strong className="text-tinki-dark">Tinki Maker</strong> sale en{' '}
              <strong className="text-tinki-orange">5-7 días</strong>. Envío gratis.
            </p>
            <p className="text-tinki-dark/30 mb-8">
              Si te mola, te esperamos con un plan y te bonificamos la diferencia.
            </p>
          </>
        ) : (
          <>
            <p className="text-lg text-tinki-dark/50 mb-2">
              Tu primera caja <strong className="text-tinki-dark">Tinki Maker</strong> sale el día{' '}
              <strong className="text-tinki-orange">5 del mes que viene</strong>.
            </p>
            <p className="text-tinki-dark/30 mb-8">Te hemos enviado un email con todos los detalles.</p>
          </>
        )}
        <a
          href="/"
          className="inline-block px-8 py-4 bg-tinki-orange text-white font-black text-lg rounded-xl hover:shadow-lg hover:shadow-tinki-orange/25 hover:-translate-y-0.5 transition-all duration-200"
        >
          Seguir explorando
        </a>
      </div>
    );
  }

  // ─── Vista principal ───────────────────────────────────────

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 lg:py-12">

      {/* ── Barra de progreso sticky ── */}
      <div className="sticky top-[58px] z-40 -mx-4 px-4 py-3 bg-tinki-light/95 backdrop-blur-sm border-b border-tinki-dark/5 mb-8">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {[
            { n: 1, label: 'Nombre' },
            { n: 2, label: 'Plan' },
            { n: 3, label: 'Envío y pago' },
          ].map(({ n, label }, i) => (
            <div key={n} className="flex items-center gap-2">
              <button
                onClick={() => n <= seccionVisible && irA(n)}
                disabled={n > seccionVisible}
                className={`flex items-center gap-2 transition-all duration-300 ${
                  n > seccionVisible ? 'opacity-30 cursor-default' : 'cursor-pointer'
                }`}
              >
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-black transition-all duration-300 ${
                    n <= seccionVisible
                      ? 'bg-tinki-orange text-white'
                      : 'bg-tinki-dark/5 text-tinki-dark/20'
                  }`}
                >
                  {n < seccionVisible ? <CheckIcon /> : n}
                </div>
                <span
                  className={`hidden sm:inline text-xs font-bold transition-colors duration-300 ${
                    n <= seccionVisible ? 'text-tinki-dark' : 'text-tinki-dark/20'
                  }`}
                >
                  {label}
                </span>
              </button>
              {i < 2 && (
                <div
                  className={`hidden sm:block h-0.5 w-6 rounded transition-colors duration-300 ${
                    n < seccionVisible ? 'bg-tinki-orange' : 'bg-tinki-dark/5'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════ SECCIÓN 1: Nombre ═══════════ */}
      <div ref={s1Ref} className="scroll-mt-24">
        <section className={`transition-all duration-500 ${seccionVisible >= 1 ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
          <p className="text-xs font-bold text-tinki-dark/30 uppercase tracking-[0.2em] mb-3">Paso 1 de 3</p>
          <h2 className="text-3xl font-black text-tinki-dark mb-2">
            {nombreValido && seccionVisible > 1 ? `¡Genial, ${data.nombre}!` : '¿Para quién es la caja?'}
          </h2>
          <p className="text-tinki-dark/40 mb-8">
            Así personalizaremos sus envíos. Tinki le llamará por su nombre en cada carta.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-tinki-dark/50 mb-1.5">
                Nombre del peque *
              </label>
              <input
                type="text"
                value={data.nombre}
                onChange={(e) => { update({ nombre: e.target.value }); limpiarError('nombre'); }}
                placeholder="Lucas"
                autoFocus
                className={`w-full rounded-2xl border-2 px-5 py-4 text-lg font-bold text-tinki-dark placeholder:text-tinki-dark/15 focus:outline-none focus:ring-2 focus:border-transparent transition-shadow bg-white ${
                  errors.nombre
                    ? 'border-red-400 focus:ring-red-400'
                    : 'border-tinki-dark/5 focus:ring-tinki-orange'
                }`}
              />
              {errors.nombre && (
                <p className="mt-1.5 text-sm font-bold text-red-500">{errors.nombre}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-bold text-tinki-dark/50 mb-1.5">
                Apellido <span className="font-normal text-tinki-dark/20">(opcional)</span>
              </label>
              <input
                type="text"
                value={data.apellido}
                onChange={(e) => update({ apellido: e.target.value })}
                placeholder="García"
                className="w-full rounded-2xl border-2 border-tinki-dark/5 px-5 py-4 text-lg font-bold text-tinki-dark placeholder:text-tinki-dark/15 focus:outline-none focus:ring-2 focus:ring-tinki-orange focus:border-transparent transition-shadow bg-white"
              />
            </div>
          </div>

          {seccionVisible === 1 && (
            <button
              onClick={() => validarPaso1() && irA(2)}
              className="mt-8 w-full py-4 bg-tinki-orange text-white font-black text-lg rounded-2xl hover:shadow-lg hover:shadow-tinki-orange/25 hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98]"
            >
              Continuar →
            </button>
          )}
        </section>
      </div>

      {/* ═══════════ SECCIÓN 2: Plan ═══════════ */}
      <div ref={s2Ref} className="scroll-mt-24 mt-16 pt-8 border-t border-tinki-dark/5">
        <section className={`transition-all duration-500 ${seccionVisible >= 2 ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
          <p className="text-xs font-bold text-tinki-dark/30 uppercase tracking-[0.2em] mb-3">Paso 2 de 3</p>
          <h2 className="text-3xl font-black text-tinki-dark mb-2">Elige tu plan</h2>
          <p className="text-tinki-dark/40 mb-8">
            Tinki Maker · 6-9 años · Envío gratis siempre
          </p>

          <div className="space-y-3">
            {PLANES.map((p) => {
              const sel = data.plan.slug === p.slug;
              return (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => {
                    update({ plan: p });
                    setTimeout(() => irA(3), 200);
                  }}
                  className={`relative w-full rounded-2xl border-2 p-5 text-left transition-all ${
                    sel
                      ? 'border-tinki-orange shadow-md shadow-tinki-orange/10 bg-orange-50'
                      : 'border-tinki-dark/5 bg-white hover:border-tinki-dark/15'
                  }`}
                >
                  {p.badge && (
                    <span
                      className={`absolute -top-2.5 right-4 px-3 py-0.5 rounded-full text-xs font-black text-white ${
                        p.popular ? 'bg-tinki-orange' : p.slug === 'single' ? 'bg-tinki-dark/40' : 'bg-emerald-500'
                      }`}
                    >
                      {p.badge}
                    </span>
                  )}

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-black text-tinki-dark">{p.nombre}</p>
                      <p className="text-sm text-tinki-dark/35">{p.descripcion}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-baseline gap-0.5 justify-end">
                        <span className="text-3xl font-black text-tinki-dark tracking-tight">
                          {p.precioMes.toFixed(2).replace('.', ',')}
                        </span>
                        <span className="text-base text-tinki-dark/30">€</span>
                        <span className="text-sm text-tinki-dark/25">/mes</span>
                      </div>
                      {p.meses > 1 && (
                        <span className="text-xs text-tinki-dark/30">
                          {p.precioTotal.toFixed(2).replace('.', ',')}€ total
                        </span>
                      )}
                    </div>
                  </div>

                  {p.slug !== 'single' && (
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-tinki-dark/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                          style={{ width: `${Math.round((p.meses / 12) * 100)}%` }}
                        />
                      </div>
                      <span className="text-sm font-black text-emerald-600 whitespace-nowrap">
                        Ahorras {p.ahorroVsSingle}€/mes ({p.ahorroTotal}€ en total)
                      </span>
                    </div>
                  )}

                  <div
                    className={`absolute top-5 left-5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      sel ? 'border-tinki-orange bg-tinki-orange' : 'border-tinki-dark/15'
                    }`}
                  >
                    {sel && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </button>
              );
            })}
          </div>

          {isSingle && (
            <div className="mt-4 rounded-xl bg-tinki-orange/5 border border-tinki-orange/15 p-3 text-center">
              <p className="text-xs text-tinki-dark/50">
                Si te mola y te suscribes, te bonificamos la diferencia.
              </p>
            </div>
          )}

          {/* Botón continuar si ya pasó pero quiere cambiar de plan */}
          {seccionVisible > 2 && (
            <button
              onClick={() => irA(3)}
              className="mt-6 w-full py-3 border-2 border-tinki-dark/5 text-tinki-dark/50 font-bold rounded-2xl hover:border-tinki-dark/15 transition-colors"
            >
              Continuar al pago ↓
            </button>
          )}
        </section>
      </div>

      {/* ═══════════ SECCIÓN 3: Envío + Pago ═══════════ */}
      <div ref={s3Ref} className="scroll-mt-24 mt-16 pt-8 border-t border-tinki-dark/5">
        <section className={`transition-all duration-500 ${seccionVisible >= 3 ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
          <p className="text-xs font-bold text-tinki-dark/30 uppercase tracking-[0.2em] mb-3">Paso 3 de 3</p>
          <h2 className="text-3xl font-black text-tinki-dark mb-2">Envio y pago</h2>
          <p className="text-tinki-dark/40 mb-8">Envío gratis a toda España peninsular.</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-tinki-dark/50 mb-1.5">Email *</label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => { update({ email: e.target.value }); limpiarError('email'); }}
                placeholder="tu@email.com"
                inputMode="email"
                className={`w-full rounded-2xl border-2 px-5 py-3.5 text-base font-bold text-tinki-dark placeholder:text-tinki-dark/15 focus:outline-none focus:ring-2 focus:border-transparent transition-shadow bg-white ${
                  errors.email
                    ? 'border-red-400 focus:ring-red-400'
                    : 'border-tinki-dark/5 focus:ring-tinki-orange'
                }`}
              />
              {errors.email && (
                <p className="mt-1.5 text-sm font-bold text-red-500">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-bold text-tinki-dark/50 mb-1.5">Dirección *</label>
              <input
                type="text"
                value={data.direccion}
                onChange={(e) => { update({ direccion: e.target.value }); limpiarError('direccion'); }}
                placeholder="Calle Mayor, 12, 3º B"
                className={`w-full rounded-2xl border-2 px-5 py-3.5 text-base font-bold text-tinki-dark placeholder:text-tinki-dark/15 focus:outline-none focus:ring-2 focus:border-transparent transition-shadow bg-white ${
                  errors.direccion
                    ? 'border-red-400 focus:ring-red-400'
                    : 'border-tinki-dark/5 focus:ring-tinki-orange'
                }`}
              />
              {errors.direccion && (
                <p className="mt-1.5 text-sm font-bold text-red-500">{errors.direccion}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-tinki-dark/50 mb-1.5">Ciudad *</label>
                <input
                  type="text"
                  value={data.ciudad}
                  onChange={(e) => { update({ ciudad: e.target.value }); limpiarError('ciudad'); }}
                  placeholder="Madrid"
                  className={`w-full rounded-2xl border-2 px-5 py-3.5 text-base font-bold text-tinki-dark placeholder:text-tinki-dark/15 focus:outline-none focus:ring-2 focus:border-transparent transition-shadow bg-white ${
                    errors.ciudad
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-tinki-dark/5 focus:ring-tinki-orange'
                  }`}
                />
                {errors.ciudad && (
                  <p className="mt-1.5 text-sm font-bold text-red-500">{errors.ciudad}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-bold text-tinki-dark/50 mb-1.5">Código postal *</label>
                <input
                  type="text"
                  value={data.cp}
                  onChange={(e) => { update({ cp: e.target.value.replace(/\D/g, '').slice(0, 5) }); limpiarError('cp'); }}
                  placeholder="28001"
                  inputMode="numeric"
                  maxLength={5}
                  className={`w-full rounded-2xl border-2 px-5 py-3.5 text-base font-bold text-tinki-dark placeholder:text-tinki-dark/15 focus:outline-none focus:ring-2 focus:border-transparent transition-shadow bg-white ${
                    errors.cp
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-tinki-dark/5 focus:ring-tinki-orange'
                  }`}
                />
                {errors.cp && (
                  <p className="mt-1.5 text-sm font-bold text-red-500">{errors.cp}</p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-tinki-dark/50 mb-1.5">
                Teléfono <span className="font-normal text-tinki-dark/20">(opcional)</span>
              </label>
              <input
                type="tel"
                value={data.telefono}
                onChange={(e) => update({ telefono: e.target.value })}
                placeholder="612 345 678"
                className="w-full rounded-2xl border-2 border-tinki-dark/5 px-5 py-3.5 text-base font-bold text-tinki-dark placeholder:text-tinki-dark/15 focus:outline-none focus:ring-2 focus:ring-tinki-orange focus:border-transparent transition-shadow bg-white"
              />
            </div>
          </div>

          {/* ── Resumen + Pago ── */}
          <div className="mt-8 rounded-2xl border-2 border-tinki-dark/5 bg-white p-5 space-y-3 shadow-sm">
            <h3 className="text-sm font-black text-tinki-dark">Resumen del pedido</h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-tinki-dark/40">Para</span>
                <span className="font-bold text-tinki-dark">
                  {data.nombre} {data.apellido}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-tinki-dark/40">Línea</span>
                <span className="font-bold text-tinki-dark">Tinki Maker (6-9 años)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-tinki-dark/40">Plan</span>
                <span className="font-bold text-tinki-dark">{data.plan.nombre}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-tinki-dark/40">Envío</span>
                <span className="font-bold text-emerald-600">Gratis</span>
              </div>
              {data.direccion && (
                <div className="flex justify-between">
                  <span className="text-tinki-dark/40">Dirección</span>
                  <span className="font-bold text-tinki-dark text-right max-w-[200px] truncate">
                    {data.direccion}, {data.cp} {data.ciudad}
                  </span>
                </div>
              )}
            </div>

            <hr className="border-tinki-dark/5" />

            <div>
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-tinki-dark/40">
                  {isSingle ? 'Pago único' : `Precio por mes (${data.plan.meses} meses)`}
                </span>
                <span className="text-3xl font-black text-tinki-dark tracking-tight">
                  {data.plan.precioMes.toFixed(2).replace('.', ',')}
                  <span className="text-base text-tinki-dark/30">€</span>
                </span>
              </div>
              {!isSingle && (
                <div className="flex justify-between mt-1 text-sm">
                  <span className="text-tinki-dark/40">Total</span>
                  <span className="font-bold text-tinki-dark">
                    {data.plan.precioTotal.toFixed(2).replace('.', ',')}€
                  </span>
                </div>
              )}
              {!isSingle && (
                <div className="mt-2 rounded-lg bg-emerald-50 px-3 py-2 text-center">
                  <span className="text-sm font-black text-emerald-700">
                    Ahorras {data.plan.ahorroVsSingle}€/mes vs caja única ({data.plan.ahorroTotal}€ en total)
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center gap-4 text-xs text-tinki-dark/30 pt-1">
              <span className="inline-flex items-center gap-1"><ShieldIcon /> Pago seguro</span>
              <span className="inline-flex items-center gap-1"><TruckIcon /> Envío gratis</span>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs text-center font-bold">
                {error}
              </div>
            )}

            <button
              onClick={() => validarPaso3() && handleSubmit()}
              disabled={loading}
              className="w-full py-4 bg-tinki-orange text-white font-black text-lg rounded-2xl hover:shadow-lg hover:shadow-tinki-orange/25 hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Procesando...
                </span>
              ) : (
                `Pagar ${data.plan.precioTotal.toFixed(2).replace('.', ',')}€`
              )}
            </button>
          </div>
        </section>
      </div>

      <div className="h-16" />
    </div>
  );
}
