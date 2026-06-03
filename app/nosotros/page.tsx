import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sobre nosotros — Tinkilabs',
  description: 'Somos un equipo pequeño de ingenieros, diseñadores y makers en España. Descubre la historia de Tinkilabs y por qué nos apasiona hacer que construir sea alucinante.',
};

export default function SobreNosotros() {
  return (
    <main id="main-content" className="bg-white">
      {/* ═══════════════════════════════════════════════════════
          SECCIÓN 1 — Hero
          ════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-tinki-dark py-32 sm:py-40">
        {/* Fondo: blueprint sobre oscuro */}
        <div className="pointer-events-none absolute inset-0 pattern-blueprint opacity-[0.06]" aria-hidden="true" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-tinki-orange/8 blur-[180px]" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <span className="inline-block rounded-full border border-tinki-orange/20 bg-tinki-orange/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-tinki-orange">
            Nuestra historia
          </span>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            Imagina. Construye. Alucina.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/50 sm:text-xl">
            Somos un equipo pequeño de ingenieros, diseñadores y makers en España. Fabricamos las cajas que nos habría flipado recibir de pequeños.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECCIÓN 2 — El equipo
          ════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center">
            <p className="text-5xl sm:text-7xl">🔩</p>
            <h2 className="mt-6 text-3xl font-black tracking-tight text-tinki-dark sm:text-5xl">
              Somos una fábrica de ingeniería<br />
              <span className="text-tinki-orange">disfrazada de juguetería</span>
            </h2>
          </div>

          <div className="mt-10 space-y-5 text-base leading-relaxed text-tinki-dark/55 sm:text-lg">
            <p>
              Tinkilabs nació en un garaje de Valladolid con una idea sencilla: ¿y si cada mes le llegase a un niño una caja con todo lo necesario para construir una máquina de verdad? Sin pantallas. Solo piezas de madera, engranajes, muelles y mucha curiosidad.
            </p>
            <p>
              Somos un equipo de cinco personas. Hay un ingeniero mecánico que antes diseñaba maquinaria industrial. Una diseñadora industrial que esculpe prototipos en madera como quien hace ganchillo. Un maker que convierte cualquier idea en un prototipo funcional en 48 horas. Un creativo que pone voz a Tinki y escribe las guías. Y Alby, nuestro fundador, que un día decidió que España se merecía sus propios kits de ingeniería sin tener que pagar 40€ de envío desde Estados Unidos.
            </p>
            <p>
              No tenemos sede corporativa. Trabajamos desde un taller con olor a madera recién cortada, rodeados de cajas, prototipos a medio montar y una pizarra que nunca tiene suficiente espacio. Y nos encanta.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECCIÓN 3 — Misión
          ════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-tinki-light py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 pattern-dots-orange" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <span className="inline-block rounded-full border border-tinki-orange/15 bg-tinki-orange/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-tinki-orange">
            Nuestra misión
          </span>
          <h2 className="mt-6 text-3xl font-black tracking-tight text-tinki-dark sm:text-5xl">
            Enseñar a pensar como un ingeniero
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-tinki-dark/55 sm:text-lg">
            <p>
              No queremos que todos los niños sean ingenieros. Queremos que todos los niños sepan que <span className="font-semibold text-tinki-dark/70">pueden construir cualquier cosa que imaginen</span>. Porque &ldquo;pensar como un ingeniero&rdquo; no es una profesión: es una forma de mirar el mundo. Es ver un problema y pensar &ldquo;esto lo arreglo yo&rdquo;. Es equivocarte, iterar y volver a intentarlo. Es la sensación de tener un montón de piezas sobre la mesa y, una hora después, algo que funciona de verdad.
            </p>
            <p className="text-lg font-medium text-tinki-dark/70 sm:text-xl">
              Y quién mejor para enseñar ingeniería a los niños que un equipo de ingenieros que nunca dejaron de ser niños.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECCIÓN 4 — No solo lo decimos nosotros
          ════════════════════════════════════════════════════ */}
      <section className="border-t border-neutral-100 bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-2xl font-black tracking-tight text-tinki-dark sm:text-4xl">
            No solo lo decimos nosotros
          </h2>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {[
              { nombre: 'Emprendedores', premio: 'Top 10 Startups EdTech España 2025' },
              { nombre: 'South Summit', premio: 'Finalistas Startup Competition 2026' },
              { nombre: 'STEM.org', premio: 'Sello de calidad educativa' },
              { nombre: 'Barcelona Maker Faire', premio: 'Proyecto revelación 2025' },
            ].map((item) => (
              <div
                key={item.nombre}
                className="flex flex-col items-center gap-3 rounded-xl border border-neutral-100 bg-neutral-50/50 p-5 transition-all hover:border-tinki-orange/15 hover:bg-tinki-orange/[0.02] sm:p-6"
              >
                <span className="text-2xl sm:text-3xl">
                  {item.nombre === 'Emprendedores' ? '🏆' : item.nombre === 'South Summit' ? '🚀' : item.nombre === 'STEM.org' ? '🎓' : '🔧'}
                </span>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-tinki-dark/25">
                  {item.nombre}
                </p>
                <p className="text-[13px] font-medium leading-tight text-tinki-dark/55">
                  {item.premio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECCIÓN 5 — El fundador
          ════════════════════════════════════════════════════ */}
      <section className="bg-tinki-light py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <div className="flex flex-col items-center gap-10 text-center sm:flex-row sm:text-left">
            {/* Foto placeholder del fundador */}
            <div className="flex-shrink-0">
              <div className="flex h-40 w-40 items-center justify-center rounded-3xl bg-tinki-orange/10 text-6xl shadow-lg shadow-tinki-orange/5 sm:h-48 sm:w-48">
                🤖
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black tracking-tight text-tinki-dark sm:text-3xl">
                Conoce a Alby
              </h2>
              <p className="mt-1 text-sm font-medium text-tinki-orange">
                Fundador y Chief Tinkering Officer
              </p>
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-tinki-dark/55 sm:text-base">
                <p>
                  Alby lleva construyendo cosas desde que tiene uso de razón. De pequeño desmontaba los juguetes para entender cómo funcionaban. De adolescente arreglaba los electrodomésticos de toda la familia. De adulto se dio cuenta de que los mejores kits de ingeniería para niños solo estaban disponibles en inglés y con 40€ de gastos de envío. Así que decidió crear los suyos propios.
                </p>
                <p>
                  &ldquo;Mi trabajo soñado de pequeño era ser inventor. Ahora mi trabajo es ayudar a miles de niños a descubrir que ellos también pueden serlo. Y eso mola mucho más.&rdquo;
                </p>
                <p className="font-medium text-tinki-dark/65">
                  — Alby
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECCIÓN 6 — Sostenibilidad
          ════════════════════════════════════════════════════ */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center">
            <span className="inline-block rounded-full border border-green-500/15 bg-green-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-green-600">
              Sostenibilidad
            </span>
            <h2 className="mt-6 text-3xl font-black tracking-tight text-tinki-dark sm:text-5xl">
              Ingeniería que cuida el planeta
            </h2>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              {
                icono: '📦',
                titulo: 'Embalaje compostable',
                texto: 'Cajas de cartón sin recubrimientos, plásticos compostables. Están hechas para que jueguen los niños, no para que acaben en el mar.',
              },
              {
                icono: '🌳',
                titulo: 'Juguetes de madera',
                texto: 'Nuestras piezas crecen en los árboles. Madera de abedul certificada FSC, cortada con láser en talleres locales.',
              },
              {
                icono: '🔧',
                titulo: 'Reparables por diseño',
                texto: 'Si algo se rompe, te enviamos la pieza gratis. Nuestros juguetes están hechos para durar generaciones, no para tirarlos.',
              },
            ].map((item) => (
              <div key={item.titulo} className="text-center">
                <span className="text-3xl sm:text-4xl">{item.icono}</span>
                <h3 className="mt-4 text-lg font-bold tracking-tight text-tinki-dark">
                  {item.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-tinki-dark/45">
                  {item.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECCIÓN 7 — Productos
          ════════════════════════════════════════════════════ */}
      <section className="bg-tinki-light py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-3xl font-black tracking-tight text-tinki-dark sm:text-5xl">
            Elige tu línea
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-tinki-dark/45 sm:text-lg">
            Una caja diferente cada mes. Desde los 3 hasta los 14 años. Sin permanencia.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              {
                nombre: 'Tinki Mini',
                edad: '3 — 5 años',
                descripcion: 'Proyectos sencillos con piezas grandes. Manitas pequeñas, ideas gigantes.',
                color: '#F59E0B',
                link: '/suscribete',
              },
              {
                nombre: 'Tinki Maker',
                edad: '6 — 9 años',
                descripcion: 'Mecanismos reales, madera, engranajes. La línea que lo empezó todo.',
                color: '#FF6B35',
                link: '/suscribete',
              },
              {
                nombre: 'Tinki Pro',
                edad: '10 — 14 años',
                descripcion: 'Electrónica básica y mecánica avanzada. Para los que quieren llegar más lejos.',
                color: '#E55A2B',
                link: '/suscribete',
              },
            ].map((plan) => (
              <Link
                key={plan.nombre}
                href={plan.link}
                className="group flex flex-col items-center rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:shadow-tinki-orange/5 sm:p-8"
              >
                <div className="mb-4 h-1.5 w-12 rounded-full" style={{ background: plan.color }} />
                <h3 className="text-xl font-black tracking-tight text-tinki-dark">{plan.nombre}</h3>
                <p className="mt-1 text-xs font-medium text-tinki-dark/30">{plan.edad}</p>
                <p className="mt-4 text-sm leading-relaxed text-tinki-dark/50">{plan.descripcion}</p>
                <span className="mt-5 text-[13px] font-semibold text-tinki-orange transition-transform group-hover:translate-x-0.5">
                  Ver planes →
                </span>
              </Link>
            ))}
          </div>

          <Link
            href="/suscribete"
            className="mt-8 inline-block text-[13px] font-semibold text-tinki-orange transition-colors hover:text-tinki-orange-dark"
          >
            Comparar todos los planes →
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECCIÓN 8 — CTA final
          ════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-tinki-dark py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 pattern-grid-blue opacity-[0.04]" aria-hidden="true" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-tinki-orange/8 blur-[120px]" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-xl px-6 text-center">
          <p className="text-5xl sm:text-6xl">🔩</p>
          <p className="mt-6 text-2xl font-black tracking-tight text-white sm:text-4xl">
            Construye. Aprende. Alucina.
          </p>
          <p className="mt-4 text-base leading-relaxed text-white/40 sm:text-lg">
            Una caja cada mes. Un proyecto nuevo. Miles de niños en España están a punto de descubrir lo alucinante que es construir algo con sus propias manos.
          </p>
          <Link
            href="/suscribete"
            className="mt-8 inline-block rounded-xl bg-tinki-orange px-8 py-4 text-sm font-bold text-white shadow-lg shadow-tinki-orange/25 transition-all hover:bg-tinki-orange-dark hover:shadow-xl hover:shadow-tinki-orange/30 active:scale-[0.97]"
          >
            Empieza ahora
          </Link>
        </div>
      </section>
    </main>
  );
}
