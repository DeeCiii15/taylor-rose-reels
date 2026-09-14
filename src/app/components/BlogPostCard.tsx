import Image from 'next/image';
import Link from 'next/link';
import { formatPostDate, type BlogPostMeta } from '@/lib/blog';

type BlogPostCardProps = {
  post: BlogPostMeta;
};

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="lift-shadow group flex h-full flex-col overflow-hidden rounded-2xl border border-[#e0d9ce] bg-[#faf8f4] ring-1 ring-[#e8e3db]/80 transition hover:-translate-y-0.5 dark:border-boho-stone/40 dark:bg-boho-bark dark:ring-boho-stone/25">
      <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[16/10] overflow-hidden bg-[#e8e3db] dark:bg-boho-ink">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt ?? post.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-6 text-center">
              <p className="font-display text-2xl text-cream-dark/55 dark:text-cream/45">
                {post.title}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            {post.category && (
              <span className="section-eyebrow text-boho-sage">{post.category}</span>
            )}
            <span className="font-body text-xs font-light text-cream-dark/55 dark:text-cream/50">
              {formatPostDate(post.date)} · {post.readingTime}
            </span>
          </div>

          <h2 className="mt-4 font-display text-2xl font-medium leading-snug text-cream-dark transition group-hover:text-coral dark:text-cream dark:group-hover:text-[#e8b896]">
            {post.title}
          </h2>

          <p className="mt-3 flex-1 font-body text-sm font-light leading-relaxed text-cream-dark/72 dark:text-cream/68 md:text-base">
            {post.description}
          </p>

          {post.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-boho-sage/30 px-3 py-1 font-body text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-cream-dark/65 dark:border-boho-stone/45 dark:text-cream/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <span className="mt-6 font-body text-sm font-medium text-coral dark:text-[#e8b896]">
            Read more →
          </span>
        </div>
      </Link>
    </article>
  );
}
