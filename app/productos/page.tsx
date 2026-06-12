'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Lang = 'es' | 'en';

interface Producto {
  id: number;
  nombre: string;
  nombre_en: string;
  linea?: string;
  edad?: string;
  edad_en?: string;
  pvp?: string;
  margen?: string;
  mecanismo: string;
  mecanismo_en: string;
  referenciaUrl?: string;
  referenciaLabel?: string;
  referenciaLabel_en?: string;
  imagen?: string;
  badge?: string;
  badge_en?: string;
  esEspecial?: boolean;
}

const productos: Producto[] = [
  {
    id: 1, nombre: 'Tinki Launcher', nombre_en: 'Tinki Launcher',
    linea: 'Tinki Maker', edad: '6-9 años', edad_en: '6-9 years',
    pvp: '24.90€', margen: '50%',
    mecanismo: 'Lanzador pump-action, muelle, cargador 6 discos',
    mecanismo_en: 'Pump-action launcher, spring, 6-disc magazine',
    referenciaUrl: 'https://www.youtube.com/watch?v=9AiQxV_khb4', referenciaLabel: 'Ver en YouTube', referenciaLabel_en: 'Watch on YouTube',
    imagen: '/images/productos/01-launcher.jpg',
  },
  {
    id: 2, nombre: 'Tinki Dominó', nombre_en: 'Tinki Domino',
    linea: 'Tinki Maker', edad: '6-9 años', edad_en: '6-9 years',
    pvp: '29.90€', margen: '46%',
    mecanismo: 'Robot mecánico que coloca fichas de dominó',
    mecanismo_en: 'Mechanical robot that places domino tiles',
    referenciaUrl: 'https://www.kiwico.com/us/store/dp/domino-machine-project-kit/3827', referenciaLabel: 'Ver en KiwiCo', referenciaLabel_en: 'View on KiwiCo',
    imagen: '/images/productos/02-domino.jpg',
  },
  {
    id: 3, nombre: 'Tinki Laberinto', nombre_en: 'Tinki Maze',
    linea: 'Tinki Maker', edad: '6-9 años', edad_en: '6-9 years',
    pvp: '24.90€', margen: '58%',
    mecanismo: 'Laberinto basculante construible, tableros intercambiables',
    mecanismo_en: 'Buildable tilting maze, interchangeable boards',
    referenciaUrl: 'https://www.kiwico.com/es/store/dp/maze-arcade/6186', referenciaLabel: 'Ver en KiwiCo', referenciaLabel_en: 'View on KiwiCo',
    imagen: '/images/productos/03-laberinto.webp',
  },
  {
    id: 4, nombre: 'Tinki Garra', nombre_en: 'Tinki Claw',
    linea: 'Tinki Maker', edad: '6-9 años', edad_en: '6-9 years',
    pvp: '24.90€', margen: '70%',
    mecanismo: 'Garra mecánica con tendones',
    mecanismo_en: 'Mechanical claw with tendon system',
    referenciaUrl: 'https://www.kiwico.com/es/store/dp/mega-hand/6526', referenciaLabel: 'Ver en KiwiCo', referenciaLabel_en: 'View on KiwiCo',
    imagen: '/images/productos/04-garra.webp',
  },
  {
    id: 5, nombre: 'Tinki Aviones', nombre_en: 'Tinki Planes',
    linea: 'Tinki Maker', edad: '6-9 años', edad_en: '6-9 years',
    pvp: '19.90€', margen: '78%',
    mecanismo: 'Lanzador de aviones de papel con muelle + papel diseños',
    mecanismo_en: 'Paper airplane launcher with spring + design templates',
    referenciaUrl: 'https://www.crunchlabs.com/products/paper-airplane-launcher', referenciaLabel: 'Ver en CrunchLabs', referenciaLabel_en: 'View on CrunchLabs',
    imagen: '/images/productos/05-aviones.png',
  },
  {
    id: 6, nombre: 'Tinki Peonzas', nombre_en: 'Tinki Tops',
    linea: 'Tinki Maker', edad: '6-9 años', edad_en: '6-9 years',
    pvp: '22.90€', margen: '83%',
    mecanismo: 'Peonzas de madera intercambiables, física de rotación',
    mecanismo_en: 'Interchangeable wooden spinning tops, rotation physics',
    referenciaUrl: 'https://www.kiwico.com/es/store/dp/transforming-tops/6357', referenciaLabel: 'Ver en KiwiCo', referenciaLabel_en: 'View on KiwiCo',
    imagen: '/images/productos/06-peonzas.webp',
  },
  {
    id: 7, nombre: 'Tinki Pinball', nombre_en: 'Tinki Pinball',
    linea: 'Tinki Maker', edad: '6-9 años', edad_en: '6-9 years',
    pvp: '22.90€', margen: '59%',
    mecanismo: 'Pinball de sobremesa construible, 100% mecánico',
    mecanismo_en: 'Buildable tabletop pinball, 100% mechanical',
    referenciaUrl: 'https://www.kiwico.com/es/store/dp/desktop-pinball/6465', referenciaLabel: 'Ver en KiwiCo', referenciaLabel_en: 'View on KiwiCo',
    imagen: '/images/productos/07-pinball.webp',
  },
  {
    id: 8, nombre: 'Tinki Catapulta', nombre_en: 'Tinki Catapult',
    linea: 'Tinki Maker', edad: '6-9 años', edad_en: '6-9 years',
    pvp: '22.90€', margen: '69%',
    mecanismo: 'Catapulta de feria con tablero de puntuación',
    mecanismo_en: 'Fairground catapult with scoreboard',
    referenciaUrl: 'https://www.kiwico.com/es/store/dp/arcade-catapult-project-kit/2014', referenciaLabel: 'Ver en KiwiCo', referenciaLabel_en: 'View on KiwiCo',
    imagen: '/images/productos/08-catapulta.jpg',
  },
  {
    id: 9, nombre: 'Tinki Bolos', nombre_en: 'Tinki Bowling',
    linea: 'Tinki Maker', edad: '6-9 años', edad_en: '6-9 years',
    pvp: '22.90€', margen: '59%',
    mecanismo: 'Bolera de sobremesa con lanzador y bolos',
    mecanismo_en: 'Tabletop bowling alley with launcher and pins',
    referenciaUrl: 'https://www.kiwico.com/es/store/dp/bowling-arcade/6756', referenciaLabel: 'Ver en KiwiCo', referenciaLabel_en: 'View on KiwiCo',
    imagen: '/images/productos/09-bolos.webp',
  },
  {
    id: 10, nombre: 'Tinki Robot', nombre_en: 'Tinki Robot',
    linea: 'Tinki Maker', edad: '6-9 años', edad_en: '6-9 years',
    pvp: '29.90€', margen: '59%',
    mecanismo: 'Robot andante motorizado, mecánica de marcha',
    mecanismo_en: 'Motorized walking robot, walking mechanics',
    referenciaUrl: 'https://www.kiwico.com/es/store/dp/walking-robot-project-kit/1986', referenciaLabel: 'Ver en KiwiCo', referenciaLabel_en: 'View on KiwiCo',
    imagen: '/images/productos/10-robot.jpg',
  },
  {
    id: 11, nombre: 'Tinki Cuerda', nombre_en: 'Tinki String',
    linea: 'Tinki Maker', edad: '6-9 años', edad_en: '6-9 years',
    pvp: '24.90€', margen: '53%',
    mecanismo: 'Lanzador de cuerda fluorescente que flota',
    mecanismo_en: 'Glow-in-the-dark string shooter that floats',
    referenciaUrl: 'https://www.youtube.com/watch?v=cWAiLMJko-c', referenciaLabel: 'Ver en YouTube', referenciaLabel_en: 'Watch on YouTube',
    imagen: '/images/productos/11-cuerda.jpg',
  },
  {
    id: 12, nombre: 'Tinki Blaster', nombre_en: 'Tinki Blaster',
    linea: 'Tinki Maker', edad: '6-9 años', edad_en: '6-9 years',
    pvp: '19.90€', margen: '72%',
    mecanismo: 'Lanzador de gomas elásticas semiautomático',
    mecanismo_en: 'Semi-automatic rubber band blaster',
    referenciaUrl: 'https://www.youtube.com/watch?v=3RYlp4f1j5w', referenciaLabel: 'Ver en YouTube', referenciaLabel_en: 'Watch on YouTube',
    imagen: '/images/productos/12-blaster.jpg',
  },
];

