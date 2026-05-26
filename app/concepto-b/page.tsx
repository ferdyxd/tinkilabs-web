import { ScrollReveal } from '@/components/ScrollReveal';
import { EmailForm } from '@/components/EmailForm';
import { Counter } from '@/components/Counter';

export default function ConceptoB() {
  return (
    <div className="snap-story bg-[#0A0A14] text-white">
      {/* ============================================================
          SECCIÓN 1 — "Todo empieza con una caja"
          ============================================================ */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20">
        {/* Fondo atmosférico */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-tinki-orange/5 blur-[150px]" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-10">
          {/* Caja ilustrada */}
          <ScrollReveal animation="scale">
            <div className="relative mx-auto">
              {/* Sombra */}
              <div className="absolute -bottom-4 left-1/2 h-6 w-44 -translate-x-1/2 rounded-[50%] bg-tinki-orange/10 blur-lg" />

              {/* Cuerpo de la caja */}
              <div className="relative h-40 w-56 rounded-2xl border-2 border-[#B8875A] bg-[#D4A574] shadow-2xl">
                {/* Línea central (cierre de la caja) */}
                <div className="absolute left-0 top-[45%] h-[2px] w-full bg-[#B8875A]/40" />

                {/* Tuerca de Tinki en el centro */}
                <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#B8875A]/30 bg-[#C4956A]/50">
                  <span className="text-4xl filter drop-shadow-lg">🔩</span>
                </div>

                {/* Cinta de embalaje (detalle realista) */}
                <div className="absolute left-1/2 top-0 h-full w-10 -translate-x-1/2 bg-white/10" />
              </div>

              {/* Destello sutil en el logo */}
              <div
                className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-tinki-orange/10 blur-md"
                style={{ animation: 'glowPulse 3s ease-in-out infinite' }}
              />
            </div>
          </ScrollReveal>

          {/* Texto */}
          <ScrollReveal animation="rise" delay={300}>
            <p className="text-center text-2xl font-light tracking-wide text-white/70 sm:text-3xl">
              Todo empieza con una caja
            </p>
            <p className="mt-2 text-center text-sm text-white/30">
              Una caja que cabe en tu buzón. Pero lo que hay dentro no te lo esperas.
            </p>
          </ScrollReveal>

          {/* Scroll hint */}
          <div className="absolute bottom-10 animate-bounce">
            <svg className="h-6 w-6 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECCIÓN 2 — "La abres"
          ============================================================ */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-1/3 top-1/4 h-[400px] w-[400px] rounded-full bg-tinki-orange/8 blur-[120px]" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-10">
          {/* Caja abriéndose */}
          <ScrollReveal animation="scale">
            <div className="relative mx-auto" style={{ perspective: '600px' }}>
              <div className="relative h-36 w-52">
                {/* Base de la caja */}
                <div className="absolute bottom-0 h-28 w-52 rounded-xl border-2 border-[#B8875A] bg-[#C4956A]">
                  {/* Brillo interior */}
                  <div className="absolute inset-x-4 top-3 h-16 rounded-lg bg-tinki-orange/10 blur-sm" />
                </div>

                {/* Tapa abriéndose */}
                <div
                  className="absolute bottom-28 left-0 h-12 w-52 origin-bottom rounded-t-xl border-2 border-b-0 border-[#B8875A] bg-[#D4A574]"
                  style={{
                    animation: 'lidOpen 1.5s ease-out forwards',
                  }}
                />

                {/* Destello que sale de dentro */}
                <div className="absolute bottom-2 left-1/2 h-16 w-16 -translate-x-1/2 rounded-full bg-tinki-orange/20 blur-xl animate-pulse" />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="rise" delay={200}>
            <p className="text-center text-2xl font-light tracking-wide text-white/70 sm:text-3xl">
              La abres
            </p>
            <p className="mt-2 text-center text-sm text-white/30">
              Y dentro hay piezas de madera, engranajes, un muelle. Huele a taller.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ============================================================
          SECCIÓN 3 — "Montas pieza a pieza"
          ============================================================ */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-1/2 h-[300px] w-[300px] rounded-full bg-tinki-orange/6 blur-[100px]" />
          <div className="absolute right-1/4 bottom-1/3 h-[250px] w-[250px] rounded-full bg-amber-500/4 blur-[100px]" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-10">
          {/* Piezas ensamblándose */}
          <ScrollReveal animation="scale">
            <div className="relative h-64 w-80 sm:h-80 sm:w-96">
              {/* Engranaje grande — izquierda */}
              <div
                className="gear-large anim-scale absolute left-4 top-8 h-24 w-24 sm:h-28 sm:w-28"
                style={{ transitionDelay: '0ms' }}
              >
                <svg viewBox="0 0 120 120" className="h-full w-full" style={{ animation: 'gearSpin 8s linear infinite' }}>
                  <circle cx="60" cy="60" r="40" fill="none" stroke="#FF6B35" strokeWidth="8" />
                  <circle cx="60" cy="60" r="15" fill="#FF6B35" opacity="0.8" />
                  {/* Dientes */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                    <rect
                      key={angle}
                      x="52" y="8" width="16" height="18" rx="3"
                      fill="#FF6B35"
                      transform={`rotate(${angle} 60 60)`}
                    />
                  ))}
                </svg>
              </div>

              {/* Engranaje pequeño — acoplado al grande */}
              <div
                className="anim-scale absolute left-[100px] top-[90px] h-16 w-16 sm:left-[120px] sm:top-[100px] sm:h-20 sm:w-20"
                style={{ transitionDelay: '300ms' }}
              >
                <svg viewBox="0 0 80 80" className="h-full w-full" style={{ animation: 'gearSpin 6s linear infinite reverse' }}>
                  <circle cx="40" cy="40" r="25" fill="none" stroke="#FF8C5A" strokeWidth="6" />
                  <circle cx="40" cy="40" r="10" fill="#FF8C5A" opacity="0.8" />
                  {[0, 60, 120, 180, 240, 300].map((angle) => (
                    <rect
                      key={angle}
                      x="34" y="5" width="12" height="14" rx="2"
                      fill="#FF8C5A"
                      transform={`rotate(${angle} 40 40)`}
                    />
                  ))}
                </svg>
              </div>

              {/* Muelle — centro */}
              <div
                className="anim-rise absolute left-[60px] top-[130px] sm:left-[70px] sm:top-[160px]"
                style={{ transitionDelay: '500ms' }}
              >
                <svg viewBox="0 0 80 60" className="h-14 w-20 sm:h-16 sm:w-24" style={{ animation: 'springBounce 2s ease-in-out infinite', transformOrigin: 'top center' }}>
                  <path
                    d="M10 8 L40 22 L10 35 L40 48 L10 58"
                    fill="none"
                    stroke="#FFE14D"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Cuerpo del lanzador — derecha */}
              <div
                className="anim-right absolute right-8 top-10 sm:right-4 sm:top-6"
                style={{ transitionDelay: '700ms' }}
              >
                <div className="h-28 w-20 rounded-2xl border-2 border-tinki-orange/30 bg-tinki-orange/5 sm:h-32 sm:w-24">
                  {/* Ranura de lanzamiento */}
                  <div className="absolute left-1/2 top-3 h-20 w-2 -translate-x-1/2 rounded-full bg-tinki-orange/20 sm:h-24" />
                </div>
              </div>

              {/* Destello central */}
              <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-tinki-orange/5 blur-3xl animate-pulse" />
            </div>
          </ScrollReveal>

          <ScrollReveal animation="rise" delay={400}>
            <p className="text-center text-2xl font-light tracking-wide text-white/70 sm:text-3xl">
              Montas pieza a pieza
            </p>
            <p className="mt-2 text-center text-sm text-white/30">
              Engranajes que encajan. Un muelle que se tensa. Tus manos construyendo algo real.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ============================================================
          SECCIÓN 4 — "Y construyes algo que funciona de verdad"
          ============================================================ */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-tinki-orange/10 blur-[180px]" />
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-tinki-orange/20 blur-[80px] animate-pulse" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-10">
          {/* Lanzador completo disparando */}
          <ScrollReveal animation="scale">
            <div className="relative mx-auto h-64 w-80 sm:h-80 sm:w-96">
              {/* Cuerpo completo del lanzador */}
              <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-end gap-3">
                {/* Base */}
                <div className="h-28 w-36 rounded-2xl border-2 border-tinki-orange/40 bg-gradient-to-b from-tinki-orange/10 to-tinki-orange/5 sm:h-36 sm:w-44">
                  {/* Gatillo */}
                  <div className="absolute -bottom-4 left-1/2 h-6 w-8 -translate-x-1/2 rounded-b-lg border-2 border-t-0 border-tinki-orange/40 bg-tinki-orange/10" />
                </div>
              </div>

              {/* Disco volando */}
              <div
                className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border-3 border-tinki-orange shadow-lg shadow-tinki-orange/40 sm:h-16 sm:w-16"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, #FF8C5A, #FF6B35)',
                  animation: 'discFly 2s ease-out forwards',
                }}
              />

              {/* Estela del disco */}
              <div
                className="absolute left-[30%] top-[30%] h-1 w-24 -rotate-45 rounded-full bg-gradient-to-r from-tinki-orange to-transparent blur-sm sm:w-32"
                style={{ animation: 'discFly 2s ease-out forwards' }}
              />
            </div>
          </ScrollReveal>

          <ScrollReveal animation="rise" delay={300}>
            <p className="text-center text-3xl font-bold tracking-wide sm:text-5xl">
              <span className="text-white">Y construyes algo que</span>{' '}
              <span className="text-tinki-orange">funciona de verdad</span>
            </p>
            <p className="mt-3 text-center text-base text-white/40 sm:text-lg">
              Sin pilas. Sin pantallas. Solo física, mecánica y tus ganas de crear.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ============================================================
          SECCIÓN 5 — Claim final + CTA
          ============================================================ */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0A0A14] via-tinki-dark to-tinki-dark" />

        <div className="relative z-10 flex w-full max-w-lg flex-col items-center gap-8">
          <ScrollReveal animation="scale">
            <span className="text-6xl sm:text-7xl">🔩</span>
          </ScrollReveal>

          <ScrollReveal animation="rise" delay={150}>
            <h1 className="text-center text-5xl font-black leading-[1.1] tracking-tight sm:text-7xl">
              <span className="text-white">Construye.</span>
              <br />
              <span className="gradient-text">Aprende.</span>
              <br />
              <span className="text-white">Alucina.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal animation="rise" delay={300}>
            <p className="text-center text-lg text-white/50 sm:text-xl">
              Una caja cada mes. Un proyecto nuevo. La sensación de decir{' '}
              <span className="text-white/80">&ldquo;lo he construido yo&rdquo;</span>.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="rise" delay={500}>
            <div className="w-full text-center">
              <p className="mb-4 text-sm font-semibold text-white/60">
                Únete a la lista de espera — los primeros 500 tienen 30% de descuento de por vida
              </p>
              <EmailForm />
            </div>
          </ScrollReveal>

          <ScrollReveal animation="rise" delay={700}>
            <Counter variant="dark" />
          </ScrollReveal>

          {/* Tinki firma */}
          <ScrollReveal animation="rise" delay={900}>
            <p className="text-center text-sm text-white/20">
              Tinki te espera. La caja está lista. ¿Te atreves a abrirla?
            </p>
          </ScrollReveal>
        </div>

        <p className="absolute bottom-6 z-10 text-xs text-white/10">
          © {new Date().getFullYear()} Tinkilabs &middot; Hecho con mimo en España
        </p>
      </section>
    </div>
  );
}
