"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { X } from "lucide-react";

// Dynamically import AuthoritiesMap to avoid SSR issues with Leaflet
const AuthoritiesMap = dynamic(() => import("@/components/authorities/AuthoritiesMap"), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full">טוען מפה...</div>
});

type PopRow = { authority: string; year: number; value: number };

export default function MapTab({ tableComponent, onSelectAuthority, selectedAuthority, filters }: { tableComponent?: React.ReactNode; onSelectAuthority?: (name: string | null) => void; selectedAuthority?: string | null; filters?: { search?: string; metric?: string; year?: string; valueType?: string; ageGroup?: string; gender?: string } }) {
  const sp = useSearchParams();
  const [availableAuthorities, setAvailableAuthorities] = useState<string[]>([]);

  const year = useMemo(() => {
    // Use filter year if available, otherwise fallback to URL param or 2023
    const filterYear = filters?.year;
    if (filterYear) {
      const y = Number(filterYear);
      return Number.isFinite(y) ? y : 2023;
    }
    const raw = sp?.get("year") || "2023";
    const y = Number(raw);
    return Number.isFinite(y) ? y : 2023;
  }, [sp, filters?.year]);

  useEffect(() => {
    // Reset selection when year changes
    onSelectAuthority?.(null);
  }, [year, onSelectAuthority]);

  // Fetch available authorities based on current filters
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters?.search) params.set("search", filters.search);
    if (filters?.metric) params.set("metric", filters.metric);
    if (filters?.year) params.set("year", filters.year);
    if (filters?.ageGroup) params.set("ageGroup", filters.ageGroup);
    if (filters?.gender) params.set("gender", filters.gender);

    fetch(`/api/authorities?${params.toString()}`)
      .then((res) => res.json())
      .then((data: any[]) => {
        const names = data.map((item) => item.name);
        setAvailableAuthorities(names);
      })
      .catch((e) => {
        console.error("Failed to fetch authorities for map", e);
        setAvailableAuthorities([]);
      });
  }, [filters?.search, filters?.metric, filters?.year, filters?.ageGroup, filters?.gender]);

  return (
    <div className="w-full h-full" dir="rtl">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[520px_1fr] h-123">
        {/* Table */}
        <div className="rounded-xl bg-background p-3 flex flex-col h-full overflow-hidden">
          {/* Show current selection and allow clearing it */}
          {selectedAuthority ? (
            <div className="mb-4 flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-md border border-gray-200 flex-none">
              <span className="text-sm font-semibold text-gray-800 flex-1">
                📌 {selectedAuthority}
              </span>
              <button
                onClick={() => onSelectAuthority?.(null)}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                aria-label="נקה סינון"
              >
                <X className="w-4 h-4" />
                <span>נקה</span>
              </button>
            </div>
          ) : null}

          {/* Render injected table component (from page) or show a fallback */}
          {tableComponent ? (
            <div className="flex-1 min-h-0">{tableComponent}</div>
          ) : (
            <div>
              <div className="mb-2 font-semibold text-sm">אוכלוסייה בשנת {year} — כל הרשויות</div>
              <div className="text-sm text-muted-foreground">טבלת הרשויות לא הועמדה כאן</div>
            </div>
          )}
        </div>

        {/* Map */}
        <div className="rounded-xl overflow-hidden border">
          <AuthoritiesMap
            key={selectedAuthority}
            selectedAuthority={selectedAuthority}
            onSelectAuthority={(name) => onSelectAuthority?.(name)}
            availableAuthorities={availableAuthorities}
          />
        </div>
      </div>
    </div>
  );
}
