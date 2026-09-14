import PortfolioHomeGallery from '../components/PortfolioHomeGallery';
import PortfolioPageShell from '../components/PortfolioPageShell';
import { resolveLegacyPortfolioRedirect } from '@/lib/portfolioSeo';
import { redirect } from 'next/navigation';

type PortfolioPageProps = {
  searchParams: Promise<{ category?: string; shoot?: string }>;
};

export default async function PortfolioPage({
  searchParams,
}: PortfolioPageProps) {
  const params = await searchParams;
  const legacyPath = resolveLegacyPortfolioRedirect(
    params.category,
    params.shoot,
  );
  if (legacyPath) redirect(legacyPath);

  return (
    <PortfolioPageShell>
      <section
        className="scroll-mt-24 border-t border-[#e0d9ce] bg-paper-soft px-6 py-20 dark:border-boho-stone/40 sm:px-10 lg:px-16 lg:py-24"
        aria-label="Portfolio galleries"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-xl lg:mb-16">
            <p className="section-eyebrow text-boho-sage">Galleries</p>
            <h1 className="mt-3 font-display text-2xl font-medium text-cream-dark dark:text-cream md:text-3xl">
              Documenting Stories One Photograph at a Time
            </h1>
            <h2 className="mt-4 font-body text-sm font-light leading-relaxed text-cream-dark/72 dark:text-cream/68">
              True to color and timeless by design—click any card to wander deeper.
            </h2>
          </div>
          <PortfolioHomeGallery variant="portfolio" />
        </div>
      </section>
    </PortfolioPageShell>
  );
}
