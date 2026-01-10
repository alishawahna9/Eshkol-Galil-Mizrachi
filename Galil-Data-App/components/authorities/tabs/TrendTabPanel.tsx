"use client";

import { useState } from "react";
import TrendChartWithData from "@/components/authorities/TrendChartWithData";
import AuthoritiesTopFilterBar from "@/components/authorities/AuthoritiesTopFilterBar";

type Props = {
  selectedAuthority?: string | null;
};

export default function TrendTabPanel({
  selectedAuthority,
}: Props) {
  const [filters, setFilters] = useState<{ domain?: string; search?: string; metric?: string; year?: string; valueType?: string }>(
    {
      domain: "localAuthorities",
      search: "",
      metric: "total_population",
      year: "",
      valueType: "number",
    }
  );

  return (
    <div>
      <AuthoritiesTopFilterBar />
      <div className="h-[520px] w-full mt-4">
        <TrendChartWithData
          selectedAuthority={selectedAuthority}
          filters={filters}
        />
      </div>
    </div>
  );
}
