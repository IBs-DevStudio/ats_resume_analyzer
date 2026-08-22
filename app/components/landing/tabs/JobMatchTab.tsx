export default function JobMatchTab() {
  return (
    <div className="p-6 sm:p-10 md:p-12 text-center min-h-[420px] md:h-[500px] flex flex-col items-center justify-center">
      <div className="w-20 h-20 bg-blue-50 text-[#0b65c2] rounded-full flex items-center justify-center mb-6">
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </div>

      <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full mb-4">
        🚧 Coming Soon
      </span>

      <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3">AI Job Match</h3>

      <p className="text-slate-600 max-w-md mx-auto mb-6">
        I'm building a powerful feature that will analyze your resume and match you with the
        most relevant jobs using AI.
      </p>

      <div className="w-full max-w-2xl bg-slate-50 border border-slate-200 rounded-lg p-6 text-left shadow-inner opacity-60">
        <div className="flex justify-between items-center mb-4">
          <div className="font-bold text-slate-800">Software Developer</div>
          <div className="bg-green-100 text-green-700 px-2 py-1 rounded font-bold text-sm">90% Match</div>
        </div>
        <div className="text-sm text-slate-500 mb-4">Top Tech Company • Remote</div>
        <div className="flex gap-2">
          <span className="bg-white border border-slate-200 px-2 py-1 rounded text-xs text-slate-600">React</span>
          <span className="bg-white border border-slate-200 px-2 py-1 rounded text-xs text-slate-600">Node.js</span>
          <span className="bg-gray-300 text-white px-2 py-1 rounded text-xs font-semibold cursor-not-allowed">
            Apply (Locked)
          </span>
        </div>
      </div>

      <p className="text-xs text-slate-400 mt-6">This feature will be available soon. Stay tuned 🚀</p>
    </div>
  );
}
