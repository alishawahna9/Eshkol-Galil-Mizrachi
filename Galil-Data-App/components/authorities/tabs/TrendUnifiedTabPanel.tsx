"use client";

import { useTheme } from "next-themes";
import MagamahUnified from "@/components/authorities/MagamahUnified";
import AuthoritiesTopFilterBar from "@/components/authorities/AuthoritiesTopFilterBar";

export default function TrendUnifiedTabPanel() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div>
      <div className="mt-4">
        <div className={`h-145 w-full rounded-2xl border p-4 flex items-center justify-center ${
          isDark ? "bg-gray-800" : "bg-white"
        }`}>
          <MagamahUnified />
        </div>
      </div>
    </div>
  );
}
