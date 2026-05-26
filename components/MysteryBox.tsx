'use client';

export function MysteryBox() {
  return (
    <div className="relative mx-auto flex items-center justify-center">
      {/* Sombra bajo la caja */}
      <div className="absolute top-[60%] h-8 w-40 rounded-[50%] bg-tinki-orange/15 blur-xl" />

      {/* Contenedor 3D */}
      <div
        className="relative h-[160px] w-[160px] sm:h-[200px] sm:w-[200px]"
        style={{ perspective: '900px' }}
      >
        <div
          className="cube h-full w-full"
          style={{
            transformStyle: 'preserve-3d',
            animation: 'rotateBox 14s infinite linear',
          }}
        >
          {/* Cara frontal — logo Tinki */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-xl border-2 border-[#B8875A] bg-[#D4A574]"
            style={{ transform: 'translateZ(100px)' }}
          >
            <span className="text-5xl sm:text-6xl">🔩</span>
            <span className="mt-1 font-black text-[#8B5E3C] text-sm tracking-wider">
              TINKI
            </span>
          </div>

          {/* Cara trasera */}
          <div
            className="absolute inset-0 rounded-xl border-2 border-[#B8875A] bg-[#C4956A]"
            style={{ transform: 'rotateY(180deg) translateZ(100px)' }}
          >
            <div className="flex h-full items-center justify-center">
              <div className="h-3 w-16 rounded-full bg-[#8B5E3C]/20" />
            </div>
          </div>

          {/* Cara derecha — solapa visible */}
          <div
            className="absolute inset-0 rounded-xl border-2 border-[#B8875A] bg-[#C89870]"
            style={{ transform: 'rotateY(90deg) translateZ(100px)' }}
          >
            <div className="flex h-full w-full items-center">
              <div className="h-full w-[3px] bg-[#B8875A]/40" />
            </div>
          </div>

          {/* Cara izquierda */}
          <div
            className="absolute inset-0 rounded-xl border-2 border-[#B8875A] bg-[#C89870]"
            style={{ transform: 'rotateY(-90deg) translateZ(100px)' }}
          >
            <div className="flex h-full w-full items-center justify-end">
              <div className="h-full w-[3px] bg-[#B8875A]/40" />
            </div>
          </div>

          {/* Cara superior — solapas de la caja */}
          <div
            className="absolute inset-0 rounded-xl border-2 border-[#B8875A] bg-[#D4A574]"
            style={{ transform: 'rotateX(90deg) translateZ(100px)' }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Líneas de solapas */}
              <div className="absolute h-[2px] w-full bg-[#B8875A]/50 rotate-45" />
              <div className="absolute h-[2px] w-full bg-[#B8875A]/50 -rotate-45" />
            </div>
          </div>

          {/* Cara inferior */}
          <div
            className="absolute inset-0 rounded-xl border-2 border-[#B8875A] bg-[#BF8F65]"
            style={{ transform: 'rotateX(-90deg) translateZ(100px)' }}
          />
        </div>
      </div>
    </div>
  );
}
