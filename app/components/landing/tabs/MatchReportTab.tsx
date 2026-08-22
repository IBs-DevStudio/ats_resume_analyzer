import AnimatedScore from "~/components/shared/AnimatedScore";

const SEARCHABILITY_ROWS = [
  { label: "Searchability", note: "1 issue to fix", pct: 80, noteColor: "text-[#0b65c2]", barColor: "bg-[#0b65c2]" },
  { label: "Hard Skills", note: "2 issues to fix", pct: 60, noteColor: "text-[#0b65c2]", barColor: "bg-[#0b65c2]" },
  { label: "Soft Skills", note: "5 issues to fix", pct: 40, noteColor: "text-slate-400", barColor: "bg-slate-300" },
];

export default function MatchReportTab() {
  return (
    <>
      <div className="border-b border-slate-100 px-4 sm:px-6 py-3 flex justify-between items-center text-xs sm:text-sm gap-3">
        <div>
          <span className="text-slate-500 font-semibold text-xs uppercase tracking-wide">
            Resume scan results
          </span>
          <div className="font-bold text-slate-800">
            IkramBanadar - FullStackDeveloper <span className="text-slate-400 font-normal">✎</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-[#0b65c2] font-semibold flex items-center gap-1 text-xs">Track</button>
          <button className="px-3 py-1.5 border border-slate-200 rounded text-slate-600 font-semibold flex items-center gap-1 text-xs">
            Print
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 border-r border-slate-100 p-4 sm:p-6 flex flex-col items-center">
          <h3 className="font-bold text-lg text-slate-800 mb-4">Match Rate</h3>
          <div className="relative w-32 h-32 mb-6">
            <AnimatedScore score={85} color="#00c875" showPercent />
          </div>
          <button className="w-full bg-[#0b65c2] text-white font-bold py-2 rounded mb-2">
            Upload & rescan
          </button>
          <button className="w-full bg-blue-50 text-[#0b65c2] font-bold py-2 rounded flex items-center justify-center gap-1">
            One-Click Optimize
          </button>

          <div className="w-full mt-6 space-y-4">
            {SEARCHABILITY_ROWS.map((row) => (
              <div key={row.label}>
                <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                  <span>{row.label}</span>
                  <span className={row.noteColor}>{row.note}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full">
                  <div className={`h-full ${row.barColor} rounded-full`} style={{ width: `${row.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-3/4 bg-slate-50 p-4 sm:p-6">
          <div className="flex border-b border-slate-200 mb-6">
            <button className="px-4 sm:px-8 py-3 font-bold text-sm sm:text-base text-slate-800 border-b-2 border-slate-800">
              Resume
            </button>
            <button className="px-8 py-3 font-semibold text-slate-500 hover:text-slate-700 bg-slate-200/50 w-full text-left">
              Job Description
            </button>
          </div>

          <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-orange-500 font-bold">⚡ ATS-Specific Tips</span>
              <span className="text-slate-600 text-sm">
                Adding this job's company name and web address can help us provide you
                ATS-specific tips.
              </span>
            </div>
            <button className="text-orange-500 border border-orange-200 bg-white px-3 py-1 rounded text-sm font-bold flex items-center gap-1">
              ⚡ Get ATS Tip
            </button>
          </div>

          <div className="mb-4 flex items-center gap-3">
            <h3 className="font-bold text-2xl text-slate-800">Searchability</h3>
            <span className="bg-slate-700 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded">
              Important
            </span>
          </div>
          <p className="text-sm text-slate-600 mb-6 max-w-3xl">
            An ATS (Applicant Tracking System) is a software used by 90% of companies and
            recruiters to search for resumes and manage the hiring process. Below is how well
            your resume appears in an ATS and a recruiter search.
          </p>

          <div className="bg-white border border-slate-200 rounded-lg divide-y divide-slate-100">
            <div className="p-4 flex gap-4 items-start">
              <div className="w-1/4 font-semibold text-sm text-slate-700 flex items-center justify-between">
                ATS Tip
                <span className="text-slate-300 rounded-full w-4 h-4 flex items-center justify-center border border-slate-200 text-[10px]">
                  ?
                </span>
              </div>
              <div className="w-3/4 flex gap-3 text-sm">
                <div className="text-green-500 mt-0.5">✔</div>
                <div>
                  <p className="text-slate-600 mb-1">
                    You've added a company name (Netflix) and web address which can help us
                    provide you ATS-specific tips.
                  </p>
                  <div className="flex gap-4">
                    <button className="text-[#0b65c2] font-semibold">Update scan information</button>
                    <button className="text-[#0b65c2] font-semibold bg-blue-50 px-2 rounded">
                      View ATS Tips
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 flex gap-4 items-start">
              <div className="w-1/4 font-semibold text-sm text-slate-700 flex items-center justify-between">
                Contact Information
                <span className="text-slate-300 rounded-full w-4 h-4 flex items-center justify-center border border-slate-200 text-[10px]">
                  ?
                </span>
              </div>
              <div className="w-3/4 flex flex-col gap-3 text-sm text-slate-600">
                <div className="flex gap-3">
                  <div className="text-green-500">✔</div> You provided your physical address.
                  Recruiters use your address to validate your location for job matches.
                </div>
                <div className="flex gap-3">
                  <div className="text-green-500">✔</div> You provided your email. Recruiters use
                  your email to contact you for job matches.
                </div>
                <div className="flex gap-3">
                  <div className="text-green-500">✔</div> You provided your phone number.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
