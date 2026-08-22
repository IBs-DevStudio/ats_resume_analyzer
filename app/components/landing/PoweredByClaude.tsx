import Typewriter from "~/components/ui/Typewritter";
import { CLAUDE_TYPEWRITER_WORDS, CLAUDE_MOBILE_STATUS_ITEMS } from "./landing.data";

export default function PoweredByClaude() {
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 bg-[#0f172a] text-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-sky-500/20 rounded-[100%] blur-[120px] pointer-events-none" />
      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-800/80 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 shadow-[0_0_60px_rgba(14,165,233,0.4)] border border-slate-700/50 backdrop-blur-sm">
          <svg className="w-10 h-10 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-8 sm:mb-12 tracking-tight">
          Powered by Claude 4.5 Sonnet{" "}
          <span className="text-slate-400 font-light block sm:inline mt-2 sm:mt-0 text-2xl md:text-4xl">
            by Anthropic
          </span>
        </h2>

        {/* Desktop: typewriter status line. Mobile: static status grid — no cycling text on small screens. */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl px-4 py-4 sm:px-6 sm:py-5 md:px-10 md:py-8 shadow-2xl backdrop-blur-md w-full max-w-2xl min-h-[100px] flex items-center justify-center">
          <span className="hidden md:inline text-xl md:text-3xl font-mono text-sky-400 font-semibold tracking-tight">
            <Typewriter words={CLAUDE_TYPEWRITER_WORDS} />
          </span>
          <div className="grid grid-cols-2 gap-3 w-full max-w-md md:hidden text-sky-300/90 font-mono text-xs">
            {CLAUDE_MOBILE_STATUS_ITEMS.map((item) => (
              <div key={item} className="flex items-center gap-2 px-3 py-2.5 bg-slate-900/60 border border-slate-700/40 rounded-xl">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
