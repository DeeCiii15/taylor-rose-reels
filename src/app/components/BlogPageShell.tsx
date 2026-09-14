import Navigation from './Navigation';
import SiteFooter from './SiteFooter';
import HomeStylePageIntro from './HomeStylePageIntro';
import RevealMainChildren from './RevealMainChildren';

type BlogPageShellProps = {
  children: React.ReactNode;
};

export default function BlogPageShell({ children }: BlogPageShellProps) {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HomeStylePageIntro />
      <main>
        <RevealMainChildren>{children}</RevealMainChildren>
      </main>
      <SiteFooter />
    </div>
  );
}
