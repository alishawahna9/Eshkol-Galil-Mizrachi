"use client";

import MagamahUnified from "@/components/authorities/MagamahUnified";
import AuthoritiesTopFilterBar from "@/components/authorities/AuthoritiesTopFilterBar";

export default function TrendUnifiedTabPanel() {
  return (
    <div>
      <AuthoritiesTopFilterBar />
      <div className="h-[520px] w-full mt-4 flex items-center justify-center p-4">
        <MagamahUnified />
      </div>
    </div>
  );
}
