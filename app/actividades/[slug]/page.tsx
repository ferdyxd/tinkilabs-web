import type { Metadata } from 'next';
import { posts } from '@/lib/blog-data';
import { PostPage } from '@/components/PostPage';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return posts.filter((p) => p.tipo === 'actividad').map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return { title: 'Actividad no encontrada — Tinkilabs' };

  return {
    title: `${post.titulo} — Actividades Tinkilabs`,
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

export default function ActividadPostPage({ params }: Props) {
  return <PostPage slug={params.slug} backHref="/actividades" backLabel="Volver a actividades" />;
}
