import { HeroTitle } from '@/components/HeroTitle';
import { EmailForm } from '@/components/EmailForm';
import { Counter } from '@/components/Counter';
import { HowItWorks } from '@/components/HowItWorks';
import { TestimonialMarquee } from '@/components/TestimonialMarquee';
import { FinalCTA } from '@/components/FinalCTA';
import Image from 'next/image';

export default function Home() {
  return (
    <main id="main-content">
    {/* ═══════════════════════════════════════════════════════
        SECCIÓN 1 — HERO
        ════════════════════════════════════════════════════ */}
    <section className="relative min-h-screen overflow-hidden bg-tinki-light">
      {/* ═══════════════════════════════════════════════════════
          DEPTH 0 — Fondo: papel milimetrado azul ingeniería
          ════════════════════════════════════════════════════ */}
      <div
        className="pointer-events-none absolute inset-0 pattern-grid-blue"
        aria-hidden="true"
      />

      {/* ═══════════════════════════════════════════════════════
          DEPTH 1 — Atmósfera: orbes naranjas cálidos
          ════════════════════════════════════════════════════ */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-20 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tinki-orange/8 blur-[130px]" />
        <div className="absolute top-1/2 -right-32 h-[350px] w-[350px] rounded-full bg-amber-400/5 blur-[100px]" />
        <div className="absolute -bottom-20 left-1/4 h-[300px] w-[300px] rounded-full bg-tinki-orange/5 blur-[90px]" />
      </div>

      {/* ═══════════════════════════════════════════════════════
          DEPTH 2 — Engranajes decorativos flotando
          ════════════════════════════════════════════════════ */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Engranaje grande — arriba izquierda */}
        <div className="gear-decorative absolute left-[8%] top-[15%] h-20 w-20 opacity-[0.06] sm:h-28 sm:w-28">
          <svg viewBox="0 0 120 120" className="h-full w-full">
            <circle cx="60" cy="60" r="40" fill="none" stroke="currentColor" strokeWidth="8" className="text-tinki-orange" />
            <circle cx="60" cy="60" r="15" fill="currentColor" className="text-tinki-orange" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <rect key={angle} x="52" y="8" width="16" height="18" rx="3" fill="currentColor" className="text-tinki-orange" transform={`rotate(${angle} 60 60)`} />
            ))}
          </svg>
        </div>

        {/* Engranaje pequeño — abajo derecha */}
        <div className="gear-decorative-reverse absolute right-[10%] bottom-[20%] h-14 w-14 opacity-[0.05] sm:h-20 sm:w-20">
          <svg viewBox="0 0 80 80" className="h-full w-full">
            <circle cx="40" cy="40" r="25" fill="none" stroke="currentColor" strokeWidth="6" className="text-tinki-orange" />
            <circle cx="40" cy="40" r="10" fill="currentColor" className="text-tinki-orange" />
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <rect key={angle} x="34" y="5" width="12" height="14" rx="2" fill="currentColor" className="text-tinki-orange" transform={`rotate(${angle} 40 40)`} />
            ))}
          </svg>
        </div>

        {/* Puntos de blueprint — dispersos */}
        <div className="absolute left-[20%] top-[40%] h-1.5 w-1.5 rounded-full bg-tinki-orange/15" />
        <div className="absolute right-[25%] top-[25%] h-1 w-1 rounded-full bg-blue-400/15" />
        <div className="absolute left-[35%] bottom-[30%] h-1.5 w-1.5 rounded-full bg-tinki-orange/12" />
        <div className="absolute right-[15%] top-[55%] h-1 w-1 rounded-full bg-blue-400/12" />
      </div>

      {/* ═══════════════════════════════════════════════════════
          CONTENIDO PRINCIPAL — Depth 3 + 4
          ════════════════════════════════════════════════════ */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pb-12 pt-24 sm:pb-16 sm:pt-28">
        <div className="flex w-full max-w-2xl flex-col items-center gap-8 sm:gap-10">

          {/* ─── DEPTH 3: Logo ─── */}
          <div className="float-loop relative">
            <div className="relative">
              <Image
                src="/images/logo_tinki.png"
                alt="Tinkilabs"
                width={240}
                height={240}
                className="h-auto w-[200px] sm:w-[240px]"
                priority
              />
            </div>
          </div>

          {/* ─── DEPTH 4: Texto + Claim ─── */}
          <div className="flex flex-col items-center gap-5 text-center">

            {/* Badge */}
            <span className="inline-block rounded-full border border-tinki-orange/20 bg-tinki-orange/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-tinki-orange">
              Próximo lanzamiento
            </span>

            {/* Claim — Split Converge */}
            <HeroTitle words={['Imagina.', 'Construye.', 'Alucina.']} />

            {/* Subtítulo */}
            <p className="max-w-md text-base leading-relaxed text-tinki-dark/50 sm:text-lg">
              Una caja cada mes con un proyecto de ingeniería real.{' '}
              <span className="font-medium text-tinki-dark/70">Sin pantallas. Solo física, madera y tus ganas de crear.</span>
            </p>

            {/* Formulario */}
            <div className="w-full">
              <p className="mb-3 text-sm font-semibold text-tinki-dark/60">
                Conviértete en <span className="text-tinki-orange">Fundador Tinkilabs</span>. Solo 500.
              </p>
              <EmailForm />
            </div>

            {/* Counter */}
            <Counter />
          </div>
        </div>

        {/* ─── Scroll hint ─── */}
        <div className="absolute bottom-8 animate-bounce">
          <svg className="h-6 w-6 text-tinki-orange/25" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          DEPTH 5 — Partículas foreground (chispas)
          ════════════════════════════════════════════════════ */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-[18%] top-[22%] h-1 w-1 animate-pulse rounded-full bg-tinki-orange/25" style={{ animationDelay: '0.3s' }} />
        <div className="absolute right-[22%] top-[35%] h-1 w-1 animate-pulse rounded-full bg-tinki-orange/20" style={{ animationDelay: '1.1s' }} />
        <div className="absolute left-[28%] bottom-[35%] h-0.5 w-0.5 animate-pulse rounded-full bg-blue-400/20" style={{ animationDelay: '2.0s' }} />
      </div>
    </section>

    {/* ═══════════════════════════════════════════════════════
        SECCIÓN 2 — CÓMO FUNCIONA
        ════════════════════════════════════════════════════ */}
    <HowItWorks />

    {/* ═══════════════════════════════════════════════════════
        SECCIÓN 3 — TESTIMONIOS MARQUEE
        ════════════════════════════════════════════════════ */}
    <TestimonialMarquee />

    {/* ═══════════════════════════════════════════════════════
        SECCIÓN 4 — CTA FINAL
        ════════════════════════════════════════════════════ */}
    <FinalCTA />
    </main>
  );
}
