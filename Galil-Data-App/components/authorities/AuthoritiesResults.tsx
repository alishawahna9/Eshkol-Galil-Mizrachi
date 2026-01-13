"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";

type Filters = {
  search?: string;
  metric?: string;
  year?: string;
  valueType?: string;
  ageGroup?: string;
  gender?: string;
};

export default function AuthoritiesResults({ filters, selectedAuthority }: { filters?: Filters; selectedAuthority?: string | null }) {
  const [data, setData] = useState<{ name: string; totalPopulation: number; metricValue: number; arabsCount?: number; muslimsCount?: number }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const METRIC_LABELS: Record<string, string> = {
    total_population: "אוכלוסייה כוללת",
    jews_and_others: "יהודים ואחרים",
    arabs: "אוכלוסיה – ערבים",
    muslims: "אוכלוסיה – מוסלמים",
  };
  const metricLabel = METRIC_LABELS[filters?.metric ?? "total_population"] || "מדד";

  useEffect(() => {
    const params = new URLSearchParams();
    const searchParam = selectedAuthority ?? filters?.search;
    if (searchParam) params.set("search", searchParam);
    if (filters?.metric) params.set("metric", filters.metric);
    if ((filters as any)?.year) params.set("year", (filters as any).year);
    if ((filters as any)?.valueType) params.set("valueType", (filters as any).valueType);
    if (filters?.ageGroup) params.set("ageGroup", filters.ageGroup);
    if (filters?.gender) params.set("gender", filters.gender);

    setLoading(true);
    setError(null);

    fetch(`/api/authorities?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((d) => setData(Array.isArray(d) ? d : []))
      .catch((e) => {
        console.error("Failed to fetch authorities", e);
        setError("נכנסה שגיאה בקריאת הנתונים");
        setData([]);
      })
      .finally(() => setLoading(false));
  }, [filters?.search, filters?.domain, filters?.metric, filters?.year, filters?.valueType, filters?.ageGroup, filters?.gender, selectedAuthority]);

  return (
    <div className="rounded-xl border bg-white p-2 shadow-sm h-full min-h-0 overflow-hidden text-foreground flex flex-col">
      {/* Header outside ScrollArea so it stays fixed */}
      <table dir="rtl" className="table-fixed min-w-full">
        <colgroup>
          <col style={{ width: '70%' }} />
          <col style={{ width: '30%' }} />
        </colgroup>
        <thead>
          <tr className="border-b border-border bg-white">
            <th className="text-right font-semibold whitespace-normal p-2">שם הרשות</th>
            {filters?.metric === "arabs" ? (
              <th className="text-right font-semibold whitespace-normal p-2">ערבים</th>
            ) : filters?.metric === "muslims" ? (
              <th className="text-right font-semibold whitespace-normal p-2">מוסלמים</th>
            ) : (
              <th className="text-right font-semibold whitespace-normal p-2">{metricLabel}</th>
            )}
          </tr>
        </thead>
      </table>

      {/* Scrollable content */}
      <div className="h-full min-h-0 overflow-auto flex-1">
        <ScrollArea className="h-full rounded-[inherit] bg-white">
          <Table dir="rtl" className="table-fixed min-w-full">
            {/* Show one column for metric */}
            <colgroup>
              <col style={{ width: '70%' }} />
              <col style={{ width: '30%' }} />
            </colgroup>

            <TableCaption>רשימת רשויות ואוכלוסייה.</TableCaption>
            <TableHeader>
              <TableRow className="border-b border-border" style={{display: 'none'}}>
                <TableHead className="text-right font-semibold whitespace-normal">שם הרשות</TableHead>
                {filters?.metric === "arabs" ? (
                  <TableHead className="text-right font-semibold sticky top-0 bg-white/95 backdrop-blur-sm z-20 whitespace-normal">ערבים</TableHead>
                ) : filters?.metric === "muslims" ? (
                  <TableHead className="text-right font-semibold sticky top-0 bg-white/95 backdrop-blur-sm z-20 whitespace-normal">מוסלמים</TableHead>
                ) : (
                  <TableHead className="text-right font-semibold sticky top-0 bg-white/95 backdrop-blur-sm z-20 whitespace-normal">{metricLabel}</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={2} className="h-24 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="size-4 animate-spin text-primary" />
                      <span className="text-sm text-muted-foreground">טוען…</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={2} className="h-24 text-center">{error}</TableCell>
                </TableRow>
              ) : data.length > 0 ? (
                data.map((item) => (
                  <TableRow key={item.name} className={selectedAuthority && item.name === selectedAuthority ? "bg-sky-50" : ""}>
                    <TableCell className="font-medium whitespace-normal">{item.name}</TableCell>
                    {filters?.metric === "arabs" ? (
                      <TableCell className="whitespace-normal">{(item.arabsCount ?? 0).toLocaleString()}</TableCell>
                    ) : filters?.metric === "muslims" ? (
                      <TableCell className="whitespace-normal">{(item.muslimsCount ?? 0).toLocaleString()}</TableCell>
                    ) : (
                      <TableCell className="whitespace-normal">{item.metricValue.toLocaleString()}</TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="h-24 text-center">לא נמצאו תוצאות.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
}