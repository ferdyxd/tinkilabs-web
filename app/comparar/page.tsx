'use client';

import { useState } from 'react';
import Link from 'next/link';

// ─── Datos de planes ──────────────────────────────────────────────

interface Plan {
  linea: string;
  edad: string;
  precio: string;
  frecuencia: string;
  incluye: string[];
  envio: string;
  activo: boolean;
  badge?: string;
  color: string;
  colorBg: string;
  colorBorder: string;
}

const planes: Plan[] = [
  {
    linea: 'Tinki Mini',
    edad: '3-5 años',
    precio: '19.90€/mes',
    frecuencia: '1 caja al mes',
    incluye: [
      'Proyectos más simples y guiados',
      'Piezas más grandes, sin piezas pequeñas',
      'Ilustraciones a todo color',
      'Guía para padres incluida',
    ],
    envio: 'Envío gratis (península)',
    activo: false,
    badge: 'Próximamente',
    color: 'amber',
    colorBg: 'bg-amber-50',
    colorBorder: 'border-amber-200',
  },
  {
    linea: 'Tinki Maker',
    edad: '6-9 años',
    precio: '24.90€/mes',
    frecuencia: '1 caja al mes',
    incluye: [
      'Máquina mecánica de verdad cada mes',
      'Madera de abedul natural',
      'Instrucciones en cómic con Tinki',
      'Sin pantallas, sin plástico',
      'Insignia coleccionable del mes',
    ],
    envio: 'Envío gratis siempre',
    activo: true,
    badge: 'Recomendado',
    color: 'orange',
    colorBg: 'bg-orange-50',
    colorBorder: 'border-orange-300',
  },
  {
    linea: 'Tinki Pro',
    edad: '10-14 años',
    precio: '29.90€/mes',
    frecuencia: '1 caja al mes',
    incluye: [
      'Mecanismos más avanzados',
      'Mayor complejidad y piezas',
      'Conceptos de física aplicada',
      'Retos de ingeniería y optimización',
      'Insignia coleccionable del mes',
    ],
    envio: 'Envío gratis siempre',
    activo: false,
    badge: 'Próximamente',
    color: 'blue',
    colorBg: 'bg-blue-50',
    colorBorder: 'border-blue-200',
  },
];

// ─── Iconos SVG inline ─────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg className="h-4 w-4 shrink-0 text-green-500" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}

function GiftIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="13" rx="2" />
      <path d="M12 8V21M12 8H7a3 3 0 010-6c2.5 0 5 3 5 6zm0 0h5a3 3 0 000-6c-2.5 0-5 3-5 6z" />
    </svg>
  );
}

function FlashlightIcon() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 10V6a6 6 0 0112 0v4" />
      <rect x="6" y="10" width="12" height="8" rx="2" />
      <line x1="10" y1="18" x2="14" y2="18" />
      <line x1="12" y1="18" x2="12" y2="22" />
    </svg>
  );
}

function LetterIcon() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 4L12 13L2 4" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function BadgeIcon() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L9 7H3l4.5 3.5L5 16l7-4 7 4-2.5-5.5L21 7h-6L12 2z" />
      <circle cx="12" cy="10.5" r="2.5" />
    </svg>
  );
}

// ─── Quiz ──────────────────────────────────────────────────────────

