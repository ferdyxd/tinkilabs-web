'use client';

import { useRef, useState, useEffect } from 'react';
import NextImage from 'next/image';
import { motion, useInView } from 'motion/react';
import { EmailForm } from '@/components/EmailForm';
import { trackScrollDepth, trackSectionView, trackCTAClick, trackWaitlistSubmit } from '@/lib/tracking';

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
          onClick={() => { scrollTo('#como-empezar'); trackCTAClick('nav'); }}
          className="rounded-full bg-tinki-orange px-3.5 py-1.5 text-[11px] md:text-[12px] font-semibold text-white hover:bg-tinki-orange-dark transition-colors"
        >
          Lista de espera
        </button>
      </div>
    </nav>
  );
}

// ═══════════════════════════════════════════════════════════════
// Sección 1 — Hero (epic-design: 4 capas de profundidad)
// Técnicas: parallax + floating particles + glow reactive al ratón
// + split-converge emoji slot machine + cinematic entrance
// ═══════════════════════════════════════════════════════════════

function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [scrollY, setScrollY] = useState(0);

  // ─── Emoji slot machine → Tinkilabs ──────────────────────
  const TECH_EMOJIS = ['🔧','🔨','⚙️','🔩','🪛','🪚','🔗','🧲','🛠️','⚡','🔌','💡','🏗️','🚀','🛰️','🤖','💻','🖥️','⌨️','🖱️','🕹️','💾','📡','🔬','🧬','🧪','📐','📏','🎛️','🧮','🧰','⏱️','🎯','🧩','🔋','⚛️','💥','🔭','🌀','🪵'];
  const WORD = 'TINKILABS';
  const TOTAL_SHUFFLE_MS = 500;
  const LOCK_STAGGER_MS = 100;
  const EMOJI_TICK_MS = 70;

  const [emojiGrid, setEmojiGrid] = useState<string[]>(() => WORD.split('').map(() => TECH_EMOJIS[0]));

  useEffect(() => {
    setMounted(true);
    const start = Date.now();
    const shuffledUntil: number[] = Array(WORD.length).fill(0).map((_, i) =>
      TOTAL_SHUFFLE_MS + i * LOCK_STAGGER_MS
    );
    const emojis = WORD.split('').map(() => TECH_EMOJIS[Math.floor(Math.random() * TECH_EMOJIS.length)]);
    setEmojiGrid([...emojis]);

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const display = WORD.split('').map((letter, i) => {
        if (elapsed < shuffledUntil[i]) {
          return TECH_EMOJIS[Math.floor(Math.random() * TECH_EMOJIS.length)];
        }
        return letter;
      });
      setEmojiGrid(display);
    }, EMOJI_TICK_MS);

    return () => clearInterval(interval);
  }, []);

  // ─── Ratón + scroll para parallax ─────────────────────────
  useEffect(() => {
    function onMove(e: MouseEvent) {
      setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    }
    function onScroll() {
      setScrollY(window.scrollY);
    }
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // ─── Canvas: partículas geométricas flotantes ─────────────
  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const isMobile = window.matchMedia('(pointer: coarse)').matches;
    const count = isMobile ? 30 : 60;
    const particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; type: 'circle' | 'hex' | 'square'; opacity: number; rotation: number; rotSpeed: number }> = [];

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 18 + 8,
        type: (['circle', 'circle', 'circle', 'hex', 'square'] as const)[Math.floor(Math.random() * 5)],
        opacity: Math.random() * 0.06 + 0.03,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.0015,
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
        p.x += p.vx;
        p.y += p.vy;
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

  const parallaxY = scrollY * 0.15;

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[#F5F5F7] px-5 pt-20 pb-24 md:px-6 md:pt-16"
    >
      {/* ─── depth-0: fondo base ─── */}
      <div className="absolute inset-0 bg-[#F5F5F7]" aria-hidden="true" />

      {/* ─── depth-1: gradiente atmosférico (parallax sutil) ─── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          transform: `translateY(${parallaxY * 0.3}px)`,
          background: `radial-gradient(ellipse at ${50 + (mouse.x - 0.5) * 15}% ${40 + (mouse.y - 0.5) * 12}%, rgba(255,107,53,0.08) 0%, transparent 60%)`,
        }}
        aria-hidden="true"
      />

      {/* ─── depth-2: partículas canvas ─── */}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0" aria-hidden="true" />

      {/* ─── depth-4: contenido principal ─── */}
      <div className="relative z-10 text-center" style={{ transform: `translateY(${-parallaxY * 0.5}px)` }}>
        {/* Emoji slot machine → Tinkilabs */}
        <h1 className="text-[clamp(2.2rem,7vw,5.5rem)] font-display font-extrabold leading-[1.05] tracking-[-0.03em] text-[#1D1D1F]">
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

        {/* Tinki mascot */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <NextImage
            src="/images/brand/icons/tinki-hero.svg"
            alt="Tinkilabs"
            width={160}
            height={160}
            className="mx-auto h-auto w-[120px] sm:w-[160px] mt-4"
            priority
          />
        </motion.div>

        {/* Glow + Claim */}
        <motion.div
          className="relative mt-6 inline-block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.5 }}
        >
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[140px] w-[540px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 transition-[background] duration-1000"
            style={{
              background: `radial-gradient(ellipse at ${50 + (mouse.x - 0.5) * 10}% ${50 + (mouse.y - 0.5) * 10}%, rgba(255,107,53,0.35) 0%, rgba(255,107,53,0.12) 40%, transparent 70%)`,
            }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            aria-hidden="true"
          />
          <motion.p
            className="relative text-[clamp(1.1rem,2.5vw,1.8rem)] font-semibold leading-relaxed text-[#1D1D1F]/85"
            style={{ textWrap: 'balance' as const }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.5, ease: [0.22, 0.61, 0.36, 1] }}
          >
            Imagina. Construye. Alucina.
          </motion.p>
        </motion.div>

        {/* Descripción */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.9, ease: [0.22, 0.61, 0.36, 1] }}
          className="mt-8 max-w-md text-[clamp(0.95rem,1.5vw,1.15rem)] leading-relaxed text-[#1D1D1F]/55"
          style={{ textWrap: 'balance' as const }}
        >
          Cajas de ingeniería por suscripción. Para niños y niñas de 6 a 9 años.
          Una máquina de verdad cada mes. Construida con sus manos.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.3, ease: [0.22, 0.61, 0.36, 1] }}
          className="mt-10"
        >
          <a
            href="#como-empezar"
            onClick={() => trackCTAClick('hero')}
            className="inline-flex items-center gap-2 rounded-full bg-tinki-orange px-6 py-3.5 md:px-8 md:py-4 text-sm md:text-base font-semibold text-white shadow-md shadow-tinki-orange/20 transition-all hover:bg-tinki-orange-dark hover:shadow-lg active:scale-[0.97]"
          >
            Únete gratis a la lista de espera
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.6, ease: [0.22, 0.61, 0.36, 1] }}
          className="mt-5 text-sm text-[#1D1D1F]/50"
        >
          Sin compromiso. Sin letra pequeña.
        </motion.p>
      </div>

      {/* ─── depth-5: "¿Quieres saber más?" flotante ─── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 3.0 }}
        className="absolute bottom-6 md:bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer group"
        onClick={() => {
          trackCTAClick('hero_arrow');
          const el = document.querySelector('#que-es');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-[13px] md:text-[15px] font-medium text-[#1D1D1F]/50 group-hover:text-tinki-orange transition-colors">
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
// Sección 2 — Qué es Tinkilabs (epic-design scrub timeline)
// Técnica: scrub timeline + sticky pin + depth layers
// El vídeo avanza frame a frame según el scroll, como un
// "scroll scrub" cinematográfico. Funciona en desktop y móvil.
// ═══════════════════════════════════════════════════════════════

const TOTAL_FRAMES = 151;
const STEPS = [
  {
    title: 'Una suscripción mensual.',
    body: 'Cada mes recibes una caja con una máquina de verdad por construir. Engranajes, muelles, mecanismos. No es un juguete: es ingeniería de la buena.',
    icon: '📦',
    range: [0, 0.35] as [number, number],
  },
  {
    title: 'Llega a tu casa.',
    body: 'Envío gratis a toda España peninsular. Sin salir de casa, sin horarios, sin prisas. Tú decides cuándo construir.',
    icon: '🏠',
    range: [0.35, 0.68] as [number, number],
  },
  {
    title: 'Construyes en familia.',
    body: 'Tú, tu hijo, una mesa llena de piezas y un momento que no se parece a nada más. Cuando termináis, la máquina funciona. Y la habéis construido juntos.',
    icon: '🔧',
    range: [0.68, 1] as [number, number],
  },
];

// ─── Iconos de Liyana para feature cards ───
const STEP_ICONS: Record<string, string> = {
  '🔧': '/images/brand/icons/wrench.svg',
  '🏠': '/images/brand/icons/target.svg',
};

function QueEsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  // ─── Precargar frames ─────────────────────────────────────
  useEffect(() => {
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      new Image().src = `/images/sequence/frame-${String(i).padStart(2, '0')}.webp`;
    }
  }, []);

  // ─── Scroll scrubbing con imágenes + rAF ──────────────────
  useEffect(() => {
    let ticking = false;

    function scrub() {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionH = sectionRef.current.offsetHeight;
      const viewH = window.innerHeight;
      const p = Math.max(0, Math.min(1, -rect.top / (sectionH - viewH)));

      setProgress(p);
      const frame = Math.floor(p * (TOTAL_FRAMES - 1)) + 1;
      if (imgRef.current) {
        imgRef.current.src = `/images/sequence/frame-${String(frame).padStart(2, '0')}.webp`;
      }

      const stepIdx = STEPS.findIndex((s) => p >= s.range[0] && p <= s.range[1]);
      if (stepIdx !== -1 && stepIdx !== activeStep) setActiveStep(stepIdx);

      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(scrub);
        ticking = true;
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [activeStep]);

  return (
    <section
      id="que-es"
      ref={sectionRef}
      className="relative bg-[#F5F5F7]"
      style={{ height: '250vh' }}
    >
      <div className="sticky top-0 h-screen flex items-start justify-center px-5 md:px-8 pt-12 md:pt-20">
        {/* Columna izquierda: texto */}
        <div className="relative z-10 flex flex-col w-full md:w-[420px] lg:w-[480px]">
          <div className="space-y-8 md:space-y-14">
            {STEPS.map((step, i) => {
              const isActive = activeStep === i;
              return (
                <div
                  key={i}
                  className="transition-all duration-600 ease-out"
                  style={{
                    opacity: isActive ? 1 : 0.18,
                    transform: isActive ? 'translateX(0)' : 'translateX(12px)',
                    filter: isActive ? 'blur(0px)' : 'blur(0.5px)',
                  }}
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8E8ED] text-lg mb-3">
                    {step.icon}
                  </span>
                  <p className="text-[clamp(1.5rem,3vw,2.5rem)] font-extrabold leading-[1.15] tracking-[-0.02em] text-[#1D1D1F]">
                    {step.title}
                  </p>
                  <p
                    className="mt-2 max-w-md text-[clamp(0.9rem,1.2vw,1.05rem)] leading-relaxed text-[#1D1D1F]/65"
                    style={{ textWrap: 'pretty' as const }}
                  >
                    {step.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Columna derecha: imagen secuencial */}
        <div className="relative z-10 flex-shrink-0 w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px]">
          {/* Imagen secuencial — funciona en todos los dispositivos */}
          <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl bg-black shadow-2xl shadow-black/50">
            <img
              ref={imgRef}
              src="/images/sequence/frame-01.webp"
              alt="Tinkilabs caja"
              className="h-full w-full object-cover"
            />
            {/* Overlay sutil para dar profundidad */}
            <div
              className="pointer-events-none absolute inset-0 transition-opacity duration-700"
              style={{
                background: 'linear-gradient(to top, rgba(10,10,15,0.5) 0%, transparent 20%, transparent 80%, rgba(10,10,15,0.3) 100%)',
              }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* ─── depth-5: barra de progreso inferior ─── */}
      <div className="sticky top-0 h-screen pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
          <div className="h-[2px] w-[120px] md:w-[200px] overflow-hidden rounded-full bg-black/[0.06]">
            <div
              className="h-full rounded-full bg-tinki-orange/60 transition-[width] duration-75"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <span className="text-[11px] text-[#1D1D1F]/25 tabular-nums">
            {Math.round(progress * 100)}%
          </span>
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

// ─── Mapa de iconos: emoji → SVG de Liyana ───
const ICON_SVG_MAP: Record<string, string> = {
  '🔧': '/images/brand/icons/wrench.svg',
};

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
          className="mt-12 md:mt-16 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {BENEFICIOS.map((b) => (
            <div key={b.titulo} className="group flex items-start gap-4 rounded-2xl p-5 transition-colors hover:bg-[#F5F5F7]">
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#F5F5F7] transition-colors group-hover:bg-tinki-orange/10">
                {ICON_SVG_MAP[b.icono] ? (
                  <img src={ICON_SVG_MAP[b.icono]} alt="" className="h-5 w-5" />
                ) : (
                  <span className="text-xl">{b.icono}</span>
                )}
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
    <section id="como-empezar" ref={ref} className="bg-tinki-orange px-5 py-20 md:px-6 md:py-32 safe-bottom">
      <div className="mx-auto max-w-[600px] text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
        >
          {/* Tinki */}
          <div className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <img
              src="/images/brand/icons/tinki-head.svg"
              alt="Tinki"
              className="h-14 w-14"
            />
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
          <EmailForm variant="dark" onSuccess={trackWaitlistSubmit} />
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
    <footer className="bg-[#F5F5F7] px-5 md:px-6 py-8 safe-bottom">
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
  // ─── Tracking: scroll depth ───────────────────────────────
  useEffect(() => {
    const fired = new Set<number>();
    function onScroll() {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      for (const depth of [25, 50, 75, 100]) {
        if (scrollPercent >= depth && !fired.has(depth)) {
          fired.add(depth);
          trackScrollDepth(depth);
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ─── Tracking: section views ──────────────────────────────
  useEffect(() => {
    const fired = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !fired.has(entry.target.id)) {
            fired.add(entry.target.id);
            trackSectionView(entry.target.id);
          }
        }
      },
      { threshold: 0.3 }
    );
    document.querySelectorAll('section[id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // ─── Estilos ──────────────────────────────────────────────
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
