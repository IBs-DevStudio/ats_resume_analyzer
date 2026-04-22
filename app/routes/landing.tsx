import { Link } from "react-router";
import Navbar from "~/components/Navbar";
import { useEffect, useState, useRef } from "react";

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
    <span className="text-gradient font-semibold border-r-2 border-sky-500 pr-1">
      {text}
    </span>
  );
};

const FadeInSection = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      });
    });
    const current = domRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const AnimatedScore = ({ targetScore }: { targetScore: number }) => {
  const [score, setScore] = useState(0);
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisible(true);
      }
    });
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 1500;
    const interval = 20;
    const steps = duration / interval;
    const increment = targetScore / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetScore) {
        setScore(targetScore);
        clearInterval(timer);
      } else {
        setScore(Math.floor(start));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible, targetScore]);

  const circleLength = 2 * Math.PI * 45;
  const strokeDashoffset = circleLength - (score / 100) * circleLength;

  return (
    <div
      ref={domRef}
      className="relative w-24 h-24 flex items-center justify-center"
    >
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="#e2e8f0"
          strokeWidth="8"
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="#4ade80"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: circleLength,
            strokeDashoffset: strokeDashoffset,
            transition: "stroke-dashoffset 0.1s linear",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-slate-800">{score}</span>
        <span className="text-[10px] text-slate-500 font-semibold uppercase">
          Score
        </span>
      </div>
    </div>
  );
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans overflow-x-hidden selection:bg-sky-200 selection:text-sky-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex flex-col items-center text-center px-4">
        {/* Animated Background Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-sky-200/40 mix-blend-multiply filter blur-[80px] animate-blob" />
          <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-200/40 mix-blend-multiply filter blur-[80px] animate-blob animation-delay-2000" />
          <div className="absolute bottom-[-20%] left-[20%] w-[700px] h-[700px] rounded-full bg-sky-100/50 mix-blend-multiply filter blur-[80px] animate-blob animation-delay-4000" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        <FadeInSection>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-sm font-semibold mb-8 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            Powered by Claude 3.5 Sonnet
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-normal text-slate-900 leading-tight max-w-4xl mx-auto mb-6 tracking-tight">
            Optimize your resume to <br className="hidden md:block" />
            <Typewriter
              words={[
                "get more interviews",
                "beat the ATS bots",
                "land your dream job",
              ]}
            />
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop guessing why you're getting rejected. Our AI scans your resume
            against job descriptions to give you an instant ATS score and
            actionable fixes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/upload"
              className="w-full sm:w-auto px-8 py-4 bg-[#1d6fdc] hover:bg-blue-700 text-white rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5"
            >
              Scan Your Resume For Free
            </Link>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 rounded-xl font-semibold text-lg transition-all"
            >
              See How It Works
            </a>
          </div>
        </FadeInSection>
      </section>

      {/* Social Proof Bar */}
      <section className="border-y border-slate-100 bg-slate-50/50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center text-slate-500 font-medium text-sm md:text-base">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-sky-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                  clipRule="evenodd"
                ></path>
              </svg>
              50% more interview chances
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-sky-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
              </svg>
              99% of Fortune 500 use ATS
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-sky-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Powered by Claude 3.5 Sonnet
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-sky-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Instant AI Analysis
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-4 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-16">
              <h2 className="text-sky-600 font-bold tracking-wide uppercase text-sm mb-3">
                Simple Process
              </h2>
              <h3 className="font-serif text-4xl md:text-5xl text-slate-900 mb-4">
                How Atsync works
              </h3>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                Three simple steps to optimize your resume and bypass the
                Applicant Tracking Systems.
              </p>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Desktop connecting line */}
            <div className="hidden md:block absolute top-24 left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-sky-200 -z-10"></div>

            {[
              {
                num: "1",
                title: "Upload Resume",
                desc: "Upload your current resume in PDF format. We keep your data secure.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                ),
              },
              {
                num: "2",
                title: "Paste Job Link",
                desc: "Paste the URL or description of the job you want to apply for.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                ),
              },
              {
                num: "3",
                title: "Get ATS Score",
                desc: "Receive an instant score and actionable tips to improve your match rate.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                ),
              },
            ].map((step, i) => (
              <FadeInSection key={i} delay={i * 200}>
                <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-xl shadow-slate-200/40 relative flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-500 mb-6 group-hover:bg-sky-500 group-hover:text-white transition-colors duration-300 shadow-sm">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {step.icon}
                    </svg>
                  </div>
                  <div className="absolute -top-4 -right-4 w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-lg border-4 border-white shadow-sm">
                    {step.num}
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">
                    {step.title}
                  </h4>
                  <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ATS Score Showcase */}
      <section className="py-24 px-4 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2">
              <FadeInSection>
                <div className="bg-white p-6 rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 max-w-md mx-auto">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-sky-500 font-bold mb-1">
                        Target Role
                      </div>
                      <h4 className="font-bold text-xl text-slate-900">
                        Stripe
                      </h4>
                      <p className="text-sm text-slate-500">
                        Senior Frontend Engineer
                      </p>
                    </div>
                    <AnimatedScore targetScore={85} />
                  </div>

                  <div className="space-y-4 mb-6">
                    {[
                      { label: "ATS Match", score: 92, color: "bg-green-400" },
                      { label: "Content", score: 78, color: "bg-yellow-400" },
                      { label: "Skills", score: 85, color: "bg-green-400" },
                      { label: "Structure", score: 95, color: "bg-green-400" },
                    ].map((bar, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-xs mb-1 font-medium text-slate-600">
                          <span>{bar.label}</span>
                          <span>{bar.score}%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${bar.color} rounded-full`}
                            style={{ width: `${bar.score}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="h-40 bg-slate-100 rounded-xl mb-4 overflow-hidden relative border border-slate-200">
                    {/* Mock document visual */}
                    <div className="absolute inset-4 bg-white shadow-sm p-3">
                      <div className="h-2 w-1/2 bg-slate-200 rounded mb-4"></div>
                      <div className="h-1.5 w-full bg-slate-100 rounded mb-2"></div>
                      <div className="h-1.5 w-full bg-slate-100 rounded mb-2"></div>
                      <div className="h-1.5 w-3/4 bg-slate-100 rounded mb-4"></div>
                      <div className="h-2 w-1/3 bg-slate-200 rounded mb-2"></div>
                      <div className="h-1.5 w-full bg-slate-100 rounded mb-2"></div>
                      <div className="h-1.5 w-full bg-slate-100 rounded mb-2"></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold border border-green-200">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>{" "}
                      Strong Match
                    </span>
                  </div>
                </div>
              </FadeInSection>
            </div>

            <div className="w-full lg:w-1/2">
              <FadeInSection delay={200}>
                <div className="text-sky-600 font-bold tracking-wide uppercase text-sm mb-3">
                  Applicant Tracking System
                </div>
                <h3 className="font-serif text-4xl md:text-5xl text-slate-900 mb-6">
                  Beat the bots.
                </h3>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  99% of Fortune 500 companies use Applicant Tracking Systems
                  (ATS) to filter resumes. If your resume isn't formatted
                  correctly or missing key phrases, a human will never even see
                  it.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Identify critical missing keywords",
                    "Fix formatting issues that break ATS parsers",
                    "Optimize your bullet points for maximum impact",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 bg-sky-100 text-sky-600 rounded-full p-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-slate-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/upload"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1d6fdc] hover:bg-blue-700 text-white rounded-xl font-semibold transition-all"
                >
                  Score Your Resume
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Optimization & Missing Skills */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto space-y-32">
          {/* Optimization */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
            <div className="w-full lg:w-1/2">
              <FadeInSection>
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 relative">
                  <div className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 z-10 w-64 animate-float">
                    <div className="flex items-center gap-2 text-sky-600 font-bold text-xs mb-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      AI SUGGESTION
                    </div>
                    <p className="text-sm text-slate-700 mb-3">
                      Add{" "}
                      <span className="font-bold text-sky-600">TypeScript</span>{" "}
                      to this bullet point to match the job requirements.
                    </p>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-sky-500 text-white text-xs font-bold py-2 rounded-lg">
                        Accept
                      </button>
                      <button className="flex-1 bg-slate-100 text-slate-600 text-xs font-bold py-2 rounded-lg">
                        Reject
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4 pl-12">
                    <div className="h-4 w-3/4 bg-slate-200 rounded"></div>
                    <div className="p-4 bg-white border-2 border-sky-200 rounded-xl relative">
                      <div className="absolute -inset-0.5 bg-sky-100 rounded-xl -z-10 blur-[2px]"></div>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Developed scalable frontend architecture using React and{" "}
                        <span className="bg-sky-100 text-sky-700 font-bold px-1 rounded">
                          TypeScript
                        </span>
                        , reducing load times by 40%.
                      </p>
                    </div>
                    <div className="h-4 w-5/6 bg-slate-200 rounded"></div>
                    <div className="h-4 w-2/3 bg-slate-200 rounded"></div>
                  </div>
                </div>
              </FadeInSection>
            </div>
            <div className="w-full lg:w-1/2">
              <FadeInSection delay={200}>
                <div className="text-sky-600 font-bold tracking-wide uppercase text-sm mb-3">
                  Resume Optimization
                </div>
                <h3 className="font-serif text-4xl md:text-5xl text-slate-900 mb-6">
                  Show that you're the perfect match.
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Our AI doesn't just tell you what's wrong—it helps you fix it.
                  Get line-by-line suggestions to rewrite your bullet points,
                  quantify your achievements, and highlight the exact skills
                  recruiters are looking for.
                </p>
              </FadeInSection>
            </div>
          </div>

          {/* Missing Skills */}
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2">
              <FadeInSection>
                <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
                  <h4 className="font-bold text-lg text-slate-900 mb-6 border-b border-slate-100 pb-4">
                    Required Skills Analysis
                  </h4>
                  <div className="space-y-4">
                    {[
                      {
                        skill: "React.js",
                        status: "found",
                        type: "Hard Skill",
                      },
                      {
                        skill: "GraphQL",
                        status: "missing",
                        type: "Hard Skill",
                      },
                      {
                        skill: "Agile Methodologies",
                        status: "found",
                        type: "Soft Skill",
                      },
                      {
                        skill: "CI/CD Pipelines",
                        status: "missing",
                        type: "Hard Skill",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-2.5 h-2.5 rounded-full ${item.status === "found" ? "bg-green-500" : "bg-red-500"}`}
                          ></div>
                          <div>
                            <div className="font-semibold text-slate-800">
                              {item.skill}
                            </div>
                            <div className="text-xs text-slate-500">
                              {item.type}
                            </div>
                          </div>
                        </div>
                        {item.status === "found" ? (
                          <span className="text-green-600 bg-green-50 px-2 py-1 rounded text-xs font-bold">
                            Found
                          </span>
                        ) : (
                          <span className="text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-bold">
                            Missing
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeInSection>
            </div>
            <div className="w-full lg:w-1/2">
              <FadeInSection delay={200}>
                <div className="text-sky-600 font-bold tracking-wide uppercase text-sm mb-3">
                  Skills Gap Analysis
                </div>
                <h3 className="font-serif text-4xl md:text-5xl text-slate-900 mb-6">
                  See your missing skills.
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Atsync extracts the exact keywords from the job description
                  and compares them against your resume. Instantly see which
                  critical hard skills, soft skills, and exact phrases you need
                  to add to pass the screen.
                </p>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* Powered by Claude Section */}
      <section className="py-24 px-4 bg-[#0f172a] relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-500/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeInSection>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-sky-500/20 text-sky-400 mb-8 border border-sky-500/30 shadow-[0_0_30px_rgba(14,165,233,0.3)]">
              <svg
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
            <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">
              Powered by Claude 3.5 Sonnet <br />{" "}
              <span className="text-slate-400 text-3xl md:text-4xl">
                by Anthropic
              </span>
            </h2>
            <div className="text-xl md:text-2xl text-sky-300 font-mono bg-slate-800/50 py-4 px-8 rounded-2xl inline-block border border-slate-700/50 backdrop-blur-sm">
              <Typewriter
                words={[
                  "Analyzing tone and style...",
                  "Matching ATS keywords...",
                  "Scoring resume structure...",
                  "Generating improvement tips...",
                ]}
              />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0ea5e9] to-[#1d6fdc] -z-10"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay -z-10"></div>

        <div className="max-w-4xl mx-auto text-center">
          <FadeInSection>
            <h2 className="font-serif text-5xl md:text-7xl text-white mb-6 tracking-tight">
              Ready to get more interviews?
            </h2>
            <p className="text-xl text-sky-100 mb-10 max-w-2xl mx-auto font-medium">
              Join thousands of job seekers who have optimized their resumes and
              landed their dream roles.
            </p>
            <Link
              to="/upload"
              className="inline-block px-10 py-5 bg-white text-[#1d6fdc] hover:bg-sky-50 rounded-2xl font-bold text-xl transition-all shadow-xl hover:shadow-white/20 hover:-translate-y-1"
            >
              Scan Your Resume For Free
            </Link>
          </FadeInSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="inline-flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[#0ea5e9] to-[#1d6fdc] rounded-lg flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 4h10M3 8h7M3 12h5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <span className="font-bold text-xl text-slate-900 tracking-tight">
                  Atsync
                </span>
              </Link>
              <p className="text-slate-500 max-w-sm">
                AI-powered resume optimization to help you beat the ATS bots and
                land your dream job faster.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Product</h4>
              <ul className="space-y-3 text-slate-500">
                <li>
                  <Link
                    to="/upload"
                    className="hover:text-sky-500 transition-colors"
                  >
                    ATS Scanner
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-sky-500 transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-sky-500 transition-colors">
                    Features
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Company</h4>
              <ul className="space-y-3 text-slate-500">
                <li>
                  <Link to="/" className="hover:text-sky-500 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-sky-500 transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-sky-500 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} Atsync. All rights reserved.
            </p>
            <div className="flex gap-4">
              {/* Social icons placeholders */}
              <div className="w-8 h-8 rounded-full bg-slate-100"></div>
              <div className="w-8 h-8 rounded-full bg-slate-100"></div>
              <div className="w-8 h-8 rounded-full bg-slate-100"></div>
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
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes float {
          0% { transform: translateY(-50%) translateX(0px); }
          50% { transform: translateY(-50%) translateX(-10px); }
          100% { transform: translateY(-50%) translateX(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
