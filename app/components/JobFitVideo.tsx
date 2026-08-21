"use client";

import { useState } from "react";

export default function JobFitVideo() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-2xl border border-slate-300 bg-[#f3f3f3] shadow-2xl">

      {/* macOS Window Header */}
      <div className="relative h-9 sm:h-11 bg-[#f3f3f3] border-b border-slate-200 flex items-center px-3 sm:px-4">

        {/* Traffic Lights */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#28c840]" />
        </div>

        {/* Window title */}
        <div className="absolute left-1/2 -translate-x-1/2 text-[10px] sm:text-xs font-medium text-slate-500">
          JobFit — How It Works
        </div>
      </div>

      {/* Video */}
      <div className="relative aspect-video bg-black">

        {!playing ? (
          <>
            {/* YOUR thumbnail */}
            <img
              src="images/jobfit-thumbnail.png"
              alt="JobFit — How It Works"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/10" />

            {/* Play button */}
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label="Play JobFit video"
              className="absolute inset-0 flex items-center justify-center group"
            >
              <span className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600 text-white shadow-2xl transition-transform duration-200 group-hover:scale-110 cursor-pointer">
                <svg
                  viewBox="0 0 24 24"
                  className="w-7 h-7 sm:w-9 sm:h-9 ml-1 fill-current"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          </>
        ) : (
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/6czVZjC0Ho0?autoplay=1"
            title="JobFit - How It Works"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        )}

      </div>
    </div>
  );
}