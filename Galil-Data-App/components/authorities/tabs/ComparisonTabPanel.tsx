"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import ComparisonChart from "@/components/authorities/ComparisonChart";

type Filters = {
  search?: string;
  metric?: string;
  year?: string;
  ageGroup?: string;
  gender?: string;
  valueType?: string;
};

export default function ComparisonTabPanel({ filters }: { filters?: Filters }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div>
      {/* Chart Container */}
      <div className="mt-4">
        <div className={`h-145 w-full rounded-2xl border p-4 flex flex-col ${
          isDark ? "bg-gray-800" : "bg-white"
        }`}>
          <ComparisonChart filters={filters} />
        </div>
      </div>
    </div>
  );
}
