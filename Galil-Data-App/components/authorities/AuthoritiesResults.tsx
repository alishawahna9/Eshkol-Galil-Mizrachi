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

export default function AuthoritiesResults({ filters, selectedAuthority }: { filters?: { domain?: string; search?: string; metric?: string; year?: string; valueType?: string }, selectedAuthority?: string | null }) {
  const [data, setData] = useState<{ name: string; totalPopulation: number; metricValue: number; arabsCount?: number; muslimsCount?: number }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const METRIC_LABELS: Record<string, string> = {
    total_population: "אוכלוסייה כוללת",
    jews_and_others: "אוכלוסיה – יהודים ואחרים",
    arabs: "אוכלוסיה – ערבים",
    muslims: "אוכלוסיה – מוסלמים",
  };
  const metricLabel = METRIC_LABELS[filters?.metric ?? "total_population"] || "מדד";

  useEffect(() => {
    const params = new URLSearchParams();
    const searchParam = selectedAuthority ?? filters?.search;
    if (searchParam) params.set("search", searchParam);
    if (filters?.domain) params.set("domain", filters.domain);
    if (filters?.metric) params.set("metric", filters.metric);
    if ((filters as any)?.year) params.set("year", (filters as any).year);
    if ((filters as any)?.valueType) params.set("valueType", (filters as any).valueType);

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
  }, [filters?.search, filters?.domain, filters?.metric, filters?.year, filters?.valueType, selectedAuthority]);

  return (
    <div className="rounded-xl border bg-white p-2 shadow-sm h-full min-h-0 overflow-hidden text-foreground">
      {/* Use project's ScrollArea for nicer scrollbar inside rounded container */}
      <div className="h-full">
        <ScrollArea className="h-full rounded-[inherit] bg-white">
          <Table dir="rtl" className="table-fixed min-w-full">
            {/* when metric === 'arabs' we show two numeric columns: Arabs and Muslims */}
            {filters?.metric === "arabs" ? (
              <colgroup>
                <col style={{ width: '56%' }} />
                <col style={{ width: '22%' }} />
                <col style={{ width: '22%' }} />
              </colgroup>
            ) : (
              <colgroup>
                <col style={{ width: '70%' }} />
                <col style={{ width: '30%' }} />
              </colgroup>
            )}

            <TableCaption>רשימת רשויות ואוכלוסייה.</TableCaption>
            <TableHeader className="sticky">
              <TableRow className="border-b border-border">
                <TableHead className="text-right font-semibold sticky top-0 bg-white/95 backdrop-blur-sm z-20 whitespace-normal">שם הרשות</TableHead>
                {filters?.metric === "arabs" ? (
                  <>
                    <TableHead className="text-right font-semibold sticky top-0 bg-white/95 backdrop-blur-sm z-20 whitespace-normal">ערבים</TableHead>
                    <TableHead className="text-right font-semibold sticky top-0 bg-white/95 backdrop-blur-sm z-20 whitespace-normal">מוסלמים</TableHead>
                  </>
                ) : (
                  <TableHead className="text-right font-semibold sticky top-0 bg-white/95 backdrop-blur-sm z-20 whitespace-normal">{metricLabel}</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={filters?.metric === "arabs" ? 3 : 2} className="h-24 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="size-4 animate-spin text-primary" />
                      <span className="text-sm text-muted-foreground">טוען…</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={filters?.metric === "arabs" ? 3 : 2} className="h-24 text-center">{error}</TableCell>
                </TableRow>
              ) : data.length > 0 ? (
                data.map((item) => (
                  <TableRow key={item.name} className={selectedAuthority && item.name === selectedAuthority ? "bg-sky-50" : ""}>
                    <TableCell className="font-medium whitespace-normal">{item.name}</TableCell>
                    {filters?.metric === "arabs" ? (
                      <>
                        <TableCell className="whitespace-normal">{(item.arabsCount ?? 0).toLocaleString()}</TableCell>
                        <TableCell className="whitespace-normal">{(item.muslimsCount ?? 0).toLocaleString()}</TableCell>
                      </>
                    ) : (
                      <TableCell className="whitespace-normal">{item.metricValue.toLocaleString()}</TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={filters?.metric === "arabs" ? 3 : 2} className="h-24 text-center">לא נמצאו תוצאות.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
}