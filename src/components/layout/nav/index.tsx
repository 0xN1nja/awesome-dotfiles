import BackToPosts from "./back-to-posts";
import MobileNav from "./mobile-nav";
import NavList from "./nav-list";

const Navbar = () => {
  return (
    <nav className="mb-6 mt-10 flex items-center justify-between gap-4 pt-4" role="navigation">
      <BackToPosts />

      <div className="ml-auto hidden sm:block">
        <NavList />
      </div>

      <div className="ml-auto block sm:hidden">
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
