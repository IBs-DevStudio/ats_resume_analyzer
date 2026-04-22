import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import Navbar from "~/components/Navbar";
import { usePuterStore } from "~/lib/puter";
import FileUploader from "~/components/FileUploader";
import { prepareMinimalInstructions } from "../../constants";
import ScoreCircle from "~/components/ScoreCircle";
const FadeIn = ({ children, delay = 0, className = "" }: { children?: React.ReactNode, delay?: number, className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '50px' });
    
    if (domRef.current) {
      observer.observe(domRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const AnimatedScore = ({ score, color, strokeDasharray = 283, showPercent = false }: { score: number, color: string, strokeDasharray?: number, showPercent?: boolean }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  const offset = isVisible ? strokeDasharray - (strokeDasharray * score) / 100 : strokeDasharray;

  return (
    <div ref={domRef} className="relative w-full h-full">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" stroke="#e2e8f0" strokeWidth="10" fill="none" />
          <circle 
            cx="50" cy="50" r="45" 
            stroke={color} 
            strokeWidth="10" fill="none" 
            strokeDasharray={strokeDasharray} 
            strokeDashoffset={offset} 
            className="transition-all duration-[1500ms] ease-out" 
          />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-slate-800">
        {isVisible ? score : 0}{showPercent && <span className="text-lg">%</span>}
      </div>
    </div>
  );
};

const Typewriter = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const currentWord = words[index];
        if (isDeleting) {
          setText(currentWord.substring(0, text.length - 1));
          if (text.length === 0) {
            setIsDeleting(false);
            setIndex((prev) => (prev + 1) % words.length);
          }
        } else {
          setText(currentWord.substring(0, text.length + 1));
          if (text.length === currentWord.length) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        }
      },
      isDeleting ? 50 : 100,
    );
    return () => clearTimeout(timeout);
  }, [text, isDeleting, index, words]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-[#0b65c2] border-r-2 border-[#0b65c2] pr-1">
      {text}
    </span>
  );
};

