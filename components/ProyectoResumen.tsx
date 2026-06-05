import Image from 'next/image';
import type { BlogPost } from '@/lib/blog-data';
import { EDAD_LABELS, MANCHA_LABELS, AYUDA_LABELS, TIEMPO_IMG } from '@/lib/blog-data';

export function ProyectoResumen({ post }: { post: BlogPost }) {
  if (!post.edad || !post.tiempoMin || !post.mancha || !post.ayuda) return null;

  const edad = EDAD_LABELS[post.edad];
  const mancha = MANCHA_LABELS[post.mancha];
  const ayuda = AYUDA_LABELS[post.ayuda];

  const manchaColor = post.mancha === 'limpio' ? 'text-green-600' : post.mancha === 'poco' ? 'text-amber-600' : 'text-red-500';
  const ayudaColor = post.ayuda === 'solo' ? 'text-green-600' : 'text-tinki-dark';

  const items = [
    { img: edad.img, label: edad.linea, value: edad.edad, color: 'text-tinki-dark' },
    { img: TIEMPO_IMG, label: 'Tiempo', value: formatTiempo(post.tiempoMin!), color: 'text-tinki-dark' },
    { img: mancha.img, label: 'Mancha', value: mancha.texto, color: manchaColor },
    { img: ayuda.img, label: 'Ayuda', value: ayuda.texto, color: ayudaColor },
  ];

  return (
    <div className="mx-auto max-w-2xl px-6 -mt-8 sm:-mt-14 relative z-10">
      <div className="grid grid-cols-2 sm:grid-cols-4 rounded-2xl bg-white border border-orange-100 shadow-sm">
        {items.map((item, i) => (
          <div
            key={item.label}
            className={`flex flex-col items-center gap-2 px-3 py-5
              ${i > 0 ? 'border-l border-tinki-dark/8' : ''}`}
          >
            <Image src={item.img} alt={item.label} width={58} height={58} className="object-contain" />
            <span className="text-xs font-medium text-tinki-dark/40">{item.label}</span>
            <span className={`text-sm font-bold text-center leading-tight ${item.color}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatTiempo(min: number): string {
  if (min < 60) return `~${min} minutos`;
  if (min === 60) return '~1 hora';
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m > 0 ? `~${h} h ${m} min` : `~${h} horas`;
}
