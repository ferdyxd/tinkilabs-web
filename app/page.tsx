'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { EmailForm } from '@/components/EmailForm';

// ═══════════════════════════════════════════════════════════════
// Sticky Sub-nav (estilo Mac Mini)
// ═══════════════════════════════════════════════════════════════

const NAV_ITEMS = [
  { label: 'Por qué', href: '#por-que' },
  { label: 'Cómo funciona', href: '#que-es' },
  { label: 'Empezar', href: '#como-empezar' },
];

function StickyNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function scrollTo(id: string) {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        visible
          ? 'translate-y-0 bg-white/80 backdrop-blur-xl border-b border-black/[0.06]'
          : '-translate-y-full'
      }`}
    >
      <div className="mx-auto flex h-12 md:h-[52px] max-w-[1200px] items-center justify-between px-5 md:px-6">
        <button
          onClick={() => scrollTo('#hero')}
          className="text-sm font-bold tracking-tight text-[#1D1D1F] hover:text-tinki-orange transition-colors"
        >
          Tinkilabs
        </button>

        <div className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="text-[13px] text-[#1D1D1F]/70 hover:text-[#1D1D1F] transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => scrollTo('#como-empezar')}
          className="rounded-full bg-tinki-orange px-3.5 py-1.5 text-[11px] md:text-[12px] font-semibold text-white hover:bg-tinki-orange-dark transition-colors"
        >
          Lista de espera
        </button>
      </div>
    </nav>
  );
}

// ═══════════════════════════════════════════════════════════════
// Sección 1 — Hero
// ═══════════════════════════════════════════════════════════════

function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  // ─── Emoji slot machine ──────────────────────────────────
  const TECH_EMOJIS = ['🔧','🔨','⚙️','🔩','🪛','🪚','🔗','🧲','🛠️','⚡','🔌','💡','🏗️','🚀','🛰️','🤖','💻','🖥️','⌨️','🖱️','🕹️','💾','📡','🔬','🧬','🧪','📐','📏','🎛️','🧮','🧰','⏱️','🎯','🧩','🔋','⚛️','💥','🔭','🌀','🪵','🔲','🔳','🔶','🔷','💠'];
  const WORD = 'Tinkilabs';
  const TOTAL_SHUFFLE_MS = 500;  // cuánto duran los emojis antes de empezar a fijar
  const LOCK_STAGGER_MS = 100;   // stagger entre letra y letra al fijarse
  const EMOJI_TICK_MS = 70;      // cada cuánto cambia cada emoji
  const TITLE_DONE_MS = TOTAL_SHUFFLE_MS + WORD.length * LOCK_STAGGER_MS; // ~1.4s

  // Estado inicial: el primer emoji del array repetido, para que servidor y cliente coincidan
  const [emojiGrid, setEmojiGrid] = useState<string[]>(() => WORD.split('').map(() => TECH_EMOJIS[0]));

  useEffect(() => {
    setMounted(true);
    const start = Date.now();
    const shuffledUntil: number[] = Array(WORD.length).fill(0).map((_, i) =>
      TOTAL_SHUFFLE_MS + i * LOCK_STAGGER_MS
    );
    let emojis = WORD.split('').map(() => TECH_EMOJIS[Math.floor(Math.random() * TECH_EMOJIS.length)]);
    setEmojiGrid([...emojis]);

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const display = WORD.split('').map((letter, i) => {
        if (elapsed < shuffledUntil[i]) {
          // Aún en fase shuffle: cambiar emoji
          return TECH_EMOJIS[Math.floor(Math.random() * TECH_EMOJIS.length)];
        }
        // Fase lock-in: mostrar letra real
        return letter;
      });
      setEmojiGrid(display);
    }, EMOJI_TICK_MS);

    return () => clearInterval(interval);
  }, []);

  // Seguir el ratón para el parallax del glow
  useEffect(() => {
    function onMove(e: MouseEvent) {
      setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    }
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Canvas: partículas geométricas flotantes
  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; type: 'circle' | 'hex' | 'square'; opacity: number; rotation: number; rotSpeed: number }> = [];

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Crear partículas
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 22 + 10,
        type: (['circle', 'circle', 'circle', 'hex', 'square'] as const)[Math.floor(Math.random() * 5)],
        opacity: Math.random() * 0.08 + 0.05,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.002,
      });
    }

    function drawHex(cx: number, cy: number, r: number) {
      ctx!.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i;
        const x = cx + r * Math.cos(a);
        const y = cy + r * Math.sin(a);
        i === 0 ? ctx!.moveTo(x, y) : ctx!.lineTo(x, y);
      }
      ctx!.closePath();
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      for (const p of particles) {
        ctx!.save();
        ctx!.translate(p.x, p.y);
        p.rotation += p.rotSpeed;
        ctx!.rotate(p.rotation);
        ctx!.fillStyle = `rgba(255,107,53,${p.opacity * 1.5})`;
        ctx!.strokeStyle = `rgba(255,107,53,${p.opacity * 2})`;
        ctx!.lineWidth = 1;

        if (p.type === 'circle') {
          ctx!.beginPath();
          ctx!.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx!.fill();
        } else if (p.type === 'hex') {
          drawHex(0, 0, p.size / 2);
          ctx!.stroke();
        } else {
          ctx!.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        }
        ctx!.restore();

        // Mover
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < -20) p.x = canvas!.width + 20;
        if (p.x > canvas!.width + 20) p.x = -20;
        if (p.y < -20) p.y = canvas!.height + 20;
        if (p.y > canvas!.height + 20) p.y = -20;
      }

      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [mounted]);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#F5F5F7] px-5 pt-20 pb-24 md:px-6 md:pt-16"
    >
      {/* Canvas de partículas */}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0" aria-hidden="true" />

      <div className="relative z-10 text-center">
        {/* Título: emojis mutando hasta revelar Tinkilabs */}
        <h1
          className="text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#1D1D1F]"
        >
          {emojiGrid.map((char, i) => {
            const isEmoji = char.length > 1;
            return (
              <motion.span
                key={i}
                className="inline-block align-middle"
                style={{ transform: isEmoji ? 'scale(0.5)' : undefined }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
              >
                {char}
              </motion.span>
            );
          })}
        </h1>

        {/* Glow + Claim — aparece al terminar el título (~1.5s) */}
        <motion.div
          className="relative mt-6 inline-block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.5 }}
        >
          {/* Glow pulsante */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[140px] w-[540px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 transition-[background] duration-1000"
            style={{
              background: `radial-gradient(ellipse at ${50 + (mouse.x - 0.5) * 8}% ${50 + (mouse.y - 0.5) * 8}%, rgba(255,107,53,0.35) 0%, rgba(255,107,53,0.12) 40%, transparent 70%)`,
            }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            aria-hidden="true"
          />
          <motion.p
            className="relative text-[clamp(1.2rem,2.5vw,1.8rem)] font-semibold leading-relaxed text-[#1D1D1F]/85"
            style={{ textWrap: 'balance' as const }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.5, ease: [0.22, 0.61, 0.36, 1] }}
          >
            Imagina. Construye. Alucina.
          </motion.p>
        </motion.div>

        {/* Descripción — aparece ~1.9s */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.9, ease: [0.22, 0.61, 0.36, 1] }}
          className="mt-8 max-w-md text-[clamp(1rem,1.5vw,1.15rem)] leading-relaxed text-[#1D1D1F]/55"
          style={{ textWrap: 'balance' as const }}
        >
          Cajas de ingeniería por suscripción. Para niños y niñas de 6 a 9 años.
          Una máquina de verdad cada mes. Construida con sus manos.
        </motion.p>

        {/* CTA — aparece ~2.3s */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.3, ease: [0.22, 0.61, 0.36, 1] }}
          className="mt-10"
        >
          <a
            href="#como-empezar"
            className="inline-flex items-center gap-2 rounded-full bg-tinki-orange px-6 py-3.5 md:px-8 md:py-4 text-sm md:text-base font-semibold text-white shadow-md shadow-tinki-orange/20 transition-all hover:bg-tinki-orange-dark hover:shadow-lg active:scale-[0.97]"
          >
            Únete gratis a la lista de espera
          </a>
        </motion.div>

        {/* Texto legal — aparece ~2.6s */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.6, ease: [0.22, 0.61, 0.36, 1] }}
          className="mt-5 text-sm text-[#1D1D1F]/50"
        >
          Sin compromiso. Sin letra pequeña.
        </motion.p>
      </div>

      {/* "¿Quieres saber más?" — aparece ~3.0s */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 3.0 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer group"
        onClick={() => {
          const el = document.querySelector('#que-es');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-[15px] font-medium text-[#1D1D1F]/50 group-hover:text-tinki-orange transition-colors">
          ¿Quieres saber más?
        </span>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
             className="text-[#1D1D1F]/35 group-hover:text-tinki-orange transition-colors"
             style={{ animation: 'smoothFloat 2s ease-in-out infinite' }}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </motion.div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// Sección 2 — Qué es Tinkilabs (scroll scrubbing)
// ═══════════════════════════════════════════════════════════════

const STEPS = [
  {
    title: 'Una suscripción mensual.',
    body: 'Cada mes recibes una caja con una máquina de verdad por construir. Engranajes, muelles, mecanismos. No es un juguete: es ingeniería de la buena.',
  },
  {
    title: 'Llega a tu casa.',
    body: 'Envío gratis a toda España peninsular. Sin salir de casa, sin horarios, sin prisas. Tú decides cuándo construir.',
  },
  {
    title: 'Construyes en familia.',
    body: 'Tú, tu hijo, una mesa llena de piezas y un momento que no se parece a nada más. Cuando termináis, la máquina funciona. Y la habéis construido juntos.',
  },
];

function QueEsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const videoDesktop = useRef<HTMLVideoElement>(null);
  const videoMobile = useRef<HTMLVideoElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function check() { setIsMobile(window.innerWidth < 768); }
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Scroll scrubbing del vídeo
  useEffect(() => {
    function onScroll() {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const sectionHeight = ref.current.offsetHeight;
      const viewportH = window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / (sectionHeight - viewportH)));

      const video = isMobile ? videoMobile.current : videoDesktop.current;
      if (video && video.readyState >= 2 && video.duration) {
        video.currentTime = progress * video.duration;
      }

      if (progress < 0.2) setActiveStep(0);
      else if (progress < 0.55) setActiveStep(1);
      else setActiveStep(2);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMobile]);

  return (
    <section id="que-es" ref={ref} className="relative bg-[#F5F5F7] md:h-[250vh]">
      {/* Desktop: sticky + 2 columnas con video scrubbing */}
      <div className="hidden md:flex sticky top-0 h-screen items-center">
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-2 items-center gap-12 px-6">
          <div className="relative py-24">
            <div className="space-y-16">
              {STEPS.map((step, i) => (
                <div key={i} className={`transition-all duration-500 ${activeStep === i ? 'opacity-100 translate-x-0' : 'opacity-20 translate-x-2'}`}>
                  <p className="text-4xl font-extrabold tracking-[-0.02em] text-[#1D1D1F]">{step.title}</p>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-[#1D1D1F]/65" style={{ textWrap: 'pretty' as const }}>{step.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="relative flex aspect-[9/16] w-full max-w-[360px] items-center justify-center overflow-hidden rounded-2xl bg-white">
              <video
                ref={videoDesktop}
                src="/videos/hero.mp4"
                preload="auto"
                muted
                playsInline
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Móvil: video arriba, texto debajo */}
      <div className="md:hidden px-5 py-20">
        <div className="mx-auto max-w-[400px]">
          <div className="flex aspect-[9/16] w-full items-center justify-center overflow-hidden rounded-2xl bg-white">
            <video
              ref={videoMobile}
              src="/videos/hero.mp4"
              preload="auto"
              muted
              playsInline
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-10 space-y-10">
            {STEPS.map((step) => (
              <div key={step.title}>
                <p className="text-2xl font-extrabold tracking-[-0.02em] text-[#1D1D1F]">{step.title}</p>
                <p className="mt-2 text-base leading-relaxed text-[#1D1D1F]/65" style={{ textWrap: 'pretty' as const }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// Sección 2 — Por qué Tinkilabs (estilo Apple "Why buy")
// ═══════════════════════════════════════════════════════════════

// Ordenado según brief: suscripción, familia, piezas / tinki, sin pantallas, envío
const BENEFICIOS = [
  {
    icono: '📦',
    titulo: 'Una caja cada mes.',
    texto: 'Suscripción flexible, sin permanencia. Recibes un kit nuevo y empieza la aventura.',
  },
  {
    icono: '👨‍👩‍👧',
    titulo: 'Momentos que recordaréis.',
    texto: 'Construir juntos une. Y cuando esa máquina se mueve, la cara de orgullo de tu hijo no tiene precio.',
  },
  {
    icono: '🔧',
    titulo: 'Piezas de precisión.',
    texto: 'Encajan, se montan, se desmontan. Materiales pensados para durar y resistir sesiones intensivas de juego.',
  },
  {
    icono: '🧠',
    titulo: 'Confianza para resolver problemas.',
    texto: 'Tu hijo se enfrenta a un reto mecánico real. Lo supera. Y descubre que puede con ello. Solo.',
  },
  {
    icono: '📵',
    titulo: 'Sin pantallas, sin pilas.',
    texto: 'Manos, piezas y cerebro. Nada de iPad, nada de apps. Ingeniería analógica que engancha más que una pantalla.',
  },
  {
    icono: '🚚',
    titulo: 'Envío gratis, siempre.',
    texto: 'A cualquier parte de España peninsular. Sin coste adicional. Sin sorpresas en el checkout.',
  },
];

function PorQueSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section id="por-que" ref={ref} className="bg-white px-5 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-[980px]">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-[13px] font-semibold uppercase tracking-[0.06em] text-tinki-orange"
        >
          Tinkilabs ayuda a tu hijo a crecer
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-center text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold leading-[1.15] tracking-[-0.02em] text-[#1D1D1F]"
        >
          No es solo una caja.
          <br />
          <span className="text-tinki-orange">Es un antes y un después.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {BENEFICIOS.map((b) => (
            <div key={b.titulo} className="group flex items-start gap-4 rounded-2xl p-5 transition-colors hover:bg-[#F5F5F7]">
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#F5F5F7] text-xl transition-colors group-hover:bg-tinki-orange/10">
                {b.icono}
              </span>
              <div className="min-w-0">
                <h3 className="text-[15px] font-bold leading-snug text-[#1D1D1F]">{b.titulo}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-[#1D1D1F]/55"
                   style={{ textWrap: 'pretty' as const }}>
                  {b.texto}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// Sección 4 — Cómo empezar
// ═══════════════════════════════════════════════════════════════

function ComoEmpezarSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section id="como-empezar" ref={ref} className="bg-tinki-orange px-5 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-[600px] text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
        >
          {/* Tinki placeholder */}
          <div className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-full bg-white/20 text-5xl backdrop-blur-sm">
            🦫
          </div>

          <blockquote className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold leading-tight text-white"
                      style={{ textWrap: 'balance' as const }}>
            &ldquo;Yo te guío. Tú construyes. ¿Empezamos?&rdquo;
          </blockquote>
          <cite className="mt-3 block text-base font-medium text-white/80">
            — Tinki
          </cite>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12"
        >
          <EmailForm variant="dark" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-8 text-sm font-semibold text-white/80"
        >
          Los primeros 500 tienen -30% de por vida.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-2 text-sm text-white/65"
        >
          Sin spam. Sin compromiso. Solo te avisamos cuando lancemos.
        </motion.p>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// Footer
// ═══════════════════════════════════════════════════════════════

function Footer() {
  return (
    <footer className="bg-[#F5F5F7] px-6 py-8">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-xs text-[#1D1D1F]/35">
          Tinkilabs &copy; 2026
        </p>
        <div className="flex gap-5 text-xs text-[#1D1D1F]/35">
          <a href="/terminos" className="hover:text-[#1D1D1F]/55 transition-colors">Términos</a>
          <a href="/privacidad" className="hover:text-[#1D1D1F]/55 transition-colors">Privacidad</a>
          <a href="/aviso-legal" className="hover:text-[#1D1D1F]/55 transition-colors">Aviso legal</a>
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════
// Página
// ═══════════════════════════════════════════════════════════════

export default function LandingPage() {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes smoothFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(6px); }
      }
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return (
    <main className="bg-white text-[#1D1D1F] antialiased">
      <StickyNav />
      <HeroSection />
      <PorQueSection />
      <QueEsSection />
      <ComoEmpezarSection />
      <Footer />
    </main>
  );
}
