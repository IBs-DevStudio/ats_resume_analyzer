import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if(!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated])

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumes = (await kv.list('resume:*', true)) as KVItem[];

      const parsedResumes = resumes?.map((resume) => (
          JSON.parse(resume.value) as Resume
      ))

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    }

    loadResumes()
  }, []);

  return (
    <main className="min-h-screen bg-[#f8fbff] flex flex-col font-sans relative overflow-hidden">
      <Navbar />
      
      {/* Glowing Background Blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-300/20 rounded-full blur-[120px] pointer-events-none animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-sky-300/20 rounded-full blur-[150px] pointer-events-none animate-blob" style={{ animationDelay: '2s' }}></div>

      <div className="flex-1 max-w-7xl w-full mx-auto px-6 py-32 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 bg-white/60 backdrop-blur-md p-8 rounded-3xl border border-slate-100 shadow-sm">
            <div>
                <h1 className="text-4xl md:text-5xl font-bold text-[#0f2137] tracking-tight mb-3">
                    Your <span className="text-[#0b65c2]">Dashboard</span>
                </h1>
                <p className="text-lg text-slate-500 font-medium">Track your applications and review AI-powered resume scores.</p>
            </div>
            
            <Link to="/upload" className="flex items-center justify-center gap-2 bg-[#0b65c2] hover:bg-[#0052a3] text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-[0_10px_20px_rgba(11,101,194,0.2)] hover:shadow-[0_15px_30px_rgba(11,101,194,0.3)] hover:-translate-y-0.5 whitespace-nowrap">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
                New Scan
            </Link>
        </div>

        {loadingResumes ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1,2,3].map(i => (
                    <div key={i} className="bg-white rounded-3xl p-6 h-[340px] border border-slate-100 shadow-sm animate-pulse flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                            <div className="space-y-3 flex-1 mt-2">
                                <div className="h-6 bg-slate-200 rounded-md w-3/4"></div>
                                <div className="h-4 bg-slate-200 rounded-md w-1/2"></div>
                            </div>
                            <div className="w-[75px] h-[75px] rounded-full bg-slate-200"></div>
                        </div>
                        <div className="flex-1 bg-slate-100 rounded-2xl w-full mt-4"></div>
                    </div>
                ))}
            </div>
        ) : resumes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {resumes.map((resume) => (
                    <ResumeCard key={resume.id} resume={resume} />
                ))}
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center py-24 bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200 border-dashed text-center shadow-sm">
                <div className="w-20 h-20 bg-blue-50 text-[#0b65c2] rounded-full flex items-center justify-center mb-6 shadow-inner">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#0f2137] mb-2">No Resumes Found</h3>
                <p className="text-slate-500 mb-8 max-w-md">You haven't scanned any resumes yet. Upload your first resume to get detailed AI feedback and ATS scoring.</p>
                <Link to="/upload" className="bg-[#0f2137] hover:bg-slate-800 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg hover:-translate-y-0.5">
                    Start Your First Scan
                </Link>
            </div>
        )}
      </div>

      <style>{`
          @keyframes blob {
              0% { transform: translate(0px, 0px) scale(1); }
              33% { transform: translate(30px, -50px) scale(1.1); }
              66% { transform: translate(-20px, 20px) scale(0.9); }
              100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob {
              animation: blob 7s infinite;
          }
      `}</style>
    </main>
  );
}