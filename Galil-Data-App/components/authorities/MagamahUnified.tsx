"use client";

/**
 * EN DOC:
 * - Unified Trend tab uses TrendUnifiedChart (real data).
 * - We do NOT use the old fake TrendChart in this tab anymore.
 */

import TrendUnifiedChart from "@/components/authorities/TrendUnifiedChart";

export default function MagamahUnified() {
  return (
    <div dir="rtl" className="w-full h-full p-4">
      <TrendUnifiedChart />
    </div>
  );
}
