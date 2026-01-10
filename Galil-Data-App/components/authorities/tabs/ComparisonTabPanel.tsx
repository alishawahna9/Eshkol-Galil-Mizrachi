"use client";

import { useState } from "react";
import ComparisonChart from "@/components/authorities/ComparisonChart";
import AuthoritiesTopFilterBar from "@/components/authorities/AuthoritiesTopFilterBar";

type Props = {};

export default function ComparisonTabPanel() {
  const [filters, setFilters] = useState<{ domain?: string; search?: string; metric?: string; year?: string; valueType?: string }>({ domain: "", search: "", metric: "", year: "", valueType: "" });

  return (
    <div>
      <AuthoritiesTopFilterBar />
      <div className="h-[520px] w-full mt-4 flex flex-col">
        <ComparisonChart filters={filters} />
      </div>
    </div>
  );
}
