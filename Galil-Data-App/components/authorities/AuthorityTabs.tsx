"use client";

import { useState, ReactNode } from "react";
import MagamahUnified from "./MagamahUnified";
import TrendChartWithData from "./TrendChartWithData";
import ComparisonChart from "./ComparisonChart";
import MapTab from "@/components/authorities/MapTab";


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
        <div className="h-[520px] w-full">

          {/* ✅ MAP TAB */}
          {active === "map" && <MapTab tableComponent={tableComponent} onSelectAuthority={onSelectAuthority} selectedAuthority={selectedAuthority} />}


          {active === "trend" && (
            <div className="h-full w-full">
              <TrendChartWithData selectedAuthority={selectedAuthority} />
            </div>
          )}

          {active === "trendUnified" && (
            <div className="h-full flex items-center justify-center p-4">
              <MagamahUnified />
            </div>
          )}

          {active === "chart" && (
            <div className="h-full w-full flex flex-col">
              <ComparisonChart />
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-center items-center gap-4 flex-wrap">
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
