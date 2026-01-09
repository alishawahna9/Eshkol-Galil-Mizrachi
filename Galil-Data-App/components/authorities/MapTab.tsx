"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import AuthoritiesMap from "@/components/authorities/AuthoritiesMap";

type PopRow = { authority: string; year: number; value: number };

export default function MapTab({ tableComponent, onSelectAuthority, selectedAuthority, filters }: { tableComponent?: React.ReactNode; onSelectAuthority?: (name: string | null) => void; selectedAuthority?: string | null; filters?: { domain?: string; search?: string; metric?: string } }) {
  const sp = useSearchParams();


  const year = useMemo(() => {
    const raw = sp.get("year") || "2023";
    const y = Number(raw);
    return Number.isFinite(y) ? y : 2023;
  }, [sp]);

   useEffect(() => {
    // Reset selection when year changes
    onSelectAuthority?.(null);
  }, [year, onSelectAuthority]);

  // Note: population fetching was removed because the new table component handles its own data
  // The Map now receives selection from parent (page) and notifies via onSelectAuthority
  

  return (
    <div className="w-full h-full" dir="rtl">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[520px_1fr] h-[470px]">
        {/* Table */}
        <div className="rounded-xl bg-background p-3 overflow-auto">
          {/* Show current selection and allow clearing it */}
          {selectedAuthority ? (
            <div className="flex items-center justify-between mb-2">
              <div className="mb-2 font-semibold text-sm">מוגבל ל: {selectedAuthority}</div>
              <button onClick={() => onSelectAuthority?.(null)} className="text-sm text-muted-foreground underline">נקה בחירה</button>
            </div>
          ) : null}

          {/* Render injected table component (from page) or show a fallback */}
          {tableComponent ? (
            <div className="h-full">{tableComponent}</div>
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
            selectedAuthority={selectedAuthority}
            onSelectAuthority={(name) => onSelectAuthority?.(name)}
          />
        </div>
      </div>
    </div>
  );
}
