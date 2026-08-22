import { PLATFORM_TABS, type PlatformTabId } from "../landing.data";

interface TabNavProps {
  activeTab: PlatformTabId;
  onChange: (tab: PlatformTabId) => void;
}

export default function TabNav({ activeTab, onChange }: TabNavProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2.5 sm:gap-4 mb-8 sm:mb-12">
      {PLATFORM_TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-full border font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all duration-200 ${
              isActive
                ? "border-[#0b65c2] bg-blue-50 text-[#0b65c2] shadow-sm"
                : "border-slate-200 bg-white text-slate-600 hover:border-[#0b65c2] hover:text-[#0b65c2] hover:bg-blue-50 hover:shadow-sm hover:-translate-y-0.5"
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
            </svg>
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
