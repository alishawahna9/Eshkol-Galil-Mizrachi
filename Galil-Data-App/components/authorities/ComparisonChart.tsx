"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import BarChartCard from "@/components/authorities/BarChartCard";

type Row = { label: string; value: number };


const METRIC_LABELS: Record<string, string> = {
  total_population: "אוכלוסיה",
  jews_and_others: "אוכלוסיה – יהודים ואחרים",
  arabs: "אוכלוסיה – ערבים",
  muslims: "אוכלוסיה – מוסלמים",
};

export default function ComparisonChart({ filters }: { filters?: { domain?: string; search?: string; metric?: string; year?: string; valueType?: string; ageGroup?: string; gender?: string } }) {
  const isMobile = useIsMobile();
  const searchParams = useSearchParams();
  const yearParam = filters?.year ?? searchParams?.get("year");
  const year = (yearParam && yearParam !== "none" && !isNaN(parseInt(yearParam, 10)))
    ? parseInt(yearParam, 10)
    : 2023;
  const valueType = (filters?.valueType || searchParams?.get("valueType") || "number") as "number" | "percent";
  const metric = filters?.metric || searchParams?.get("metric") || "total_population";

  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        params.set('year', String(year));
        params.set('limit', '18'); // Show all available Eastern Galilee authorities
        if (metric) params.set('metric', metric);
        if (filters?.search) params.set('search', filters.search);
        if (filters?.ageGroup) params.set('ageGroup', filters.ageGroup);
        if (filters?.gender) params.set('gender', filters.gender);

        const response = await fetch(`/api/authorities/comparison?${params.toString()}`);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setRows(data);
        } else {
          setRows([]);
        }
      } catch (err) {
        setError(String(err));
        setRows([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [year, metric, filters?.search, filters?.ageGroup, filters?.gender]);

  // Transform rows based on valueType (convert to percentages if needed)
  const transformedRows = useMemo(() => {
    if (valueType === "percent" && rows.length > 0) {
      const total = rows.reduce((sum, row) => sum + row.value, 0);
      if (total > 0) {
        return rows.map((row) => ({
          ...row,
          value: Math.round((row.value / total) * 100 * 10) / 10, // Round to 1 decimal
        }));
      }
    }
    return rows;
  }, [rows, valueType]);

  // Sort by value descending for display (biggest bars on the left)
  const sorted = [...transformedRows].sort((a, b) => b.value - a.value);
  if (isMobile) {
    return (
      <div className="flex items-center justify-center h-80">
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-lg font-semibold text-muted-foreground mb-2">
            Charts not available on mobile
          </p>
          <p className="text-sm text-muted-foreground">
            Please use the desktop version to view the graphs
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-80">
        <p className="text-muted-foreground">טוען נתונים...</p>
      </div>
    );
  }

  if (error && rows.length === 0) {
    return (
      <div className="flex items-center justify-center h-80">
        <p className="text-red-500">שגיאה בטעינת הנתונים: {error}</p>
      </div>
    );
  }

  const valueKind = valueType === "percent" ? "percent" : "number";
  const yLabel = valueType === "percent" ? "אחוז" : "אנשים";
  const valueUnit = valueType === "percent" ? "אחוזים" : "אנשים";
  const metricLabel = METRIC_LABELS[metric] || "מדד";

  // Build title with filter information
  let title = `השוואת הרשויות במדד ${metricLabel} (${valueUnit}) בשנת ${year}`;
  if (filters?.ageGroup && filters.ageGroup !== 'none') {
    const ageLabels: Record<string, string> = {
      '0_4': '0-4', '5_9': '5-9', '10_14': '10-14', '15_19': '15-19',
      '20_29': '20-29', '30_44': '30-44', '45_59': '45-59', '60_64': '60-64', '65_plus': '65+'
    };
    title += ` - קבוצת גיל: ${ageLabels[filters.ageGroup] || filters.ageGroup}`;
  }
  if (filters?.gender && filters.gender !== 'none') {
    const genderLabels: Record<string, string> = { 'men': 'גברים', 'women': 'נשים' };
    title += ` - מגדר: ${genderLabels[filters.gender] || filters.gender}`;
  }

  return (
    <div className="w-full h-full">
      <div className="py-1 mb-2 text-base font-bold text-foreground">{title}</div>
      <div className="w-full overflow-x-auto h-full">
        <div className="min-w-[1500px]"> {/* Minimum width for 18 bars with proper label spacing */}
          <BarChartCard
            title=""
            xLabel="רשות"
            yLabel={yLabel}
            rows={sorted}
            valueKind={valueKind}
            tickStep={valueType === "percent" ? 10 : 2000}
            variant="bare"
            cardClassName="w-full"
            cardContentClassName="h-120 p-2"
          />
        </div>
      </div>
    </div>
  );
}