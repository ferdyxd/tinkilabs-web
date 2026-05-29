'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
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

// ─── Tamaños de letra ──────────────────────────────────────

interface FontSizes {
  logo: string;
  h1: string;
  h2: string;
  body: string;
  button: string;
  card: string;
  nav: string;
  footer: string;
}

const defaultFontSizes: FontSizes = {
  logo: '1rem',
  h1: '2.25rem',
  h2: '1.5rem',
  body: '1rem',
  button: '0.875rem',
  card: '0.875rem',
  nav: '0.8125rem',
  footer: '0.75rem',
};

const fontSizeLabels: Record<keyof FontSizes, string> = {
  logo: 'Logo',
  h1: 'Títulos H1',
  h2: 'Títulos H2-H3',
  body: 'Texto cuerpo',
  button: 'Botones',
  card: 'Tarjetas',
  nav: 'Navbar',
  footer: 'Footer',
};

const fontSizeOptions = [
  { label: 'XS', value: '0.625rem' },
  { label: 'SM', value: '0.75rem' },
  { label: 'Base', value: '0.875rem' },
  { label: 'LG', value: '1rem' },
  { label: 'XL', value: '1.125rem' },
  { label: '2XL', value: '1.25rem' },
  { label: '3XL', value: '1.5rem' },
  { label: '4XL', value: '2rem' },
  { label: '5XL', value: '2.5rem' },
  { label: '6XL', value: '3rem' },
];

// ─── Componente principal ───────────────────────────────────

