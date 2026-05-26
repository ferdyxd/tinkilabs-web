import { MysteryBox } from '@/components/MysteryBox';
import { EmailForm } from '@/components/EmailForm';
import { Counter } from '@/components/Counter';

export default function Home() {
  return (
    <main className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-[#08080F] px-6 text-center">
      {/* Fondos atmosféricos */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-tinki-orange/10 blur-[150px]" />
        <div className="absolute top-1/3 -right-60 h-[400px] w-[400px] rounded-full bg-tinki-orange/5 blur-[120px]" />
        <div className="absolute -bottom-40 left-1/4 h-[300px] w-[300px] rounded-full bg-amber-500/5 blur-[100px]" />

        {/* Partículas sutiles */}
        <div className="absolute left-[15%] top-[20%] h-1.5 w-1.5 animate-pulse rounded-full bg-tinki-orange/30" />
        <div className="absolute right-[20%] top-[30%] h-1 w-1 animate-pulse rounded-full bg-amber-400/20" style={{ animationDelay: '1.2s' }} />
        <div className="absolute bottom-[35%] left-[25%] h-1 w-1 animate-pulse rounded-full bg-tinki-orange/20" style={{ animationDelay: '2.5s' }} />
        <div className="absolute right-[30%] top-[60%] h-1.5 w-1.5 animate-pulse rounded-full bg-amber-300/15" style={{ animationDelay: '0.7s' }} />
        <div className="absolute left-[40%] bottom-[25%] h-1 w-1 animate-pulse rounded-full bg-tinki-orange/25" style={{ animationDelay: '3.1s' }} />
      </div>

      {/* Contenido */}
      <div className="relative z-10 flex w-full max-w-lg flex-col items-center gap-8">
        {/* Badge */}
        <span className="inline-block rounded-full border border-tinki-orange/20 bg-tinki-orange/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-tinki-orange/70">
          Próximamente
        </span>

        {/* Caja 3D */}
        <MysteryBox />

        {/* Texto pulsante */}
        <div>
          <p
            className="text-xl font-light tracking-wide text-white/80 sm:text-2xl"
            style={{ animation: 'pulseText 3s ease-in-out infinite' }}
          >
            Algo increíble está a punto de llegar
          </p>
          <p className="mt-2 text-sm text-white/30">
            Deja tu email y sé el primero en saberlo
          </p>
        </div>

        {/* Formulario */}
        <div className="w-full">
          <EmailForm />
        </div>

        {/* Contador */}
        <Counter variant="dark" />
      </div>

      {/* Footer mínimo */}
      <div className="absolute bottom-6 z-10 flex items-center gap-4 text-xs text-white/15">
        <p>© {new Date().getFullYear()} Tinkilabs &middot; Hecho con mimo en España</p>
        <a
          href="/productos"
          className="rounded-full border border-white/10 px-3 py-1 text-white/40 transition-colors hover:border-tinki-orange/30 hover:text-tinki-orange/70"
        >
          Ver roadmap →
        </a>
      </div>
    </main>
  );
}
