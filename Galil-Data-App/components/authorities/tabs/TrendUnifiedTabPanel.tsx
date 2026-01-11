"use client";

import MagamahUnified from "@/components/authorities/MagamahUnified";
import AuthoritiesTopFilterBar from "@/components/authorities/AuthoritiesTopFilterBar";

export default function TrendUnifiedTabPanel() {
  return (
    <div>
      <div className="mt-4">
        <div className="h-145 w-full rounded-2xl bg-white border p-4 flex items-center justify-center">
          <MagamahUnified />
        </div>
      </div>
    </div>
  );
}
