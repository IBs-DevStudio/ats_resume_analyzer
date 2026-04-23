import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";

export const meta = () => [
  { title: "JobFit | Resume Review" },
  {
    name: "description",
    content: "Detailed AI-powered overview of your resume",
  },
];

const Resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [resumeData, setResumeData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated)
      navigate(`/auth?next=/resume/${id}`);
  }, [isLoading]);

  useEffect(() => {
    const loadResume = async () => {
      const userId = auth.user?.uuid;
      // try scoped key first, fallback to old key
      let resume = await kv.get(`resume:${userId}:${id}`);
      if (!resume) resume = await kv.get(`resume:${id}`);
      if (!resume) return;

      const data = JSON.parse(resume);
      setResumeData(data);

      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;
      setResumeUrl(
        URL.createObjectURL(
          new Blob([resumeBlob], { type: "application/pdf" }),
        ),
      );

      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;
      setImageUrl(URL.createObjectURL(imageBlob));

      setFeedback(data.feedback);
    };
    loadResume();
  }, [id]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#16a34a";
    if (score >= 60) return "#d97706";
    return "#dc2626";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80)
      return { text: "Strong", bg: "bg-green-100", color: "text-green-700" };
    if (score >= 60)
      return { text: "Moderate", bg: "bg-amber-100", color: "text-amber-700" };
    return { text: "Needs Work", bg: "bg-red-100", color: "text-red-700" };
  };

  return (
    <main style={{ paddingTop: 0, minHeight: "100vh", background: "#f8fbff" }}>
      {/* Top navbar */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 32px",
          background: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
            color: "#475467",
            fontSize: 14,
            fontWeight: 600,
            padding: "8px 14px",
            border: "1px solid #e2e8f0",
            borderRadius: 8,
            background: "#fff",
            transition: "all 0.2s",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 12L6 8l4-4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Dashboard
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
           <Link to="/" className="flex items-center gap-2">
          <img
            src="/icons/jobfit-logo.png"
            alt="JobFit"
            className="h-15 w-auto object-contain"
          />
          <span className="text-xl font-bold text-slate-800 tracking-tight">
            Job<span className="text-[#0b65c2]">Fit</span> 
          </span>
        </Link>
        
        </div>

        {resumeUrl && (
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "#0b65c2",
              color: "#fff",
              fontWeight: 600,
              fontSize: 13,
              padding: "8px 16px",
              borderRadius: 8,
              textDecoration: "none",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              />
            </svg>
            Download PDF
          </a>
        )}
      </nav>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          minHeight: "calc(100vh - 64px)",
        }}
        className="max-lg:flex-col-reverse"
      >
        {/* Left — Resume Preview */}
        {/* Left — Resume Preview */}
        <div
          style={{
            width: "45%",
            height: "calc(100vh - 64px)",
            position: "sticky",
            top: 64,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "24px 24px",
            background: "linear-gradient(160deg, #f0f8ff 0%, #e0f2fe 100%)",
            borderRight: "1px solid #e2e8f0",
            overflowY: "auto",
          }}
          className="max-lg:w-full"
        >
          {imageUrl ? (
            <div
              style={{
                width: "100%",
                maxWidth: 420,
                animation: "fadeUp 0.6s ease forwards",
              }}
            >
              {/* Score cards — compact row */}
              {feedback && (
                <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                  {[
                    { label: "Overall", score: feedback.overallScore },
                    { label: "ATS", score: feedback.ATS?.score },
                    { label: "Skills", score: feedback.skills?.score },
                    { label: "Content", score: feedback.content?.score },
                  ].map(({ label, score }) => (
                    <div
                      key={label}
                      style={{
                        flex: 1,
                        background: "#fff",
                        border: "1px solid #e2e8f0",
                        borderRadius: 10,
                        padding: "6px 8px",
                        textAlign: "center",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 16,
                          fontWeight: 800,
                          color: getScoreColor(score),
                          lineHeight: 1.2,
                        }}
                      >
                        {score}
                      </div>
                      <div
                        style={{
                          fontSize: 9,
                          color: "#94a3b8",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          marginTop: 2,
                        }}
                      >
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Resume image — takes remaining space */}
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  borderRadius: 12,
                  overflow: "hidden",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
                  border: "1px solid #e2e8f0",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 60px rgba(14,165,233,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 40px rgba(0,0,0,0.1)";
                }}
              >
                <img
                  src={imageUrl}
                  alt="Resume preview"
                  style={{
                    width: "100%",
                    display: "block",
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
                />
              </a>

              <p
                style={{
                  textAlign: "center",
                  marginTop: 10,
                  fontSize: 11,
                  color: "#94a3b8",
                  fontWeight: 500,
                }}
              >
                Click to open full PDF ↗
              </p>
            </div>
          ) : (
            <div style={{ textAlign: "center", marginTop: 80 }}>
              <img
                src="/images/resume-scan-2.gif"
                style={{ width: 140, margin: "0 auto 16px", opacity: 0.8 }}
              />
              <p style={{ fontSize: 13, color: "#0ea5e9", fontWeight: 600 }}>
                Loading your resume...
              </p>
            </div>
          )}
        </div>

        {/* Right — Feedback */}
        <div
          style={{
            flex: 1,
            padding: "40px 32px",
            overflowY: "auto",
          }}
          className="max-lg:w-full"
        >
          {/* Header */}
          <div style={{ marginBottom: 32 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "#e0f2fe",
                color: "#0369a1",
                fontSize: 11,
                fontWeight: 700,
                padding: "5px 14px",
                borderRadius: 100,
                marginBottom: 12,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#0ea5e9",
                  boxShadow: "0 0 6px #0ea5e9",
                }}
              ></span>
              AI Resume Analysis
            </div>
            <h1
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontWeight: 400,
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                color: "#0f172a",
                lineHeight: 1.2,
                marginBottom: 8,
              }}
            >
              Resume Review
            </h1>
            {resumeData && (
              <p style={{ fontSize: 14, color: "#64748b", fontWeight: 500 }}>
                {resumeData.companyName && (
                  <span style={{ color: "#0b65c2", fontWeight: 700 }}>
                    {resumeData.companyName}
                  </span>
                )}
                {resumeData.jobTitle && <span> · {resumeData.jobTitle}</span>}
              </p>
            )}
          </div>

          {feedback ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 24,
                animation: "fadeUp 0.6s ease forwards",
              }}
            >
              <Summary feedback={feedback} />
              <ATS
                score={feedback.ATS.score || 0}
                suggestions={feedback.ATS.tips || []}
              />
              <Details feedback={feedback} />
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "64px 0",
                gap: 16,
              }}
            >
              <img
                src="/images/resume-scan-2.gif"
                style={{ width: 140, opacity: 0.8 }}
              />
              <p style={{ fontSize: 14, color: "#0ea5e9", fontWeight: 600 }}>
                Analyzing your resume with AI...
              </p>
              <p style={{ fontSize: 12, color: "#94a3b8" }}>
                This usually takes 15–30 seconds
              </p>
            </div>
          )}

          {/* Footer credit */}
          <div
            style={{
              marginTop: 48,
              paddingTop: 24,
              borderTop: "1px solid #e2e8f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <p style={{ fontSize: 12, color: "#94a3b8" }}>
              Analyzed by{" "}
              <span style={{ color: "#0b65c2", fontWeight: 600 }}>
                Claude claude-sonnet-4-6
              </span>{" "}
              · Powered by Puter
            </p>
            <p style={{ fontSize: 12, color: "#94a3b8" }}>
              Built by{" "}
              <span style={{ color: "#0b65c2", fontWeight: 600 }}>
                Ikram Banadar
              </span>{" "}
              · IB's Dev World
            </p>
          </div>
        </div>
      </div>

      <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
    </main>
  );
};

export default Resume;
