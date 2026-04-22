import { Link } from "react-router";
import { Menu } from "lucide-react";
import { useState } from "react";
import { usePuterStore } from "~/lib/puter";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { auth } = usePuterStore();

    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
            <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#0b65c2] rounded flex items-center justify-center shadow-sm">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold text-slate-800 tracking-tight">Atsync</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                    <Link to="/dashboard" className="hover:text-[#0b65c2] transition-colors">Dashboard</Link>
                    <Link to="/insights" className="hover:text-[#0b65c2] transition-colors">Insights</Link>
                    <Link to="/pricing" className="hover:text-[#0b65c2] transition-colors">Why It's Free?</Link>
                </div>

                {/* Desktop CTA */}
                <div className="hidden md:flex items-center gap-4">
                    {auth.isAuthenticated ? (
                        <>
                            <Link to="/upload" className="bg-[#0b65c2] hover:bg-[#0052a3] text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow hover:shadow-md">
                                Scan Resume Free
                            </Link>
                            <button 
                                onClick={auth.signOut} 
                                className="text-slate-600 hover:text-slate-900 font-semibold text-sm transition-colors border border-slate-200 px-4 py-2.5 rounded-lg hover:bg-slate-50"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/auth" className="text-[#0b65c2] font-semibold text-sm hover:underline px-2 transition-colors">
                                Sign In
                            </Link>
                            <Link to="/auth" className="bg-[#0b65c2] hover:bg-[#0052a3] text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow hover:shadow-md">
                                Get Started
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden text-slate-600 hover:text-slate-900"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-slate-100 bg-white px-6 py-4 flex flex-col gap-4 text-sm font-medium text-slate-600 shadow-inner">
                    <Link to="/dashboard" className="hover:text-[#0b65c2]">Dashboard</Link>
                    <Link to="/" className="hover:text-[#0b65c2]">ATS Resume</Link>
                    <Link to="/insights" className="hover:text-[#0b65c2]">Insights</Link>
                    <Link to="/pricing" className="hover:text-[#0b65c2]">Pricing</Link>
                    
                    <div className="border-t border-slate-100 pt-4 mt-2 flex flex-col gap-3">
                        {auth.isAuthenticated ? (
                            <>
                                <Link to="/upload" className="bg-[#0b65c2] text-white px-4 py-2 rounded text-center font-bold">
                                    Scan Resume Free
                                </Link>
                                <button onClick={auth.signOut} className="border border-slate-200 text-slate-700 px-4 py-2 rounded text-center font-bold">
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/auth?next=/upload" className="bg-[#0b65c2] text-white px-4 py-2 rounded text-center font-bold">
                                    Get Started
                                </Link>
                                <Link to="/auth?next=/upload" className="border border-[#0b65c2] text-[#0b65c2] px-4 py-2 rounded text-center font-bold">
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