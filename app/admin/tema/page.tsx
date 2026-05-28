'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

// ─── Tipos ──────────────────────────────────────────────────

interface PaletteColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  background: string;
  backgroundAlt: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  success: string;
  error: string;
}

type PaletteName = 'tinkilabs' | 'ocean' | 'forest' | 'sunset';

const paletteLabels: Record<PaletteName, string> = {
  tinkilabs: 'Tinkilabs (Naranja)',
  ocean: 'Ocean (Azul)',
  forest: 'Forest (Verde)',
  sunset: 'Sunset (Ámbar)',
};

// Valores por defecto (fallback)
const defaultPalettes: Record<PaletteName, PaletteColors> = {
  tinkilabs: { primary:'#FF6B35', primaryLight:'#FF8C5A', primaryDark:'#E55A2B', background:'#FAFAFA', backgroundAlt:'#08080F', surface:'#FFFFFF', text:'#1A1A2E', textMuted:'#6B7280', border:'rgba(255,255,255,0.05)', success:'#10B981', error:'#EF4444' },
  ocean:     { primary:'#0EA5E9', primaryLight:'#38BDF8', primaryDark:'#0284C7', background:'#F8FAFC', backgroundAlt:'#0F172A', surface:'#FFFFFF', text:'#0F172A', textMuted:'#64748B', border:'rgba(148,163,184,0.15)', success:'#10B981', error:'#EF4444' },
  forest:    { primary:'#22C55E', primaryLight:'#4ADE80', primaryDark:'#16A34A', background:'#F5F5F0', backgroundAlt:'#1A2E1A', surface:'#FFFFFF', text:'#1A2E1A', textMuted:'#6B7280', border:'rgba(34,197,94,0.1)', success:'#22C55E', error:'#EF4444' },
  sunset:    { primary:'#F59E0B', primaryLight:'#FBBF24', primaryDark:'#D97706', background:'#FFFBEB', backgroundAlt:'#1C1917', surface:'#FFFFFF', text:'#1C1917', textMuted:'#78716C', border:'rgba(245,158,11,0.1)', success:'#10B981', error:'#EF4444' },
};

const colorLabels: Record<keyof PaletteColors, string> = {
  primary: 'Principal',
  primaryLight: 'Principal claro',
  primaryDark: 'Principal oscuro',
  background: 'Fondo',
  backgroundAlt: 'Fondo alternativo',
  surface: 'Superficie',
  text: 'Texto',
  textMuted: 'Texto secundario',
  border: 'Bordes',
  success: 'Éxito',
  error: 'Error',
};

const googleFonts = [
  'Inter', 'Geist Sans', 'Outfit', 'DM Sans', 'Space Grotesk',
  'Plus Jakarta Sans', 'Manrope', 'Satoshi', 'Poppins', 'Raleway',
  'Nunito', 'Montserrat', 'Lato', 'Open Sans', 'Roboto',
  'Playfair Display', 'Merriweather', 'Source Serif 4', 'Lora',
  'JetBrains Mono', 'Fira Code', 'IBM Plex Mono',
];

// ─── Componente principal ───────────────────────────────────

