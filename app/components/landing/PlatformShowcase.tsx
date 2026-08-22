import { useState } from "react";
import FadeIn from "~/components/ui/FadeIn";
import TabNav from "./tabs/TabNav";
import MatchReportTab from "./tabs/MatchReportTab";
import OneClickOptimizeTab from "./tabs/OneClickOptimizeTab";
import JobMatchTab from "./tabs/JobMatchTab";
import AIInsightsTab from "./tabs/AIInsightsTab";
import type { PlatformTabId } from "./landing.data";

interface PlatformShowcaseProps {
  onGetCompleteReview: () => void;
}

/**
 * "Everything You Need to Beat the ATS" — owns which dashboard mockup tab
 * is active. Each tab is its own component; this file is just the switch.
 */
export default function PlatformShowcase({ onGetCompleteReview }: PlatformShowcaseProps) {
  const [activeTab, setActiveTab] = useState<PlatformTabId>("Match Report");

  return (
    <section className="py-14 sm:py-16 px-4 sm:px-6 bg-[#f4f9ff]">
      <FadeIn className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f2137] mb-6 sm:mb-8 tracking-tight">
          Everything You Need to Beat the ATS
        </h2>

        <TabNav activeTab={activeTab} onChange={setActiveTab} />

        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden mx-auto max-w-5xl text-left w-full">
          {activeTab === "Match Report" && <MatchReportTab />}
          {activeTab === "One-Click Optimize" && <OneClickOptimizeTab />}
          {activeTab === "Job Match" && <JobMatchTab />}
          {activeTab === "AI Insights" && <AIInsightsTab onGetCompleteReview={onGetCompleteReview} />}
        </div>
      </FadeIn>
    </section>
  );
}
