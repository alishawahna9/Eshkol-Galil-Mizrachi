"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import AuthoritiesMap from "@/components/authorities/AuthoritiesMap";

type PopRow = { authority: string; year: number; value: number };

export default function MapTab() {
  const sp = useSearchParams();


  const year = useMemo(() => {
    const raw = sp.get("year") || "2023";
    const y = Number(raw);
    return Number.isFinite(y) ? y : 2023;
  }, [sp]);

  const [selectedAuthority, setSelectedAuthority] = useState<string | null>(null);
  const [rows, setRows] = useState<PopRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

   useEffect(() => {
    setSelectedAuthority(null);
  }, [year]);


  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        params.set("year", String(year));
        if (selectedAuthority) params.set("authority", selectedAuthority);

        const res = await fetch(`/api/population?${params.toString()}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          const j = await res.json().catch(() => ({}));
          throw new Error(j?.error || "Failed to load population data");
        }

        const j = await res.json();
        setRows(j.data || []);
      } catch (e: any) {
        setRows([]);
        setError(e?.message ?? "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [year, selectedAuthority]);

  return (
    <div className="w-full h-full" dir="rtl">
      <div className="mb-2 text-xs text-muted-foreground">
        השנה לפי ה-URL: year={year}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[520px_1fr] h-[470px]">
        {/* Table */}
        <div className="rounded-xl border bg-background p-3 overflow-auto">
          <div className="mb-2 font-semibold text-sm">
            אוכלוסייה בשנת {year}
            {selectedAuthority ? ` — ${selectedAuthority}` : " — כל הרשויות"}
          </div>

          {loading ? <div className="text-sm text-muted-foreground">טוען…</div> : null}
          {error ? <div className="text-sm text-red-600">{error}</div> : null}

          <div className="rounded-md border overflow-auto max-h-[400px]">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-background">
                <tr className="border-b">
                  <th className="p-2 text-right">שם הרשות</th>
                  <th className="p-2 text-left">אוכלוסייה</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={`${r.authority}-${r.year}`} className="border-b">
                    <td className="p-2">{r.authority}</td>
                    <td className="p-2 text-left">{r.value.toLocaleString("he-IL")}</td>
                  </tr>
                ))}

                {!loading && !error && rows.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="p-2 text-muted-foreground">
                      אין נתונים לשנה {year}
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>

        {/* Map */}
        <div className="rounded-xl overflow-hidden border">
          <AuthoritiesMap
            selectedAuthority={selectedAuthority}
            onSelectAuthority={(name) => setSelectedAuthority(name)}
          />
        </div>
      </div>
    </div>
  );
}
