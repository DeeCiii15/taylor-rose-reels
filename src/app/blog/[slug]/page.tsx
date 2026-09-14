import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import BlogPageShell from '@/app/components/BlogPageShell';
import BlogPostCard from '@/app/components/BlogPostCard';
import BlogPostJsonLd from '@/app/components/BlogPostJsonLd';
import { blogMdxComponents } from '@/app/components/BlogMdxComponents';
import {
  categoryToSlug,
  formatPostDate,
  getPostBySlug,
  getPublishedPostSlugs,
  getRelatedPosts,
  tagToSlug,
} from '@/lib/blog';
import { getServicesForBlogPost } from '@/lib/servicesServer';
import { pageShareMeta } from '@/lib/shareMeta';
import {
  DEFAULT_OG_IMAGE_PATH,
  PHOTOGRAPHER_NAME,
  SITE_NAME,
} from '@/lib/siteConfig';

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getPublishedPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || !post.published) return {};

  const shareTitle = `${post.title} | ${SITE_NAME}`;
  const share = pageShareMeta({
    title: shareTitle,
    description: post.description,
    url: `/blog/${post.slug}`,
    image: post.coverImage ?? DEFAULT_OG_IMAGE_PATH,
    imageAlt: post.coverImageAlt ?? post.title,
    type: 'article',
  });

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      ...share.openGraph,
      type: 'article',
      publishedTime: post.date,
    },
    twitter: share.twitter,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || !post.published) notFound();

  const relatedPosts = getRelatedPosts(slug, 3);
  const relatedServices = getServicesForBlogPost(post);

  return (
    <BlogPageShell>
      <BlogPostJsonLd post={post} />

      <article className="scroll-mt-24 border-t border-[#e0d9ce] bg-paper-soft px-6 py-16 dark:border-boho-stone/40 sm:px-10 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="font-body text-sm font-medium text-coral transition hover:text-coral-dark dark:text-[#e8b896] dark:hover:text-[#f2dcc4]"
          >
            ← Back to journal
          </Link>

          {relatedServices.length > 0 &&
            categoryToSlug(post.category ?? '') !== 'wedding-planning' && (
            <nav
              aria-label="Related photography services"
              className="mt-4 flex flex-col gap-2"
            >
              {relatedServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="font-body text-sm font-light text-coral underline decoration-boho-sage/40 underline-offset-4 transition hover:text-coral-dark dark:text-[#e8b896] sm:text-base"
                >
                  Learn about our {service.name.toLowerCase()} services →
                </Link>
              ))}
            </nav>
          )}

          <header className="mt-8">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              {post.category && (
                <Link
                  href={`/blog/category/${categoryToSlug(post.category)}`}
                  className="section-eyebrow text-boho-sage transition hover:text-coral"
                >
                  {post.category}
                </Link>
              )}
              <span className="font-body text-xs font-light text-cream-dark/55 dark:text-cream/50">
                {formatPostDate(post.date)} · {post.readingTime} · By{' '}
                {PHOTOGRAPHER_NAME}
              </span>
            </div>

            <h1 className="mt-5 font-display text-3xl font-medium leading-snug text-cream-dark dark:text-cream md:text-4xl lg:text-[2.6rem] lg:leading-[1.12]">
              {post.title}
            </h1>

            <p className="mt-5 font-body text-base font-light leading-[1.85] text-cream-dark/78 dark:text-cream/72 md:text-lg">
              {post.description}
            </p>

            {post.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tagToSlug(tag)}`}
                    className="rounded-full border border-[#e0d9ce] px-3 py-1 font-body text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-cream-dark/65 transition hover:border-coral/35 hover:text-coral dark:border-boho-stone/45 dark:text-cream/60 dark:hover:text-[#e8b896]"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </header>

          {post.coverImage && (
            <div className="lift-shadow relative mt-10 aspect-[16/10] overflow-hidden rounded-2xl bg-[#e8e3db] ring-1 ring-[#e8e3db] dark:bg-boho-ink dark:ring-boho-stone/35">
              <Image
                src={post.coverImage}
                alt={post.coverImageAlt ?? post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          )}

          <div className="mt-10">
            <MDXRemote source={post.content} components={blogMdxComponents} />
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="border-t border-[#e0d9ce] bg-paper px-6 py-16 dark:border-boho-stone/40 sm:px-10 lg:px-16 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <p className="section-eyebrow text-boho-sage">Keep reading</p>
            <h2 className="mt-3 font-display text-2xl font-medium text-cream-dark dark:text-cream md:text-3xl">
              More from the journal
            </h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <BlogPostCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}
    </BlogPageShell>
  );
}