export default function AdminTemaPage() {
  const [palettes, setPalettes] = useState(defaultPalettes);
  const [activePalette, setActivePalette] = useState<PaletteName>('tinkilabs');
  const [fontSans, setFontSans] = useState('Inter');
  const [fontDisplay, setFontDisplay] = useState('Geist Sans');
  const [fontMono, setFontMono] = useState('JetBrains Mono');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);

  const current = palettes[activePalette];

  // Aplicar cambios visuales en tiempo real
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', current.primary);
    root.style.setProperty('--color-primary-light', current.primaryLight);
    root.style.setProperty('--color-primary-dark', current.primaryDark);
    root.style.setProperty('--color-background', current.background);
    root.style.setProperty('--color-background-alt', current.backgroundAlt);
    root.style.setProperty('--color-surface', current.surface);
    root.style.setProperty('--color-text', current.text);
    root.style.setProperty('--color-text-muted', current.textMuted);
    root.style.setProperty('--color-border', current.border);
    root.style.setProperty('--color-success', current.success);
    root.style.setProperty('--color-error', current.error);
    root.style.setProperty('--font-sans', fontSans);
    root.style.setProperty('--font-display', fontDisplay);
    root.style.setProperty('--font-mono', fontMono);
  }, [current, fontSans, fontDisplay, fontMono]);

  // Cargar fuentes de Google
  useEffect(() => {
    const fonts = [fontSans, fontDisplay, fontMono].filter(Boolean).join('&family=');
    if (!fonts) return;
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${fonts.replace(/ /g, '+')}&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, [fontSans, fontDisplay, fontMono]);

  // Cargar tema desde API
  useEffect(() => {
    if (!authed) return;
    fetch('/api/admin/theme')
      .then(r => r.json())
      .then(data => {
        if (data.activePalette) setActivePalette(data.activePalette);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [authed]);

  const updateColor = useCallback((key: keyof PaletteColors, value: string) => {
    setPalettes(prev => ({
      ...prev,
      [activePalette]: { ...prev[activePalette], [key]: value },
    }));
    setSaved(false);
  }, [activePalette]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await fetch('/api/admin/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activePalette, palettes }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {}
    setLoading(false);
  };

  const [loginError, setLoginError] = useState('');

  const handleLogin = async () => {
    setLoginError('');
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setAuthed(true);
      } else {
        setLoginError('Contraseña incorrecta');
      }
    } catch {
      setLoginError('Error de conexión');
    }
  };

  // ─── Login ──────────────────────────────────────────────

  const bg = current.backgroundAlt;
  const surface = current.backgroundAlt === '#FAFAFA' || current.backgroundAlt === '#F8FAFC' || current.backgroundAlt === '#F5F5F0' || current.backgroundAlt === '#FFFBEB'
    ? '#FFFFFF'
    : '#0d0d14';
  const isDark = !['#FAFAFA', '#F8FAFC', '#F5F5F0', '#FFFBEB'].includes(current.backgroundAlt);

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: bg }}>
        <div className="w-80 rounded-2xl p-8" style={{ background: surface, border: `1px solid ${current.border}` }}>
          <h1 className="text-lg font-bold" style={{ color: current.text }}>Theme Editor</h1>
          <p className="mt-1 text-sm" style={{ color: current.textMuted }}>Acceso restringido</p>
          <input
            type="password" value={password} placeholder="Contraseña"
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            autoFocus
            className="mt-6 w-full rounded-xl px-4 py-3 text-sm outline-none"
            style={{ background: bg, border: `1px solid ${current.border}`, color: current.text }}
          />
          <button onClick={handleLogin}
            className="mt-3 w-full rounded-xl px-4 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            style={{ background: current.primary }}
          >
            Entrar
          </button>
          {loginError && <p className="mt-2 text-center text-xs" style={{ color: current.error }}>{loginError}</p>}
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center" style={{ background: bg }}>
      <p style={{ color: current.textMuted }}>Cargando editor...</p>
    </div>;
  }

  // ─── Editor ─────────────────────────────────────────────

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: bg, color: current.text }}>
      {/* ─── Panel izquierdo: controles ─────────────────── */}
      <aside className="w-96 flex-shrink-0 overflow-y-auto border-r p-6" style={{ background: surface, borderColor: current.border }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/" className="text-sm font-bold tracking-tight hover:opacity-70 transition-opacity" style={{ color: current.text }}>Tinkilabs</Link>
            <p className="text-xs" style={{ color: current.textMuted }}>Theme Editor</p>
          </div>
          <button onClick={handleSave}
            className="rounded-lg px-4 py-2 text-xs font-semibold transition-all"
            style={saved
              ? { background: `${current.success}20`, color: current.success }
              : { background: current.primary, color: '#fff' }
            }
          >
            {saved ? '✓ Guardado' : 'Guardar'}
          </button>
        </div>

        {/* Selector de paleta */}
        <section className="mb-8">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: current.textMuted }}>Paleta activa</h3>
          <div className="grid grid-cols-2 gap-2">
            {(Object.entries(paletteLabels) as [PaletteName, string][]).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActivePalette(key)}
                className="rounded-lg px-3 py-2 text-left text-xs transition-all"
                style={
                  activePalette === key
                    ? { background: `${current.primary}20`, border: `1px solid ${current.primary}60`, color: current.text }
                    : { background: bg, border: `1px solid ${current.border}`, color: current.textMuted }
                }
              >
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full" style={{ background: palettes[key].primary }} />
                  {label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Colores */}
        <section className="mb-8">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: current.textMuted }}>Colores</h3>
          <div className="space-y-3">
            {(Object.entries(colorLabels) as [keyof PaletteColors, string][]).map(([key, label]) => (
              <div key={key} className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="color"
                    value={current[key].startsWith('#') ? current[key] : '#FF6B35'}
                    onChange={e => updateColor(key, e.target.value)}
                    className="h-8 w-8 cursor-pointer rounded-lg border-0 bg-transparent"
                  />
                </div>
                <input
                  type="text"
                  value={current[key]}
                  onChange={e => updateColor(key, e.target.value)}
                  className="flex-1 rounded-lg px-3 py-1.5 text-xs font-mono outline-none"
                  style={{ background: bg, border: `1px solid ${current.border}`, color: current.text }}
                />
                <span className="w-20 text-right text-xs" style={{ color: current.textMuted }}>{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Tipografía */}
        <section className="mb-8">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: current.textMuted }}>Tipografía</h3>

          <label className="mb-2 block text-xs" style={{ color: current.textMuted }}>Texto (UI)</label>
          <select value={fontSans} onChange={e => { setFontSans(e.target.value); setSaved(false); }}
            className="mb-4 w-full rounded-lg px-3 py-2 text-xs outline-none"
            style={{ background: bg, border: `1px solid ${current.border}`, color: current.text }}
          >
            {googleFonts.map(f => <option key={f} value={f}>{f}</option>)}
          </select>

          <label className="mb-2 block text-xs" style={{ color: current.textMuted }}>Títulos (Display)</label>
          <select value={fontDisplay} onChange={e => { setFontDisplay(e.target.value); setSaved(false); }}
            className="mb-4 w-full rounded-lg px-3 py-2 text-xs outline-none"
            style={{ background: bg, border: `1px solid ${current.border}`, color: current.text }}
          >
            {googleFonts.map(f => <option key={f} value={f}>{f}</option>)}
          </select>

          <label className="mb-2 block text-xs" style={{ color: current.textMuted }}>Código (Mono)</label>
          <select value={fontMono} onChange={e => { setFontMono(e.target.value); setSaved(false); }}
            className="w-full rounded-lg px-3 py-2 text-xs outline-none"
            style={{ background: bg, border: `1px solid ${current.border}`, color: current.text }}
          >
            {['JetBrains Mono', 'Fira Code', 'IBM Plex Mono', 'Source Code Pro', 'Cascadia Code'].map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </section>
      </aside>

      {/* ─── Panel derecho: preview ──────────────────────── */}
      <main className="flex-1 overflow-y-auto">
        {/* Barra superior preview */}
        <div className="sticky top-0 z-10 flex items-center gap-6 border-b px-8 py-3 backdrop-blur-md"
          style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)' }}
        >
          <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>Tinkilabs</span>
          <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Suscripciones</span>
          <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Comprar más</span>
          <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Nosotros</span>
          <div className="flex-1" />
          <span className="rounded-full px-3 py-1 text-xs font-medium"
            style={{ background: 'var(--color-primary)', color: '#fff' }}
          >
            Suscríbete
          </span>
        </div>

        <div className="mx-auto max-w-3xl space-y-12 px-8 py-12">
          {/* Hero preview */}
          <section className="space-y-6">
            <div className="space-y-3">
              <h1 className="text-5xl font-bold tracking-tight" style={{ fontFamily: fontDisplay, color: 'var(--color-text)' }}>
                Construye. Aprende. <span style={{ color: 'var(--color-primary)' }}>Alucina.</span>
              </h1>
              <p className="max-w-lg text-lg leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                Cajas STEM por suscripción para niños de 3 a 14 años. Una caja nueva cada mes con experimentos que molan de verdad.
              </p>
            </div>

            <div className="flex gap-3">
              <button className="rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: 'var(--color-primary)' }}
              >
                Me apunto
              </button>
              <button className="rounded-xl px-6 py-3 text-sm font-semibold transition-all"
                style={{ border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
              >
                Ver cómo funciona
              </button>
            </div>
          </section>

          {/* Cards preview */}
          <section>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
              Preview de tarjetas de producto
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: 'Tinki Launcher', price: '24.90€', age: '8-14 años' },
                { name: 'Tinki Dominó', price: '29.90€', age: '6-9 años' },
                { name: 'Tinki Aviones', price: '19.90€', age: '6-9 años' },
              ].map(p => (
                <div key={p.name} className="overflow-hidden rounded-2xl transition-all hover:-translate-y-1"
                  style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
                >
                  <div className="aspect-video flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))` }}
                  >
                    <span className="text-3xl opacity-50">📦</span>
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>{p.name}</h3>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{p.age}</p>
                    <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold text-white"
                      style={{ background: 'var(--color-primary)' }}
                    >
                      {p.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tipografía preview */}
          <section>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
              Escala tipográfica
            </h2>
            <div className="space-y-4 rounded-2xl p-8" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>xs — 12px</p>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>sm — 14px</p>
              <p style={{ color: 'var(--color-text)' }}>base — 16px. El texto de cuerpo se lee así, con buena legibilidad y espaciado cómodo.</p>
              <p className="text-lg" style={{ color: 'var(--color-text)' }}>lg — 18px</p>
              <p className="text-xl font-semibold" style={{ color: 'var(--color-text)' }}>xl — 20px</p>
              <p className="text-2xl font-bold" style={{ fontFamily: fontDisplay, color: 'var(--color-text)' }}>2xl — Título secundario</p>
              <p className="text-4xl font-bold" style={{ fontFamily: fontDisplay, color: 'var(--color-text)' }}>4xl — Gran titular</p>
            </div>
          </section>

          {/* Estados preview */}
          <section>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
              Estados y badges
            </h2>
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full px-4 py-1.5 text-xs font-medium text-white"
                style={{ background: 'var(--color-primary)' }}
              >
                Principal
              </span>
              <span className="rounded-full px-4 py-1.5 text-xs font-medium text-white"
                style={{ background: 'var(--color-success)' }}
              >
                Éxito
              </span>
              <span className="rounded-full px-4 py-1.5 text-xs font-medium text-white"
                style={{ background: 'var(--color-error)' }}
              >
                Error
              </span>
              <span className="rounded-full px-4 py-1.5 text-xs font-medium"
                style={{ background: 'var(--color-background-alt)', color: 'var(--color-text-muted)' }}
              >
                Neutro
              </span>
              <span className="rounded-full px-4 py-1.5 text-xs font-medium"
                style={{ background: 'var(--color-primaryLight)', color: '#fff' }}
              >
                Claro
              </span>
            </div>
          </section>

          {/* Fondo oscuro preview */}
          <section className="rounded-2xl p-8 space-y-4"
            style={{ background: 'var(--color-background-alt)', color: '#fff' }}
          >
            <h2 className="text-sm font-semibold uppercase tracking-wider opacity-40">Fondo alternativo (dark)</h2>
            <p className="text-2xl font-bold" style={{ fontFamily: fontDisplay }}>
              Así se ve el texto sobre <span style={{ color: 'var(--color-primary)' }}>fondo oscuro</span>
            </p>
            <p className="text-sm opacity-50">
              Las secciones hero y el catálogo usan este fondo. El contraste debe ser alto para legibilidad.
            </p>
            <button className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
              style={{ background: 'var(--color-primary)' }}
            >
              Botón sobre oscuro
            </button>
          </section>

          {/* Input preview */}
          <section>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
              Formularios
            </h2>
            <div className="flex gap-3">
              <input type="email" placeholder="tu@email.com"
                className="rounded-xl px-4 py-2.5 text-sm outline-none"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text)',
                }}
              />
              <button className="rounded-xl px-6 py-2.5 text-sm font-semibold text-white"
                style={{ background: 'var(--color-primary)' }}
              >
                Enviar
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
