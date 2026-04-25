import { useEffect, useState, useMemo } from "react";
import { useNavigate, Link, type MetaFunction } from "react-router";
import Navbar from "~/components/Navbar";
import { usePuterStore } from "~/lib/puter";
import ScoreCircle from "~/components/ScoreCircle";

export const meta: MetaFunction = () => {
  return [
    { title: "JobFit — Insights" },
    { name: "description", content: "Analytics across all your resume scans." },
  ];
};

interface KVItem {
  key: string;
  value: string;
}

export default function Insights() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [checklist, setChecklist] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/auth?next=/insights");
    }
  }, [auth.isAuthenticated, navigate]);

  useEffect(() => {
    const fetchResumes = async () => {
      if (!auth.isAuthenticated || !auth.user?.uuid) return;
      try {
        setIsLoading(true);
        const userId = auth.user.uuid;
        const items = (await kv.list(`resume:${userId}:*`, true)) as KVItem[];
        if (items && items.length > 0) {
          const parsed = items
            .map((item) => JSON.parse(item.value) as Resume)
            .filter(
              (r) =>
                r.feedback &&
                typeof r.feedback === "object" &&
                r.feedback.overallScore !== undefined &&
                r.feedback.ATS?.score !== undefined,
            );
          setResumes(parsed.reverse());
        }
      } catch (err) {
        console.error("Error fetching resumes:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResumes();
  }, [auth.isAuthenticated, auth.user, kv]);

  // Derived state
  const stats = useMemo(() => {
    if (resumes.length === 0) return null;
    let totalAts = 0;
    let totalOverall = 0;
    let bestResume = resumes[0];
    let worstResume = resumes[0];

    resumes.forEach((r) => {
      totalAts += r.feedback?.ATS?.score ?? 0;
      totalOverall += r.feedback?.overallScore ?? 0;
      if (
        (r.feedback?.overallScore ?? 0) >
        (bestResume.feedback?.overallScore ?? 0)
      )
        bestResume = r;
      if (
        (r.feedback?.overallScore ?? 0) <
        (worstResume.feedback?.overallScore ?? 0)
      )
        worstResume = r;
    });

    return {
      total: resumes.length,
      avgAts: Math.round(totalAts / resumes.length),
      avgOverall: Math.round(totalOverall / resumes.length),
      bestResume,
      worstResume,
    };
  }, [resumes]);

  const recurringGaps = useMemo(() => {
    const tipCounts: Record<
      string,
      { count: number; text: string; explanation?: string }
    > = {};

    resumes.forEach((r) => {
      if (!r.feedback || typeof r.feedback !== "object") return; // ✅ guard

      const categories = [
        r.feedback.ATS?.tips ?? [],
        r.feedback.toneAndStyle?.tips ?? [],
        r.feedback.content?.tips ?? [],
        r.feedback.structure?.tips ?? [],
        r.feedback.skills?.tips ?? [],
      ];

      categories.forEach((tips) => {
        tips.forEach((t: any) => {
          if (t.type === "improve") {
            const key = t.tip.toLowerCase().trim();
            if (!tipCounts[key]) {
              tipCounts[key] = {
                count: 0,
                text: t.tip,
                explanation: t.explanation,
              };
            }
            tipCounts[key].count++;
          }
        });
      });
    });

    return Object.values(tipCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [resumes]);
  const nextActions = useMemo(() => {
    if (!stats?.worstResume) return [];
    const r = stats.worstResume;
    if (!r.feedback || typeof r.feedback !== "object") return []; // ✅ guard

    const tips: { text: string; explanation?: string }[] = [];
    const categories = [
      r.feedback.ATS?.tips ?? [],
      r.feedback.toneAndStyle?.tips ?? [],
      r.feedback.content?.tips ?? [],
      r.feedback.structure?.tips ?? [],
      r.feedback.skills?.tips ?? [],
    ];
    categories.forEach((cat) => {
      cat.forEach((t: any) => {
        if (t.type === "improve") {
          tips.push({ text: t.tip, explanation: t.explanation });
        }
      });
    });
    return tips;
  }, [stats]);

  const toggleCheck = (idx: string) => {
    setChecklist((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const getColor = (score: number) => {
    if (score >= 80) return "bg-emerald-500";
    if (score >= 60) return "bg-amber-400";
    return "bg-red-500";
  };
  const getTextColor = (score: number) => {
    if (score >= 80) return "text-emerald-500";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };

  if (!auth.isAuthenticated) return null;

  return (
    <main className="min-h-screen bg-[#f8fbff] text-slate-800 font-sans pt-[64px] relative overflow-hidden">
      <Navbar />

      {/* Animated Background */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-sky-200/40 mix-blend-multiply rounded-full blur-[120px] pointer-events-none animate-blob"></div>
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-200/30 mix-blend-multiply rounded-full blur-[150px] pointer-events-none animate-blob"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <h1 className="font-serif text-5xl font-bold text-[#0f2137] mb-3 tracking-tight">
          Your Insights
        </h1>
        <p className="text-lg text-slate-500 mb-12 font-medium">
          Aggregated analytics across all your resume scans.
        </p>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <img
              src="/images/resume-scan-2.gif"
              alt="Loading"
              className="w-48 mb-6 mix-blend-multiply opacity-80"
            />
            <h2 className="text-xl font-bold text-slate-700 animate-pulse">
              Loading your insights...
            </h2>
          </div>
        ) : resumes.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-16 flex flex-col items-center justify-center text-center max-w-2xl mx-auto mt-12">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-12 h-12 text-[#0ea5e9]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#0f2137] mb-3">
              No analyses yet
            </h2>
            <p className="text-slate-500 mb-8 max-w-sm">
              Scan a resume against a job description to start tracking your
              performance and uncovering insights.
            </p>
            <Link
              to="/upload"
              className="bg-[#0b65c2] hover:bg-[#0052a3] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-md hover:-translate-y-0.5"
            >
              Scan your first resume
            </Link>
          </div>
        ) : (
          stats && (
            <div className="space-y-16">
              {/* Section 1: Stats Strip */}
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                    <svg
                      className="w-20 h-20"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div className="text-4xl font-bold text-[#0ea5e9] mb-1 relative z-10">
                    {stats.total}
                  </div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider relative z-10">
                    Total Resumes
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                    <svg
                      className="w-20 h-20"
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
                  </div>
                  <div
                    className={`text-4xl font-bold mb-1 relative z-10 ${getTextColor(stats.avgAts)}`}
                  >
                    {stats.avgAts}
                    <span className="text-xl text-slate-300">/100</span>
                  </div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider relative z-10">
                    Avg ATS Score
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                    <svg
                      className="w-20 h-20"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </div>
                  <div
                    className={`text-4xl font-bold mb-1 relative z-10 ${getTextColor(stats.avgOverall)}`}
                  >
                    {stats.avgOverall}
                    <span className="text-xl text-slate-300">/100</span>
                  </div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider relative z-10">
                    Avg Overall Score
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                    <svg
                      className="w-20 h-20"
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
                  <div
                    className={`text-4xl font-bold mb-1 relative z-10 ${getTextColor(stats.bestResume.feedback.overallScore)}`}
                  >
                    {stats.bestResume.feedback.overallScore}
                  </div>
                  <div
                    className="text-xs font-bold text-slate-400 uppercase tracking-wider truncate relative z-10"
                    title={stats.bestResume.companyName}
                  >
                    Best: {stats.bestResume.companyName || "Unknown"}
                  </div>
                </div>
              </section>

              {/* Section 2: Score Breakdown */}
              <section>
                <h2 className="font-serif text-3xl font-bold text-[#0f2137] mb-6">
                  Score Breakdown
                </h2>
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm">
                  <div className="space-y-6">
                    {resumes.map((r) => (
                      <div
                        key={r.id}
                        className="border-b border-slate-50 pb-6 last:border-0 last:pb-0"
                      >
                        <Link
                          to={`/resume/${r.id}`}
                          className="block hover:opacity-80 transition-opacity mb-4"
                        >
                          <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                            {r.companyName || "Untitled"}
                            <span className="text-slate-400 font-normal">
                              · {r.jobTitle || "No role"}
                            </span>
                          </h3>
                        </Link>
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 md:gap-6">
                          {[
                            { label: "ATS Match", score: r.feedback.ATS.score },
                            {
                              label: "Content",
                              score: r.feedback.content.score,
                            },
                            { label: "Skills", score: r.feedback.skills.score },
                            {
                              label: "Structure",
                              score: r.feedback.structure.score,
                            },
                          ].map((metric) => (
                            <div key={metric.label}>
                              <div className="flex justify-between text-[11px] font-mono font-semibold text-[#64748b] mb-1 uppercase tracking-wider">
                                <span>{metric.label}</span>
                                <span>{metric.score}</span>
                              </div>
                              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all duration-1000 ease-out ${getColor(metric.score)}`}
                                  style={{ width: `${metric.score}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Section 3: Recurring Gaps */}
                <section>
                  <h2 className="font-serif text-3xl font-bold text-[#0f2137] mb-6">
                    What's holding you back
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    {recurringGaps.map((gap, i) => (
                      <div
                        key={i}
                        className="bg-white p-5 rounded-2xl border border-rose-100/50 shadow-sm flex items-start gap-4"
                      >
                        <div className="mt-1 bg-rose-50 text-rose-500 p-2.5 rounded-full shrink-0 border border-rose-100">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-base mb-1">
                            {gap.text}
                          </h4>
                          {gap.explanation && (
                            <p className="text-sm text-slate-500 leading-relaxed">
                              {gap.explanation}
                            </p>
                          )}
                          <div className="mt-3 inline-flex px-2 py-0.5 rounded-md bg-slate-50 border border-slate-100 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                            SEEN {gap.count} TIMES
                          </div>
                        </div>
                      </div>
                    ))}
                    {recurringGaps.length === 0 && (
                      <div className="text-slate-500 italic p-6 bg-white rounded-2xl border border-slate-100 text-center">
                        No recurring gaps found!
                      </div>
                    )}
                  </div>
                </section>

                {/* Section 6: Action Checklist */}
                <section>
                  <h2 className="font-serif text-3xl font-bold text-[#0f2137] mb-6">
                    Your next actions
                  </h2>
                  <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm h-fit">
                    <div className="flex items-center justify-between mb-6 border-b border-slate-50 pb-4">
                      <p className="text-[11px] font-mono font-bold text-[#64748b] uppercase tracking-wider">
                        Priorities from lowest score
                      </p>
                      <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
                        {stats.worstResume.companyName}
                      </span>
                    </div>

                    <div className="space-y-4">
                      {nextActions.map((action, i) => {
                        const id = `action-${i}`;
                        const isChecked = checklist.has(id);
                        return (
                          <div
                            key={id}
                            className="flex items-start gap-3 group cursor-pointer"
                            onClick={() => toggleCheck(id)}
                          >
                            <div
                              className={`mt-0.5 shrink-0 w-5 h-5 rounded flex items-center justify-center transition-colors border-2 ${isChecked ? "bg-[#0b65c2] border-[#0b65c2]" : "bg-transparent border-slate-300 group-hover:border-[#0b65c2]"}`}
                            >
                              {isChecked && (
                                <svg
                                  className="w-3 h-3 text-white"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </div>
                            <div
                              className={
                                isChecked
                                  ? "opacity-40 line-through transition-all duration-300"
                                  : "transition-all duration-300"
                              }
                            >
                              <div className="font-bold text-slate-800 leading-tight mb-1">
                                {action.text}
                              </div>
                              {action.explanation && (
                                <div className="text-sm text-slate-500">
                                  {action.explanation}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      {nextActions.length === 0 && (
                        <div className="text-slate-500 italic text-center py-4">
                          No actions needed. You're doing great!
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              </div>

              {/* Section 4: Best vs Worst */}
              <section>
                <h2 className="font-serif text-3xl font-bold text-[#0f2137] mb-6">
                  Best vs Worst Match
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Best */}
                  <Link
                    to={`/resume/${stats.bestResume.id}`}
                    className="bg-white rounded-3xl p-8 border border-emerald-100/50 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden flex flex-col justify-between"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                    <div className="absolute top-6 right-6 text-emerald-600 font-bold text-[10px] font-mono uppercase tracking-wider bg-white px-3 py-1.5 rounded-full shadow-sm border border-emerald-100">
                      Highest Score
                    </div>

                    <div>
                      <div className="flex items-center gap-6 mb-8 relative z-10">
                        <div className="w-20 h-20 shrink-0">
                          <ScoreCircle
                            score={stats.bestResume.feedback.overallScore}
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-2xl text-slate-800">
                            {stats.bestResume.companyName || "Unknown"}
                          </h3>
                          <p className="text-slate-500 font-medium">
                            {stats.bestResume.jobTitle || "Unknown Role"}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3 relative z-10">
                        <div className="text-[11px] font-mono font-bold text-[#64748b] uppercase tracking-wider">
                          Top Feedback
                        </div>
                        {stats.bestResume.feedback.ATS.tips
                          .slice(0, 2)
                          .map((t: any, i: number) => (
                            <div
                              key={i}
                              className="text-sm font-medium text-slate-600 bg-[#f8fbff] p-3 rounded-xl border border-blue-100/50"
                            >
                              "{t.tip}"
                            </div>
                          ))}
                      </div>
                    </div>
                  </Link>

                  {/* Worst */}
                  <Link
                    to={`/resume/${stats.worstResume.id}`}
                    className="bg-white rounded-3xl p-8 border border-rose-100/50 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden flex flex-col justify-between"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                    <div className="absolute top-6 right-6 text-rose-600 font-bold text-[10px] font-mono uppercase tracking-wider bg-white px-3 py-1.5 rounded-full shadow-sm border border-rose-100">
                      Lowest Score
                    </div>

                    <div>
                      <div className="flex items-center gap-6 mb-8 relative z-10">
                        <div className="w-20 h-20 shrink-0">
                          <ScoreCircle
                            score={stats.worstResume.feedback.overallScore}
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-2xl text-slate-800">
                            {stats.worstResume.companyName || "Unknown"}
                          </h3>
                          <p className="text-slate-500 font-medium">
                            {stats.worstResume.jobTitle || "Unknown Role"}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3 relative z-10">
                        <div className="text-[11px] font-mono font-bold text-[#64748b] uppercase tracking-wider">
                          Top Priorities
                        </div>
                        {stats.worstResume.feedback.ATS.tips
                          .slice(0, 2)
                          .map((t: any, i: number) => (
                            <div
                              key={i}
                              className="text-sm font-medium text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100"
                            >
                              "{t.tip}"
                            </div>
                          ))}
                      </div>
                    </div>
                  </Link>
                </div>
              </section>

              {/* Section 5: All Submissions Table */}
              <section>
                <h2 className="font-serif text-3xl font-bold text-[#0f2137] mb-6">
                  All Submissions
                </h2>
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#f8fbff] border-b border-blue-100 text-[11px] font-mono font-bold text-[#64748b] uppercase tracking-wider">
                          <th className="p-4 pl-6">Company</th>
                          <th className="p-4">Role</th>
                          <th className="p-4 text-center">Overall</th>
                          <th className="p-4 text-center">ATS</th>
                          <th className="p-4 text-center">Skills</th>
                          <th className="p-4 text-center">Structure</th>
                          <th className="p-4 pr-6 text-right">Match Level</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resumes.map((r, i) => {
                          const o = r.feedback.overallScore;
                          let matchBadge = {
                            bg: "bg-rose-100",
                            text: "text-rose-700",
                            label: "Needs Work",
                          };
                          if (o >= 80)
                            matchBadge = {
                              bg: "bg-emerald-100",
                              text: "text-emerald-700",
                              label: "Strong Match",
                            };
                          else if (o >= 60)
                            matchBadge = {
                              bg: "bg-amber-100",
                              text: "text-amber-700",
                              label: "Moderate Match",
                            };

                          return (
                            <tr
                              key={r.id}
                              className={`group cursor-pointer hover:bg-blue-50/50 transition-colors border-b border-slate-50 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/30"}`}
                              onClick={() => navigate(`/resume/${r.id}`)}
                            >
                              <td className="p-4 pl-6 font-bold text-slate-800">
                                {r.companyName || "-"}
                              </td>
                              <td className="p-4 text-slate-600 font-medium">
                                {r.jobTitle || "-"}
                              </td>
                              <td
                                className={`p-4 text-center font-bold text-lg ${getTextColor(r.feedback.overallScore)}`}
                              >
                                {r.feedback.overallScore}
                              </td>
                              <td className="p-4 text-center font-semibold text-slate-600">
                                {r.feedback.ATS.score}
                              </td>
                              <td className="p-4 text-center font-semibold text-slate-600">
                                {r.feedback.skills.score}
                              </td>
                              <td className="p-4 text-center font-semibold text-slate-600">
                                {r.feedback.structure.score}
                              </td>
                              <td className="p-4 pr-6 text-right">
                                <span
                                  className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider ${matchBadge.bg} ${matchBadge.text}`}
                                >
                                  {matchBadge.label}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            </div>
          )
        )}
      </div>
    </main>
  );
}
