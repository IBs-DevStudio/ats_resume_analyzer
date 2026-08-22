export default function ResumeOptimizationSection() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 sm:gap-16">
        <div className="w-full md:w-1/2 text-left">
          <div className="text-sm font-bold text-[#0b65c2] tracking-wider uppercase mb-4">
            Resume Optimization
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#0f2137] mb-5 sm:mb-6 leading-tight tracking-tight">
            Show that you're the <br className="hidden md:block" />
            perfect match
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed mb-6 sm:mb-8">
            Our AI scans your resume and highlights exactly what you need to change. Add missing
            skills, rephrase bullet points, and fix formatting issues with a single click.
          </p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3 text-slate-700 font-medium">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-[#0b65c2] flex items-center justify-center text-sm font-bold">
                ✓
              </div>
              One-click ATS optimization
            </li>
            <li className="flex items-center gap-3 text-slate-700 font-medium">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-[#0b65c2] flex items-center justify-center text-sm font-bold">
                ✓
              </div>
              Smart phrasing suggestions
            </li>
          </ul>
        </div>

        <div className="w-full md:w-1/2 relative mt-16 md:mt-0">
          <div className="absolute inset-0 bg-blue-50 rounded-full blur-3xl transform scale-150 -z-10" />
          <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-200 p-8 transform md:rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="mb-6">
              <div className="h-4 w-3/4 bg-slate-100 rounded mb-4" />
              <div className="h-4 w-1/2 bg-slate-100 rounded mb-6" />
              <div className="text-sm text-slate-600 leading-relaxed relative font-medium">
                ...{" "}
                <span className="line-through text-red-400">projects. Skilled in stakeholder management</span>{" "}
                <span className="text-green-700 font-bold bg-green-100 px-1 rounded border-b-2 border-green-500 relative inline-block cursor-pointer">
                  AI product development initiatives
                  <div className="absolute -top-[140px] left-1/2 transform -translate-x-1/2 md:left-0 md:translate-x-[-20%] w-[280px] bg-white rounded-xl shadow-xl border border-slate-200 p-4 z-10 hidden sm:block">
                    <div className="flex items-center gap-2 mb-2 text-xs">
                      <span className="text-[#0b65c2] font-bold flex items-center gap-1">✨ AI suggested to</span>
                      <span className="bg-green-100 text-green-700 px-1.5 rounded font-bold text-[10px]">ADD SKILL</span>
                    </div>
                    <p className="text-xs text-slate-600 mb-4 font-normal leading-relaxed">
                      Consider adding <strong className="text-green-700">AI product development</strong> to better
                      match the job description.
                    </p>
                    <div className="flex gap-2">
                      <button className="bg-[#0b65c2] hover:bg-[#0052a3] text-white px-4 py-1.5 rounded text-xs font-bold w-full transition-colors">
                        Accept
                      </button>
                      <button className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-1.5 rounded text-xs font-bold w-full transition-colors">
                        Reject
                      </button>
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 md:left-12 md:translate-x-0 w-4 h-4 bg-white border-b border-r border-slate-200 rotate-45" />
                  </div>
                </span>{" "}
                ...
              </div>
            </div>
          </div>

          {/* Mobile tooltip (always visible below mockup, no hover) */}
          <div className="mt-4 bg-white rounded-xl shadow-md border border-slate-200 p-4 sm:hidden">
            <div className="flex items-center gap-2 mb-2 text-xs">
              <span className="text-[#0b65c2] font-bold flex items-center gap-1">✨ AI suggested to</span>
              <span className="bg-green-100 text-green-700 px-1.5 rounded font-bold text-[10px]">ADD SKILL</span>
            </div>
            <p className="text-xs text-slate-600 mb-4 font-normal leading-relaxed">
              Consider adding <strong className="text-green-700">AI product development</strong> to better match the
              job description.
            </p>
            <div className="flex gap-2">
              <button className="bg-[#0b65c2] text-white px-4 py-1.5 rounded text-xs font-bold w-full">Accept</button>
              <button className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded text-xs font-bold w-full">Reject</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
