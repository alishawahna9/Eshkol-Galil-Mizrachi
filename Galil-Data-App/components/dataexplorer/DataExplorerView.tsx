"use client";

// Main interactive data explorer: filters + chart/table view
import { useEffect, useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Table2, FileDown } from "lucide-react";

import FilterDropdown from "@/components/FilterDropdown";
import GlilElectricityTable from "@/components/dataexplorer/GlilElectricityTable";
import BarChartCard from "@/components/authorities/BarChartCard";
import InsightsPanel from "@/components/dataexplorer/InsightsPanel";
import { exportDataExplorerReport } from "@/components/dataexplorer/export-dataexplorer";
import {
  buildWomenDataExplorerResult,
  buildMenDataExplorerResult,
  buildPeopleDataExplorerResult,
  buildGenderDistributionResult,
  ValueKind,
  TopGenderApiResponse,
} from "@/components/dataexplorer/dataexplorer-service";
// Simple option type for the dropdowns
type Option = { label: string; value: string };

// Props passed from the page: options for the three filters
type Props = {
  splitOptions: Option[];
  statusOptions: Option[];
  contentTypeOptions: Option[];
};

export default function DataExplorerView({
  splitOptions,
  statusOptions,
  contentTypeOptions,
}: Props) {
  // Local UI state for the selected year / split / value type
  // splitBy נשמר רק לטובת ממשק המשתמש, המדד היחיד הוא נשים
  const [splitBy, setSplitBy] = useState<string>(
    splitOptions[0]?.value ?? "top_women"
  );
  const [municipalStatus, setMunicipalStatus] = useState<string>("all");
  const [valueKind, setValueKind] = useState<ValueKind>("number");
  const [genderData, setGenderData] = useState<TopGenderApiResponse | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the API; re-run whenever the municipalStatus filter changes.
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const qs =
          municipalStatus && municipalStatus !== "all"
            ? `?status=${encodeURIComponent(municipalStatus)}`
            : "";
        const res = await fetch(`/api/dataexplorer${qs}`);
        if (!res.ok) {
          throw new Error("Failed to load data explorer");
        }
        const json = (await res.json()) as TopGenderApiResponse;
        if (!cancelled) {
          setGenderData(json);
          setError(null);
        }
      } catch {
        if (!cancelled) {
          setError("שגיאה בטעינת הנתונים");
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [municipalStatus]);

  // Reset filters back to the default selection
  function clearFilters() {
    setSplitBy(splitOptions[0]?.value ?? "top_women");
    setMunicipalStatus("all");
    setValueKind("number");
  }

  // Export current chart/table to Excel file
  function exportCurrentReport() {
    if (!result || !genderData) return;
    exportDataExplorerReport({ result, genderData, splitBy });
  }

  // Recalculate chart/table data whenever filters change
  const result = useMemo(() => {
    if (!genderData) return null;

    // Resolve the human-readable label for the selected municipal status
    const currentStatus = statusOptions.find(
      (opt) => opt.value === municipalStatus
    );
    const municipalStatusLabel =
      currentStatus && currentStatus.value !== "all"
        ? currentStatus.label
        : undefined;

    // Special metric: gender distribution (two bars: women vs men)
    if (splitBy === "gender_distribution") {
      return buildGenderDistributionResult(
        genderData.women,
        genderData.men,
        valueKind,
        municipalStatusLabel
      );
    }

    if (splitBy === "top_men") {
      return buildMenDataExplorerResult(
        genderData.men,
        valueKind,
        municipalStatusLabel
      );
    }

    if (splitBy === "top_people") {
      return buildPeopleDataExplorerResult(
        genderData.people,
        valueKind,
        municipalStatusLabel
      );
    }

    // Default metric: women
    return buildWomenDataExplorerResult(
      genderData.women,
      valueKind,
      municipalStatusLabel
    );
  }, [genderData, splitBy, valueKind, municipalStatus, statusOptions]);

  return (
    // Tabs between chart view and table view
    <Tabs defaultValue="bar" className="flex flex-col flex-1 w-full">
      {/* Filter card: title, clear button, and three dropdowns */}
      <Card dir="rtl" className="w-full mt-6 mb-4 mx-auto">
        <CardHeader className="pb-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CardTitle className="text-base font-bold">תפריט סינון</CardTitle>
            <aside className="mr-1 flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="cursor-pointer"
                onClick={clearFilters}
              >
                נקה סינון
              </Button>
              <Button
                type="button"
                variant="default"
                size="sm"
                className="cursor-pointer gap-2"
                onClick={exportCurrentReport}
              >
                <FileDown className="w-4 h-4" />
                ייצא דוח
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
              className="w-5/6 md:w-72"
              label="בחירת מדד"
              value={splitBy}
              onChange={(v) => {
                setSplitBy(v);
              }}
              options={splitOptions}
            />

            {/* Filter: municipal status (city / local council / regional council) */}
            <FilterDropdown
              className="w-full md:w-72"
              label="מעמד מוניציפלי"
              value={municipalStatus}
              onChange={(v) => {
                setMunicipalStatus(v);
              }}
              options={statusOptions}
            />

            {/* Filter: choose value kind (number / percent) */}
            <FilterDropdown
              className="w-full md:w-72"
              label="סוג ערך"
              value={valueKind}
              onChange={(v) => {
                setValueKind(v as ValueKind);
              }}
              options={contentTypeOptions}
            />
          </div>
        </CardContent>
      </Card>

      {/* Insights Panel */}
      {genderData && (
        <InsightsPanel genderData={genderData} splitBy={splitBy} />
      )}

      <div className="flex-1 min-h-0">
        <TabsContent value="bar">
          {/* Bar chart view (main visualization) */}
          <div className="h-full min-h-150 w-full rounded-xl flex p-4">
            {/* BarChartCard renders the chart based on the calculated result */}
            {result ? (
              <BarChartCard
                title={result.title}
                rows={result.rows}
                valueKind={valueKind}
                tickStep={result.tickStep}
                yLabel={result.yLabel}
                xLabel={result.xLabel}
                cardClassName="w-full"
                cardContentClassName="h-[520px] p-3"
              />
            ) : (
              <div className="w-full flex items-center justify-center text-sm text-muted-foreground">
                {error ?? "טוען נתונים..."}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="table" className="h-full m-0">
          {/* Table view */}
          <div className="h-full min-h-150 rounded-xl flex justify-center p-4">
            {result ? (
              <GlilElectricityTable
                title={result.title}
                headers={result.tableHeaders}
                rows={result.tableRows}
                className="m-10"
                tableClassName="min-w-[700px] min-h-[300px]"
                enableSearch={true}
                searchPlaceholder="חיפוש ברשויות..."
              />
            ) : (
              <div className="w-full flex items-center justify-center text-sm text-muted-foreground">
                {error ?? "טוען נתונים..."}
              </div>
            )}
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
}
