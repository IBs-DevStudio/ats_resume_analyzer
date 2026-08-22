import { Link } from "react-router";

const HARD_SKILLS = [
  { label: "Agile Methodology", matched: true, meta: "Added 3/3" },
  { label: "Product Roadmap", matched: false, meta: "AI Suggestion" },
  { label: "Stakeholder Management", matched: true, meta: "Added 1/1" },
  { label: "Data Analytics", matched: false, meta: "AI Suggestion" },
];

export default function MissingSkillsSection() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[#f8fbff] overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center gap-10 sm:gap-16">
        <div className="w-full md:w-1/2 text-left">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#0f2137] mb-5 sm:mb-6 leading-tight tracking-tight">
            See your missing skills
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed mb-6 sm:mb-8">
            Our ATS algorithm identifies the exact keywords and hard skills you are missing from
            the job description. Add them to your resume to instantly boost your match rate and
            pass the initial screening.
          </p>
          <Link
            to="/upload"
            className="text-[#0b65c2] font-bold text-lg hover:underline flex items-center gap-2 transition-transform hover:translate-x-1"
          >
            Scan your resume
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="w-full md:w-1/2 relative mt-12 md:mt-0">
          <div className="absolute inset-0 bg-green-50 rounded-full blur-3xl transform scale-150 -z-10" />
          <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-200 overflow-hidden transform md:-rotate-1 hover:rotate-0 transition-transform duration-500">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-700">Hard Skills</h3>
              <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full">3 Missing</span>
            </div>
            <div className="p-6 space-y-4">
              {HARD_SKILLS.map((skill) => (
                <div
                  key={skill.label}
                  className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                    skill.matched
                      ? "border border-green-200 bg-green-50/50 hover:bg-green-50"
                      : "border border-red-100 bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-6 h-6 rounded-full text-white flex items-center justify-center text-xs shadow-sm ${
                        skill.matched ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {skill.matched ? "✔" : "✖"}
                    </div>
                    <span className={`font-semibold ${skill.matched ? "text-slate-800" : "text-slate-500"}`}>
                      {skill.label}
                    </span>
                  </div>
                  {skill.matched ? (
                    <span className="text-xs text-slate-500 font-medium bg-white px-2 py-1 rounded border border-slate-100">
                      {skill.meta}
                    </span>
                  ) : (
                    <span className="text-xs text-[#0b65c2] font-bold bg-blue-50 px-2 py-1 rounded border border-blue-100 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        />
                      </svg>{" "}
                      {skill.meta}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
