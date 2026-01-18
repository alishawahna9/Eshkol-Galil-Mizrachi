"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MetricSummaryPanel } from "./MetricSummaryPanel";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlidersHorizontal, Users, RotateCcw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Metrics: Key = column name, Label = user label
const METRICS = [
  { key: "total_population", label: "אוכלוסיה" },
  { key: "jews_and_others", label: "אוכלוסיה – יהודים ואחרים" },
  { key: "arabs", label: "אוכלוסיה – ערבים" },
  { key: "muslims", label: "אוכלוסיה – מוסלמים" },
];

const YEARS = Array.from({ length: 22 }, (_, idx) => 2002 + idx)
  .map(String)
  .reverse();

const AGE_GROUPS = [
  { value: "0_4", label: "0-4" },
  { value: "5_9", label: "5-9" },
  { value: "10_14", label: "10-14" },
  { value: "15_19", label: "15-19" },
  { value: "20_29", label: "20-29" },
  { value: "30_44", label: "30-44" },
  { value: "45_59", label: "45-59" },
  { value: "60_64", label: "60-64" },
  { value: "65_plus", label: "65+" },
];

const GENDERS = [
  { value: "men", label: "גברים" },
  { value: "women", label: "נשים" },
];

type Filters = {
  search?: string;
  metric?: string;
  year?: string;
  ageGroup?: string;
  gender?: string;
  valueType?: string;
};

