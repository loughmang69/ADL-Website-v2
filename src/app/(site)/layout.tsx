import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import VersionWatcher from "@/components/ui/VersionWatcher";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <VersionWatcher />
    </div>
  );
}
