interface ScanProgressStepsProps {
  /** 1 = upload not started/in progress, 2 = AI analyzing, 3 = result ready */
  currentStep: 1 | 2 | 3;
}

const STEP_LABELS = ["Upload Resume", "AI Analysis", "View Results"] as const;

/**
 * 3-circle progress indicator with animated connector bars.
 * The connector between step N and N+1 fills once step N is complete.
 */
export default function ScanProgressSteps({ currentStep }: ScanProgressStepsProps) {
  return (
    <div className="flex justify-center items-center gap-1 sm:gap-2 mb-8 sm:mb-12 text-xs sm:text-sm font-semibold">
      {STEP_LABELS.map((label, i) => {
        const stepNumber = i + 1;
        const isComplete = currentStep > stepNumber;
        const isActive = currentStep === stepNumber;
        const isLast = stepNumber === STEP_LABELS.length;

        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-2 relative z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-500 ${
                  isComplete
                    ? "bg-[#0b65c2] text-white"
                    : isActive
                      ? "bg-[#0b65c2] text-white shadow-md relative"
                      : "border border-slate-200 text-slate-300 bg-[#f8fbff]"
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-[#0b65c2] animate-ping opacity-60 motion-reduce:hidden" />
                )}
                <span className="relative">{isComplete ? "✔" : stepNumber}</span>
              </div>
              <span className={isComplete || isActive ? "text-slate-800" : "text-slate-300 font-normal"}>
                {label}
              </span>
            </div>

            {!isLast && (
              <div className="w-8 sm:w-16 md:w-24 h-[2px] bg-slate-200 mx-1 sm:mx-2 mb-6 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-[#0b65c2] transition-all duration-700 ease-out ${
                    currentStep > stepNumber ? "w-full" : "w-0"
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
