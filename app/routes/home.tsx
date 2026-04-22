import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {Link, useNavigate} from "react-router";
import {useEffect, useRef, useState} from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Atsync — AI Resume Analyzer" },
    { name: "description", content: "Sync your resume to any job. AI-powered ATS scoring." },
  ];
}

const AnimatedBackground = () => {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none',
      background: 'linear-gradient(160deg, #f0f8ff 0%, #e0f2fe 50%, #f8fafc 100%)',
    }}>
      {/* Animated blobs */}
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
        position: 'absolute', width: 350, height: 350, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)',
        top: '40%', left: '40%',
        animation: 'blobDrift3 10s ease-in-out infinite alternate',
      }} />
      {/* Subtle grid */}
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
        @keyframes blobDrift3 {
          from { transform: translate(0,0) scale(1); }
          to { transform: translate(-40px, -50px) scale(1.08); }
        }
      `}</style>
    </div>
  );
};

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if(!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);
      const resumes = (await kv.list('resume:*', true)) as KVItem[];
      const parsedResumes = resumes?.map((resume) => JSON.parse(resume.value) as Resume);
      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };
    loadResumes();
  }, []);

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <AnimatedBackground />
      <Navbar />
      {/* paddingTop: 64px to offset fixed navbar */}
      <main style={{ paddingTop: 64, position: 'relative', zIndex: 1 }}>
        <section className="main-section">
          <div className="page-heading py-12">
            <div className="sky-tag">AI-Powered ATS Scanner</div>
          <h1 style={{ marginTop: 12, fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 400 }}>
              Optimize your resume to<br />
              get <span className="text-gradient">more interviews</span>
            </h1>
            <p style={{ color: '#475467', fontSize: 16, maxWidth: 520, lineHeight: 1.7, marginTop: 4, fontFamily: "'DM Sans', sans-serif" }}>
              {!loadingResumes && resumes?.length === 0
                ? "Upload your resume and a job description to get an instant ATS score and improvement tips."
                : `${resumes.length} resume${resumes.length !== 1 ? 's' : ''} analyzed — review your AI-powered feedback below.`
              }
            </p>
            {resumes.length === 0 && !loadingResumes && (
              <Link to="/upload" className="primary-button" style={{ marginTop: 8, fontSize: 15, padding: '13px 36px', borderRadius: 10 }}>
                Scan Your Resume For Free
              </Link>
            )}
          </div>

          {loadingResumes && (
            <div className="flex flex-col items-center justify-center gap-3 py-12">
              <img src="/images/resume-scan-2.gif" className="w-[140px]" style={{ opacity: 0.8 }} />
              <span style={{ fontSize: 13, color: '#0ea5e9', fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>Loading your resumes...</span>
            </div>
          )}

          {!loadingResumes && resumes.length > 0 && (
            <>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                width: '100%', maxWidth: 1400, marginBottom: 4
              }}>
                <h2 style={{ fontSize: 20, color: '#0f172a', fontWeight: 600, fontFamily: "'Syne', sans-serif" }}>
                  Your Analyses
                </h2>
                <Link to="/upload" className="primary-button" style={{ fontSize: 13, padding: '8px 18px' }}>
                  + New Scan
                </Link>
              </div>
              <div className="resumes-section">
                {resumes.map((resume, i) => (
                  <div key={resume.id} style={{ animationDelay: `${i * 80}ms` }} className="animate-in fade-in duration-700">
                    <ResumeCard resume={resume} />
                  </div>
                ))}
              </div>
            </>
          )}

          {!loadingResumes && resumes?.length === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginTop: 8 }}>
              <div style={{
                background: '#ffffff',
                border: '1.5px dashed #bae6fd',
                borderRadius: 16,
                padding: '48px 64px',
                textAlign: 'center',
                maxWidth: 420,
                boxShadow: '0 2px 12px rgba(14,165,233,0.06)'
              }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>📄</div>
                <p style={{ color: '#475467', fontSize: 14, marginBottom: 20, fontFamily: "'DM Sans', sans-serif" }}>
                  No resumes scanned yet. Upload your first resume to get an ATS score and detailed feedback.
                </p>
                <Link to="/upload" className="primary-button" style={{ fontSize: 14 }}>
                  Upload Resume
                </Link>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}