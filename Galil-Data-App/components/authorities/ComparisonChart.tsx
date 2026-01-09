"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import BarChartCard from "@/components/authorities/BarChartCard";

type Row = { label: string; value: number };

// Fallback data in case DB fetch fails
const fallbackRows: Row[] = [
  { label: "צפת", value: 39179 },
  { label: "קריית שמונה", value: 24254 },
  { label: "גולן", value: 21484 },
  { label: "הגליל העליון", value: 20881 },
  { label: "מרום הגליל", value: 16846 },
  { label: "מגדל שמס", value: 11235 },
  { label: "חצור הגלילית", value: 11061 },
  { label: "מבואות החרמון", value: 8827 },
  { label: "קצרין", value: 8043 },
];

export default function ComparisonChart() {
  const searchParams = useSearchParams();
  const yearParam = searchParams?.get("year");
  const year = yearParam ? parseInt(yearParam, 10) : 2023;
  const valueType = (searchParams?.get("valueType") || "number") as "number" | "percent";
  
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/api/authorities/comparison?year=${year}`);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP ${response.status}`);
        }
        
        const data = await response.json();
        
        if (Array.isArray(data) && data.length > 0) {
          setRows(data);
        } else {
          setRows(fallbackRows);
        }
      } catch (err) {
        setError(String(err));
        setRows(fallbackRows);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [year]);

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

  // Sort by value ascending for display
  const sorted = [...transformedRows].sort((a, b) => a.value - b.value);

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
  const title = `השוואת הרשויות במדד אוכלוסיה (${valueUnit}) בשנת ${year}`;

  return (
    <BarChartCard
      title={title}
      xLabel="רשות"
      yLabel={yLabel}
      rows={sorted}
      valueKind={valueKind}
      tickStep={valueType === "percent" ? 10 : 2000}
    />
  );
}