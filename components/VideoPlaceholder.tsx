'use client';

export function VideoPlaceholder() {
  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-tinki-dark shadow-2xl">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <button
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-tinki-orange/80 shadow-lg shadow-tinki-orange/30 transition-transform hover:scale-110"
            aria-label="Reproducir vídeo de presentación"
            onClick={() => {
              // Placeholder — aquí irá el embed de YouTube
            }}
          >
            <svg
              className="ml-1 h-8 w-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
          <p className="mt-4 text-sm text-white/50">
            Vídeo de presentación — muy pronto
          </p>
        </div>
      </div>
      {/* Gradiente sutil encima */}
      <div className="absolute inset-0 bg-gradient-to-t from-tinki-dark/80 via-transparent to-transparent" />
    </div>
  );
}
