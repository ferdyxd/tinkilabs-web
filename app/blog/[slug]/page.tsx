import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { posts, CATEGORIA_LABELS } from '@/lib/blog-data';
import { ProyectoResumen } from '@/components/ProyectoResumen';
import { ShareButtons } from '@/components/ShareButtons';
import { SaveButton } from '@/components/SaveButton';
import { StickyHeader } from '@/components/StickyHeader';
import { RightSidebar } from '@/components/RightSidebar';
import { ArticuloRenderer } from '@/components/ArticuloRenderer';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return { title: 'Artículo no encontrado — Tinkilabs' };

  return {
    title: `${post.titulo} — Blog Tinkilabs`,
    description: post.excerpt,
    openGraph: {
      title: post.titulo,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.fecha,
      authors: [post.autor],
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const siteUrl = process.env.NODE_ENV === 'production'
    ? 'https://tinkilabs.com'
    : 'http://localhost:3005';
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.titulo,
    description: post.excerpt,
    author: { '@type': 'Person', name: post.autor },
    datePublished: post.fecha,
    keywords: post.tags.join(', '),
  };

  return (
    <main id="main-content" className="min-h-screen bg-white">
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ═══════════════════════════════════════════════════════
          HERO del artículo
          ════════════════════════════════════════════════════ */}
      <section id="blog-hero" className="relative overflow-hidden bg-tinki-light py-16 sm:py-24">
        <div className="pointer-events-none absolute inset-0 pattern-dots-orange" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <Link
              href="/blog"
              className="text-[13px] font-medium text-tinki-orange hover:underline"
            >
              ← Más proyectos
            </Link>
          </nav>

          {/* Emoji + categoría */}
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="text-5xl">{post.coverEmoji}</span>
            <span className="rounded-full bg-tinki-orange/10 px-3 py-1 text-xs font-semibold text-tinki-orange">
              {CATEGORIA_LABELS[post.categoria]}
            </span>
          </div>

          <h1 className="text-2xl font-black tracking-tight text-tinki-dark sm:text-4xl">
            {post.titulo}
          </h1>

          {/* Meta */}
          <div className="mt-6 flex items-center justify-center gap-3 text-[13px] text-tinki-dark/35">
            <span>{post.autor}</span>
            <span>·</span>
            <time dateTime={post.fecha}>
              {new Date(post.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
            </time>
            <span>·</span>
            <span>{post.lecturaMin} min de lectura</span>
          </div>

          {/* Tags + Save */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-md bg-white px-2 py-0.5 text-[11px] font-medium text-tinki-dark/35 border border-neutral-100">
                #{tag}
              </span>
            ))}
            <span className="ml-2">
              <SaveButton slug={post.slug} />
            </span>
          </div>
        </div>
      </section>

      {/* ═══ Sticky header (aparece al hacer scroll) ═══ */}
      <StickyHeader post={post} />

      {/* ═══ Ficha resumen del proyecto ═══ */}
      <ProyectoResumen post={post} />

      {/* ═══════════════════════════════════════════════════════
          CONTENIDO — 2 columnas (texto + sidebar derecho)
          ════════════════════════════════════════════════════ */}
      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,672px)_320px] gap-8 lg:gap-12 justify-center">

          {/* Contenido — texto del artículo */}
          <div>
            <article>
              {post.contenidoEstructurado ? (
                <ArticuloRenderer data={post.contenidoEstructurado} />
              ) : (
                <div
                  className="prose prose-neutral prose-lg max-w-none
                    prose-headings:font-black prose-headings:tracking-tight prose-headings:text-tinki-dark
                    prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
                    prose-h3:text-base prose-h3:mt-8 prose-h3:mb-3
                    prose-p:text-base prose-p:leading-relaxed prose-p:text-tinki-dark/65
                    prose-ul:text-base prose-ul:leading-relaxed prose-ul:text-tinki-dark/65
                    prose-ol:text-base prose-ol:leading-relaxed prose-ol:text-tinki-dark/65
                    prose-li:my-1
                    prose-strong:text-tinki-dark prose-strong:font-bold
                    prose-a:text-tinki-orange prose-a:no-underline hover:prose-a:underline"
                  dangerouslySetInnerHTML={{ __html: post.contenido }}
                />
              )}
            </article>

            {/* Compartir (móvil: al pie del artículo) */}
            <div className="lg:hidden">
              <ShareButtons url={postUrl} title={post.titulo} />
            </div>

            {/* Separador + Volver */}
            <hr className="mt-16 border-neutral-100" />
            <div className="mt-10 text-center">
              <Link
                href="/blog"
                className="text-sm font-semibold text-tinki-orange hover:underline"
              >
                ← Más proyectos
              </Link>
            </div>
          </div>

          {/* Sidebar derecha — todo apilado (solo desktop) */}
          <RightSidebar post={post} url={postUrl} title={post.titulo} />

        </div>
      </div>
    </main>
  );
}
