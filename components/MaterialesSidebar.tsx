import type { BlogPost } from '@/lib/blog-data';

export function MaterialesSidebar({ post }: { post: BlogPost }) {
  if (!post.materialesEmoji?.length) return null;

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
        <div className="bg-tinki-dark px-4 py-3">
          <span className="text-[13px] font-bold text-white flex items-center gap-1.5">
            🧰 Materiales
          </span>
        </div>

        <ul className="px-4 py-3 space-y-1.5">
          {post.materialesEmoji.map((m, i) => (
            <li key={i} className="flex items-start gap-2 text-[13px] leading-tight text-tinki-dark/70">
              <span className="mt-px flex-shrink-0">{m.emoji}</span>
              <span>{m.texto}</span>
            </li>
          ))}
        </ul>

      </div>
    </aside>
  );
}