export default function Landing() {
  const [activeTab, setActiveTab] = useState("Match Report");
  const { fs, ai, auth } = usePuterStore();
  const navigate = useNavigate();
  const [isQuickAnalyzing, setIsQuickAnalyzing] = useState(false);
  const [quickResult, setQuickResult] = useState<{score: number, tip: string} | null>(null);
  const [quickStatus, setQuickStatus] = useState('');

  const handleQuickAnalyze = async (file: File) => {
      setIsQuickAnalyzing(true);
      setQuickStatus('Uploading resume...');
      try {
          const uploadedFile = await fs.upload([file]);
          if(!uploadedFile) throw new Error('Upload failed');
          
          setQuickStatus('Running quick AI scan...');
          const feedback = await ai.feedback(uploadedFile.path, prepareMinimalInstructions());
          
          if (!feedback) throw new Error('AI scan failed');
          
          const feedbackText = typeof feedback.message.content === 'string'
              ? feedback.message.content
              : feedback.message.content[0].text;
              
          const result = JSON.parse(feedbackText);
          setQuickResult(result);
      } catch (e) {
          console.error(e);
          setQuickStatus('Error occurred during quick scan.');
      } finally {
          setIsQuickAnalyzing(false);
      }
  };

  const onQuickFileSelect = (file: File | null) => {
      if (file) {
          handleQuickAnalyze(file);
      }
  };

  const handleGetCompleteReview = () => {
      if(!auth.isAuthenticated) {
          navigate('/auth?next=/upload');
      } else {
          navigate('/upload');
      }
  };

  return (
    <div className="min-h-screen bg-[#f4f9ff] text-slate-800 font-sans overflow-x-hidden selection:bg-sky-200 selection:text-sky-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 flex flex-col items-center text-center px-4 overflow-hidden z-0">
        {/* Animated Background Blobs & Grid */}
        <div className="absolute inset-0 -z-10 overflow-hidden bg-[#f4f9ff]">
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-sky-200/40 mix-blend-multiply filter blur-[80px] animate-blob"></div>
            <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-blue-200/40 mix-blend-multiply filter blur-[80px] animate-blob" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] rounded-full bg-sky-100/50 mix-blend-multiply filter blur-[80px] animate-blob" style={{animationDelay: '4s'}}></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>
        </div>

        <FadeIn delay={100} className="w-full flex flex-col items-center z-10 relative">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-sky-300/30 blur-2xl rounded-full animate-blob"></div>
            <div className="relative inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 border border-blue-100 backdrop-blur-md shadow-sm text-sm font-semibold text-[#0b65c2]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
              </span>
              Powered by Claude 3.5 Sonnet
            </div>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl text-[#0f2137] leading-[1.2] max-w-4xl mx-auto mb-6 tracking-tight">
            Optimize your resume to <br className="hidden md:block" />
            <Typewriter words={["get more interviews", "beat the ATS bots", "land your dream job"]} />
          </h1>
          <p className="text-xl md:text-2xl text-[#34495e] max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
            Stop guessing why you're getting rejected. Our AI scans your resume against job descriptions to give you an instant ATS score and actionable fixes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md sm:max-w-none">
              <Link
                to="/upload"
                className="inline-flex px-8 py-4 bg-[#0b65c2] hover:bg-[#0052a3] text-white rounded-lg font-bold text-xl transition-all shadow-md w-full sm:w-auto justify-center"
              >
                Scan Your Resume For Free
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex px-8 py-4 bg-transparent border-2 border-[#0b65c2] text-[#0b65c2] hover:bg-blue-50 rounded-lg font-bold text-xl transition-all w-full sm:w-auto justify-center"
              >
                See How It Works
              </a>
          </div>
        </FadeIn>
      </section>

      {/* All-in-One Platform Section */}
      <section className="py-16 px-4 bg-[#f4f9ff]">
        <FadeIn className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f2137] mb-8">
            All-in-One Job Search Platform
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button 
              onClick={() => setActiveTab('Match Report')}
              className={`px-6 py-2.5 rounded-full border font-semibold text-sm flex items-center gap-2 transition-colors ${activeTab === 'Match Report' ? 'border-[#0b65c2] bg-blue-50 text-[#0b65c2]' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Match Report
            </button>
            <button 
              onClick={() => setActiveTab('One-Click Optimize')}
              className={`px-6 py-2.5 rounded-full border font-semibold text-sm flex items-center gap-2 transition-colors ${activeTab === 'One-Click Optimize' ? 'border-[#0b65c2] bg-blue-50 text-[#0b65c2]' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}`}>
               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
               One-Click Optimize
            </button>
            <button 
              onClick={() => setActiveTab('Job Match')}
              className={`px-6 py-2.5 rounded-full border font-semibold text-sm flex items-center gap-2 transition-colors ${activeTab === 'Job Match' ? 'border-[#0b65c2] bg-blue-50 text-[#0b65c2]' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}`}>
               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
               Job Match
            </button>
            <button 
              onClick={() => setActiveTab('AI Insights')}
              className={`px-6 py-2.5 rounded-full border font-semibold text-sm flex items-center gap-2 transition-colors ${activeTab === 'AI Insights' ? 'border-[#0b65c2] bg-blue-50 text-[#0b65c2]' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}`}>
               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
               AI Insights
            </button>
          </div>

          {/* Dashboard Mockup Container */}
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden mx-auto max-w-5xl text-left">
            {activeTab === 'Match Report' && (
              <>
            <div className="border-b border-slate-100 px-6 py-3 flex justify-between items-center text-sm">
                <div>
                    <span className="text-slate-500 font-semibold text-xs uppercase tracking-wide">Resume scan results</span>
                    <div className="font-bold text-slate-800">Netflix - Product Manager <span className="text-slate-400 font-normal">✎</span></div>
                </div>
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 text-[#0b65c2] font-semibold flex items-center gap-1 text-xs"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>Track</button>
                    <button className="px-3 py-1.5 border border-slate-200 rounded text-slate-600 font-semibold flex items-center gap-1 text-xs"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>Print</button>
                </div>
            </div>
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/4 border-r border-slate-100 p-6 flex flex-col items-center">
                    <h3 className="font-bold text-lg text-slate-800 mb-4">Match Rate</h3>
                    <div className="relative w-32 h-32 mb-6">
                        <AnimatedScore score={76} color="#00c875" showPercent={true} />
                    </div>
                    <button className="w-full bg-[#0b65c2] text-white font-bold py-2 rounded mb-2">Upload & rescan</button>
                    <button className="w-full bg-blue-50 text-[#0b65c2] font-bold py-2 rounded flex items-center justify-center gap-1"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>One-Click Optimize</button>
                    
                    <div className="w-full mt-6 space-y-4">
                        <div>
                            <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1"><span>Searchability</span><span className="text-[#0b65c2]">1 issue to fix</span></div>
                            <div className="h-2 bg-slate-100 rounded-full"><div className="h-full bg-[#0b65c2] rounded-full w-[80%]"></div></div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1"><span>Hard Skills</span><span className="text-[#0b65c2]">2 issues to fix</span></div>
                            <div className="h-2 bg-slate-100 rounded-full"><div className="h-full bg-[#0b65c2] rounded-full w-[60%]"></div></div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1"><span>Soft Skills</span><span className="text-slate-400">5 issues to fix</span></div>
                            <div className="h-2 bg-slate-100 rounded-full"><div className="h-full bg-slate-300 rounded-full w-[40%]"></div></div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-3/4 bg-slate-50 p-6">
                    <div className="flex border-b border-slate-200 mb-6">
                        <button className="px-8 py-3 font-bold text-slate-800 border-b-2 border-slate-800">Resume</button>
                        <button className="px-8 py-3 font-semibold text-slate-500 hover:text-slate-700 bg-slate-200/50 w-full text-left">Job Description</button>
                    </div>
                    
                    <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 mb-8 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-orange-500 font-bold">⚡ ATS-Specific Tips</span>
                            <span className="text-slate-600 text-sm">Adding this job's company name and web address can help us provide you ATS-specific tips.</span>
                        </div>
                        <button className="text-orange-500 border border-orange-200 bg-white px-3 py-1 rounded text-sm font-bold flex items-center gap-1">⚡ Get ATS Tip</button>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                        <h3 className="font-bold text-2xl text-slate-800">Searchability</h3>
                        <span className="bg-slate-700 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded">Important</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-6 max-w-3xl">An ATS (Applicant Tracking System) is a software used by 90% of companies and recruiters to search for resumes and manage the hiring process. Below is how well your resume appears in an ATS and a recruiter search.</p>
                    
                    <div className="bg-white border border-slate-200 rounded-lg divide-y divide-slate-100">
                        <div className="p-4 flex gap-4 items-start">
                            <div className="w-1/4 font-semibold text-sm text-slate-700 flex items-center justify-between">ATS Tip <span className="text-slate-300 rounded-full w-4 h-4 flex items-center justify-center border border-slate-200 text-[10px]">?</span></div>
                            <div className="w-3/4 flex gap-3 text-sm">
                                <div className="text-green-500 mt-0.5">✔</div>
                                <div>
                                    <p className="text-slate-600 mb-1">You've added a company name (Netflix) and web address () which can help us provide you ATS-specific tips.</p>
                                    <div className="flex gap-4">
                                        <button className="text-[#0b65c2] font-semibold">Update scan information</button>
                                        <button className="text-[#0b65c2] font-semibold bg-blue-50 px-2 rounded">View ATS Tips</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 flex gap-4 items-start">
                            <div className="w-1/4 font-semibold text-sm text-slate-700 flex items-center justify-between">Contact Information <span className="text-slate-300 rounded-full w-4 h-4 flex items-center justify-center border border-slate-200 text-[10px]">?</span></div>
                            <div className="w-3/4 flex flex-col gap-3 text-sm text-slate-600">
                                <div className="flex gap-3"><div className="text-green-500">✔</div> You provided your physical address. Recruiters use your address to validate your location for job matches.</div>
                                <div className="flex gap-3"><div className="text-green-500">✔</div> You provided your email. Recruiters use your email to contact you for job matches.</div>
                                <div className="flex gap-3"><div className="text-green-500">✔</div> You provided your phone number.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
              </>
            )}

            {activeTab === 'One-Click Optimize' && (
              <div className="flex flex-col md:flex-row h-[600px]">
                <div className="w-full md:w-1/3 border-r border-slate-100 flex flex-col">
                  <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative w-14 h-14">
                        <AnimatedScore score={73} color="#f59e0b" showPercent={false} />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 text-sm">Microsoft <span className="text-slate-400">/ Program Manager</span></div>
                        <div className="text-xs text-slate-500">Program Manager Resume ⭐</div>
                      </div>
                    </div>
                    <button className="text-orange-500 border border-orange-200 bg-orange-50 px-2 py-1 rounded text-xs font-bold flex items-center gap-1">⚡ ATS Tip</button>
                  </div>
                  <div className="flex border-b border-slate-100 text-sm font-semibold">
                    <button className="flex-1 py-3 border-b-2 border-slate-800 text-slate-800">Skills</button>
                    <button className="flex-1 py-3 text-slate-500 hover:text-slate-700">Searchability</button>
                    <button className="flex-1 py-3 text-slate-500 hover:text-slate-700">Recruiter tips <span className="ml-1 bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full text-[10px]">3</span></button>
                  </div>
                  <div className="flex-1 p-6 overflow-y-auto bg-slate-50/50">
                    <div className="flex justify-between items-center text-xs font-semibold text-slate-500 mb-4">
                      <span>Required skills ⓘ</span>
                      <span>Matched skills <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">1</span></span>
                    </div>
                    <div className="flex items-center justify-between bg-white border border-slate-200 p-2.5 rounded-lg mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px]">✔</div>
                        <span className="text-sm font-semibold text-slate-700">AI</span>
                      </div>
                      <span className="text-xs text-slate-400">Added 4/23</span>
                    </div>

                    <div className="flex justify-between items-center text-xs font-semibold text-slate-500 mb-4">
                      <span>Hard skills ⓘ</span>
                      <div className="flex gap-2">
                        <span>Matched <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">7</span></span>
                        <span>Missing <span className="bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full">2</span></span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-white border border-slate-200 p-2.5 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px]">✔</div>
                          <span className="text-sm font-semibold text-slate-700">Technical program management</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#0b65c2] text-[10px] font-bold flex items-center gap-0.5"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg> AI suggested</span>
                          <span className="text-xs text-slate-400">2/3</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between bg-white border border-slate-200 p-2.5 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px]">✔</div>
                          <span className="text-sm font-semibold text-slate-700">Use cases</span>
                        </div>
                        <span className="text-xs text-slate-400">Added 2/3</span>
                      </div>
                      <div className="flex items-center justify-between bg-white border border-slate-200 p-2.5 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px]">✔</div>
                          <span className="text-sm font-semibold text-slate-700">Security</span>
                        </div>
                        <span className="text-xs text-slate-400">Added 3/2</span>
                      </div>
                      <div className="flex items-center justify-between bg-white border border-green-400 bg-green-50 p-2.5 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px]">✔</div>
                          <span className="text-sm font-semibold text-slate-800">Product development</span>
                        </div>
                        <span className="text-xs text-slate-400">Added 5/2</span>
                      </div>
                      <div className="flex items-center justify-between bg-white border border-slate-200 p-2.5 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px]">✖</div>
                          <span className="text-sm font-semibold text-slate-500">Innovative</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#0b65c2] text-[10px] font-bold flex items-center gap-0.5"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg> AI suggested</span>
                          <span className="text-xs text-slate-400">0/1</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-2/3 flex flex-col">
                  <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                    <div className="flex gap-6 text-sm font-semibold">
                      <button className="text-[#0b65c2] border-b-2 border-[#0b65c2] pb-4 -mb-4">Resume</button>
                      <button className="text-slate-500 hover:text-slate-700">Cover Letter</button>
                      <button className="text-slate-500 hover:text-slate-700">Job Description</button>
                    </div>
                    <button className="text-slate-400 hover:text-slate-600">...</button>
                  </div>
                  <div className="bg-slate-50 px-6 py-2 border-b border-slate-200 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-[#0b65c2] font-semibold text-xs">
                      <div className="w-5 h-5 rounded-full bg-[#0b65c2] text-white flex items-center justify-center">1</div>
                      AI Suggestions (5/18) ❯
                      <div className="w-5 h-5 rounded-full border border-slate-300 text-slate-400 flex items-center justify-center ml-2">2</div>
                      <span className="text-slate-400 font-normal">Edit</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="text-slate-400 hover:text-slate-600">↺</button>
                      <button className="text-slate-400 hover:text-slate-600">↻</button>
                      <button className="text-slate-400 hover:text-slate-600 px-2">💾</button>
                      <button className="border border-slate-300 bg-white px-3 py-1 rounded text-slate-700 font-semibold text-xs hover:bg-slate-50">Accept all</button>
                      <button className="bg-[#0b65c2] text-white px-4 py-1 rounded font-semibold text-xs flex items-center gap-1 hover:bg-[#0052a3]"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg> Continue</button>
                    </div>
                  </div>

                  <div className="flex-1 p-12 overflow-y-auto bg-white relative">
                    <h2 className="text-3xl font-serif text-slate-800 mb-2">Emily Chen</h2>
                    <p className="text-sm text-slate-500 mb-8">emily.chen@gmail.com | +1 (123) 456-7890 | San Francisco, CA | LinkedIn: linkedin.com/in/emilychen</p>
                    
                    <h3 className="font-bold text-lg text-slate-800 mb-3 border-b border-slate-200 pb-1">Professional Summary</h3>
                    <p className="text-sm text-slate-700 mb-8 leading-relaxed">
                      Entrepreneurial Principal Technical Program Manager with 5 years of experience at leading tech companies (Google, Amazon), specializing in driving cross-functional programs, optimizing workflows, and delivering high-impact <span className="line-through text-red-500 bg-red-50">projects. Skilled in stakeholder management, risk mitigation</span> <span className="bg-green-100 text-green-800 font-medium px-1 rounded relative cursor-pointer border-b-2 border-green-500">AI product development initiatives. Skilled in responsible AI risk assessments, mitigation strategies and accountability.</span> track record of meeting tight deadlines and exceeding goals.
                    </p>

                    <h3 className="font-bold text-lg text-slate-800 mb-3 border-b border-slate-200 pb-1">Professional Experience</h3>
                    <div className="mb-4 text-sm text-slate-700">
                      <div className="font-bold">Program Manager, Google, Mountain View, CA</div>
                      <ul className="list-disc pl-5 mt-2 space-y-2 opacity-50">
                        <li>Led multiple high-priority programs across Google...</li>
                        <li>Coordinated teams of 20+ engineers, designers...</li>
                        <li>Developed program KPIs and reporting dashboards...</li>
                      </ul>
                    </div>

                    {/* AI Popup Tooltip */}
                    <div className="absolute top-[320px] left-[250px] bg-white rounded-lg shadow-2xl border border-slate-200 p-4 w-80 z-10">
                      <div className="flex items-center gap-2 mb-2 text-xs">
                        <span className="text-[#0b65c2] font-bold flex items-center gap-1"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg> AI suggested to</span>
                        <span className="bg-orange-100 text-orange-700 px-1.5 rounded font-bold text-[10px]">REPHRASE</span>
                        <span className="bg-green-100 text-green-700 px-1.5 rounded font-bold text-[10px]">ADD SKILL</span>
                      </div>
                      <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                        ... <span className="line-through text-red-500">projects. Skilled in stakeholder management, risk mitigation</span> <span className="text-green-700 font-bold bg-green-50">AI product development initiatives. Skilled in responsible AI risk assessments, mitigation strategies</span> ...
                      </p>
                      <div className="flex gap-2">
                        <button className="bg-[#0b65c2] text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-[#0052a3]">Accept</button>
                        <button className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded text-xs font-bold hover:bg-slate-200">Reject</button>
                      </div>
                      {/* Tooltip arrow */}
                      <div className="absolute -top-2 left-10 w-4 h-4 bg-white border-t border-l border-slate-200 transform rotate-45"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Job Match' && (
              <div className="p-12 text-center h-[500px] flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-blue-50 text-[#0b65c2] rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">Find Your Perfect Match</h3>
                <p className="text-slate-600 max-w-md mx-auto mb-8">Our AI analyzes thousands of job descriptions to find the roles that best match your unique skills and experience.</p>
                <div className="w-full max-w-2xl bg-slate-50 border border-slate-200 rounded-lg p-6 text-left shadow-inner">
                  <div className="flex justify-between items-center mb-4">
                    <div className="font-bold text-slate-800">Senior Product Manager</div>
                    <div className="bg-green-100 text-green-700 px-2 py-1 rounded font-bold text-sm">92% Match</div>
                  </div>
                  <div className="text-sm text-slate-500 mb-4">Google • Mountain View, CA • Remote available</div>
                  <div className="flex gap-2">
                    <span className="bg-white border border-slate-200 px-2 py-1 rounded text-xs text-slate-600">Product Strategy</span>
                    <span className="bg-white border border-slate-200 px-2 py-1 rounded text-xs text-slate-600">Agile</span>
                    <span className="bg-[#0b65c2] text-white px-2 py-1 rounded text-xs font-semibold">Apply Now</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'AI Insights' && (
              <div className="p-12 text-center h-[500px] flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-blue-50 text-[#0b65c2] rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">Deep AI Analysis</h3>
                <p className="text-slate-600 max-w-md mx-auto mb-8">Get actionable insights on tone, structure, and keyword optimization to make your resume stand out to both bots and humans.</p>
                <div className="grid grid-cols-2 gap-4 w-full max-w-2xl text-left">
                   <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                      <div className="text-[#0b65c2] font-bold mb-2">Tone Analysis</div>
                      <p className="text-sm text-slate-600">Your resume uses strong action verbs but lacks quantifiable results in the last two roles.</p>
                   </div>
                   <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                      <div className="text-[#0b65c2] font-bold mb-2">Structure</div>
                      <p className="text-sm text-slate-600">Consider moving your Skills section to the top, as it's highly relevant to ATS parsers.</p>
                   </div>
                </div>
              </div>
            )}
          </div>
        </FadeIn>
      </section>

      {/* 3x More Interview Callbacks */}
      <section className="py-20 px-4 bg-[#f8fbff] border-y border-slate-100">
        <FadeIn className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f2137] mb-3">
            <span className="text-[#0b65c2]">3x</span> More Interview Callbacks
          </h2>
          <p className="text-lg text-[#0f2137] font-semibold mb-12">
            Get your free resume score
          </p>
          
          <div className="flex justify-center items-center gap-4 mb-12 text-sm font-semibold">
              <FadeIn delay={0} className="flex flex-col items-center gap-2 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-[#0b65c2] text-white flex items-center justify-center text-lg shadow-md">1</div>
                  <span className="text-slate-800">Upload Resume</span>
              </FadeIn>
              <FadeIn delay={200} className="w-16 md:w-24 border-t border-slate-200 mt-[-24px]"></FadeIn>
              <FadeIn delay={400} className="flex flex-col items-center gap-2 relative z-10">
                  <div className="w-10 h-10 rounded-full border border-slate-200 text-slate-300 flex items-center justify-center bg-[#f8fbff] text-lg">2</div>
                  <span className="text-slate-300 font-normal">Add Job</span>
              </FadeIn>
              <FadeIn delay={600} className="w-16 md:w-24 border-t border-slate-200 mt-[-24px]"></FadeIn>
              <FadeIn delay={800} className="flex flex-col items-center gap-2 relative z-10">
                  <div className="w-10 h-10 rounded-full border border-slate-200 text-slate-300 flex items-center justify-center bg-[#f8fbff] text-lg">3</div>
                  <span className="text-slate-300 font-normal">View Results</span>
              </FadeIn>
          </div>

          <FadeIn delay={1000} className="w-full max-w-4xl mx-auto">
            {isQuickAnalyzing ? (
                <div className="bg-white rounded-xl p-16 sm:p-24 flex flex-col items-center justify-center shadow-sm border border-slate-100 mx-4 sm:mx-0">
                    <img src="/images/resume-scan.gif" alt="Scanning" className="w-32 mb-6 mix-blend-multiply opacity-80" />
                    <h3 className="text-xl font-bold text-[#0f2137] mb-2">{quickStatus}</h3>
                    <p className="text-slate-500 animate-pulse">Our AI is reading your resume...</p>
                </div>
            ) : quickResult ? (
                <div className="bg-white rounded-xl p-8 sm:p-12 flex flex-col items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 mx-4 sm:mx-0 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 to-[#0b65c2]"></div>
                    
                    <h3 className="text-2xl font-bold text-[#0f2137] mb-8">Your Quick Scan Results</h3>
                    
                    <div className="flex flex-col md:flex-row items-center gap-10 w-full max-w-2xl mb-10">
                        <div className="flex-shrink-0 scale-125 origin-center">
                            <ScoreCircle score={quickResult.score} />
                        </div>
                        <div className="text-left bg-blue-50/50 p-6 rounded-2xl border border-blue-100/50 relative flex-1">
                            <div className="absolute -left-3 top-6 w-6 h-6 bg-blue-50/50 border-l border-t border-blue-100/50 rotate-[-45deg] hidden md:block"></div>
                            <h4 className="text-sm font-bold text-[#0b65c2] uppercase tracking-wider mb-2 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                Top AI Suggestion
                            </h4>
                            <p className="text-slate-700 font-medium leading-relaxed">
                                "{quickResult.tip}"
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-4 border-t border-slate-100 pt-8 w-full">
                        <p className="text-slate-500 font-medium text-center">This is just a quick scan. For a complete review, match your resume against a specific job description.</p>
                        <button onClick={handleGetCompleteReview} className="bg-[#0b65c2] hover:bg-[#0052a3] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:-translate-y-0.5 hover:shadow-xl w-full sm:w-auto">
                            Get Complete Review
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 mx-4 sm:mx-0">
                    <FileUploader onFileSelect={onQuickFileSelect} />
                </div>
            )}
            
            {!isQuickAnalyzing && !quickResult && (
                <div className="mt-8 text-center">
                  <button onClick={handleGetCompleteReview} className="text-[#0b65c2] font-semibold sm:text-lg hover:underline transition-all">Or paste resume text</button>
                </div>
            )}
          </FadeIn>
        </FadeIn>
      </section>

      {/* Section 5 — Resume Optimization */}
      <section className="py-24 px-4 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 text-left">
            <div className="text-sm font-bold text-[#0b65c2] tracking-wider uppercase mb-4">Resume Optimization</div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0f2137] mb-6 leading-tight">
              Show that you're the <br className="hidden md:block" />perfect match
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              Our AI scans your resume and highlights exactly what you need to change. Add missing skills, rephrase bullet points, and fix formatting issues with a single click.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-slate-700 font-medium">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-[#0b65c2] flex items-center justify-center text-sm font-bold">✓</div>
                One-click ATS optimization
              </li>
              <li className="flex items-center gap-3 text-slate-700 font-medium">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-[#0b65c2] flex items-center justify-center text-sm font-bold">✓</div>
                Smart phrasing suggestions
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 relative mt-16 md:mt-0">
            <div className="absolute inset-0 bg-blue-50 rounded-full blur-3xl transform scale-150 -z-10"></div>
            <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-200 p-8 transform md:rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="mb-6">
                <div className="h-4 w-3/4 bg-slate-100 rounded mb-4"></div>
                <div className="h-4 w-1/2 bg-slate-100 rounded mb-6"></div>
                <div className="text-sm text-slate-600 leading-relaxed relative font-medium">
                  ... <span className="line-through text-red-400">projects. Skilled in stakeholder management</span> <span className="text-green-700 font-bold bg-green-100 px-1 rounded border-b-2 border-green-500 relative inline-block cursor-pointer">AI product development initiatives
                    {/* Tooltip */}
                    <div className="absolute -top-[140px] left-1/2 transform -translate-x-1/2 md:left-0 md:translate-x-[-20%] w-[280px] bg-white rounded-xl shadow-xl border border-slate-200 p-4 z-10 hidden sm:block">
                      <div className="flex items-center gap-2 mb-2 text-xs">
                        <span className="text-[#0b65c2] font-bold flex items-center gap-1">✨ AI suggested to</span>
                        <span className="bg-green-100 text-green-700 px-1.5 rounded font-bold text-[10px]">ADD SKILL</span>
                      </div>
                      <p className="text-xs text-slate-600 mb-4 font-normal leading-relaxed">
                        Consider adding <strong className="text-green-700">AI product development</strong> to better match the job description.
                      </p>
                      <div className="flex gap-2">
                        <button className="bg-[#0b65c2] hover:bg-[#0052a3] text-white px-4 py-1.5 rounded text-xs font-bold w-full transition-colors">Accept</button>
                        <button className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-1.5 rounded text-xs font-bold w-full transition-colors">Reject</button>
                      </div>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 md:left-12 md:translate-x-0 w-4 h-4 bg-white border-b border-r border-slate-200 rotate-45"></div>
                    </div>
                  </span> ...
                </div>
              </div>
            </div>
            {/* Mobile Tooltip (always visible below mockup) */}
            <div className="mt-4 bg-white rounded-xl shadow-md border border-slate-200 p-4 sm:hidden">
              <div className="flex items-center gap-2 mb-2 text-xs">
                <span className="text-[#0b65c2] font-bold flex items-center gap-1">✨ AI suggested to</span>
                <span className="bg-green-100 text-green-700 px-1.5 rounded font-bold text-[10px]">ADD SKILL</span>
              </div>
              <p className="text-xs text-slate-600 mb-4 font-normal leading-relaxed">
                Consider adding <strong className="text-green-700">AI product development</strong> to better match the job description.
              </p>
              <div className="flex gap-2">
                <button className="bg-[#0b65c2] text-white px-4 py-1.5 rounded text-xs font-bold w-full">Accept</button>
                <button className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded text-xs font-bold w-full">Reject</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6 — Missing Skills */}
      <section className="py-24 px-4 bg-[#f8fbff] overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16">
          <div className="w-full md:w-1/2 text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0f2137] mb-6 leading-tight">
              See your missing skills
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              Our ATS algorithm identifies the exact keywords and hard skills you are missing from the job description. Add them to your resume to instantly boost your match rate and pass the initial screening.
            </p>
            <Link to="/upload" className="text-[#0b65c2] font-bold text-lg hover:underline flex items-center gap-2 transition-transform hover:translate-x-1">
              Scan your resume <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
          <div className="w-full md:w-1/2 relative mt-12 md:mt-0">
             <div className="absolute inset-0 bg-green-50 rounded-full blur-3xl transform scale-150 -z-10"></div>
             <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-200 overflow-hidden transform md:-rotate-1 hover:rotate-0 transition-transform duration-500">
               <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                 <h3 className="font-bold text-slate-700">Hard Skills</h3>
                 <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full">3 Missing</span>
               </div>
               <div className="p-6 space-y-4">
                 <div className="flex items-center justify-between p-4 border border-green-200 rounded-xl bg-green-50/50 transition-all hover:bg-green-50">
                    <div className="flex items-center gap-4">
                       <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs shadow-sm">✔</div>
                       <span className="font-semibold text-slate-800">Agile Methodology</span>
                    </div>
                    <span className="text-xs text-slate-500 font-medium bg-white px-2 py-1 rounded border border-slate-100">Added 3/3</span>
                 </div>
                 <div className="flex items-center justify-between p-4 border border-red-100 rounded-xl bg-white hover:bg-slate-50 transition-all">
                    <div className="flex items-center gap-4">
                       <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs shadow-sm">✖</div>
                       <span className="font-semibold text-slate-500">Product Roadmap</span>
                    </div>
                    <span className="text-xs text-[#0b65c2] font-bold bg-blue-50 px-2 py-1 rounded border border-blue-100 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg> AI Suggestion
                    </span>
                 </div>
                 <div className="flex items-center justify-between p-4 border border-green-200 rounded-xl bg-green-50/50 transition-all hover:bg-green-50">
                    <div className="flex items-center gap-4">
                       <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs shadow-sm">✔</div>
                       <span className="font-semibold text-slate-800">Stakeholder Management</span>
                    </div>
                    <span className="text-xs text-slate-500 font-medium bg-white px-2 py-1 rounded border border-slate-100">Added 1/1</span>
                 </div>
                 <div className="flex items-center justify-between p-4 border border-red-100 rounded-xl bg-white hover:bg-slate-50 transition-all">
                    <div className="flex items-center gap-4">
                       <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs shadow-sm">✖</div>
                       <span className="font-semibold text-slate-500">Data Analytics</span>
                    </div>
                    <span className="text-xs text-[#0b65c2] font-bold bg-blue-50 px-2 py-1 rounded border border-blue-100 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg> AI Suggestion
                    </span>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Section 7 — Powered by Claude */}
      <section className="py-32 px-4 bg-[#0f172a] text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-sky-500/20 rounded-[100%] blur-[120px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-slate-800/80 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_60px_rgba(14,165,233,0.4)] border border-slate-700/50 backdrop-blur-sm">
             <svg className="w-10 h-10 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 tracking-tight">
            Powered by Claude 3.5 Sonnet <span className="text-slate-400 font-light block sm:inline mt-2 sm:mt-0 text-2xl md:text-4xl">by Anthropic</span>
          </h2>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl px-6 py-5 md:px-10 md:py-8 shadow-2xl backdrop-blur-md w-full max-w-2xl min-h-[100px] flex items-center justify-center">
             <span className="text-xl md:text-3xl font-mono text-sky-400 font-semibold tracking-tight">
               <Typewriter words={["Analyzing tone and style...", "Matching ATS keywords...", "Scoring resume structure...", "Generating improvement tips..."]} />
             </span>
          </div>
        </div>
      </section>

      {/* Section 8 — CTA Banner */}
      <section className="py-24 px-4 bg-gradient-to-r from-sky-400 to-[#0b65c2] text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>
        <div className="max-w-4xl mx-auto text-white relative z-10">
          <h2 className="font-serif text-5xl md:text-6xl font-bold mb-6 tracking-tight">Ready to get more interviews?</h2>
          <p className="text-xl md:text-2xl text-blue-50 mb-12 max-w-2xl mx-auto font-medium">
            Join over 2 million job seekers who have successfully used Atsync to land their dream jobs.
          </p>
          <Link
            to="/upload"
            className="inline-block px-12 py-5 bg-white text-[#0b65c2] hover:bg-slate-50 rounded-xl font-bold text-xl md:text-2xl transition-all shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:-translate-y-1"
          >
            Scan Your Resume For Free
          </Link>
        </div>
      </section>

      {/* Minimal Footer */}
     <footer className="w-full bg-[#0f172a] border-t border-slate-800 py-16 relative z-10 mt-auto">
  <div className="max-w-7xl mx-auto px-6">
    
    {/* Top row */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
      
      {/* Brand */}
      <div className="md:col-span-1">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-[#0ea5e9] to-[#1d6fdc] rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 16 16" stroke="currentColor">
              <path d="M3 4h10M3 8h7M3 12h5" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">Atsync</span>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">
          AI-powered ATS resume analyzer. Free for every job seeker, forever.
        </p>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#0ea5e9]/20 rounded flex items-center justify-center text-[10px] font-bold text-[#0ea5e9]">IB</div>
          <span className="text-slate-400 text-xs">Built by <span className="text-white font-semibold">Ikram Banadar</span> · IB's Dev World</span>
        </div>
      </div>

      {/* Features */}
      <div>
        <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Analysis Features</h4>
        <ul className="space-y-2">
          {['ATS Score','Resume Content','Tone & Style','Skills Match','Resume Structure','Improvement Tips'].map(f => (
            <li key={f} className="text-slate-400 text-sm hover:text-[#0ea5e9] transition-colors cursor-default">{f}</li>
          ))}
        </ul>
      </div>

      {/* Product */}
      <div>
        <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Product</h4>
        <ul className="space-y-2">
          {[
            { label: 'Upload Resume', to: '/upload' },
            { label: 'Dashboard', to: '/' },
            { label: 'Insights', to: '/insights' },
            { label: 'Pricing', to: '/pricing' },
          ].map(({ label, to }) => (
            <li key={label}>
              <Link to={to} className="text-slate-400 text-sm hover:text-[#0ea5e9] transition-colors">{label}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Powered by */}
      <div>
        <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Powered By</h4>
        <ul className="space-y-3">
          {[
            { name: 'Claude claude-sonnet-4-6', sub: 'by Anthropic' },
            { name: 'Puter Cloud', sub: 'Free AI infrastructure' },
            { name: 'React Router v7', sub: 'Frontend framework' },
            { name: 'Tailwind CSS', sub: 'Styling' },
          ].map(({ name, sub }) => (
            <li key={name}>
              <div className="text-slate-300 text-sm font-medium">{name}</div>
              <div className="text-slate-500 text-xs">{sub}</div>
            </li>
          ))}
        </ul>
      </div>

    </div>

    {/* Divider */}
    <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-slate-500 text-sm">
        © {new Date().getFullYear()} Atsync · Built with passion by{' '}
        <span className="text-[#0ea5e9] font-semibold">Ikram Banadar</span>
        {' '}·{' '}
        <span className="text-slate-400">IB's Dev World</span>
      </p>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
        <span className="text-slate-500 text-xs">All systems operational · Free for everyone</span>
      </div>
    </div>

  </div>
</footer>

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
    </div>
  );
}