function Quiz() {
  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState<Record<string, string>>({});

  const preguntas = [
    {
      id: 'edad',
      pregunta: '¿Cuántos años tiene el constructor?',
      opciones: [
        { label: '3-5 años', value: 'mini' },
        { label: '6-9 años', value: 'maker' },
        { label: '10-14 años', value: 'pro' },
      ],
    },
    {
      id: 'experiencia',
      pregunta: '¿Ha construido cosas antes?',
      opciones: [
        { label: 'Nunca, es su primera vez', value: 'mini' },
        { label: 'Algo ha montado (Lego, puzzles)', value: 'maker' },
        { label: 'Le encanta trastear y montar cosas', value: 'pro' },
      ],
    },
    {
      id: 'estilo',
      pregunta: '¿Qué le motiva más?',
      opciones: [
        { label: 'Colores, formas y juego libre', value: 'mini' },
        { label: 'Construir algo que funcione de verdad', value: 'maker' },
        { label: 'Entender cómo funciona por dentro', value: 'pro' },
      ],
    },
  ];

  const elegir = (qId: string, value: string) => {
    const nuevas = { ...respuestas, [qId]: value };
    setRespuestas(nuevas);
    if (paso < preguntas.length) setPaso(paso + 1);
  };

  const resultado = () => {
    const counts: Record<string, number> = { mini: 0, maker: 0, pro: 0 };
    Object.values(respuestas).forEach((v) => { counts[v] = (counts[v] || 0) + 1; });
    const ganador = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
    const nombres: Record<string, string> = { mini: 'Tinki Mini', maker: 'Tinki Maker', pro: 'Tinki Pro' };
    const links: Record<string, string> = { mini: '#tinki-mini', maker: '#tinki-maker', pro: '#tinki-pro' };
    return { nombre: nombres[ganador], link: links[ganador] };
  };

  const reiniciar = () => {
    setPaso(0);
    setRespuestas({});
  };

  if (paso >= preguntas.length) {
    const res = resultado();
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-orange-200 bg-orange-50/60 p-6 text-center">
        <p className="text-sm font-semibold text-orange-600">Tu recomendación</p>
        <p className="mt-2 text-2xl font-black text-tinki-dark">{res.nombre}</p>
        <a href={res.link} className="mt-4 inline-block rounded-xl bg-tinki-orange px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-orange-600 active:scale-95">
          Ver plan
        </a>
        <button onClick={reiniciar} className="mt-3 block w-full text-xs text-tinki-dark/30 hover:text-tinki-dark/50 transition-colors">
          Repetir quiz
        </button>
      </div>
    );
  }

  const actual = preguntas[paso];

  return (
    <div className="mx-auto max-w-md">
      {/* Progreso */}
      <div className="mb-4 flex justify-center gap-1.5">
        {preguntas.map((_, i) => (
          <span key={i} className={`h-1.5 w-8 rounded-full transition-colors ${i <= paso ? 'bg-tinki-orange' : 'bg-orange-200'}`} />
        ))}
      </div>

      <p className="mb-4 text-center text-lg font-bold text-tinki-dark">{actual.pregunta}</p>

      <div className="space-y-2">
        {actual.opciones.map((op) => (
          <button
            key={op.value}
            onClick={() => elegir(actual.id, op.value)}
            className="w-full rounded-xl border border-orange-200 bg-white px-4 py-3 text-left text-sm font-medium text-tinki-dark transition-all hover:border-tinki-orange hover:bg-orange-50/50 active:scale-[0.98]"
          >
            {op.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Tabla comparativa ─────────────────────────────────────────────

function TablaComparativa() {
  const filas = [
    { label: 'Edad', valores: ['3-5 años', '6-9 años', '10-14 años'] },
    { label: 'Precio', valores: ['19.90€/mes', '24.90€/mes', '29.90€/mes'] },
    { label: 'Frecuencia', valores: ['1 caja al mes', '1 caja al mes', '1 caja al mes'] },
    { label: 'Material', valores: ['Madera y cartón', 'Madera de abedul', 'Madera de abedul'] },
    { label: 'Complejidad', valores: ['Baja', 'Media', 'Alta'] },
    { label: 'Instrucciones', valores: ['Ilustradas', 'Cómic con Tinki', 'Cómic con Tinki'] },
    { label: 'Envío', valores: ['Gratis (península)', 'Gratis siempre', 'Gratis siempre'] },
    { label: 'Motorizado', valores: ['No', 'Algunos kits', 'Algunos kits'] },
    { label: 'Insignia', valores: ['-', 'Incluida', 'Incluida'] },
    {
      label: 'Botín incluido',
      valores: [
        'Plano Secreto UV + Chapa coleccionable',
        'Plano UV + Carta Tinki + Reto Mensual + Chapa + Póster A3',
        'Plano UV + Carta Tinki + Reto Mensual + Chapa + Póster A3',
      ],
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px] text-left text-sm">
        <thead>
          <tr className="border-b border-orange-100">
            <th className="py-3 pr-4 text-xs font-semibold uppercase tracking-wider text-tinki-dark/40" />
            <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-amber-600">Mini</th>
            <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-tinki-orange">Maker</th>
            <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-blue-600">Pro</th>
          </tr>
        </thead>
        <tbody>
          {filas.map((fila, i) => (
            <tr key={fila.label} className={i % 2 === 0 ? 'bg-orange-50/30' : ''}>
              <td className="py-2.5 pr-4 font-medium text-tinki-dark/70">{fila.label}</td>
              {fila.valores.map((v, j) => (
                <td key={j} className={`px-4 py-2.5 text-center ${j === 1 ? 'font-semibold text-tinki-dark' : 'text-tinki-dark/50'}`}>
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Página ────────────────────────────────────────────────────────

export default function CompararPage() {
  return (
    <main id="main-content">
      {/* ─── Header ─────────────────────────────────────────────── */}
      <section className="bg-white pb-8 pt-28 sm:pb-12 sm:pt-36">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <span className="inline-block rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-tinki-orange">
            Planes
          </span>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-tinki-dark sm:text-5xl">
            Elige tu línea
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-tinki-dark/45 sm:text-base">
            Una suscripción, tres caminos. Todos sin pantallas y con madera de verdad.
          </p>
        </div>
      </section>

      {/* ─── Quiz ────────────────────────────────────────────────── */}
      <section className="bg-white pb-16 sm:pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-2xl border border-orange-100 bg-orange-50/30 p-6 sm:p-10">
            <h2 className="mb-2 text-center text-xl font-bold text-tinki-dark sm:text-2xl">
              ¿No sabes cuál elegir?
            </h2>
            <p className="mb-6 text-center text-sm text-tinki-dark/40">
              Responde 3 preguntas y te ayudamos.
            </p>
            <Quiz />
          </div>
        </div>
      </section>

      {/* ─── 3 columnas ──────────────────────────────────────────── */}
      <section className="bg-white pb-20 sm:pb-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
            {planes.map((plan) => (
              <div
                key={plan.linea}
                id={`tinki-${plan.linea.split(' ')[1].toLowerCase()}`}
                className={`relative rounded-2xl border-2 p-6 sm:p-8 transition-shadow hover:shadow-lg ${
                  plan.activo ? 'border-orange-400 shadow-md shadow-orange-100' : 'border-gray-200 opacity-75'
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <span
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wide ${
                      plan.activo
                        ? 'bg-tinki-orange text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {plan.badge}
                  </span>
                )}

                {/* Contenido */}
                <div className="mt-2 text-center">
                  <h3 className="text-xl font-black text-tinki-dark">{plan.linea}</h3>
                  <p className="mt-1 text-sm text-tinki-dark/45">{plan.edad}</p>

                  {/* Precio */}
                  <div className="mt-5">
                    <span className="text-4xl font-black text-tinki-dark">{plan.precio.split('/')[0]}</span>
                    <span className="text-sm text-tinki-dark/40">/mes</span>
                  </div>
                  <p className="mt-1 text-xs text-tinki-dark/30">{plan.frecuencia}</p>

                  {/* Lista */}
                  <ul className="mt-6 space-y-2.5 text-left">
                    {plan.incluye.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-tinki-dark/60">
                        <CheckIcon />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Envío */}
                  <p className="mt-6 text-xs font-medium text-tinki-dark/35">{plan.envio}</p>

                  {/* CTA */}
                  {plan.activo ? (
                    <Link
                      href="/suscribete"
                      className="mt-6 block w-full rounded-xl bg-tinki-orange px-6 py-3 text-center text-sm font-bold text-white transition-all hover:bg-orange-600 active:scale-95"
                    >
                      Suscríbete
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="mt-6 w-full rounded-xl bg-gray-100 px-6 py-3 text-center text-sm font-bold text-gray-400 cursor-not-allowed"
                    >
                      Próximamente
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Tabla comparativa completa ───────────────────────────── */}
      <section className="bg-white pb-20 sm:pb-28">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-center text-2xl font-black tracking-tight text-tinki-dark sm:text-3xl">
            Comparativa detallada
          </h2>
          <TablaComparativa />
        </div>
      </section>

      {/* ─── Sistema de recompensas ──────────────────────────────── */}
      <section className="bg-white pb-16 sm:pb-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="inline-block rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-tinki-orange">
            Más que una caja
          </span>
          <h2 className="mt-4 text-2xl font-black tracking-tight text-tinki-dark sm:text-3xl">
            Cada caja esconde un botín
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-tinki-dark/45">
            Dentro de cada caja no solo hay piezas. Hay 4 sorpresas que convierten
            cada mes en una aventura.
          </p>

          {/* 4 cartas de recompensa */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                Icon: FlashlightIcon,
                titulo: 'Plano Secreto',
                subtitulo: 'Tinta invisible UV',
                texto: 'Ilumina el plano con la linterna UV y descubre el mecanismo oculto. El momento más compartido en redes.',
              },
              {
                Icon: LetterIcon,
                titulo: 'Carta de Tinki',
                subtitulo: 'Escrita a mano',
                texto: 'Cada mes Tinki te escribe una carta con una palabra secreta. 12 cartas, 12 pistas, un misterio.',
              },
              {
                Icon: TargetIcon,
                titulo: 'Reto Mensual',
                subtitulo: 'Misión de ingeniería',
                texto: 'Construye algo con materiales de casa, grábate y Tinki puede compartir tu vídeo con el mundo.',
              },
              {
                Icon: BadgeIcon,
                titulo: 'Chapa + Póster',
                subtitulo: '12 huecos que llenar',
                texto: 'Cada caja trae una chapa distinta. Llena los 12 huecos del póster y completa tu Guarida de Ingeniero.',
              },
            ].map(({ Icon, titulo, subtitulo, texto }) => (
              <div
                key={titulo}
                className="group rounded-2xl border border-orange-100 bg-white p-5 text-left transition-colors transition-shadow duration-200 focus-within:ring-2 focus-within:ring-tinki-orange/30 hover:border-orange-200 hover:shadow-md"
              >
                <div className="text-tinki-orange">
                  <Icon />
                </div>
                <h3 className="mt-3 font-bold text-tinki-dark">{titulo}</h3>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-tinki-orange">
                  {subtitulo}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-tinki-dark/50">
                  {texto}
                </p>
              </div>
            ))}
          </div>

          {/* Extra primera caja */}
          <div className="mt-8 rounded-2xl border-2 border-orange-200 bg-orange-50/50 p-6 text-center">
            <p className="inline-flex items-center gap-2 text-sm font-bold text-tinki-orange">
              <GiftIcon /> Solo en tu primera caja
            </p>
            <p className="mt-2 text-lg font-black text-tinki-dark">
              Parche Fundador · Póster A3 · Pasaporte colaborativo
            </p>
            <p className="mt-1 text-sm text-tinki-dark/50">
              Porque los primeros 500 merecen algo especial.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Regalar ──────────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-orange-50/50 to-white pb-24 pt-16 sm:pb-32 sm:pt-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-tinki-orange/10 text-tinki-orange">
            <GiftIcon />
          </div>
          <h2 className="mt-6 text-2xl font-black tracking-tight text-tinki-dark sm:text-3xl">
            ¿Es para regalar?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-tinki-dark/45 sm:text-base">
            Un certificado de regalo de Tinkilabs es el regalo perfecto para un cumpleaños, Navidad o "porque sí".
            Tú eliges la línea y la duración, nosotros ponemos la ilusión.
          </p>
          <Link
            href="/regalo"
            className="mt-6 inline-block rounded-xl border-2 border-tinki-orange px-8 py-3 text-sm font-bold text-tinki-orange transition-all hover:bg-tinki-orange hover:text-white active:scale-95"
          >
            Comprar certificado de regalo
          </Link>
        </div>
      </section>
    </main>
  );
}
