import { Link } from "react-router";

export default function CtaBanner() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-r from-sky-400 to-[#0b65c2] text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
      <div className="max-w-4xl mx-auto text-white relative z-10">
        <h2 className="font-sans text-3xl sm:text-4xl md:text-6xl font-bold mb-5 sm:mb-6 tracking-tight">
          Ready to get more interviews?
        </h2>
        <p className="text-base sm:text-lg md:text-2xl text-blue-50 mb-8 sm:mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
          Join thousands of job seekers who have used JobFit to land their dream jobs.
        </p>
        <Link
          to="/upload"
          className="inline-block w-full sm:w-auto px-7 sm:px-12 py-4 sm:py-5 bg-white text-[#0b65c2] hover:bg-slate-50 rounded-xl font-bold text-base sm:text-xl md:text-2xl transition-all shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:-translate-y-1"
        >
          Scan Your Resume For Free
        </Link>
      </div>
    </section>
  );
}
