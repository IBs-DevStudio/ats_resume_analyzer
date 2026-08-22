import { Link } from "react-router";
import FadeIn from "~/components/landing/ui/FadeIn";
import Typewriter from "~/components/landing/ui/Typewritter";
import { HERO_TYPEWRITER_WORDS } from "./landing.data";

export default function Hero() {
  return (
    <section className="relative pt-22 pb-12 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-24 flex flex-col items-center text-center px-4 sm:px-6 overflow-hidden z-0">
      {/* Animated Background Blobs & Grid */}
      <div className="absolute inset-0 -z-10 overflow-hidden bg-[#f4f9ff]">
        <div className="absolute top-[-12%] left-[-28%] sm:left-[-10%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-sky-200/40 mix-blend-multiply filter blur-[80px] animate-blob" />
        <div
          className="absolute top-[25%] right-[-28%] sm:right-[-10%] w-[260px] h-[260px] sm:w-[400px] sm:h-[400px] rounded-full bg-blue-200/40 mix-blend-multiply filter blur-[80px] animate-blob"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-[-12%] left-[5%] sm:left-[20%] w-[360px] h-[360px] sm:w-[600px] sm:h-[600px] rounded-full bg-sky-100/50 mix-blend-multiply filter blur-[80px] animate-blob"
          style={{ animationDelay: "4s" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60" />
      </div>

      <FadeIn delay={100} className="w-full flex flex-col items-center z-10 relative">
        {/* Badge */}
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-sky-300/30 blur-2xl rounded-full animate-blob" />
          <div className="relative inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 border border-blue-100 backdrop-blur-md shadow-sm text-sm font-semibold text-[#0b65c2]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500" />
            </span>
            Powered by Claude 4.5 Sonnet
          </div>
        </div>

        {/* Headline — typewriter is desktop-only (md+); mobile never renders it */}
        <h1 className="font-sans text-[1.95rem] leading-[1.08] sm:text-[2.5rem] sm:leading-[1.12] md:text-7xl md:leading-[1.15] text-[#0f2137] max-w-4xl mx-auto mb-5 sm:mb-6 tracking-[-0.03em]">
          Optimize your resume <br className="hidden md:block" />
          <span className="hidden md:inline-block" style={{ minHeight: "1.2em", minWidth: "10ch" }}>
            <Typewriter words={HERO_TYPEWRITER_WORDS} />
          </span>
        </h1>

        {/* Sub-hook */}
        <div className="text-center mb-8 sm:mb-10 max-w-2xl px-1">
          <h3 className="font-bold text-xl sm:text-2xl md:text-3xl leading-tight mb-3 sm:mb-4 text-[#0b65c2]">
            Free forever. No paywall. No credit card.
          </h3>
          <p className="text-[15px] sm:text-base md:text-xl text-[#34495e] max-w-2xl mx-auto leading-relaxed font-medium">
            Unlike Jobscan and similar tools that limit free scans and paywall real fixes,{" "}
            <span className="inline-flex items-center px-2 py-0.5 mx-0.5 rounded-md bg-[#0b65c2]/10 text-[#0b65c2] font-bold">
              JobFit
            </span>{" "}
            gives you the full instant ATS score with actionable fixes —{" "}
            <span className="text-[#0b65c2] font-bold">unlimited and free.</span>
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full max-w-md sm:max-w-none px-1">
          <Link
            to="/upload"
            className="inline-flex px-6 sm:px-8 py-3.5 sm:py-4 bg-[#0b65c2] hover:bg-[#0052a3] text-white rounded-xl font-bold text-base sm:text-lg md:text-xl transition-all shadow-md w-full sm:w-auto justify-center min-h-12"
          >
            Scan Your Resume For Free
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex px-6 sm:px-8 py-3.5 sm:py-4 bg-transparent border-2 border-[#0b65c2] text-[#0b65c2] hover:bg-blue-50 rounded-xl font-bold text-base sm:text-lg md:text-xl transition-all w-full sm:w-auto justify-center min-h-12"
          >
            See How It Works
          </a>
        </div>
      </FadeIn>
    </section>
  );
}
