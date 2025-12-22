"use client";

import { useState } from "react";
import { FilterBar } from "./FilterBar";

export default function StatsFilterBar() {
  const [region, setRegion] = useState("national");
  const [compare, setCompare] = useState("none");
  const [valueType, setValueType] = useState("number");
  const [year, setYear] = useState("2023");

  return (
    <FilterBar
      filters={[
        {
          key: "region",
          placeholder: "אזור",
          value: region,
          onChange: setRegion,
          options: [
            { value: "national", label: "ארצי" },
            { value: "district", label: "מחוז" },
            { value: "city", label: "עיר" },
          ],
        },
        {
          key: "compare",
          placeholder: "נקודת השוואה",
          value: compare,
          onChange: setCompare,
          width: "w-[160px]",
          options: [
            { value: "none", label: "ללא השוואה" },
            { value: "with", label: "עם השוואה" },
          ],
        },
        {
          key: "valueType",
          placeholder: "סוג ערך",
          value: valueType,
          onChange: setValueType,
          options: [
            { value: "number", label: "מספר" },
            { value: "percent", label: "אחוז" },
            { value: "index", label: "מדד" },
          ],
        },
        {
          key: "year",
          placeholder: "שנה",
          value: year,
          onChange: setYear,
          width: "w-[90px]",
          options: [
            { value: "2024", label: "2024" },
            { value: "2023", label: "2023" },
            { value: "2022", label: "2022" },
          ],
        },
      ]}
    />
  );
}