const reserva: Producto[] = [
  {
    id: 13, nombre: 'Tinki Estuche', nombre_en: 'Tinki Pencil Box',
    linea: 'Tinki Maker', edad: '6-9 años', edad_en: '6-9 years',
    pvp: '22.90€',
    mecanismo: 'Estuche pop-up con mecanismo de tijera, construible',
    mecanismo_en: 'Pop-up pencil box with scissor mechanism, buildable',
    referenciaUrl: 'https://www.youtube.com/watch?v=8sKFHwbKAdI', referenciaLabel: 'Ver en YouTube', referenciaLabel_en: 'Watch on YouTube',
    imagen: '/images/productos/13-estuche.jpg',
  },
  {
    id: 14, nombre: 'Tinki Maze 3D', nombre_en: 'Tinki Maze 3D',
    linea: 'Tinki Maker', edad: '6-9 años', edad_en: '6-9 years',
    pvp: '29.90€',
    mecanismo: 'Laberinto 3D de 3 niveles con joystick basculante',
    mecanismo_en: '3-level 3D maze with tilting joystick',
    referenciaUrl: 'https://www.youtube.com/watch?v=pUbwDYcLQMQ', referenciaLabel: 'Ver en YouTube', referenciaLabel_en: 'Watch on YouTube',
    imagen: '/images/productos/14-maze3d.jpg',
  },
  {
    id: 15, nombre: 'Tinki Basket', nombre_en: 'Tinki Basketball',
    linea: 'Tinki Maker', edad: '6-9 años', edad_en: '6-9 years',
    pvp: '22.90€',
    mecanismo: 'Catapulta de baloncesto, canasta ajustable, marcador',
    mecanismo_en: 'Basketball catapult, adjustable hoop, scoreboard',
    referenciaUrl: 'https://www.kiwico.com/es/store/dp/basketball-catapult-project-kit/6121', referenciaLabel: 'Ver en KiwiCo', referenciaLabel_en: 'View on KiwiCo',
    imagen: '/images/productos/15-basket.webp',
  },
  {
    id: 16, nombre: 'Tinki Cohetes', nombre_en: 'Tinki Rockets',
    linea: 'Tinki Maker', edad: '6-9 años', edad_en: '6-9 years',
    pvp: '22.90€',
    mecanismo: 'Cohetes de muñeca propulsados por aire comprimido',
    mecanismo_en: 'Air-powered wrist rockets',
    referenciaUrl: 'https://www.youtube.com/watch?v=kFViI4l1Ouo', referenciaLabel: 'Ver en YouTube', referenciaLabel_en: 'Watch on YouTube',
    imagen: '/images/productos/16-cohetes.jpg',
  },
  {
    id: 17, nombre: 'Tinki Cohete de Botella', nombre_en: 'Tinki Bottle Rocket',
    linea: 'Tinki Maker', edad: '8-14 años', edad_en: '8-14 years',
    pvp: '24.90€',
    mecanismo: 'Cohete de botella con propulsión química, plataforma de lanzamiento',
    mecanismo_en: 'Chemical-powered bottle rocket with launch pad',
    referenciaUrl: 'https://www.youtube.com/watch?v=UsweDl0jEFM', referenciaLabel: 'Ver en YouTube', referenciaLabel_en: 'Watch on YouTube',
    imagen: '/images/productos/17-cohete-botella.jpg',
  },
  {
    id: 18, nombre: 'Tinki Arte Giratorio', nombre_en: 'Tinki Spin Art',
    linea: 'Tinki Maker', edad: '6-9 años', edad_en: '6-9 years',
    pvp: '22.90€',
    mecanismo: 'Máquina de arte giratorio, discos de papel, salpicadura controlada',
    mecanismo_en: 'Spin art machine, paper discs, controlled splatter',
    referenciaUrl: 'https://www.youtube.com/watch?v=3tK78PNvlDQ', referenciaLabel: 'Ver en YouTube', referenciaLabel_en: 'Watch on YouTube',
    imagen: '/images/productos/18-arte-giratorio.jpg',
  },
  {
    id: 19, nombre: 'Tinki Arco', nombre_en: 'Tinki Archery',
    linea: 'Tinki Maker', edad: '6-9 años', edad_en: '6-9 years',
    pvp: '22.90€',
    mecanismo: 'Arco de tiro con flechas de ventosa, diana plegable',
    mecanismo_en: 'Bow with suction-cup arrows, folding target',
    referenciaUrl: 'https://www.youtube.com/watch?v=Kam4wbJyZiQ', referenciaLabel: 'Ver en YouTube', referenciaLabel_en: 'Watch on YouTube',
    imagen: '/images/productos/19-arco.jpg',
  },
  {
    id: 20, nombre: 'Tinki Brazo Pinza', nombre_en: 'Tinki Grabber Arm',
    linea: 'Tinki Maker', edad: '6-9 años', edad_en: '6-9 years',
    pvp: '24.90€',
    mecanismo: 'Brazo mecánico extensible con pinza de agarre, sistema de palancas',
    mecanismo_en: 'Extendable mechanical arm with gripper, lever system',
    referenciaUrl: 'https://www.youtube.com/watch?v=yiPgewWdvkg', referenciaLabel: 'Ver en YouTube', referenciaLabel_en: 'Watch on YouTube',
    imagen: '/images/productos/20-brazo-pinza.jpg',
  },
  {
    id: 21, nombre: 'Tinki Bazooka', nombre_en: 'Tinki Bazooka',
    linea: 'Tinki Maker', edad: '6-9 años', edad_en: '6-9 years',
    pvp: '24.90€',
    mecanismo: 'Ballesta de mano con muelles de torsión, gatillo y proyectiles',
    mecanismo_en: 'Handheld ballista with torsion springs, trigger and projectiles',
    referenciaUrl: 'https://www.youtube.com/watch?v=G-amev5f_SI', referenciaLabel: 'Ver en YouTube', referenciaLabel_en: 'Watch on YouTube',
    imagen: '/images/productos/21-bazooka.jpg',
  },
];