export default function AdminTemaPage() {
  const [palettes, setPalettes] = useState(defaultPalettes);
  const [activePalette, setActivePalette] = useState<PaletteName>('tinkilabs');
  const [fontSans, setFontSans] = useState('Inter');
  const [fontDisplay, setFontDisplay] = useState('Geist Sans');
  const [fontMono, setFontMono] = useState('JetBrains Mono');
  const [fondo, setFondo] = useState('none');
  const [fontSizes, setFontSizes] = useState<FontSizes>(defaultFontSizes);
  const [saved, setSaved] = useState(false);
  const [previewPage, setPreviewPage] = useState('/');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const previewPages = [
    { path: '/', label: 'Landing' },
    { path: '/productos', label: 'Catálogo' },
    { path: '/suscribete', label: 'Checkout' },
    { path: '/regalo', label: 'Regalo' },
    { path: '/concepto-b', label: 'Concepto B' },
  ];
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);

  const current = palettes[activePalette];

  // El editor NO aplica CSS vars al documento — solo al iframe de preview

  // Inyectar CSS vars en el iframe de preview
  const injectIntoIframe = useCallback(() => {
    const iframe = iframeRef.current;
    const win = iframe?.contentWindow;
    if (!win) return;
    const root = win.document.documentElement;

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
    (Object.entries(fontSizes) as [string, string][]).forEach(([k, v]) => {
      root.style.setProperty(`--font-size-${k}`, v);
    });
    if (fondo !== 'none') {
      win.document.body.classList.add(fondo);
    }

    // Reaplicar tras hidratación React
    setTimeout(() => {
      try {
        const r = iframe?.contentWindow?.document?.documentElement;
        if (!r) return;
        r.style.setProperty('--color-primary', current.primary);
        r.style.setProperty('--color-background', current.background);
        r.style.setProperty('--color-text', current.text);
        r.style.setProperty('--color-text-muted', current.textMuted);
        r.style.setProperty('--color-border', current.border);
      } catch {}
    }, 800);
  }, [current, fontSans, fontDisplay, fontMono, fontSizes, fondo]);

  // Cambiar página del iframe sin perder estado del editor
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    iframe.src = previewPage;
  }, [previewPage]);

  // Reinyectar cuando cambian ajustes (iframe ya cargado)
  useEffect(() => {
    injectIntoIframe();
  }, [injectIntoIframe]);

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
        if (data.fontSizes) setFontSizes(data.fontSizes);
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
        body: JSON.stringify({ activePalette, palettes, fontSizes }),
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

  // Colores fijos del editor — NO dependen del tema
  const bg = '#0d0d14';
  const surface = '#16161f';
  const textFixed = '#e4e4e7';
  const textMutedFixed = '#71717a';
  const borderFixed = 'rgba(255,255,255,0.08)';
  const primaryFixed = '#FF6B35';

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: bg }}>
        <div className="w-80 rounded-2xl p-8" style={{ background: surface, border: `1px solid ${borderFixed}` }}>
          <h1 className="text-lg font-bold" style={{ color: textFixed }}>Theme Editor</h1>
          <p className="mt-1 text-sm" style={{ color: textMutedFixed }}>Acceso restringido</p>
          <input
            type="password" value={password} placeholder="Contraseña"
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            autoFocus
            className="mt-6 w-full rounded-xl px-4 py-3 text-sm outline-none"
            style={{ background: bg, border: `1px solid ${borderFixed}`, color: textFixed }}
          />
          <button onClick={handleLogin}
            className="mt-3 w-full rounded-xl px-4 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            style={{ background: primaryFixed }}
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
      <p style={{ color: textMutedFixed }}>Cargando editor...</p>
    </div>;
  }

  // ─── Editor ─────────────────────────────────────────────

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: bg, color: textFixed }}>
      {/* ─── Panel izquierdo: controles ─────────────────── */}
      <aside className="w-96 flex-shrink-0 overflow-y-auto border-r p-6" style={{ background: surface, borderColor: borderFixed }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/" className="text-sm font-bold tracking-tight hover:opacity-70 transition-opacity" style={{ color: textFixed }}>Tinkilabs</Link>
            <p className="text-xs" style={{ color: textMutedFixed }}>Theme Editor</p>
          </div>
          <button onClick={handleSave}
            className="rounded-lg px-4 py-2 text-xs font-semibold transition-all"
            style={saved
              ? { background: `${current.success}20`, color: current.success }
              : { background: primaryFixed, color: '#fff' }
            }
          >
            {saved ? '✓ Guardado' : 'Guardar'}
          </button>
        </div>

        {/* Selector de paleta */}
        <section className="mb-8">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: textMutedFixed }}>Paleta activa</h3>
          <div className="grid grid-cols-2 gap-2">
            {(Object.entries(paletteLabels) as [PaletteName, string][]).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActivePalette(key)}
                className="rounded-lg px-3 py-2 text-left text-xs transition-all"
                style={
                  activePalette === key
                    ? { background: `${primaryFixed}20`, border: `1px solid ${primaryFixed}60`, color: textFixed }
                    : { background: bg, border: `1px solid ${borderFixed}`, color: textMutedFixed }
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
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: textMutedFixed }}>Colores</h3>
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
                  style={{ background: bg, border: `1px solid ${borderFixed}`, color: textFixed }}
                />
                <span className="w-20 text-right text-xs" style={{ color: textMutedFixed }}>{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Tipografía */}
        <section className="mb-8">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: textMutedFixed }}>Tipografía</h3>

          <label className="mb-2 block text-xs" style={{ color: textMutedFixed }}>Texto (UI)</label>
          <select value={fontSans} onChange={e => { setFontSans(e.target.value); setSaved(false); }}
            className="mb-4 w-full rounded-lg px-3 py-2 text-xs outline-none"
            style={{ background: bg, border: `1px solid ${borderFixed}`, color: textFixed }}
          >
            {googleFonts.map(f => <option key={f} value={f}>{f}</option>)}
          </select>

          <label className="mb-2 block text-xs" style={{ color: textMutedFixed }}>Títulos (Display)</label>
          <select value={fontDisplay} onChange={e => { setFontDisplay(e.target.value); setSaved(false); }}
            className="mb-4 w-full rounded-lg px-3 py-2 text-xs outline-none"
            style={{ background: bg, border: `1px solid ${borderFixed}`, color: textFixed }}
          >
            {googleFonts.map(f => <option key={f} value={f}>{f}</option>)}
          </select>

          <label className="mb-2 block text-xs" style={{ color: textMutedFixed }}>Código (Mono)</label>
          <select value={fontMono} onChange={e => { setFontMono(e.target.value); setSaved(false); }}
            className="w-full rounded-lg px-3 py-2 text-xs outline-none"
            style={{ background: bg, border: `1px solid ${borderFixed}`, color: textFixed }}
          >
            {['JetBrains Mono', 'Fira Code', 'IBM Plex Mono', 'Source Code Pro', 'Cascadia Code'].map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </section>

        {/* Fondo de ingeniería */}
        <section className="mb-8">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: textMutedFixed }}>Fondo técnico</h3>
          <div className="space-y-1.5">
            {[
              { id: 'none', label: 'Ninguno', preview: '' },
              { id: 'pattern-grid-blue', label: 'Grid azul — Papel milimetrado', preview: 'pattern-grid-blue' },
              { id: 'pattern-grid-orange', label: 'Grid naranja — Tinkilabs', preview: 'pattern-grid-orange' },
              { id: 'pattern-dots-blue', label: 'Puntos azules — Blueprint', preview: 'pattern-dots-blue' },
              { id: 'pattern-dots-orange', label: 'Puntos naranjas — Tinkilabs', preview: 'pattern-dots-orange' },
              { id: 'pattern-blueprint', label: 'Blueprint — Grid + diagonales', preview: 'pattern-blueprint' },
              { id: 'pattern-crosshair', label: 'Crosshair — Miras técnicas', preview: 'pattern-crosshair' },
            ].map(f => (
              <button
                key={f.id}
                type="button"
                onClick={() => { setFondo(f.id); setSaved(false); }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs transition-all ${
                  fondo === f.id ? 'ring-2 ring-offset-1' : ''
                }`}
                style={{
                  background: fondo === f.id ? `${primaryFixed}15` : bg,
                  border: `1px solid ${fondo === f.id ? primaryFixed + '60' : borderFixed}`,
                  color: fondo === f.id ? textFixed : textMutedFixed,
                }}
              >
                <span className={`h-6 w-6 rounded-md border flex-shrink-0 ${f.preview}`}
                  style={{ borderColor: borderFixed, background: current.background }}
                />
                <span className="truncate">{f.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Tamaños de letra */}
        <section className="mb-8">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: textMutedFixed }}>Tamaños de letra</h3>
          <div className="space-y-2">
            {(Object.entries(fontSizeLabels) as [keyof FontSizes, string][]).map(([key, label]) => (
              <div key={key} className="flex items-center gap-2">
                <span className="w-20 text-right text-[10px] font-medium truncate" style={{ color: textMutedFixed }}>
                  {label}
                </span>
                <select
                  value={fontSizes[key]}
                  onChange={e => {
                    setFontSizes(prev => ({ ...prev, [key]: e.target.value }));
                    setSaved(false);
                  }}
                  className="flex-1 rounded-lg px-2 py-1.5 text-[11px] outline-none"
                  style={{ background: bg, border: `1px solid ${borderFixed}`, color: textFixed }}
                >
                  {fontSizeOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label} ({opt.value})</option>
                  ))}
                  <option value={fontSizes[key]} disabled>— Personalizado: {fontSizes[key]}</option>
                </select>
              </div>
            ))}
          </div>
        </section>
      </aside>

      {/* ─── Panel derecho: preview con páginas reales ─── */}
      <main className="flex-1 flex flex-col min-h-0">
        {/* Selector de página */}
        <div className="flex items-center gap-1 border-b px-4 py-2"
          style={{ background: surface, borderColor: borderFixed }}
        >
          <span className="text-[10px] font-semibold uppercase tracking-wider mr-2" style={{ color: textMutedFixed }}>
            Preview:
          </span>
          {previewPages.map(p => (
            <button
              key={p.path}
              onClick={() => setPreviewPage(p.path)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                previewPage === p.path ? '' : 'opacity-50 hover:opacity-80'
              }`}
              style={{
                background: previewPage === p.path ? primaryFixed : 'transparent',
                color: previewPage === p.path ? '#fff' : textFixed,
              }}
            >
              {p.label}
            </button>
          ))}
          <div className="flex-1" />
          <span className="text-[10px]" style={{ color: textMutedFixed }}>
            {previewPage}
          </span>
        </div>

        {/* Iframe con la página real */}
        <div className="flex-1 relative">
          <iframe
            ref={iframeRef}
            src={previewPage}
            className="absolute inset-0 w-full h-full border-0"
            title="Preview de la web"
            onLoad={() => injectIntoIframe()}
          />
        </div>
      </main>
    </div>
  );
}
