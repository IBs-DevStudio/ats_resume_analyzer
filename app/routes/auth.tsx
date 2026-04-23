import {usePuterStore} from "~/lib/puter";
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router";

export const meta = () => ([
    { title: 'JobFit | Sign In' },
    { name: 'description', content: 'Log into your account' },
])

const Auth = () => {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const navigate = useNavigate();

    const params = new URLSearchParams(location.search);
    const next = params.get('next') || '/';

    useEffect(() => {
        if(auth.isAuthenticated) navigate(next);
    }, [auth.isAuthenticated, next]);

    return (
        <div style={{ minHeight: '100vh', position: 'relative' }}>
            <div style={{
                position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none',
                background: 'linear-gradient(160deg, #f0f8ff 0%, #e0f2fe 50%, #f8fafc 100%)',
            }}>
                <div style={{
                    position: 'absolute', width: 600, height: 600, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%)',
                    top: -200, right: -100,
                    animation: 'blobDrift1 14s ease-in-out infinite alternate',
                }} />
                <div style={{
                    position: 'absolute', width: 500, height: 500, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(29,111,220,0.1) 0%, transparent 70%)',
                    bottom: -100, left: -80,
                    animation: 'blobDrift2 18s ease-in-out infinite alternate',
                }} />
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'linear-gradient(rgba(14,165,233,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.04) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }} />
                <style>{`
                    @keyframes blobDrift1 {
                        from { transform: translate(0,0) scale(1); }
                        to { transform: translate(-60px, 80px) scale(1.12); }
                    }
                    @keyframes blobDrift2 {
                        from { transform: translate(0,0) scale(1); }
                        to { transform: translate(80px, -60px) scale(1.18); }
                    }
                `}</style>
            </div>

            <main style={{
                position: 'relative', zIndex: 1,
                minHeight: '100vh',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '24px 16px',
            }}>
                <div style={{
                    background: '#ffffff',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: 24,
                    padding: '48px 40px',
                    width: '100%',
                    maxWidth: 440,
                    boxShadow: '0 8px 40px rgba(14,165,233,0.1)',
                    textAlign: 'center',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 32 }}>
                        <div style={{
                            width: 36, height: 36,
                            background: 'linear-gradient(135deg, #0ea5e9, #1d6fdc)',
                            borderRadius: 9,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <img
                    src="/icons/jobfit-logo.png"
                    alt="JobFit"
                    className="h-15 w-auto object-contain"
                  />
                        </div>
                       
                        <span style={{
                            fontFamily: "'Syne', sans-serif",
                            fontWeight: 800, fontSize: 22,
                            letterSpacing: '-0.02em', color: '#0f172a',
                        }}>
                    <span className="text-black ">Job</span>
                    <span className="text-[#0b65c2]">Fit</span>
                  </span>
                    </div>

                    <h1 style={{
                        fontFamily: "'Instrument Serif', Georgia, serif",
                        fontWeight: 400, fontSize: 32,
                        color: '#0f172a', marginBottom: 8, lineHeight: 1.2,
                    }}>Welcome back</h1>
                    <p style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        color: '#475467', fontSize: 15, lineHeight: 1.6, marginBottom: 32
                    }}>
                        Sign in to access your resume analyses and ATS scores.
                    </p>

                    <div style={{
                        background: '#f0f8ff', border: '1px solid #bae6fd',
                        borderRadius: 12, padding: '12px 16px', marginBottom: 24,
                        display: 'flex', alignItems: 'center', gap: 10,
                    }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                            <circle cx="8" cy="8" r="7" stroke="#0ea5e9" strokeWidth="1.5"/>
                            <path d="M8 7v4M8 5v.5" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        <p style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontSize: 12, color: '#0369a1', textAlign: 'left', lineHeight: 1.5
                        }}>
                            JobFit uses Puter for secure authentication and private file storage.
                        </p>
                    </div>

                    {isLoading ? (
                        <button style={{
                            width: '100%', padding: '14px',
                            background: '#1d6fdc', color: '#fff',
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontWeight: 600, fontSize: 15,
                            border: 'none', borderRadius: 10,
                            cursor: 'not-allowed', opacity: 0.7,
                        }}>
                            Signing you in...
                        </button>
                    ) : auth.isAuthenticated ? (
                        <button onClick={auth.signOut} style={{
                            width: '100%', padding: '14px',
                            background: '#fee2e2', color: '#991b1b',
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontWeight: 600, fontSize: 15,
                            border: '1px solid #fecaca', borderRadius: 10, cursor: 'pointer',
                        }}>
                            Sign Out
                        </button>
                    ) : (
                        <button onClick={auth.signIn} style={{
                            width: '100%', padding: '14px',
                            background: '#1d6fdc', color: '#fff',
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontWeight: 600, fontSize: 15,
                            border: 'none', borderRadius: 10, cursor: 'pointer',
                            boxShadow: '0 4px 16px rgba(29,111,220,0.25)',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#1558b8')}
                        onMouseLeave={e => (e.currentTarget.style.background = '#1d6fdc')}>
                            Continue with Puter
                        </button>
                    )}

                    <p style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: 12, color: '#94a3b8', marginTop: 20, lineHeight: 1.6
                    }}>
                        By signing in you agree to our Terms of Service and Privacy Policy.
                    </p>

                    <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid #e2e8f0' }}>
                        <p style={{ fontSize: 11, color: '#94a3b8', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            Built by <span style={{ color: '#0ea5e9', fontWeight: 600 }}>Ikram Banadar</span> · IB's Dev World
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Auth;