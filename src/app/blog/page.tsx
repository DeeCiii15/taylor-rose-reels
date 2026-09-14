import type { Metadata } from 'next';
import Link from 'next/link';
import BlogPageShell from '@/app/components/BlogPageShell';
import BlogPostCard from '@/app/components/BlogPostCard';
import { getAllCategories, getAllPosts, getAllTags, categoryToSlug, tagToSlug } from '@/lib/blog';
import { pageShareMeta } from '@/lib/shareMeta';
import { SITE_NAME } from '@/lib/siteConfig';

const BLOG_DESCRIPTION =
  'From the journal: wedding & portrait stories, planning tips, and Pee Dee local light—true-to-color notes behind the galleries.';

const BLOG_TITLE = `Blog | ${SITE_NAME}`;
const blogShare = pageShareMeta({
  title: BLOG_TITLE,
  description: BLOG_DESCRIPTION,
  url: '/blog',
});

export const metadata: Metadata = {
  title: 'Blog',
  description: BLOG_DESCRIPTION,
  alternates: { canonical: '/blog' },
  ...blogShare,
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <BlogPageShell>
      <section className="scroll-mt-24 border-t border-[#e0d9ce] bg-paper-soft px-6 py-16 dark:border-boho-stone/40 sm:px-10 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="section-eyebrow text-boho-sage">Journal</p>
            <h1 className="mt-4 font-display text-2xl font-medium leading-snug text-cream-dark dark:text-cream md:text-3xl lg:text-[2.35rem] md:leading-[1.12]">
              Stories, tips &amp; local light
            </h1>
            <p className="mt-5 font-body text-sm font-light leading-[1.75] text-cream-dark/78 dark:text-cream/72 md:text-base">
              True to color and timeless by design—planning notes, Pee Dee guides,
              and the heart behind the galleries.
            </p>
          </div>

          {(categories.length > 0 || tags.length > 0) && (
            <div className="mt-10 flex flex-col gap-6 border-t border-dashed border-[#cfc4b2]/80 pt-8 dark:border-boho-stone/45">
              {categories.length > 0 && (
                <div>
                  <p className="section-eyebrow text-boho-sage">Categories</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Link
                        key={category}
                        href={`/blog/category/${categoryToSlug(category)}`}
                        className="rounded-full border border-boho-sage/30 px-4 py-2 font-body text-xs font-semibold uppercase tracking-[0.14em] text-cream-dark/70 transition hover:border-coral/40 hover:text-coral dark:border-boho-stone/45 dark:text-cream/65 dark:hover:text-[#e8b896]"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {tags.length > 0 && (
                <div>
                  <p className="section-eyebrow text-boho-sage">Tags</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog/tag/${tagToSlug(tag)}`}
                        className="rounded-full border border-[#e0d9ce] px-4 py-2 font-body text-xs font-light text-cream-dark/65 transition hover:border-coral/35 hover:text-coral dark:border-boho-stone/45 dark:text-cream/60 dark:hover:text-[#e8b896]"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {posts.length > 0 ? (
            <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-2xl border border-dashed border-[#cfc4b2]/80 bg-[#faf8f4]/80 px-8 py-12 text-center dark:border-boho-stone/45 dark:bg-boho-bark/35">
              <p className="font-display text-2xl text-cream-dark dark:text-cream">
                New stories are on the way.
              </p>
              <p className="mt-4 font-body text-sm font-light leading-relaxed text-cream-dark/72 dark:text-cream/68 md:text-base">
                Add your first post in <code className="text-coral">content/blog/</code>.
              </p>
            </div>
          )}
        </div>
      </section>
    </BlogPageShell>
  );
}
