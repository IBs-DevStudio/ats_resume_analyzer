import { Link, NavLink } from "react-router";
import { useState } from "react";
import { usePuterStore } from "~/lib/puter";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { auth } = usePuterStore();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-[#0b65c2] font-semibold border-b-2 border-[#0b65c2] pb-1"
      : "hover:text-[#0b65c2] transition-colors";

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-[#0b65c2] font-semibold"
      : "hover:text-[#0b65c2]";

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        
        {/* Logo */}
      <Link to="/" className="flex items-center gap-3">
  <img
    src="/icons/jobfit-logo.png"
    alt="JobFit"
    className="h-12 w-auto object-contain"
  />

  <div className="flex flex-col items-center leading-tight">
    <span className="text-xl font-bold text-slate-800 tracking-tight">
      Job<span className="text-[#0b65c2]">Fit</span>
    </span>

    <span className="text-[10px] text-slate-500">
      by Ikram Banadar
    </span>
  </div>
</Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/insights" className={navLinkClass}>
            Insights
          </NavLink>

          <NavLink to="/pricing" className={navLinkClass}>
            Is It Completely Free?
          </NavLink>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          {auth.isAuthenticated ? (
            <>
              <Link
                to="/upload"
                className="bg-[#0b65c2] hover:bg-[#0052a3] text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow hover:shadow-md"
              >
                Scan Resume Free
              </Link>

              <button
                onClick={auth.signOut}
                className="text-slate-600 hover:text-slate-900 font-semibold text-sm transition-colors border border-slate-200 px-4 py-2.5 rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth"
                className="text-[#0b65c2] font-semibold text-sm hover:underline px-2 transition-colors"
              >
                Sign In
              </Link>

              <Link
                to="/auth"
                className="bg-[#0b65c2] hover:bg-[#0052a3] text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow hover:shadow-md"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-600 hover:text-slate-900 p-1"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-6 py-4 flex flex-col gap-4 text-sm font-medium text-slate-600 shadow-inner">
          
          <NavLink to="/" end className={mobileNavLinkClass}>
            Home
          </NavLink>

          <NavLink to="/dashboard" className={mobileNavLinkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/insights" className={mobileNavLinkClass}>
            Insights
          </NavLink>

          <NavLink to="/pricing" className={mobileNavLinkClass}>
            Pricing
          </NavLink>

          <div className="border-t border-slate-100 pt-4 mt-2 flex flex-col gap-3">
            {auth.isAuthenticated ? (
              <>
                <Link
                  to="/upload"
                  className="bg-[#0b65c2] text-white px-4 py-2 rounded text-center font-bold"
                >
                  Scan Resume Free
                </Link>

                <button
                  onClick={auth.signOut}
                  className="border border-slate-200 text-slate-700 px-4 py-2 rounded text-center font-bold"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth?next=/upload"
                  className="bg-[#0b65c2] text-white px-4 py-2 rounded text-center font-bold"
                >
                  Get Started
                </Link>

                <Link
                  to="/auth?next=/upload"
                  className="border border-[#0b65c2] text-[#0b65c2] px-4 py-2 rounded text-center font-bold"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;