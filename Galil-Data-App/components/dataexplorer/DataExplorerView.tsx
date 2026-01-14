"use client";

// Main interactive data explorer: filters + chart/table view
import { useEffect, useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Table2, FileDown } from "lucide-react";

import DataExplorerFilters from "@/components/dataexplorer/DataExplorerFilters";
import DataExplorerChart from "@/components/dataexplorer/DataExplorerChart";
import DataExplorerTable from "@/components/dataexplorer/DataExplorerTable";
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
  scopeOptions: Option[];
  contentTypeOptions: Option[];
};

export default function DataExplorerView({
  splitOptions,
  statusOptions,
  scopeOptions,
  contentTypeOptions,
}: Props) {
  // Local UI state for the selected year / split / value type
  // splitBy נשמר רק לטובת ממשק המשתמש, המדד היחיד הוא נשים
  const [splitBy, setSplitBy] = useState<string>(
    splitOptions[0]?.value ?? "top_women"
  );
  const [municipalStatus, setMunicipalStatus] = useState<string>("all");
  const [clusterScope, setClusterScope] = useState<string>("cluster");
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
        // Build query parameters for API request
        const hasStatusFilter = municipalStatus && municipalStatus !== "all";
        const statusParam = hasStatusFilter
          ? `status=${encodeURIComponent(municipalStatus)}`
          : "";
        const scopeParam = `scope=${encodeURIComponent(clusterScope)}`;

        // Combine parameters
        const queryString = hasStatusFilter
          ? `?${statusParam}&${scopeParam}`
          : `?${scopeParam}`;

        // Fetch data from API
        const response = await fetch(`/api/dataexplorer${queryString}`);
        if (!response.ok) {
          throw new Error("Failed to load data explorer");
        }

        // Parse and update state
        const data = (await response.json()) as TopGenderApiResponse;
        if (!cancelled) {
          setGenderData(data);
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
  }, [municipalStatus, clusterScope]);

  // Reset filters back to the default selection
  function clearFilters() {
    setSplitBy(splitOptions[0]?.value ?? "top_women");
    setMunicipalStatus("all");
    setClusterScope("cluster");
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

    // Resolve the human-readable label for the selected cluster scope
    const currentScope = scopeOptions.find((opt) => opt.value === clusterScope);
    const clusterScopeLabel = currentScope ? currentScope.label : undefined;

    // Special metric: gender distribution (two bars: women vs men)
    if (splitBy === "gender_distribution") {
      return buildGenderDistributionResult(
        genderData.women,
        genderData.men,
        valueKind,
        municipalStatusLabel,
        clusterScopeLabel
      );
    }

    if (splitBy === "top_men") {
      return buildMenDataExplorerResult(
        genderData.men,
        valueKind,
        municipalStatusLabel,
        clusterScopeLabel
      );
    }

    if (splitBy === "top_people") {
      return buildPeopleDataExplorerResult(
        genderData.people,
        valueKind,
        municipalStatusLabel,
        clusterScopeLabel
      );
    }

    // Default metric: women
    return buildWomenDataExplorerResult(
      genderData.women,
      valueKind,
      municipalStatusLabel,
      clusterScopeLabel
    );
  }, [
    genderData,
    splitBy,
    valueKind,
    municipalStatus,
    statusOptions,
    clusterScope,
    scopeOptions,
  ]);

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
          <DataExplorerFilters
            splitBy={splitBy}
            municipalStatus={municipalStatus}
            clusterScope={clusterScope}
            valueKind={valueKind}
            splitOptions={splitOptions}
            statusOptions={statusOptions}
            scopeOptions={scopeOptions}
            contentTypeOptions={contentTypeOptions}
            onSplitByChange={setSplitBy}
            onMunicipalStatusChange={setMunicipalStatus}
            onClusterScopeChange={setClusterScope}
            onValueKindChange={setValueKind}
          />
        </CardContent>
      </Card>

      {/* Insights Panel */}
      {genderData && (
        <InsightsPanel
          genderData={genderData}
          splitBy={splitBy}
          municipalStatusLabel={
            statusOptions.find((opt) => opt.value === municipalStatus)?.label
          }
          clusterScopeLabel={
            scopeOptions.find((opt) => opt.value === clusterScope)?.label
          }
        />
      )}

      <div className="flex-1 min-h-0">
        <TabsContent value="bar">
          <DataExplorerChart
            result={result}
            valueKind={valueKind}
            error={error}
          />
        </TabsContent>
        <TabsContent value="table" className="h-full m-0">
          <DataExplorerTable result={result} error={error} />
        </TabsContent>
      </div>
    </Tabs>
  );
}
