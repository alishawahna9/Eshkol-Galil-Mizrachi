"use client";

import BarChartCard from "@/components/ui/BarChartCard";

type Row = { label: string; value: number };

const rows: Row[] = [
  { label: "צפת", value: 39179 },
  { label: "קריית שמונה", value: 24254 },
  { label: "גולן", value: 21484 },
  { label: "הגליל העליון", value: 20881 },
  { label: "מרום הגליל", value: 16846 },
  { label: "מגדל שמס", value: 11235 },
  { label: "חצור הגלילית", value: 11061 },
  { label: "מבואות החרמון", value: 8827 },
  { label: "קצרין", value: 8043 },
];

export default function ComparisonChart() {
  const sorted = [...rows].sort((a, b) => a.value - b.value);

  return (
    <BarChartCard
      title='השוואת הרשויות במדד אוכלוסיה (אנשים) בשנת 2023'
      subtitle='קובץ רשויות מקומיות, למ"ס'
      yLabel="אנשים"
      seriesName="הכל"
      rows={sorted}
      valueKind="number"
      decimals={0}
      tickStep={2000}
      scrollable
      yAxisPosition="right"
      chartHeightClassName="h-[420px] md:h-[520px]"
    />
  );
}
