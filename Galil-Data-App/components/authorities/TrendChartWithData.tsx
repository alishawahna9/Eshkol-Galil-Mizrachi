"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import TrendChartCard from "@/components/ui/TrendChartCard";

type Point = { x: number | string; y: number };
type Series = { name: string; points: Point[] };

type Props = {
  selectedAuthority?: string | null;
  filters?: { domain?: string; search?: string; metric?: string; year?: string; valueType?: string };
};

export default function TrendChartWithData({ selectedAuthority, filters }: Props) {
  const searchParams = useSearchParams();
  const valueType = (filters?.valueType ?? searchParams?.get("valueType") ?? "number") as "number" | "percent";
  const metric = filters?.metric ?? searchParams?.get("metric") ?? "total_population";
  
  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Build query params
        const params = new URLSearchParams();
        params.set("startYear", "2003");
        params.set("endYear", "2023");

        const effectiveMetric = metric;
        const effectiveDomain = filters?.domain ?? searchParams.get("domain");
        const effectiveSearch = filters?.search ?? searchParams.get("search");

        if (effectiveMetric) params.set("metric", effectiveMetric);
        if (effectiveDomain) params.set("domain", effectiveDomain);
        if (effectiveSearch) params.set("search", effectiveSearch);
        
        // If a specific authority is selected, fetch only that one
        if (selectedAuthority) {
          params.set("authorities", selectedAuthority);
        } else {
          // Otherwise, fetch top 10 authorities by default
          params.set("limit", "10");
        }
        
        const response = await fetch(`/api/authorities/trend?${params.toString()}`);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP ${response.status}`);
        }
        
        const data = await response.json();
        
        if (Array.isArray(data)) {
          // If valueType is percent, convert values to percentages
          if (valueType === "percent" && data.length > 0) {
            // Calculate total for each year across all series
            const yearTotals = new Map<number, number>();
            
            data.forEach((s: Series) => {
              s.points.forEach((p) => {
                const year = typeof p.x === "string" ? parseInt(p.x, 10) : p.x;
                const current = yearTotals.get(year) || 0;
                yearTotals.set(year, current + p.y);
              });
            });
            
            // Convert to percentages
            const convertedData = data.map((s: Series) => ({
              ...s,
              points: s.points.map((p) => {
                const year = typeof p.x === "string" ? parseInt(p.x, 10) : p.x;
                const total = yearTotals.get(year) || 1;
                return {
                  ...p,
                  y: Math.round((p.y / total) * 100 * 10) / 10, // Round to 1 decimal
                };
              }),
            }));
            
            setSeries(convertedData);
          } else {
            setSeries(data);
          }
        } else {
          setSeries([]);
        }
      } catch (err) {
        setError(String(err));
        setSeries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedAuthority, valueType, metric, filters?.domain, filters?.search]);

  if (metric !== "total_population") {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">מדד זה אינו נתמך לתצוגת מגמה. בחר מדד אוכלוסיה.</p>
      </div>
    );
  }

  const yLabel = valueType === "percent" ? "אחוז" : "אנשים";
  const valueUnit = valueType === "percent" ? "אחוזים" : "אנשים";
  const title = `מגמת הרשויות שנבחרו במדד אוכלוסיה (${valueUnit}) בשנים 2003 - 2023`;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">טוען נתונים...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">שגיאה בטעינת הנתונים: {error}</p>
      </div>
    );
  }

  return (
    <TrendChartCard
      className="h-full"
      title={title}
      subtitle={'קובץ רשויות מקומיות, למ"ס'}
      yLabel={yLabel}
      xLabel="שנה"
      series={series}
    />
  );
}

