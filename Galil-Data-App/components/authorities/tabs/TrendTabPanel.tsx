"use client";

import { useTheme } from "next-themes";
import TrendChartWithData from "@/components/authorities/TrendChartWithData";

type Props = {
  selectedAuthority?: string | null;
  filters?: { search?: string; metric?: string; year?: string; valueType?: string; ageGroup?: string; gender?: string };
};

export default function TrendTabPanel({
  selectedAuthority,
  filters,
}: Props) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Prepare filters for TrendChartWithData - add domain and ensure all required fields
  const trendFilters = {
    domain: "localAuthorities",
    search: filters?.search || "",
    metric: filters?.metric || "total_population",
    year: filters?.year || "",
    valueType: filters?.valueType || "number",
  };

  return (
    <div>
      <div className="mt-4">
        <div className={`h-145 w-full rounded-2xl border p-4 ${
          isDark ? "bg-gray-800" : "bg-white"
        }`}>
          <TrendChartWithData
            selectedAuthority={selectedAuthority}
            filters={trendFilters}
          />
        </div>
      </div>
    </div>
  );
}
