import { useState } from "react";
import { useNavigate } from "react-router";
import FadeIn from "~/components/ui/FadeIn";
import { usePuterStore } from "~/lib/puter";
import FileUploader from "~/components/FileUploader";
import ScoreCircle from "~/components/ScoreCircle";
import { prepareMinimalInstructions } from "../../../constants";

const STEPS = [
  { number: 1, label: "Upload Resume", active: true },
  { number: 2, label: "Add Job", active: false },
  { number: 3, label: "View Results", active: false },
];

interface QuickScanSectionProps {
  onGetCompleteReview: () => void;
}

/**
 * "3x More Interview Callbacks" — the free quick-scan uploader + result
 * card. Owns all of the scan state; nothing outside this section needs it.
 */
export default function QuickScanSection({ onGetCompleteReview }: QuickScanSectionProps) {
  const { fs, ai, auth } = usePuterStore();
  const navigate = useNavigate();
  const [isQuickAnalyzing, setIsQuickAnalyzing] = useState(false);
  const [quickResult, setQuickResult] = useState<{ score: number; tip: string } | null>(null);
  const [quickStatus, setQuickStatus] = useState("");

  const handleQuickAnalyze = async (file: File) => {
    setIsQuickAnalyzing(true);
    setQuickStatus("Uploading resume...");
    try {
      const uploadedFile = await fs.upload([file]);
      if (!uploadedFile) throw new Error("Upload failed");

      setQuickStatus("Running quick AI scan...");
      const feedback = await ai.feedback(uploadedFile.path, prepareMinimalInstructions());
      if (!feedback) throw new Error("AI scan failed");

      const feedbackText =
        typeof feedback.message.content === "string"
          ? feedback.message.content
          : feedback.message.content[0].text;

      const cleaned = feedbackText.replace(/```json\n?|```/g, "").trim();
      const result = JSON.parse(cleaned);
      setQuickResult(result);
    } catch (e) {
      console.error(e);
      setQuickStatus("Error occurred during quick scan.");
    } finally {
      setIsQuickAnalyzing(false);
    }
  };

  const onQuickFileSelect = (file: File | null) => {
    if (!file) return;
    if (!auth.isAuthenticated) {
      navigate("/auth?next=/upload");
      return;
    }
    handleQuickAnalyze(file);
  };

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 bg-[#f8fbff] border-y border-slate-100">
      <FadeIn className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f2137] mb-3 tracking-tight">
          <span className="text-[#0b65c2]">3x</span> More Interview Callbacks
        </h2>
        <p className="text-base sm:text-lg text-[#0f2137] font-semibold mb-8 sm:mb-12">
          Get your free resume score
        </p>

        <div className="flex justify-center items-start gap-2 sm:gap-4 mb-8 sm:mb-12 text-xs sm:text-sm font-semibold">
          {STEPS.map((step, i) => (
            <FadeIn key={step.number} delay={i * 400} className="flex flex-col items-center gap-2 relative z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${step.active
                    ? "bg-[#0b65c2] text-white shadow-md"
                    : "border border-slate-200 text-slate-300 bg-[#f8fbff]"
                  }`}
              >
                {step.number}
              </div>
              <span className={step.active ? "text-slate-800" : "text-slate-300 font-normal"}>{step.label}</span>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={1000} className="w-full max-w-4xl mx-auto">
          {isQuickAnalyzing ? (
            <div className="bg-white rounded-xl p-10 sm:p-16 md:p-24 flex flex-col items-center justify-center shadow-sm border border-slate-100 mx-2 sm:mx-0">
              <img src="/images/resume-scan.gif" alt="Scanning" className="w-32 mb-6 mix-blend-multiply opacity-80" />
              <h3 className="text-lg sm:text-xl font-bold text-[#0f2137] mb-2 text-center">{quickStatus}</h3>
              <p className="text-slate-500 animate-pulse">Our AI is reading your resume...</p>
            </div>
          ) : quickResult ? (
            <div className="bg-white rounded-xl p-5 sm:p-8 md:p-12 flex flex-col items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 mx-4 sm:mx-0 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 to-[#0b65c2]" />
              <h3 className="text-xl sm:text-2xl font-bold text-[#0f2137] mb-6 sm:mb-8">Your Quick Scan Results</h3>
              <div className="flex flex-col md:flex-row items-center gap-10 w-full max-w-2xl mb-10">
                <div className="flex-shrink-0 scale-125 origin-center">
                  <ScoreCircle score={quickResult.score} />
                </div>
                <div className="text-left bg-blue-50/50 p-6 rounded-2xl border border-blue-100/50 relative flex-1">
                  <div className="absolute -left-3 top-6 w-6 h-6 bg-blue-50/50 border-l border-t border-blue-100/50 rotate-[-45deg] hidden md:block" />
                  <h4 className="text-sm font-bold text-[#0b65c2] uppercase tracking-wider mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Top AI Suggestion
                  </h4>
                  <p className="text-slate-700 font-medium leading-relaxed">"{quickResult.tip}"</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4 border-t border-slate-100 pt-8 w-full">
                <p className="text-slate-500 font-medium text-center">
                  This is just a quick scan. For a complete review, match your resume against a
                  specific job description.
                </p>
                <button
                  onClick={onGetCompleteReview}
                  className="bg-[#0b65c2] hover:bg-[#0052a3] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:-translate-y-0.5 hover:shadow-xl w-full sm:w-auto cursor-pointer"
                >
                  Get Complete Review
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-3 sm:p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 mx-4 sm:mx-0 relative">
              <FileUploader onFileSelect={onQuickFileSelect} />
              {!auth.isAuthenticated && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(248,251,255,0.88)",
                    backdropFilter: "blur(4px)",
                    borderRadius: 16,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      background: "#e0f2fe",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0b65c2" strokeWidth="2" strokeLinecap="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                  </div>
                  <p style={{ fontWeight: 700, fontSize: 15, color: "#0f172a" }}>Sign in to scan your resume</p>
                  <p style={{ fontSize: 13, color: "#64748b", textAlign: "center", maxWidth: 240 }}>
                    Free forever — just sign in with Puter to get started.
                  </p>
                  <button
                    onClick={() => navigate("/auth?next=/upload")}
                    style={{
                      background: "#0b65c2",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: 14,
                      padding: "10px 28px",
                      borderRadius: 9,
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Sign In Free →
                  </button>
                </div>
              )}
            </div>
          )}

          {!isQuickAnalyzing && !quickResult && (
            <div className="mt-6 sm:mt-8 text-center">
              <button
                onClick={onGetCompleteReview}
                className="text-[#0b65c2] font-semibold sm:text-lg hover:underline transition-all cursor-pointer"
              >
                Or paste resume text
              </button>
            </div>
          )}
        </FadeIn>
      </FadeIn>
    </section>
  );
}
