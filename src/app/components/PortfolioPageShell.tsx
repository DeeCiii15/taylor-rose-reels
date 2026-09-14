import Navigation from './Navigation';
import SiteFooter from './SiteFooter';
import HomeStylePageIntro from './HomeStylePageIntro';
import RevealMainChildren from './RevealMainChildren';

type PortfolioPageShellProps = {
  children: React.ReactNode;
};

export default function PortfolioPageShell({
  children,
}: PortfolioPageShellProps) {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HomeStylePageIntro />
      <main id="portfolio-main">
        <RevealMainChildren>{children}</RevealMainChildren>
      </main>
      <SiteFooter />
    </div>
  );
}
