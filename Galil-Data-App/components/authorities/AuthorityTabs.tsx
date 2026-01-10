"use client";

import { useState, ReactNode } from "react";
import MapTabPanel from "./tabs/MapTabPanel";
import TrendTabPanel from "./tabs/TrendTabPanel";
import TrendUnifiedTabPanel from "./tabs/TrendUnifiedTabPanel";
import ComparisonTabPanel from "./tabs/ComparisonTabPanel";


type Props = {
  tableComponent: ReactNode;
  onSelectAuthority?: (name: string | null) => void;
  selectedAuthority?: string | null;
};

export default function AuthorityTabs({ tableComponent, onSelectAuthority, selectedAuthority }: Props) 
 {
  const [active, setActive] = useState<string>("map");

  return (
    <div dir="rtl">
      <div className="mt-6">
        {/* ✅ MAP TAB */}
        {active === "map" && (
          <MapTabPanel
            tableComponent={tableComponent}
            onSelectAuthority={onSelectAuthority}
            selectedAuthority={selectedAuthority}
          />
        )}

        {/* ✅ TREND TAB */}
        {active === "trend" && (
          <TrendTabPanel selectedAuthority={selectedAuthority} />
        )}

        {/* ✅ TREND UNIFIED TAB */}
        {active === "trendUnified" && <TrendUnifiedTabPanel />}

        {/* ✅ COMPARISON TAB */}
        {active === "chart" && <ComparisonTabPanel />}
      </div>

      {/* ✅ NAVIGATION BUTTONS */}
      <div className="mt-8 flex justify-center items-center gap-4 flex-wrap">
        <button onClick={() => setActive("map")} className={`w-[140px] py-3 rounded-lg ${active === "map" ? "bg-sky-400 text-white" : "bg-card border border-border text-foreground"}`}>
          מפה
        </button>
        <button onClick={() => setActive("chart")} className={`w-[140px] py-3 rounded-lg ${active === "chart" ? "bg-sky-400 text-white" : "bg-card border border-border text-foreground"}`}>
          גרף
        </button>
        <button onClick={() => setActive("trend")} className={`w-[140px] py-3 rounded-lg ${active === "trend" ? "bg-sky-400 text-white" : "bg-card border border-border text-foreground"}`}>
          מגמה
        </button>
        <button onClick={() => setActive("trendUnified")} className={`w-[140px] py-3 rounded-lg ${active === "trendUnified" ? "bg-sky-400 text-white" : "bg-card border border-border text-foreground"}`}>
          מגמה אחודה
        </button>
      </div>
    </div>
  );
}
