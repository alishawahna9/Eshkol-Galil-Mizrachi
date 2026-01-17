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
  filters?: { search?: string; metric?: string; year?: string; valueType?: string; ageGroup?: string; gender?: string };
};

export default function AuthorityTabs({ tableComponent, onSelectAuthority, selectedAuthority, filters }: Props) 
 {
  const [active, setActive] = useState<string>("map");

  return (
    <div dir="rtl">
      <div>
        {/* ✅ MAP TAB */}
        {active === "map" && (
          <MapTabPanel
            tableComponent={tableComponent}
            onSelectAuthority={onSelectAuthority}
            selectedAuthority={selectedAuthority}
            filters={filters}
          />
        )}

        {/* ✅ TREND TAB */}
        {active === "trend" && (
          <TrendTabPanel selectedAuthority={selectedAuthority} filters={filters} />
        )}

        {/* ✅ TREND UNIFIED TAB */}
        {active === "trendUnified" && <TrendUnifiedTabPanel />}

        {/* ✅ COMPARISON TAB */}
        {active === "chart" && <ComparisonTabPanel filters={filters} />}
      </div>

      {/* ✅ NAVIGATION BUTTONS */}
      <div className="mt-6 flex justify-center items-center gap-6 sm:gap-7 md:gap-8 flex-wrap">
        <button
          onClick={() => setActive("map")}
          className={`w-45 py-3.5 rounded-full text-base font-semibold shadow-sm ${
            active === "map"
              ? "bg-primary text-primary-foreground"
              : "bg-card border border-border text-foreground hover:ring-2 hover:ring-primary/20"
          }`}
        >
          מפה
        </button>
        <button
          onClick={() => setActive("chart")}
          className={`w-45 py-3.5 rounded-full text-base font-semibold shadow-sm ${
            active === "chart"
              ? "bg-primary text-primary-foreground"
              : "bg-card border border-border text-foreground hover:ring-2 hover:ring-primary/20"
          }`}
        >
          גרף
        </button>
        <button
          onClick={() => setActive("trend")}
          className={`w-45 py-3.5 rounded-full text-base font-semibold shadow-sm ${
            active === "trend"
              ? "bg-primary text-primary-foreground"
              : "bg-card border border-border text-foreground hover:ring-2 hover:ring-primary/20"
          }`}
        >
          מגמה
        </button>
        <button
          onClick={() => setActive("trendUnified")}
          className={`w-45 py-3.5 rounded-full text-base font-semibold shadow-sm ${
            active === "trendUnified"
              ? "bg-primary text-primary-foreground"
              : "bg-card border border-border text-foreground hover:ring-2 hover:ring-primary/20"
          }`}
        >
          מגמה אחודה
        </button>
      </div>
    </div>
  );
}
