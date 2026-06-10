'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { AccountSidebar } from '@/components/AccountSidebar';

interface UserData {
  autenticado: boolean;
  nombre?: string;
  email?: string;
}

export default function MiCuentaLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const mobileTabs = [
    { label: 'Resumen', href: '/mi-cuenta' },
    { label: 'Suscripción', href: '/mi-cuenta/suscripcion' },
    { label: 'Pedidos', href: '/mi-cuenta/pedidos' },
    { label: 'Niños', href: '/mi-cuenta/ninos' },
  ];

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d?.autenticado) {
          router.push('/login?redirect=/mi-cuenta');
          return;
        }
        setUser(d);
      })
      .catch(() => router.push('/login?redirect=/mi-cuenta'))
      .finally(() => setLoading(false));
  }, [router]);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  if (loading) {
    return (
      <main className="min-h-screen bg-white pt-[58px]">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-5 w-32 rounded bg-neutral-100" />
            <div className="h-32 rounded-xl bg-neutral-50" />
          </div>
        </div>
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-white pt-[58px]">
      <div className="mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* Sidebar — desktop */}
          <div className="hidden lg:block border-r border-neutral-100 pt-8 pb-12 sticky top-[58px] h-[calc(100vh-58px)] overflow-y-auto">
            <AccountSidebar userName={user.nombre || ''} />
          </div>

          {/* Sidebar — móvil (overlay) */}
          {sidebarOpen && (
            <>
              <div className="fixed inset-0 z-40 bg-black/20 lg:hidden" onClick={closeSidebar} />
              <div className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl lg:hidden overflow-y-auto pt-[58px] animate-in slide-in-from-left">
                <AccountSidebar userName={user.nombre || ''} onNavigate={closeSidebar} />
              </div>
            </>
          )}

          {/* Contenido */}
          <div className="min-h-[calc(100vh-58px)] pb-20">
            {/* Barra superior móvil */}
            <div className="flex items-center gap-3 border-b border-neutral-100 px-6 py-4 lg:hidden">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="rounded-lg border border-neutral-200 p-2 text-tinki-dark/50 transition-colors hover:bg-neutral-50"
                aria-label="Abrir menú"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              </button>
              <p className="text-sm font-bold text-tinki-dark truncate">Hola, {user.nombre}</p>
            </div>

            {/* Tabs rápidos móvil */}
            <div className="flex gap-1 overflow-x-auto border-b border-neutral-100 px-4 py-2 lg:hidden">
              {mobileTabs.map((t) => {
                const isActive = t.href === '/mi-cuenta'
                  ? pathname === '/mi-cuenta'
                  : pathname.startsWith(t.href);
                return (
                  <Link
                    key={t.href}
                    href={t.href}
                    className={`flex-shrink-0 rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors ${
                      isActive ? 'bg-tinki-dark text-white' : 'bg-neutral-50 text-tinki-dark/50'
                    }`}
                  >
                    {t.label}
                  </Link>
                );
              })}
            </div>

            <div className="px-6 py-8 lg:px-10 lg:py-10">
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
