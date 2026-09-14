import Link from 'next/link';
import PortfolioShootGrid from './PortfolioShootGrid';
import type { PortfolioShootCard } from '@/lib/portfolioData';

type ServiceGallerySectionProps = {
  serviceName: string;
  portfolioHref: string;
  shoots: PortfolioShootCard[];
};

export default function ServiceGallerySection({
  serviceName,
  portfolioHref,
  shoots,
}: ServiceGallerySectionProps) {
  return (
    <section
      className="border-t border-[#e0d9ce] bg-paper-soft px-6 py-16 dark:border-boho-stone/40 sm:px-10 lg:px-16 lg:py-24"
      aria-labelledby="service-galleries-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow text-boho-sage">Recent work</p>
          <h2
            id="service-galleries-heading"
            className="mt-4 font-display text-2xl font-medium leading-snug text-cream-dark dark:text-cream sm:text-3xl md:text-[2.35rem] md:leading-[1.12]"
          >
            A closer look at {serviceName.toLowerCase()}
          </h2>
          <p className="mt-4 font-body text-base font-light leading-[1.8] text-cream-dark/75 dark:text-cream/72">
            Tap any gallery to see the full collection—or browse everything in
            the portfolio.
          </p>
        </div>

        <div className="mt-14">
          <PortfolioShootGrid shoots={shoots} categoryName={serviceName} />
        </div>

        <div className="mt-12 text-center">
          <Link
            href={portfolioHref}
            className="font-body text-sm font-light text-coral underline decoration-boho-sage/40 underline-offset-4 transition hover:text-coral-dark dark:text-[#e8b896]"
          >
            View all {serviceName.toLowerCase()} galleries →
          </Link>
        </div>
      </div>
    </section>
  );
}
