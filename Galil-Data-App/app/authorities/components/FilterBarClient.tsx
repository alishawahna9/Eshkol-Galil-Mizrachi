"use client";

import { useState } from "react";
import { FilterBar } from "./FilterBar";

export default function FilterBarClient() {
  const [region, setRegion] = useState("national");
  const [compare, setCompare] = useState("none");
  const [valueType, setValueType] = useState("number");
  const [year, setYear] = useState("2023");

  return (
    <FilterBar
      region={region}
      onRegionChange={setRegion}
      compare={compare}
      onCompareChange={setCompare}
      valueType={valueType}
      onValueTypeChange={setValueType}
      year={year}
      onYearChange={setYear}
    />
  );
}
