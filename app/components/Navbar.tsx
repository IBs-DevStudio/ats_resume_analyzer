import {Link} from "react-router";

const Navbar = () => {
    return (
        <div className="px-4 pt-4 sticky top-4 z-50">
            <nav className="navbar">
                <Link to="/" className="flex items-center gap-2">
                    <div style={{
                        width: 28, height: 28,
                        background: 'linear-gradient(135deg, #00d4ff, #0088cc)',
                        borderRadius: 6,
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <rect x="1" y="1" width="5" height="5" rx="1" fill="#020c1b"/>
                            <rect x="8" y="1" width="5" height="5" rx="1" fill="#020c1b" opacity="0.6"/>
                            <rect x="1" y="8" width="5" height="5" rx="1" fill="#020c1b" opacity="0.6"/>
                            <rect x="8" y="8" width="5" height="5" rx="1" fill="#020c1b" opacity="0.3"/>
                        </svg>
                    </div>
                    <span style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 800,
                        fontSize: 18,
                        letterSpacing: '-0.02em',
                        background: 'linear-gradient(135deg, #ffffff 0%, #00d4ff 60%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}>ATSYNC</span>
                </Link>
                <div className="flex items-center gap-3">
                    <span style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 10,
                        color: '#00d4ff',
                        letterSpacing: '0.1em',
                        opacity: 0.7
                    }}>AI RESUME ANALYZER</span>
                    <Link to="/upload" className="primary-button">
                        + Analyze Resume
                    </Link>
                </div>
            </nav>
        </div>
    )
}
export default Navbar