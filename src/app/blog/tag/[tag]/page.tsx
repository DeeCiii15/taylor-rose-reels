import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BlogPageShell from '@/app/components/BlogPageShell';
import BlogPostCard from '@/app/components/BlogPostCard';
import {
  getAllTags,
  getPostsByTag,
  getTagBySlug,
  tagToSlug,
} from '@/lib/blog';
import { pageShareMeta } from '@/lib/shareMeta';
import { SITE_NAME } from '@/lib/siteConfig';

type BlogTagPageProps = {
  params: Promise<{ tag: string }>;
};

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: tagToSlug(tag) }));
}

export async function generateMetadata({
  params,
}: BlogTagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const label = getTagBySlug(tag);
  if (!label) return {};

  const description = `Journal posts tagged “${label}” from ${SITE_NAME}.`;
  const share = pageShareMeta({
    title: `${label} | Blog | ${SITE_NAME}`,
    description,
    url: `/blog/tag/${tag}`,
  });

  return {
    title: `${label} posts`,
    description,
    alternates: { canonical: `/blog/tag/${tag}` },
    ...share,
  };
}

export default async function BlogTagPage({ params }: BlogTagPageProps) {
  const { tag } = await params;
  const label = getTagBySlug(tag);
  if (!label) notFound();

  const posts = getPostsByTag(tag);

  return (
    <BlogPageShell>
      <section className="scroll-mt-24 border-t border-[#e0d9ce] bg-paper-soft px-6 py-16 dark:border-boho-stone/40 sm:px-10 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/blog"
            className="font-body text-sm font-medium text-coral transition hover:text-coral-dark dark:text-[#e8b896] dark:hover:text-[#f2dcc4]"
          >
            ← Back to journal
          </Link>

          <p className="section-eyebrow mt-8 text-boho-sage">Tag</p>
          <h1 className="mt-4 font-display text-2xl font-medium leading-snug text-cream-dark dark:text-cream md:text-3xl lg:text-[2.35rem] md:leading-[1.12]">
            {label}
          </h1>
          <p className="mt-5 max-w-xl font-body text-sm font-light leading-[1.75] text-cream-dark/78 dark:text-cream/72 md:text-base">
            {posts.length} {posts.length === 1 ? 'story' : 'stories'} tagged with
            &ldquo;{label}&rdquo;.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </BlogPageShell>
  );
}
