import AnimatedScore from "~/components/shared/AnimatedScore";

const HARD_SKILLS = [
  { label: "Technical program management", matched: true, aiSuggested: true, meta: "2/3" },
  { label: "Use cases", matched: true, aiSuggested: false, meta: "Added 2/3" },
  { label: "Security", matched: true, aiSuggested: false, meta: "Added 3/2" },
  { label: "Product development", matched: true, aiSuggested: false, meta: "Added 5/2", highlighted: true },
  { label: "Innovative", matched: false, aiSuggested: true, meta: "0/1" },
];

export default function OneClickOptimizeTab() {
  return (
    <div className="flex flex-col md:flex-row min-h-[520px] md:h-[600px]">
      {/* Left rail — skills checklist */}
      <div className="w-full md:w-1/3 border-r border-slate-100 flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-24 h-24">
              <AnimatedScore score={73} color="#f59e0b" showPercent={false} />
            </div>
            <div>
              <div className="font-bold text-slate-800 text-sm">
                Self Employed <span className="text-slate-400">/ Backend Developer</span>
              </div>
              <div className="text-xs text-slate-500">Ikram Resume ⭐</div>
            </div>
          </div>
          <button className="text-orange-500 border border-orange-200 bg-orange-50 px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
            ⚡ ATS Tip
          </button>
        </div>

        <div className="flex border-b border-slate-100 text-sm font-semibold">
          <button className="flex-1 py-3 border-b-2 border-slate-800 text-slate-800">Skills</button>
          <button className="flex-1 py-3 text-slate-500 hover:text-slate-700">Searchability</button>
          <button className="flex-1 py-3 text-slate-500 hover:text-slate-700">
            Recruiter tips{" "}
            <span className="ml-1 bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full text-[10px]">3</span>
          </button>
        </div>

        <div className="flex-1 p-6 overflow-y-auto bg-slate-50/50">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500 mb-4">
            <span>Required skills ⓘ</span>
            <span>
              Matched skills{" "}
              <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">1</span>
            </span>
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
              <span>
                Matched <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">7</span>
              </span>
              <span>
                Missing <span className="bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full">2</span>
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {HARD_SKILLS.map((skill) => (
              <div
                key={skill.label}
                className={`flex items-center justify-between border p-2.5 rounded-lg ${
                  skill.highlighted
                    ? "bg-green-50 border-green-400"
                    : "bg-white border-slate-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-full text-white flex items-center justify-center text-[10px] ${
                      skill.matched ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {skill.matched ? "✔" : "✖"}
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      skill.matched ? (skill.highlighted ? "text-slate-800" : "text-slate-700") : "text-slate-500"
                    }`}
                  >
                    {skill.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {skill.aiSuggested && (
                    <span className="text-[#0b65c2] text-[10px] font-bold flex items-center gap-0.5">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        />
                      </svg>{" "}
                      AI suggested
                    </span>
                  )}
                  <span className="text-xs text-slate-400">{skill.meta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right pane — resume preview with inline AI edit tooltip */}
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
            <div className="w-5 h-5 rounded-full border border-slate-300 text-slate-400 flex items-center justify-center ml-2">
              2
            </div>
            <span className="text-slate-400 font-normal">Edit</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-slate-400 hover:text-slate-600">↺</button>
            <button className="text-slate-400 hover:text-slate-600">↻</button>
            <button className="text-slate-400 hover:text-slate-600 px-2">💾</button>
            <button className="border border-slate-300 bg-white px-3 py-1 rounded text-slate-700 font-semibold text-xs hover:bg-slate-50">
              Accept all
            </button>
            <button className="bg-[#0b65c2] text-white px-4 py-1 rounded font-semibold text-xs flex items-center gap-1 hover:bg-[#0052a3]">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>{" "}
              Continue
            </button>
          </div>
        </div>

        <div className="flex-1 p-12 overflow-y-auto bg-white relative">
          <h2 className="text-3xl font-sans text-slate-800 mb-2">Ikram Banadar</h2>
          <p className="text-sm text-slate-500 mb-8">
            ikrambandar04@gmail.com | +91 911045XXXX | India, Karnataka | LinkedIn:
            linkedin.com/in/ikrambanadar
          </p>

          <h3 className="font-bold text-lg text-slate-800 mb-3 border-b border-slate-200 pb-1">
            Professional Summary
          </h3>
          <p className="text-sm text-slate-700 mb-8 leading-relaxed">
            Aspiring Software Developer with hands-on experience in building web applications
            using React, Tailwind CSS, and modern tools. Passionate about solving real-world
            problems and developing scalable solutions.
            <span className="line-through text-red-500 bg-red-50">
              Experienced in managing large-scale enterprise programs and stakeholder coordination
            </span>{" "}
            <span className="bg-green-100 text-green-800 font-medium px-1 rounded relative cursor-pointer border-b-2 border-green-500">
              Built an AI-powered ATS Resume Analyzer that helps users evaluate and improve
              resumes efficiently. Skilled in frontend development, API integration, and
              performance optimization.
            </span>{" "}
            Strong interest in continuous learning, problem-solving, and delivering impactful
            projects.
          </p>

          <h3 className="font-bold text-lg text-slate-800 mb-3 border-b border-slate-200 pb-1">
            Professional Experience
          </h3>

          <div className="mb-4 text-sm text-slate-700">
            <div className="font-bold">Software Developer (Projects)</div>
            <ul className="list-disc pl-5 mt-2 space-y-2 opacity-50">
              <li>
                Developed an ATS Resume Analyzer that converts AI feedback into structured PDF
                reports for faster exam preparation.
              </li>
              <li>Built responsive and modern UI using React, Tailwind CSS, and component-based architecture.</li>
              <li>Integrated authentication and backend services using tools like Appwrite and Clerk.</li>
              <li>Improved user experience by optimizing performance and reducing load times.</li>
            </ul>
          </div>

          {/* AI Popup Tooltip */}
          <div className="absolute top-[320px] left-[250px] bg-white rounded-lg shadow-2xl border border-slate-200 p-4 w-80 z-10">
            <div className="flex items-center gap-2 mb-2 text-xs">
              <span className="text-[#0b65c2] font-bold flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>{" "}
                AI suggested to
              </span>
              <span className="bg-orange-100 text-orange-700 px-1.5 rounded font-bold text-[10px]">REPHRASE</span>
              <span className="bg-green-100 text-green-700 px-1.5 rounded font-bold text-[10px]">ADD SKILL</span>
            </div>
            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              ...{" "}
              <span className="line-through text-red-500">
                projects. Skilled in stakeholder management, risk mitigation
              </span>{" "}
              <span className="text-green-700 font-bold bg-green-50">
                AI product development initiatives. Skilled in responsible AI risk assessments,
                mitigation strategies
              </span>{" "}
              ...
            </p>
            <div className="flex gap-2">
              <button className="bg-[#0b65c2] text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-[#0052a3]">
                Accept
              </button>
              <button className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded text-xs font-bold hover:bg-slate-200">
                Reject
              </button>
            </div>
            <div className="absolute -top-2 left-10 w-4 h-4 bg-white border-t border-l border-slate-200 transform rotate-45" />
          </div>
        </div>
      </div>
    </div>
  );
}