const especiales: Producto[] = [
  {
    id: 98, nombre: 'Tinki Navidad', nombre_en: 'Tinki Christmas',
    pvp: '34.90€',
    mecanismo: 'Calendario de adviento: 24 mini construcciones de madera, poblado navideño completo',
    mecanismo_en: 'Advent calendar: 24 mini wooden builds, complete Christmas village',
    referenciaUrl: 'https://kiwicotoys.com/christmas-village-advent-calendar/', referenciaLabel: 'Ver referencia', referenciaLabel_en: 'View reference',
    imagen: '/images/productos/15-navidad.jpg',
    badge: 'Oct-Dic', badge_en: 'Oct-Dec',
    esEspecial: true,
  },
  {
    id: 99, nombre: 'Tinki City', nombre_en: 'Tinki City',
    mecanismo: 'Ciudad modular por meses. Cada caja añade un edificio. Compatible con Tinki Navidad.',
    mecanismo_en: 'Monthly modular city. Each box adds a building. Compatible with Tinki Christmas.',
    badge: 'Futuro', badge_en: 'Future',
    esEspecial: true,
  },
];

const t = {
  es: {
    catalog: 'Catálogo de productos',
    roadmapTitle1: 'Los 12 productos ',
    roadmapTitle2: 'Tinkilabs',
    reservaTitle1: 'En ',
    reservaTitle2: 'reserva',
    roadmapDesc: 'Roadmap completo del primer año. Una caja nueva cada mes. Cada producto incluye su referencia original para que podáis verlo en acción.',
    reservaDesc: 'Candidatos para el año 2 y productos especiales de temporada. Pendientes de confirmar.',
    roadmapTab: 'Roadmap 2026',
    reservaTab: 'En reserva',
    products: 'productos',
    candidates: 'candidatos año 2',
    specials: 'especiales',
    candidatesH2: 'Candidatos año 2',
    specialsH2: 'Productos especiales',
    tbd: 'Por definir',
    footerRoadmap: 'Roadmap año 1',
    footerReserva: 'Reserva y especiales',
    internal: 'Presentación interna',
  },
  en: {
    catalog: 'Product Catalog',
    roadmapTitle1: 'The 12 ',
    roadmapTitle2: 'Tinkilabs',
    reservaTitle1: 'In ',
    reservaTitle2: 'reserve',
    roadmapDesc: 'Full first-year roadmap. One new box every month. Each product includes its original reference so you can see it in action.',
    reservaDesc: 'Year 2 candidates and seasonal specials. Pending confirmation.',
    roadmapTab: '2026 Roadmap',
    reservaTab: 'Reserve',
    products: 'products',
    candidates: 'year 2 candidates',
    specials: 'specials',
    candidatesH2: 'Year 2 Candidates',
    specialsH2: 'Special Products',
    tbd: 'TBD',
    footerRoadmap: 'Year 1 Roadmap',
    footerReserva: 'Reserve & Specials',
    internal: 'Internal presentation',
  },
};

