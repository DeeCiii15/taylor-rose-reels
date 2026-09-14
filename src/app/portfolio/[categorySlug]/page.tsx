import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PortfolioBackLink from '../../components/PortfolioBackLink';
import PortfolioRelatedLinks from '../../components/PortfolioRelatedLinks';
import { PortfolioCategoryJsonLd } from '../../components/PortfolioGalleryJsonLd';
import PortfolioPageShell from '../../components/PortfolioPageShell';
import PortfolioShootGrid from '../../components/PortfolioShootGrid';
import {
  getCategoryByFolder,
  getShootCards,
  PORTFOLIO_CATEGORY_DEFS,
} from '@/lib/portfolioData';
import { categoryMetadata } from '@/lib/portfolioSeo';

type CategoryPageProps = {
  params: Promise<{ categorySlug: string }>;
};

export function generateStaticParams() {
  return PORTFOLIO_CATEGORY_DEFS.map((category) => ({
    categorySlug: category.folder,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = getCategoryByFolder(categorySlug);
  if (!category) return {};

  const meta = categoryMetadata(category);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: meta.path },
    openGraph: meta.openGraph,
    ...(meta.twitter ? { twitter: meta.twitter } : {}),
  };
}

export default async function PortfolioCategoryPage({
  params,
}: CategoryPageProps) {
  const { categorySlug } = await params;
  const category = getCategoryByFolder(categorySlug);
  if (!category) notFound();

  const shootCards = getShootCards(category.name);

  return (
    <PortfolioPageShell>
      <PortfolioCategoryJsonLd category={category} />
      <section
        className="border-t border-[#e0d9ce] bg-paper-soft px-6 py-16 dark:border-boho-stone/40 sm:px-10 lg:px-16 lg:py-20"
        aria-label={category.name}
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between lg:mb-14">
            <div className="flex flex-col gap-4">
              <PortfolioBackLink href="/portfolio" label="Back to all galleries" />
              <PortfolioRelatedLinks categoryName={category.name} />
            </div>
            <div className="text-left sm:text-right">
              <p className="section-eyebrow text-boho-sage sm:text-right">
                Gallery
              </p>
              <h1 className="mt-2 font-display text-2xl font-medium text-cream-dark dark:text-cream md:text-3xl lg:text-[2.35rem]">
                {category.pageHeading ?? category.name}
              </h1>
              <p className="mt-3 max-w-md font-body text-sm font-light leading-relaxed text-cream-dark/72 dark:text-cream/68 sm:ml-auto sm:text-right">
                {category.description}
              </p>
            </div>
          </div>
          <PortfolioShootGrid shoots={shootCards} categoryName={category.name} />
        </div>
      </section>
    </PortfolioPageShell>
  );
}
