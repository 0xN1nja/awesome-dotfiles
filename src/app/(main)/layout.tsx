import { ReactNode } from "react";
import Footer from "~/components/layout/footer";
import Navbar from "~/components/layout/nav";
import PrefetchAll from "~/components/prefetch-all";
import SkipContent from "~/components/ui/skip-content";

const prefetchRoutes = ["/", "/rices", "/about"];

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container relative flex min-h-dvh flex-col space-y-4 py-2">
      <PrefetchAll routes={prefetchRoutes} />
      <div className="!mb-6 space-y-4">
        <SkipContent />
        <Navbar />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
