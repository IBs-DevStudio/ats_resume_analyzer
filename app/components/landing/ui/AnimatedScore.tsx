import { useEffect, useRef, useState } from "react";

interface AnimatedScoreProps {
  score: number;
  color: string;
  strokeDasharray?: number;
  showPercent?: boolean;
}

/** Circular progress ring that animates its fill in once visible. */
export default function AnimatedScore({
  score,
  color,
  strokeDasharray = 283,
  showPercent = false,
}: AnimatedScoreProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  const offset = isVisible ? strokeDasharray - (strokeDasharray * score) / 100 : strokeDasharray;

  return (
    <div ref={domRef} className="relative w-full h-full">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" stroke="#e2e8f0" strokeWidth="10" fill="none" />
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke={color}
          strokeWidth="10"
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={offset}
          className="transition-all duration-[1500ms] ease-out motion-reduce:transition-none"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-2xl sm:text-3xl font-bold text-slate-800">
        {isVisible ? score : 0}
        {showPercent && <span className="text-base sm:text-lg">%</span>}
      </div>
    </div>
  );
}
