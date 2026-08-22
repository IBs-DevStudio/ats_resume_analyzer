import FadeIn from "~/components/ui/FadeIn";
import JobFitVideo from "~/components/JobFitVideo";
import { HOW_IT_WORKS_STEPS } from "~/components/landing/landing.data";

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-14 sm:py-20 px-4 sm:px-6 bg-white">
            <FadeIn className="max-w-5xl mx-auto text-center">
                <div className="text-xs font-bold text-[#0b65c2] uppercase tracking-widest mb-3">
                    Quick Walkthrough
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f2137] mb-3 sm:mb-4 tracking-tight">
                    See How It Works
                </h2>
                <p className="text-slate-600 text-[15px] sm:text-base md:text-lg mb-7 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
                    Watch how JobFit scans your resume, detects ATS issues, and helps you land more
                    interviews in under a minute.
                </p>

                <JobFitVideo />

                <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-left max-w-4xl mx-auto">
                    {HOW_IT_WORKS_STEPS.map((step) => (
                        <div key={step.number} className="bg-[#f4f9ff] rounded-xl p-4 sm:p-6 border border-blue-100">
                            <div className="w-10 h-10 rounded-full bg-[#0b65c2] text-white flex items-center justify-center font-bold text-lg mb-4">
                                {step.number}
                            </div>
                            <h3 className="font-bold text-slate-800 mb-2">{step.title}</h3>
                            <p className="text-sm text-slate-600">{step.description}</p>
                        </div>
                    ))}
                </div>
            </FadeIn>
        </section>
    );
}
