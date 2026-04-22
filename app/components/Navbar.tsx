import {Link} from "react-router";

const Navbar = () => {
    return (
        <nav style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#ffffff',
            borderBottom: '1px solid #e2e8f0',
            padding: '0 48px',
            height: 64,
            width: '100%',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
            boxSizing: 'border-box',
        }}>
            {/* Logo */}
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                    width: 32, height: 32,
                    background: 'linear-gradient(135deg, #0ea5e9, #1d6fdc)',
                    borderRadius: 8,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0
                }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 4h10M3 8h7M3 12h5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </div>
                <span style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: 20,
                    letterSpacing: '-0.02em',
                    color: '#0f172a',
                }}>Atsync</span>
            </Link>

            {/* Center links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 2, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                {[
                    { label: 'Dashboard', to: '/' },
                    { label: 'ATS Resume', to: '/upload' },
                    { label: 'Insights', to: '/' },
                    { label: 'Pricing', to: '/' },
                ].map(({ label, to }) => (
                    <Link key={label} to={to} style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 14,
                        fontWeight: 500,
                        color: '#334155',
                        padding: '8px 14px',
                        borderRadius: 6,
                        textDecoration: 'none',
                        transition: 'background 0.15s, color 0.15s',
                        whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={e => {
                        (e.target as HTMLElement).style.background = '#f0f8ff';
                        (e.target as HTMLElement).style.color = '#0ea5e9';
                    }}
                    onMouseLeave={e => {
                        (e.target as HTMLElement).style.background = 'transparent';
                        (e.target as HTMLElement).style.color = '#334155';
                    }}>
                        {label}
                    </Link>
                ))}
            </div>

            {/* CTA */}
            <Link to="/upload" style={{
                background: '#1d6fdc',
                color: '#ffffff',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: 14,
                padding: '10px 22px',
                borderRadius: 8,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#1558b8')}
            onMouseLeave={e => (e.currentTarget.style.background = '#1d6fdc')}>
                Scan Resume Free
            </Link>
        </nav>
    );
};
export default Navbar;