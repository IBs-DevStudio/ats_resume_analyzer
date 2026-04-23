import { useState } from "react";
import { Link, type MetaFunction } from "react-router";
import Navbar from "~/components/Navbar";

export const meta: MetaFunction = () => {
  return [
    { title: "JobFit — Pricing · Free Forever" },
    {
      name: "description",
      content:
        "JobFit is free for everyone — because every job seeker deserves a fair shot.",
    },
  ];
};

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Is JobFit really free forever?",
      a: "Yes — with one small caveat. JobFit runs on Puter's free AI credits which power Claude claude-sonnet-4.5, a premium enterprise-grade model. These credits refresh every 1–2 days. If analysis is temporarily unavailable, just check back shortly and it will work again. No subscriptions, no credit card, ever.",
    },
    {
      q: "Why is it sometimes unavailable?",
      a: "JobFit uses Claude claude-sonnet-4.5 — one of the most powerful AI models available. Because it's a heavy model, Puter's free credit pool refreshes every 1–2 days. Think of it like a free tier with a small cooldown. We chose quality over constant availability so your feedback is always meaningful.",
    },
    {
      q: "How many resumes can I analyze?",
      a: "You can analyze an unlimited number of resumes. There are no daily caps or hidden paywalls. The only limit is Puter's shared AI credit pool, which refreshes every 1–2 days if it runs low.",
    },
    {
      q: "Who can see my resume?",
      a: "Only you. All your resumes and analyses are stored securely and privately in your own Puter account. We do not sell your data or share it with third parties.",
    },
    {
      q: "What AI model powers the analysis?",
      a: "JobFit uses Claude claude-sonnet-4-6 by Anthropic via Puter's AI infrastructure — the same model used by enterprise teams. This ensures you get the most accurate, contextual resume feedback available anywhere.",
    },
    {
      q: "Will you ever charge for this?",
      a: "The core ATS resume analyzer for individual job seekers will remain free. In the future, we may introduce paid tiers for enterprise teams or career coaches who need higher volume without the credit refresh wait.",
    },
    {
      q: "How is this different from Jobscan?",
      a: "Unlike Jobscan which charges $50+/month and uses basic keyword matching, JobFit is completely free and uses Claude — a large language model that understands context, tone, and nuance in your resume. The feedback quality is significantly better.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-[#f8fbff] text-slate-800 font-sans relative overflow-hidden flex flex-col">
      <Navbar />
      {/* Spacer for fixed navbar */}
      <div style={{ height: 64 }} />
      {/* Philosophy Banner */}

      {/* Animated Background */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-sky-200/40 mix-blend-multiply rounded-full blur-[120px] pointer-events-none animate-blob"></div>
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-200/30 mix-blend-multiply rounded-full blur-[150px] pointer-events-none animate-blob"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Philosophy Banner */}
      <div className="w-full bg-[#e0f2fe] border-b border-[#bae6fd] py-3 relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm md:text-base font-bold text-[#0284c7] flex items-center justify-center gap-2 flex-wrap">
            <svg
              className="w-5 h-5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            JobFit is completely free — no credit card, no subscription,
            forever.
          </p>
          <p className="text-[12px] md:text-sm text-[#0369a1] mt-1 font-medium max-w-3xl mx-auto leading-relaxed">
            Powered by <strong>Claude claude-sonnet-4.5</strong> via Puter's
            free AI credits. Since we use a premium model, credits occasionally
            run low —{" "}
            <span className="inline-flex items-center gap-1 font-bold text-[#0284c7]">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              just wait 1–2 days and they refresh automatically.
            </span>{" "}
            No payment ever required.
          </p>
        </div>
      </div>

      <div className="flex-1 max-w-7xl w-full mx-auto px-6 py-16 md:py-24 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-[#0f2137] mb-6 tracking-tight leading-tight">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-slate-500 font-medium">
            Get enterprise-grade resume analysis without the enterprise price
            tag.
          </p>
        </div>

        {/* Section 1: Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 max-w-6xl mx-auto">
          {/* Free Forever Card */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-[#0ea5e9] relative transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 bg-[#0ea5e9] text-white text-[11px] font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-md whitespace-nowrap">
              Most Popular
            </div>
            <h3 className="font-serif text-3xl font-bold text-[#0f2137] mb-2">
              Free Forever
            </h3>
            <p className="text-slate-500 font-medium h-12">
              Everything you need to land interviews
            </p>
            <div className="my-8 flex items-baseline gap-2">
              <span className="text-5xl font-bold text-[#0f2137]">$0</span>
              <span className="text-slate-500 font-bold uppercase text-sm tracking-wider">
                / forever
              </span>
            </div>
            <Link
              to="/upload"
              className="block w-full text-center bg-[#0ea5e9] hover:bg-[#0284c7] text-white py-4 rounded-xl font-bold transition-all shadow-md hover:-translate-y-0.5 mb-8"
            >
              Get Started Free
            </Link>
            <div className="space-y-4">
              {[
                "Unlimited resume uploads",
                "AI-powered ATS scoring",
                "Detailed feedback across 5 categories",
                "Score history & insights dashboard",
                "Secure private storage via Puter",
                "Powered by Claude claude-sonnet-4-6",
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0 text-emerald-500 bg-emerald-50 rounded-full p-1">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-slate-700 font-semibold text-[15px]">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Card */}
          <div className="bg-white/60 rounded-3xl p-8 border border-slate-200 relative opacity-70">
            <h3 className="font-serif text-3xl font-bold text-slate-800 mb-2">
              Pro
            </h3>
            <p className="text-slate-500 font-medium h-12">
              For power users applying at scale
            </p>
            <div className="my-8">
              <span className="text-3xl font-bold text-slate-600">
                Coming Soon
              </span>
            </div>
            <button
              disabled
              className="block w-full text-center border-2 border-slate-200 bg-slate-50 text-slate-400 py-3.5 rounded-xl font-bold mb-8 cursor-not-allowed"
            >
              Join Waitlist
            </button>
            <div className="space-y-4 opacity-70">
              {[
                "Priority AI analysis",
                "Bulk resume comparison",
                "LinkedIn optimization",
                "Cover letter generator",
                "API access",
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0 text-slate-400">
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
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <span className="text-slate-500 font-semibold text-[15px]">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Enterprise Card */}
          <div className="bg-white/60 rounded-3xl p-8 border border-slate-200 relative opacity-70">
            <h3 className="font-serif text-3xl font-bold text-slate-800 mb-2">
              Enterprise
            </h3>
            <p className="text-slate-500 font-medium h-12">
              For teams and career coaches
            </p>
            <div className="my-8">
              <span className="text-3xl font-bold text-slate-600">
                Let's Talk
              </span>
            </div>
            <button
              disabled
              className="block w-full text-center border-2 border-slate-200 bg-slate-50 text-slate-400 py-3.5 rounded-xl font-bold mb-8 cursor-not-allowed"
            >
              Contact Us
            </button>
            <div className="space-y-4 opacity-70">
              {[
                "Team dashboard",
                "White-label reports",
                "Dedicated support",
                "Custom integrations",
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0 text-slate-400">
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
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <span className="text-slate-500 font-semibold text-[15px]">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Why free? (Mission) */}
      <div className="w-full bg-[#0f172a] py-24 md:py-32 relative z-10 text-white border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-16">
            Built for job seekers, not profit.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 text-sky-400">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Powered by Puter</h3>
              <p className="text-slate-400 leading-relaxed font-medium">
                Puter provides free cloud AI credits that power every analysis.
                No hidden costs.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 text-sky-400">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Powered by Claude</h3>
              <p className="text-slate-400 leading-relaxed font-medium">
                Claude claude-sonnet-4-6 by Anthropic delivers the most accurate
                resume feedback available.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 text-sky-400">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Your data is yours</h3>
              <p className="text-slate-400 leading-relaxed font-medium">
                Everything is stored privately in your own Puter account. We
                never see your resume.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: FAQ */}
      <div className="w-full max-w-4xl mx-auto px-6 py-24 relative z-10">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#0f2137] text-center mb-12">
          Frequently asked questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:border-[#0ea5e9]/40 transition-colors"
            >
              <button
                className="w-full text-left px-6 py-6 flex items-center justify-between font-bold text-lg text-slate-800"
                onClick={() => toggleFaq(i)}
              >
                <span>{faq.q}</span>
                <span className="text-[#0ea5e9] shrink-0 ml-4 bg-[#f0f9ff] p-1.5 rounded-md">
                  {openFaq === i ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M20 12H4"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  )}
                </span>
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? "max-h-40 pb-6 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <p className="text-slate-500 leading-relaxed font-medium">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: CTA Banner */}
      <div className="w-full bg-gradient-to-br from-[#0ea5e9] to-[#0284c7] py-24 relative z-10 text-white text-center border-t border-sky-400">
        <div className="max-w-4xl mx-auto px-6 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-lg bg-white/10 blur-[100px] rounded-full pointer-events-none"></div>

          <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6 relative z-10">
            Start optimizing your resume today.
          </h2>
          <p className="text-xl md:text-2xl text-sky-100 mb-10 font-medium relative z-10">
            Free forever. No credit card. No catch.
          </p>
          <Link
            to="/upload"
            className="inline-block relative z-10 bg-white text-[#0b65c2] hover:bg-slate-50 px-10 py-5 rounded-2xl font-bold text-lg transition-all shadow-xl hover:-translate-y-1 hover:shadow-2xl"
          >
            Scan Your Resume Free
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-[#0f172a] border-t border-slate-800 py-16 relative z-10 mt-auto">
        <div className="max-w-7xl mx-auto px-6">
          {/* Top row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[#0ea5e9] to-[#1d6fdc] rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 16 16"
                    stroke="currentColor"
                  >
                    <path
                      d="M3 4h10M3 8h7M3 12h5"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <span className="text-white font-bold text-xl tracking-tight">
                  JobFit
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                AI-powered ATS resume analyzer. Free for every job seeker,
                forever.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#0ea5e9]/20 rounded flex items-center justify-center text-[10px] font-bold text-[#0ea5e9]">
                  IB
                </div>
                <span className="text-slate-400 text-xs">
                  Built by{" "}
                  <span className="text-white font-semibold">
                    Ikram Banadar
                  </span>{" "}
                  · IB's Dev World
                </span>
              </div>
            </div>

            {/* Features */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
                Analysis Features
              </h4>
              <ul className="space-y-2">
                {[
                  "ATS Score",
                  "Resume Content",
                  "Tone & Style",
                  "Skills Match",
                  "Resume Structure",
                  "Improvement Tips",
                ].map((f) => (
                  <li
                    key={f}
                    className="text-slate-400 text-sm hover:text-[#0ea5e9] transition-colors cursor-default"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
                Product
              </h4>
              <ul className="space-y-2">
                {[
                  { label: "Upload Resume", to: "/upload" },
                  { label: "Dashboard", to: "/" },
                  { label: "Insights", to: "/insights" },
                  { label: "Pricing", to: "/pricing" },
                ].map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-slate-400 text-sm hover:text-[#0ea5e9] transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Powered by */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
                Powered By
              </h4>
              <ul className="space-y-3">
                {[
                  { name: "Claude claude-sonnet-4-6", sub: "by Anthropic" },
                  { name: "Puter Cloud", sub: "Free AI infrastructure" },
                  { name: "React Router v7", sub: "Frontend framework" },
                  { name: "Tailwind CSS", sub: "Styling" },
                ].map(({ name, sub }) => (
                  <li key={name}>
                    <div className="text-slate-300 text-sm font-medium">
                      {name}
                    </div>
                    <div className="text-slate-500 text-xs">{sub}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} JobFit · Built with passion by{" "}
              <span className="text-[#0ea5e9] font-semibold">
                Ikram Banadar
              </span>{" "}
              · <span className="text-slate-400">IB's Dev World</span>
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-slate-500 text-xs">
                All systems operational · Free for everyone
              </span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
