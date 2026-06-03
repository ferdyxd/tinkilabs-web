'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// ─── Iconos ────────────────────────────────────────────────────────

function RobotIcon() { return <span className="text-5xl">🤖</span>; }
function OvejaIcon() { return <span className="text-5xl">🐑</span>; }
function RocketIcon() { return <span className="text-5xl">🚀</span>; }
function CastorIcon() { return <span className="text-5xl">🦫</span>; }

// ─── Paso animado ──────────────────────────────────────────────────

function PasoRevelado({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Datos del recorrido ───────────────────────────────────────────

const recorrido = [
  {
    id: 'problema',
    titulo: 'Necesitábamos una mascota',
    subtitulo: 'Toda marca de inventores necesita un compañero de aventuras. Tinkilabs no podía ser menos.',
    icon: null,
    contenido:
      'Cuando nació Tinkilabs teníamos claro el producto (cajas con máquinas), el tono ("mola, no educa") y el claim ("Imagina. Construye. Alucina."). Pero nos faltaba la cara visible. Alguien que guiase a los niños en el montaje, que apareciese en la web y en las cajas. Una mascota.',
    color: 'bg-gray-50',
    direccion: 'center',
  },
  {
    id: 'robot',
    titulo: 'Primera idea: el robot',
    subtitulo: 'Parecía obvio. Pero era demasiado obvio.',
    icon: <RobotIcon />,
    contenido:
      'Un robot mola. Un robot construye. Un robot es el estereotipo del inventor. Así que el primer logo de Tinkilabs fue un robot naranja con un engranaje en el pecho. Quedaba bien. Pero cuando lo mirabas dos veces te dabas cuenta: es lo que haría cualquiera. "STEM = robot". No tenía personalidad. No tenía historia. No era Tinki.',
    color: 'bg-slate-50',
    direccion: 'left',
    verdict: 'Demasiado genérico. No transmite nada único.',
  },
  {
    id: 'oveja',
    titulo: 'Segunda idea: la oveja',
    subtitulo: 'Tinki suena a "Tinker", pero también a cositas pequeñas y blanditas.',
    icon: <OvejaIcon />,
    contenido:
      'Alguien dijo "¿y si Tinki es una oveja ingeniera?". La oveja es simpática, cercana, reconocible. Pero no construye. No inventa. No trastea con engranajes. Una oveja da lana — y nosotros vendemos máquinas que lanzan discos. La oveja era adorable, sí. Pero no encajaba con "Construye. Alucina." Tinki no podía ser blandito.',
    color: 'bg-amber-50',
    direccion: 'right',
    verdict: 'Adorable, pero no representa la ingeniería ni la acción.',
  },
  {
    id: 'rocket',
    titulo: 'Tercera idea: el cohete',
    subtitulo: 'Rápido, potente, alucinante. Pero no se queda.',
    icon: <RocketIcon />,
    contenido:
      'Un cohete encapsula "alucinante" a la perfección. Despega, explota, vuela. Pero Tinkilabs no es solo el momento WOW del lanzamiento. Es el proceso: sentarte con tu hijo, sacar las piezas de madera, montar paso a paso. Un cohete va demasiado deprisa. No construye — despega y se va. Queríamos algo que se quedase, que acompañase.',
    color: 'bg-sky-50',
    direccion: 'left',
    verdict: 'Espectacular pero fugaz. Tinkilabs es el viaje, no solo el destino.',
  },
  {
    id: 'castor',
    titulo: 'El momento eureka: el castor',
    subtitulo: 'El ingeniero de la naturaleza. Construye con madera. No hay animal que encaje mejor con "Tinker".',
    icon: <CastorIcon />,
    contenido:
      'Un castor construye presas, diques y madrigueras. Usa madera. Transforma su entorno con ingenio. Es trabajador, preciso, incansable. Y además es adorable sin ser blandito. Cuando lo vimos supimos que era él: Tinki, el castor ingeniero. Con una rueda dentada en el pecho como corazón constructor. El nombre encajaba — Tinker + castor = Tinki. La madera de abedul de nuestras cajas encajaba. Todo encajaba.',
    color: 'bg-orange-50',
    direccion: 'right',
    verdict: 'Perfecto. Construye, usa madera, es ingeniero por naturaleza. Es Tinki.',
  },
];

// ─── Página ────────────────────────────────────────────────────────

export default function NuestroLogoPage() {
  return (
    <main id="main-content">
      {/* ─── Hero ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white pb-12 pt-28 sm:pb-16 sm:pt-36">
        {/* Fondo decorativo: círculos naranjas sutiles */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -right-20 -top-20 h-[400px] w-[400px] rounded-full bg-orange-50/80" />
          <div className="absolute -bottom-32 -left-20 h-[350px] w-[350px] rounded-full bg-amber-50/60" />
          <div className="absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-100/30 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <span className="inline-block rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-tinki-orange">
            La historia de Tinki
          </span>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-tinki-dark sm:text-5xl">
            Cómo encontramos a nuestro castor
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-tinki-dark/45 sm:text-lg">
            Dar con la mascota perfecta no fue fácil. Probamos robots, ovejas y hasta cohetes.
            Esto es lo que pasó.
          </p>

          {/* Logo actual */}
          <div className="mt-8">
            <div className="inline-flex items-center gap-3 rounded-2xl border border-orange-200 bg-white px-6 py-4 shadow-sm">
              <Image
                src="/images/logotinkiweb.png"
                alt="Tinki"
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <div className="text-left">
                <p className="text-lg font-black text-tinki-dark">Tinki</p>
                <p className="text-xs text-tinki-dark/35">El castor ingeniero</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Recorrido ────────────────────────────────────────────── */}
      <section className="bg-white pb-20 sm:pb-32">
        <div className="mx-auto max-w-3xl px-6">
          {/* Línea conectora vertical */}
          <div className="relative">
            <div className="pointer-events-none absolute left-6 top-0 h-full w-px bg-orange-100 sm:left-8" aria-hidden="true" />

            <div className="space-y-16 sm:space-y-24">
              {recorrido.map((paso, i) => (
                <PasoRevelado key={paso.id} delay={i * 100}>
                  <div className="relative pl-14 sm:pl-20">
                    {/* Círculo en la línea */}
                    <div
                      className={`absolute left-[20px] top-1 z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 sm:left-[24px] sm:h-9 sm:w-9 ${
                        paso.id === 'castor'
                          ? 'border-tinki-orange bg-tinki-orange text-white'
                          : 'border-orange-200 bg-white text-tinki-dark/30'
                      }`}
                    >
                      <span className="text-xs font-bold">{i + 1}</span>
                    </div>

                    {/* Contenido */}
                    <div>
                      {/* Fase (solo para el primero) */}
                      {paso.id === 'problema' && (
                        <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.15em] text-tinki-orange/50">
                          El punto de partida
                        </span>
                      )}
                      {paso.id === 'robot' && (
                        <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.15em] text-tinki-orange/50">
                          Las opciones descartadas
                        </span>
                      )}
                      {paso.id === 'castor' && (
                        <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.15em] text-tinki-orange">
                          El elegido
                        </span>
                      )}

                      {/* Icono */}
                      {paso.icon && (
                        <div className="mb-3">{paso.icon}</div>
                      )}

                      <h2 className="text-xl font-black tracking-tight text-tinki-dark sm:text-2xl">
                        {paso.titulo}
                      </h2>
                      <p className="mt-1 text-sm font-medium text-tinki-orange/70">
                        {paso.subtitulo}
                      </p>
                      <p className="mt-3 max-w-prose text-sm leading-relaxed text-tinki-dark/50 sm:text-base">
                        {paso.contenido}
                      </p>

                      {/* Veredicto */}
                      {paso.verdict && (
                        <div className={`mt-4 inline-block rounded-lg px-3 py-1.5 text-xs font-medium ${
                          paso.id === 'castor'
                            ? 'bg-orange-100 text-tinki-orange'
                            : 'bg-gray-100 text-gray-400 line-through'
                        }`}>
                          {paso.verdict}
                        </div>
                      )}
                    </div>
                  </div>
                </PasoRevelado>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Por qué encaja ───────────────────────────────────────── */}
      <section className="bg-orange-50/40 pb-20 pt-16 sm:pb-32 sm:pt-24">
        <div className="mx-auto max-w-3xl px-6">
          <PasoRevelado>
            <div className="text-center">
              <span className="inline-block rounded-full border border-orange-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-tinki-orange">
                Y por qué nos mola
              </span>
              <h2 className="mt-4 text-2xl font-black tracking-tight text-tinki-dark sm:text-3xl">
                Por qué el castor es Tinkilabs
              </h2>
            </div>
          </PasoRevelado>

          <div className="mt-10 grid gap-4 sm:grid-cols-3 sm:gap-6">
            {[
              {
                titulo: 'Construye',
                texto: 'El castor es el ingeniero de la naturaleza. Construye presas, diques y madrigueras con una precisión que ya quisieran muchos arquitectos.',
              },
              {
                titulo: 'Usa madera',
                texto: 'Nuestras cajas son de madera de abedul natural. El castor lleva millones de años trabajando con madera. Es su material, y el nuestro.',
              },
              {
                titulo: 'Transforma',
                texto: 'Un castor no se adapta al entorno: lo transforma. Coge troncos y ramas y los convierte en algo nuevo. Eso es exactamente lo que hace un niño con una caja Tinkilabs.',
              },
            ].map((item, i) => (
              <PasoRevelado key={item.titulo} delay={i * 150}>
                <div className="rounded-2xl border border-orange-100 bg-white p-6 text-center shadow-sm">
                  <h3 className="text-lg font-bold text-tinki-dark">{item.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-tinki-dark/45">{item.texto}</p>
                </div>
              </PasoRevelado>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Cierre ────────────────────────────────────────────────── */}
      <section className="bg-white pb-24 pt-16 sm:pb-36 sm:pt-20">
        <div className="mx-auto max-w-xl px-6 text-center">
          <PasoRevelado>
            <p className="text-lg font-bold text-tinki-dark sm:text-xl">
              Tinki no es solo un logo.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-tinki-dark/45 sm:text-base">
              Es el compañero que guía a cada niño en el montaje. El que hace que abrir una caja de Tinkilabs sea encontrarse con un amigo. El castor ingeniero que llevamos todos dentro.
            </p>
            <p className="mt-6 text-3xl font-black tracking-tight text-tinki-orange sm:text-4xl">
              Imagina. Construye. Alucina.
            </p>
          </PasoRevelado>
        </div>
      </section>
    </main>
  );
}
