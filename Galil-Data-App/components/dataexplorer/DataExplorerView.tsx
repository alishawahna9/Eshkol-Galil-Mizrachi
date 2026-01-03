"use client";

// Main interactive data explorer: filters + chart/table view
import { useEffect, useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Table2 } from "lucide-react";

import FilterDropdown from "@/components/FilterDropdown";
import GlilElectricityTable from "@/components/dataexplorer/GlilElectricityTable";
import BarChartCard from "@/components/authorities/BarChartCard";

import {
  getDataExplorerResult,
  type SplitKey,
  type ValueKind,
  type Year,
  type FakeDataPoint,
} from "@/components/dataexplorer/dataexplorer-service";

// Simple option type for the dropdowns
type Option = { label: string; value: string };

// Props passed from the page: options for the three filters
type Props = {
  splitOptions: Option[];
  contentTypeOptions: Option[];
  yearsOptions: Option[];
};

export default function DataExplorerView({
  splitOptions,
  contentTypeOptions,
  yearsOptions,
}: Props) {
  // Local UI state for the selected year / split / value type
  const [year, setYear] = useState<Year>("2023");
  const [splitBy, setSplitBy] = useState<SplitKey>("דת");
  const [valueKind, setValueKind] = useState<ValueKind>("number");

  // Women-by-authority data (loaded once from the API when needed)
  const [womenData, setWomenData] = useState<FakeDataPoint[] | null>(null);

  const isWomenMode = splitBy === "נשים לפי רשות";

  // Reset filters back to the default selection
  function clearFilters() {
    setYear("2022");
    setSplitBy("גיל");
    setValueKind("percent");
  }

  // Load women-by-authority dataset once on first entry to that mode
  useEffect(() => {
    if (!isWomenMode || womenData) return;

    async function loadWomen() {
      try {
        const res = await fetch("/api/dataexplorer/women");
        if (!res.ok) return;
        const json = (await res.json()) as FakeDataPoint[];
        setWomenData(json);
      } catch (e) {
        console.error("Failed to load women data", e);
      }
    }

    loadWomen();
  }, [isWomenMode, womenData]);

  // Recalculate chart/table data whenever filters (or women data) change
  const result = useMemo(() => {
    if (isWomenMode) {
      const data = womenData ?? [];
      return getDataExplorerResult(
        { year: "2023", splitBy, valueKind },
        data
      );
    }

    return getDataExplorerResult({ year, splitBy, valueKind });
  }, [year, splitBy, valueKind, isWomenMode, womenData]);

  return (
    // Tabs between chart view and table view
    <Tabs defaultValue="bar" className="flex flex-col flex-1 w-full">
      {/* Filter card: title, clear button, and three dropdowns */}
      <Card dir="rtl" className="w-8/9 mt-6 mb-4">
        <CardHeader className="pb-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CardTitle className="text-base font-bold">תפריט סינון</CardTitle>
            <aside className="mr-1">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="cursor-pointer"
                onClick={clearFilters}
              >
                נקה סינון
              </Button>
            </aside>
          </div>

          {/* Chart / table tabs in the same row as the filter title */}
          <TabsList className="flex justify-center gap-2 p-1 rounded-xl bg-muted">
            <TabsTrigger
              value="bar"
              className="group rounded-lg flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden group-data-[state=active]:inline">
                גרף
              </span>
            </TabsTrigger>

            <TabsTrigger
              value="table"
              className="group rounded-lg flex items-center gap-2"
            >
              <Table2 className="w-4 h-4" />
              <span className="hidden group-data-[state=active]:inline">
                טבלה
              </span>
            </TabsTrigger>
          </TabsList>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Row of filter dropdowns (split, value type, year) */}
          <div
            className="
              w-full
              grid
              grid-cols-1
              gap-3
              items-end
              shrink-0
              sm:grid-cols-2
              md:flex
              md:items-end
              md:justify-start
              md:gap-3
            "
          >
            {/* Filter: choose how to split the data */}
            <FilterDropdown
              className="w-full md:w-50"
              label="בחירת מדד"
              value={splitBy}
              onChange={(v) => {
                setSplitBy(v as SplitKey);
              }}
              options={splitOptions}
            />

            {/* Filter: choose value kind (number / percent) */}
            <FilterDropdown
              className="w-full md:w-50"
              label="סוג ערך"
              value={valueKind}
              onChange={(v) => {
                setValueKind(v as ValueKind);
              }}
              options={contentTypeOptions}
            />

            {/* Filter: choose data year (hidden in women-by-authority mode) */}
            {!isWomenMode && (
              <FilterDropdown
                className="w-full md:w-50"
                label="שנת נתונים"
                value={year}
                onChange={(v) => {
                  setYear(v as Year);
                }}
                options={yearsOptions}
              />
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex-1 min-h-0">
        <TabsContent value="bar">
          {/* Bar chart view (main visualization) */}
          <div className="h-full min-h-150 w-8/9 rounded-xl flex p-4">
            {/* BarChartCard renders the chart based on the calculated result */}
            <BarChartCard
              title={result.title}
              rows={result.rows}
              valueKind={valueKind}
              tickStep={result.tickStep}
              yLabel={result.yLabel}
              xLabel={result.xLabel}
              cardClassName="w-full"
            />
          </div>
        </TabsContent>

        <TabsContent value="table" className="h-full m-0">
          {/* Table view */}
          <div className="h-full min-h-150 rounded-xl flex justify-center p-4">
            <GlilElectricityTable
              headers={result.tableHeaders}
              rows={result.tableRows}
              className="m-10"
              tableClassName="min-w-[700px] min-h-[300px]"
            />
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
}
