import { useNavigate } from "react-router";
import Navbar from "~/components/Navbar";
import { usePuterStore } from "~/lib/puter";
import Hero from "~/components/landing/Hero";
import HowItWorks from "~/components/landing/HowItWorks";
import PlatformShowcase from "~/components/landing/PlatformShowcase";
import QuickScanSection from "~/components/landing/QuickScanSection";
import ResumeOptimizationSection from "~/components/landing/ResumeOptimizationSection";
import MissingSkillsSection from "~/components/landing/MissingSkillsSection";
import PoweredByClaude from "~/components/landing/PoweredByClaude";
import CtaBanner from "~/components/landing/CtaBanner";
import Footer from "~/components/landing/Footer";

export default function Landing() {
  const { auth } = usePuterStore();
  const navigate = useNavigate();

  const handleGetCompleteReview = () => {
    if (!auth.isAuthenticated) {
      navigate("/auth?next=/upload");
    } else {
      navigate("/upload");
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f9ff] text-slate-800 font-sans overflow-x-hidden selection:bg-sky-200 selection:text-sky-900 [font-family:Inter,ui-sans-serif,system-ui,sans-serif]">
      <Navbar />
      <Hero />
      <HowItWorks />
      <PlatformShowcase onGetCompleteReview={handleGetCompleteReview} />
      <QuickScanSection onGetCompleteReview={handleGetCompleteReview} />
      <ResumeOptimizationSection />
      <MissingSkillsSection />
      <PoweredByClaude />
      <CtaBanner />
      <Footer />
    </div>
  );
}
