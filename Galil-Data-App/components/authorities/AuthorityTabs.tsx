"use client";

import {useState} from "react";
import AuthoritiesMap from "@/components/authorities/AuthoritiesMap";
import AuthoritiesTable, {AuthorityRow} from "@//components/authorities/AuthoritiesTable";
import MagamahUnified from "./MagamahUnified";
import TrendChartCard from "@/components/TrendChartCard";
import ComparisonChart from "./ComparisonChart";

type Props = {
  tableData: AuthorityRow[];
};

export default function AuthorityTabs({tableData}: Props) {
  const [active, setActive] = useState<string>("map");
  return (
    <div dir="rtl">
      {/* Content area with fixed height */}
      <div className="mt-6">
        <div className="h-[520px] w-full">
          {active === "map" && (
            <div className="grid grid-cols-[520px_1fr] gap-4 h-full">
              <div className="w-full h-full">
                <AuthoritiesTable title="פירוט רשויות" data={tableData} />
              </div>

              <div className="w-full h-full">
                <AuthoritiesMap />
              </div>
            </div>
          )}

          {active === "trend" && (
            <div className="h-full w-full">
              <TrendChartCard
                className="h-full"
                title="מגמת הרשויות שנבחרו במדד אוכלוסיה (אנשים) בשנים 2003 - 2023"
                subtitle={'קובץ רשויות מקומיות, למ"ס'}
                yLabel="אנשים"
                xLabel="שנה"
                series={[
                  {
                    name: "מגדל שמס",
                    points: [
                      {x: 2003, y: 8400},
                      {x: 2005, y: 9000},
                      {x: 2010, y: 9800},
                      {x: 2015, y: 10600},
                      {x: 2020, y: 11300},
                      {x: 2023, y: 11150},
                    ],
                  },
                  {
                    name: "בוקעאתא",
                    points: [
                      {x: 2003, y: 5200},
                      {x: 2005, y: 5400},
                      {x: 2010, y: 5900},
                      {x: 2015, y: 6300},
                      {x: 2020, y: 6700},
                      {x: 2023, y: 6850},
                    ],
                  },
                ]}
              />
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

          {active === "tableDownload" && (
            <div className="h-full flex items-center justify-center p-4">
              Placeholder: טבלה והורדה
            </div>
          )}
        </div>
      </div>

      {/* Buttons fixed below content */}
      <div className="mt-6 flex justify-center items-center gap-4 flex-wrap">
        <button
          onClick={() => setActive("map")}
          className={`w-[140px] py-3 rounded-lg flex items-center justify-center shadow-sm transition-colors duration-150 ${
            active === "map"
              ? "bg-sky-400 text-white shadow-md"
              : "bg-white border border-slate-200 text-slate-700"
          }`}>
          מפה
        </button>

        <button
          onClick={() => setActive("chart")}
          className={`w-[140px] py-3 rounded-lg flex items-center justify-center shadow-sm transition-colors duration-150 ${
            active === "chart"
              ? "bg-sky-400 text-white shadow-md"
              : "bg-white border border-slate-200 text-slate-700"
          }`}>
          גרף
        </button>

        <button
          onClick={() => setActive("trend")}
          className={`w-[140px] py-3 rounded-lg flex items-center justify-center shadow-sm transition-colors duration-150 ${
            active === "trend"
              ? "bg-sky-400 text-white shadow-md"
              : "bg-white border border-slate-200 text-slate-700"
          }`}>
          מגמה
        </button>

        <button
          onClick={() => setActive("trendUnified")}
          className={`w-[140px] py-3 rounded-lg flex items-center justify-center shadow-sm transition-colors duration-150 ${
            active === "trendUnified"
              ? "bg-sky-400 text-white shadow-md"
              : "bg-white border border-slate-200 text-slate-700"
          }`}>
          מגמה אחודה
        </button>

        <button
          onClick={() => setActive("tableDownload")}
          className={`w-[140px] py-3 rounded-lg flex items-center justify-center shadow-sm transition-colors duration-150 ${
            active === "tableDownload"
              ? "bg-sky-400 text-white shadow-md"
              : "bg-white border border-slate-200 text-slate-700"
          }`}>
          טבלה והורדה
        </button>
      </div>
    </div>
  );
}