function ProductoCard({ p, lang }: { p: Producto; lang: Lang }) {
  const tieneLink = !!p.referenciaUrl;
  const Tag = tieneLink ? 'a' : 'div';
  const nombre = lang === 'en' ? p.nombre_en : p.nombre;
  const mecanismo = lang === 'en' ? p.mecanismo_en : p.mecanismo;
  const label = lang === 'en' ? (p.referenciaLabel_en || p.referenciaLabel) : p.referenciaLabel;
  const edad = lang === 'en' ? (p.edad_en || p.edad) : p.edad;
  const badge = lang === 'en' ? (p.badge_en || p.badge) : p.badge;

  return (
    <Tag
      href={tieneLink ? p.referenciaUrl : undefined}
      target={tieneLink ? '_blank' : undefined}
      rel={tieneLink ? 'noopener noreferrer' : undefined}
      className={`group block overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] transition-all duration-300 ${
        tieneLink
          ? 'hover:border-tinki-orange/20 hover:bg-white/[0.04] hover:shadow-lg hover:shadow-tinki-orange/5 cursor-pointer'
          : 'cursor-default'
      }`}
    >
      <div className="relative aspect-square overflow-hidden">
        {p.imagen ? (
          <img
            src={p.imagen}
            alt={nombre}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900 p-6">
            <span className="text-5xl">📦</span>
            <span className="mt-3 text-center text-sm font-bold uppercase tracking-wider text-white/60">
              {nombre}
            </span>
          </div>
        )}

        {tieneLink && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
            <span className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-black opacity-0 transition-all duration-300 group-hover:opacity-100">
              {label} →
            </span>
          </div>
        )}

        {badge && (
          <div className={`absolute left-3 top-3 rounded-lg px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm ${
            p.esEspecial ? 'bg-amber-500/60' : 'bg-black/60'
          }`}>
            {badge}
          </div>
        )}
        {!badge && !p.esEspecial && (
          <div className="absolute left-3 top-3 rounded-lg bg-black/60 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">
            N.º {p.id}
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-base font-bold tracking-tight">{nombre}</h3>
        <p className="mt-1 text-xs leading-relaxed text-white/35">{mecanismo}</p>
        <div className="mt-3 flex items-center justify-between">
          {edad && (
            <span className="text-xs text-white/20">{edad}</span>
          )}
        </div>
      </div>
    </Tag>
  );
}

type Tab = 'roadmap' | 'reserva';

export default function ProductosPage() {
  const [tab, setTab] = useState<Tab>('roadmap');
  const [lang, setLang] = useState<Lang>('es');
  const [userName, setUserName] = useState<string | null>(null);
  const tx = t[lang];

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data && setUserName(data.name))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-[#08080F] text-white">
      {/* Header */}
      <header className="border-b border-white/5 px-6 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-white hover:text-tinki-orange transition-colors"
          >
            Tinkilabs
          </Link>
          <div className="flex items-center gap-3">
            {/* Toggle idioma */}
            <button
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-white/50 transition-all hover:border-tinki-orange/30 hover:text-tinki-orange/70"
              title={lang === 'es' ? 'Switch to English' : 'Cambiar a español'}
            >
              {lang === 'es' ? '🇬🇧 EN' : '🇪🇸 ES'}
            </button>
            {userName && (
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/[0.05] px-3 py-1 text-xs font-medium text-emerald-400/70">
                {userName}
              </span>
            )}
            <span className="rounded-full border border-tinki-orange/20 bg-tinki-orange/5 px-3 py-1 text-xs font-medium text-tinki-orange/70">
              {tx.catalog}
            </span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 py-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {tab === 'roadmap' ? (
            <>{tx.roadmapTitle1}<span className="gradient-text">{tx.roadmapTitle2}</span></>
          ) : (
            <>{tx.reservaTitle1}<span className="gradient-text">{tx.reservaTitle2}</span></>
          )}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-white/40">
          {tab === 'roadmap' ? tx.roadmapDesc : tx.reservaDesc}
        </p>

        {/* Tabs */}
        <div className="mx-auto mt-10 inline-flex rounded-full border border-white/10 bg-white/[0.02] p-1">
          <button
            onClick={() => setTab('roadmap')}
            className={`rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 ${
              tab === 'roadmap'
                ? 'bg-tinki-orange text-white shadow-lg shadow-tinki-orange/20'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            {tx.roadmapTab}
          </button>
          <button
            onClick={() => setTab('reserva')}
            className={`rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 ${
              tab === 'reserva'
                ? 'bg-tinki-orange text-white shadow-lg shadow-tinki-orange/20'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            {tx.reservaTab}
          </button>
        </div>

        {/* Stats — reserva */}
        {tab === 'reserva' && (
          <div className="mx-auto mt-8 grid max-w-md grid-cols-2 gap-4 animate-fade-in">
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <div className="text-2xl font-bold text-tinki-orange">9</div>
              <div className="mt-0.5 text-xs text-white/30">{tx.candidates}</div>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <div className="text-2xl font-bold text-tinki-orange">2</div>
              <div className="mt-0.5 text-xs text-white/30">{tx.specials}</div>
            </div>
          </div>
        )}
      </section>

      {/* Grid — Roadmap */}
      {tab === 'roadmap' && (
        <section className="mx-auto max-w-6xl px-6 pb-24 animate-fade-in">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {productos.map((p) => (
              <ProductoCard key={p.id} p={p} lang={lang} />
            ))}
          </div>
        </section>
      )}

      {/* Grid — Reserva */}
      {tab === 'reserva' && (
        <div className="mx-auto max-w-6xl px-6 pb-24 animate-fade-in">
          <h2 className="mb-5 text-lg font-bold tracking-tight text-white/60">
            {tx.candidatesH2}
          </h2>
          <div className="mb-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reserva.map((p) => (
              <ProductoCard key={p.id} p={p} lang={lang} />
            ))}
          </div>

          <h2 className="mb-5 text-lg font-bold tracking-tight text-white/60">
            {tx.specialsH2}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {especiales.map((p) => (
              <ProductoCard key={p.id} p={p} lang={lang} />
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-6 text-center">
        <p className="text-xs text-white/15">
          Tinkilabs &middot; {tx.internal} &middot; {tab === 'roadmap' ? tx.footerRoadmap : tx.footerReserva}
        </p>
      </footer>
    </div>
  );
}
