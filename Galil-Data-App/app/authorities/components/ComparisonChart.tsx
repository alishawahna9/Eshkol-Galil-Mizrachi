"use client";

import BarChartCard from "@/components/ui/BarChartCard";

type Row = { label: string; value: number };

const mockRows: Row[] = [
  { label: "צפת", value: 39179 },
  { label: "קרית שמונה", value: 24254 },
  { label: "גולן", value: 21484 },
  { label: "הגליל העליון", value: 20881 },
  { label: "מרום הגליל", value: 16846 },
  { label: "מגדל שנס", value: 11235 },
  { label: "חצור הגלילית", value: 11061 },
  { label: "מבואות החרמון", value: 8827 },
  { label: "קצרין", value: 8043 },
];

export default function ComparisonChart() {
  // sort ascending by value so chart goes from smallest (left) to biggest (right)
  const rows = mockRows
    .map((r) => ({ label: r.label, value: r.value }))
    .sort((a, b) => a.value - b.value);

  return (
    <div className="h-full w-full flex flex-col">
      <BarChartCard
        title={`השוואת הרשויות במדד אוכלוסיה (אנשים) בשנת 2023`}
        subtitle={"קבוצת רשויות מקומיות, ל-מ\"ס"}
        xLabel={"Year"}
        yLabel={"אנשים"}
        seriesName="הכל"
        rows={rows}
        valueKind="number"
        decimals={0}
        tickStep={2000}
        chartHeightClassName="flex-1"
        yAxisPosition="right"
        scrollable={true}
        noYScroll={true}
        className="flex-1"
      />
    </div>
  );
}
