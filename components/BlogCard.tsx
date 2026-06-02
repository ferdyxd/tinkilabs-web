import Link from 'next/link';
import type { BlogPost } from '@/lib/blog-data';
import { CATEGORIA_LABELS } from '@/lib/blog-data';

interface Props {
  post: BlogPost;
}

export function BlogCard({ post }: Props) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-xl border border-neutral-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-tinki-orange/20 hover:shadow-md hover:shadow-tinki-orange/5"
    >
      {/* Emoji + categoría */}
      <div className="mb-4 flex items-start justify-between">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-tinki-light text-3xl shadow-sm">
          {post.coverEmoji}
        </span>
        <span className="rounded-full bg-tinki-orange/8 px-2.5 py-1 text-[11px] font-semibold text-tinki-orange">
          {CATEGORIA_LABELS[post.categoria]}
        </span>
      </div>

      {/* Título */}
      <h3 className="text-base font-bold tracking-tight text-tinki-dark group-hover:text-tinki-orange transition-colors">
        {post.titulo}
      </h3>

      {/* Excerpt */}
      <p className="mt-2 text-[13px] leading-relaxed text-tinki-dark/45 line-clamp-2">
        {post.excerpt}
      </p>

      {/* Meta: fecha + lectura */}
      <div className="mt-auto flex items-center gap-3 pt-4">
        <time dateTime={post.fecha} className="text-[11px] text-tinki-dark/30">
          {new Date(post.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
        </time>
        <span className="text-[11px] text-tinki-dark/25">·</span>
        <span className="text-[11px] text-tinki-dark/30">
          {post.lecturaMin} min de lectura
        </span>
      </div>
    </Link>
  );
}
