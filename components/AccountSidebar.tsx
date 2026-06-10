'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface Seccion {
  label: string;
  href: string;
  icono: string;
}

const secciones: Seccion[] = [
  { label: 'Resumen',       href: '/mi-cuenta',          icono: '📋' },
  { label: 'Mi suscripción', href: '/mi-cuenta/suscripcion', icono: '📦' },
  { label: 'Pedidos',       href: '/mi-cuenta/pedidos',  icono: '📜' },
  { label: 'Mis hijos',     href: '/mi-cuenta/ninos',    icono: '👦' },
  { label: 'Guardados',     href: '/mi-cuenta/guardados', icono: '🔖' },
  { label: 'Referidos',     href: '/mi-cuenta/referidos', icono: '🎁' },
  { label: 'Ajustes',       href: '/mi-cuenta/ajustes',  icono: '⚙️' },
];

interface Props {
  userName: string;
  onNavigate?: () => void;
}

export function AccountSidebar({ userName, onNavigate }: Props) {
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/';
  };

  return (
    <aside className="flex h-full flex-col">
      {/* Saludo */}
      <div className="px-4 pb-6 pt-1">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-tinki-dark/25">Mi cuenta</p>
        <p className="mt-1 text-sm font-bold text-tinki-dark truncate">Hola, {userName}</p>
      </div>

      {/* Navegación */}
      <nav className="flex-1 space-y-0.5 px-2">
        {secciones.map((s) => {
          const activo = s.href === '/mi-cuenta'
            ? pathname === '/mi-cuenta'
            : pathname.startsWith(s.href);

          return (
            <Link
              key={s.href}
              href={s.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all duration-150 ${
                activo
                  ? 'bg-tinki-orange/8 text-tinki-orange'
                  : 'text-tinki-dark/50 hover:bg-neutral-50 hover:text-tinki-dark/70'
              }`}
            >
              <span className="text-base">{s.icono}</span>
              {s.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-neutral-100 px-2 pt-3">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-tinki-dark/35 transition-all hover:bg-red-50 hover:text-red-500"
        >
          <span className="text-base">🚪</span>
          Salir
        </button>
      </div>
    </aside>
  );
}
