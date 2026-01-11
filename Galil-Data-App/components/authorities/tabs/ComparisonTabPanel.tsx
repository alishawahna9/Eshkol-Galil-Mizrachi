"use client";

import { useState } from "react";
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
  return (
    <div>
      {/* Chart Container */}
      <div className="mt-4">
        <div className="h-145 w-full rounded-2xl bg-white border p-4 flex flex-col">
          <ComparisonChart filters={filters} />
        </div>
      </div>
    </div>
  );
}