export function SideFilterPanel({
  onFiltersChange,
  activeTab,
}: {
  onFiltersChange?: (f: Filters) => void;
  activeTab?: string;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState<string>("");
  const [metricKey, setMetricKey] = useState<string>(METRICS[0].key);
  const [year, setYear] = useState<string>(searchParams?.get("year") ?? "none");
  const [ageGroup, setAgeGroup] = useState<string>(
    searchParams?.get("ageGroup") ?? "none"
  );
  const [gender, setGender] = useState<string>(
    searchParams?.get("gender") ?? "none"
  );

  const valueType = "number";
  const [view, setView] = useState<"population" | "filters">("filters");

  const selectedMetric = useMemo(
    () => METRICS.find((m) => m.key === metricKey) || METRICS[0],
    [metricKey]
  );

  // ✅ CHANGE (EN): Detect the Unified Trend tab.
  // When activeTab === "trendUnified", we will show ONLY Year filtering,
  // and we will hide all other controls (including "Search Authority").
  const isUnifiedTrendTab = activeTab === "trendUnified";

  function updateQueryParam(key: string, value: string) {
    const next = new URLSearchParams(searchParams?.toString() || "");
    if (value) next.set(key, value);
    else next.delete(key);

    router.replace(`${window.location.pathname}?${next.toString()}`, {
      scroll: false,
    });
  }

  function clearAll() {
    // ✅ CHANGE (EN): Clear ALL local states.
    setSearch("");
    setMetricKey(METRICS[0].key);
    setYear("none");
    setAgeGroup("none");
    setGender("none");

    // ✅ Keep existing URL cleanup behavior
    router.replace(window.location.pathname, { scroll: false });
  }

  // Notify parent on change with a short debounce
  useEffect(() => {
    const id = setTimeout(() => {
      // ✅ CHANGE (EN): In "Unified Trend" tab, send ONLY year + fixed metric/valueType.
      // This ensures unified chart is driven only by year selection.
      if (isUnifiedTrendTab) {
        onFiltersChange?.({
          year,
          metric: "total_population",
          valueType: "number",
        });
      } else {
        onFiltersChange?.({
          search,
          metric: metricKey,
          year,
          ageGroup,
          gender,
          valueType,
        });
      }
    }, 100);

    return () => clearTimeout(id);
  }, [
    isUnifiedTrendTab, // ✅ CHANGE (EN)
    search,
    metricKey,
    year,
    ageGroup,
    gender,
    valueType,
    onFiltersChange,
  ]);

  return (
    <div className="p-0">
      <Card
        className="h-fit border border-slate-200 dark:border-slate-700 bg-card"
        dir="rtl"
      >
        <CardHeader>
          <div className="flex flex-col items-center gap-4 w-full mb-2">
            <div className="w-full text-center border-b border-slate-100 dark:border-slate-700 pb-3">
              <CardTitle className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
                סינון ופילטרים
              </CardTitle>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full px-1">
              <Button
                type="button"
                variant={view === "filters" ? "default" : "outline"}
                size="lg"
                className="w-full justify-center rounded-full py-2.5 text-base font-semibold shadow-sm transition-all border border-transparent hover:border-slate-300 dark:hover:border-slate-600 data-[state=active]:shadow-lg"
                onClick={() => setView("filters")}
              >
                <SlidersHorizontal className="w-4 h-4 ml-2" />
                סינון
              </Button>
              <Button
                type="button"
                variant={view === "population" ? "default" : "outline"}
                size="lg"
                className="w-full justify-center rounded-full py-2.5 text-base font-semibold shadow-sm transition-all border border-transparent hover:border-slate-300 dark:hover:border-slate-600 data-[state=active]:shadow-lg"
                onClick={() => setView("population")}
              >
                <Users className="w-4 h-4 ml-2" />
                אוכלוסיה
              </Button>
            </div>

            <div className="w-full px-1 mt-3">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="w-full justify-center rounded-full py-2.5 text-base font-semibold shadow-sm transition-all border border-slate-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 text-slate-600 dark:text-slate-300"
                onClick={clearAll}
              >
                <RotateCcw className="w-4 h-4 ml-2" />
                נקה סינונים
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-7 pt-0">
          {view === "population" ? (
            <MetricSummaryPanel
              metricKey={selectedMetric.key}
              metricLabel={selectedMetric.label}
            />
          ) : (
            <>
              {/* ✅ CHANGE (EN): Hide "Search Authority" on Unified Trend tab */}
              {!isUnifiedTrendTab && (
                <div className="space-y-2">
                  <label className="text-sm font-medium dark:text-slate-300">
                    חיפוש רשות
                  </label>
                  <Input
                    value={search}
                    onChange={(e) =>
                      setSearch((e.target as HTMLInputElement).value)
                    }
                    placeholder="חיפוש"
                    className="h-11 text-base"
                  />
                </div>
              )}

              {/* ✅ CHANGE (EN):
                  - For Unified Trend tab: show ONLY Year selection (no Tabs, no population/group filters).
                  - For other tabs: keep the original UI unchanged.
              */}
              {isUnifiedTrendTab ? (
                <div className="space-y-3">
                  <div className="text-sm font-semibold dark:text-slate-200">
                    סינון לפי שנים
                  </div>

                  <Select
                    value={year}
                    onValueChange={(v) => {
                      setYear(v);

                      // ✅ CHANGE (EN): Update ONLY "year" query param for unified trend.
                      updateQueryParam("year", v === "none" ? "" : v);
                    }}
                  >
                    <SelectTrigger className="w-full justify-between text-right h-11 text-base">
                      <SelectValue placeholder="בחר שנה" />
                    </SelectTrigger>
                    <SelectContent position="popper" align="end">
                      <SelectItem
                        value="none"
                        className="text-right font-semibold"
                      >
                        ללא סינון (כל השנים)
                      </SelectItem>
                      {YEARS.map((y) => (
                        <SelectItem key={y} value={y} className="text-right">
                          {y}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                // ✅ Keep original behavior for all other tabs
                activeTab !== "trend" && (
                  <Tabs defaultValue="years" className="w-full" dir="rtl">
                    <TabsList className="grid grid-cols-3 gap-2 mb-5 bg-transparent p-0">
                      <TabsTrigger
                        value="years"
                        className="rounded-full text-base px-4 py-2.5 transition-all text-slate-500 dark:text-slate-400 border border-transparent hover:border-slate-300 dark:hover:border-slate-600 data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-600 data-[state=active]:shadow-lg"
                      >
                        שנים
                      </TabsTrigger>
                      <TabsTrigger
                        value="population"
                        className="rounded-full text-base px-4 py-2.5 transition-all text-slate-500 dark:text-slate-400 border border-transparent hover:border-slate-300 dark:hover:border-slate-600 data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-600 data-[state=active]:shadow-lg"
                      >
                        אוכלוסייה
                      </TabsTrigger>
                      <TabsTrigger
                        value="group"
                        className="rounded-full text-base px-4 py-2.5 transition-all text-slate-500 dark:text-slate-400 border border-transparent hover:border-slate-300 dark:hover:border-slate-600 data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-600 data-[state=active]:shadow-lg"
                      >
                        גיל ומין
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="years" className="space-y-3">
                      <div className="text-sm font-semibold dark:text-slate-200">
                        סינון לפי שנים
                      </div>
                      <Select
                        value={year}
                        onValueChange={(v) => {
                          setYear(v);
                          if (v !== "none") {
                            setAgeGroup("none");
                            setGender("none");
                            setMetricKey(METRICS[0].key);
                            updateQueryParam("year", v);
                            updateQueryParam("ageGroup", "");
                            updateQueryParam("gender", "");
                          } else {
                            updateQueryParam("year", "");
                          }
                        }}
                      >
                        <SelectTrigger className="w-full justify-between text-right h-11 text-base">
                          <SelectValue placeholder="בחר שנה" />
                        </SelectTrigger>
                        <SelectContent position="popper" align="end">
                          <SelectItem
                            value="none"
                            className="text-right font-semibold"
                          >
                            ללא סינון (כל השנים)
                          </SelectItem>
                          {YEARS.map((y) => (
                            <SelectItem key={y} value={y} className="text-right">
                              {y}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TabsContent>

                    <TabsContent value="population" className="space-y-3">
                      <div className="text-sm font-semibold dark:text-slate-200">
                        סינון לפי אוכלוסיה
                      </div>
                      <div className="space-y-2 text-sm">
                        {METRICS.map((metric) => (
                          <label
                            key={metric.key}
                            className="flex items-center gap-2 cursor-pointer dark:text-slate-300"
                          >
                            <input
                              type="radio"
                              name="metric"
                              value={metric.key}
                              checked={metricKey === metric.key}
                              onChange={() => {
                                setMetricKey(metric.key);
                                setYear("none");
                                updateQueryParam("year", "");
                              }}
                            />
                            <span>{metric.label}</span>
                          </label>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="group" className="space-y-3">
                      <div className="text-sm font-semibold dark:text-slate-200">
                        סינון לפי קבוצה
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <Select
                          value={ageGroup}
                          onValueChange={(v) => {
                            setAgeGroup(v);
                            if (v !== "none") {
                              setYear("none");
                              updateQueryParam("ageGroup", v);
                              updateQueryParam("year", "");
                            } else {
                              updateQueryParam("ageGroup", "");
                            }
                          }}
                        >
                          <SelectTrigger className="w-full justify-between text-right h-11 text-base">
                            <SelectValue placeholder="בחר קבוצת גיל" />
                          </SelectTrigger>
                          <SelectContent position="popper" align="end">
                            <SelectItem
                              value="none"
                              className="text-right font-semibold"
                            >
                              ללא סינון (כל הגילאים)
                            </SelectItem>
                            {AGE_GROUPS.map((ag) => (
                              <SelectItem
                                key={ag.value}
                                value={ag.value}
                                className="text-right"
                              >
                                {ag.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Select
                          value={gender}
                          onValueChange={(v) => {
                            setGender(v);
                            if (v !== "none") {
                              setYear("none");
                              updateQueryParam("gender", v);
                              updateQueryParam("year", "");
                            } else {
                              updateQueryParam("gender", "");
                            }
                          }}
                        >
                          <SelectTrigger className="w-full justify-between text-right h-11 text-base">
                            <SelectValue placeholder="בחר מגדר" />
                          </SelectTrigger>
                          <SelectContent position="popper" align="end">
                            <SelectItem
                              value="none"
                              className="text-right font-semibold"
                            >
                              ללא סינון (כולם)
                            </SelectItem>
                            {GENDERS.map((g) => (
                              <SelectItem
                                key={g.value}
                                value={g.value}
                                className="text-right"
                              >
                                {g.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </TabsContent>
                  </Tabs>
                )
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
