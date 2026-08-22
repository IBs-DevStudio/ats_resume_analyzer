import { AI_INSIGHT_FEATURES } from "../landing.data";

interface AIInsightsTabProps {
  onGetCompleteReview: () => void;
}

export default function AIInsightsTab({ onGetCompleteReview }: AIInsightsTabProps) {
  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        {/* Left — screenshot with browser chrome frame */}
        <div className="w-full lg:w-3/5 relative">
          <div className="bg-slate-100 rounded-t-2xl px-4 py-3 border border-b-0 border-slate-200 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <div className="flex-1 mx-4 bg-white rounded-md px-3 py-1 text-xs text-slate-400 font-mono border border-slate-200">
              jobfit.app/resume/ai-review
            </div>
          </div>
          <div className="relative border border-slate-200 rounded-b-2xl overflow-hidden shadow-xl">
            <img
              src="/images/resume-review-preview.png"
              alt="JobFit AI Resume Review"
              className="w-full object-cover object-top"
              style={{ maxHeight: 420 }}
            />
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
          </div>

          <div className="absolute -top-3 -right-3 bg-[#0b65c2] text-white rounded-2xl px-4 py-2 shadow-lg text-sm font-bold flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            85/100 ATS Score
          </div>

          <div className="absolute -bottom-3 -left-3 bg-white border border-slate-200 rounded-2xl px-4 py-2 shadow-lg text-sm font-semibold text-slate-700 flex items-center gap-2">
            <svg className="w-4 h-4 text-[#0b65c2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Analysis in ~20 seconds
          </div>
        </div>

        {/* Right — feature list */}
        <div className="w-full lg:w-2/5 text-left flex flex-col gap-5">
          <div>
            <div className="text-xs font-bold text-[#0b65c2] uppercase tracking-widest mb-2">
              Real AI Feedback
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-[#0f2137] leading-tight mb-3">
              See exactly what's holding your resume back
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              JobFit's AI doesn't just give you a number — it breaks down every section of your
              resume and tells you precisely what to fix.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {AI_INSIGHT_FEATURES.map(({ icon, label, desc }) => (
              <div key={label} className="flex items-start gap-3 p-3 rounded-xl hover:bg-blue-50 transition-colors group">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#0b65c2] transition-colors">
                  <svg className="w-4 h-4 text-[#0b65c2] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800">{label}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{desc}</div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={onGetCompleteReview}
            className="w-full bg-[#0b65c2] hover:bg-[#0052a3] text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Get Your Free AI Review
          </button>
        </div>
      </div>
    </div>
  );
}
