import { Link } from "react-router";
import { useState } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white border-b border-slate-200 h-16 w-full flex items-center justify-between px-4 md:px-12 shadow-[0_1px_6px_rgba(0,0,0,0.06)]">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 no-underline">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0ea5e9] to-[#1d6fdc] flex items-center justify-center shrink-0">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 4h10M3 8h7M3 12h5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <span className="font-['Syne',sans-serif] font-extrabold text-xl tracking-tight text-slate-900">
          Atsync
        </span>
      </Link>

      {/* Desktop Links (Center) */}
      <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
        {[
          { label: "Dashboard", to: "/dashboard" },
          { label: "ATS Resume", to: "/upload" },
          { label: "Insights", to: "/dashboard" },
          { label: "Pricing", to: "/" },
        ].map(({ label, to }) => (
          <Link
            key={label}
            to={to}
            className="font-sans text-sm font-medium text-slate-700 px-3 py-2 rounded-md transition-colors hover:bg-sky-50 hover:text-sky-500"
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Desktop CTA */}
      <div className="hidden md:block">
        <Link
          to="/upload"
          className="bg-[#1d6fdc] hover:bg-[#1558b8] text-white font-sans font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
        >
          Scan Resume Free
        </Link>
      </div>

      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden flex flex-col items-center justify-center w-10 h-10 gap-1.5 rounded-lg hover:bg-slate-50 transition-colors"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <div
          className={`w-5 h-0.5 bg-slate-700 transition-transform ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
        ></div>
        <div
          className={`w-5 h-0.5 bg-slate-700 transition-opacity ${isMobileMenuOpen ? "opacity-0" : ""}`}
        ></div>
        <div
          className={`w-5 h-0.5 bg-slate-700 transition-transform ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
        ></div>
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-slate-200 shadow-lg flex flex-col p-4 md:hidden gap-2">
          {[
            { label: "Dashboard", to: "/dashboard" },
            { label: "ATS Resume", to: "/upload" },
            { label: "Insights", to: "/dashboard" },
            { label: "Pricing", to: "/" },
          ].map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className="font-sans text-base font-medium text-slate-700 p-3 rounded-lg hover:bg-sky-50 hover:text-sky-500"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/upload"
            className="bg-[#1d6fdc] text-white font-sans font-semibold text-center text-base p-3 rounded-lg mt-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Scan Resume Free
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
