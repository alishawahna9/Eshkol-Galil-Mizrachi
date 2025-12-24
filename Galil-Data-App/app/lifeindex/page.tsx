"use client";

/* ======================================================
   🔴 FAKE DATA STUB – REPLACE THIS WITH REAL DATA LATER
   ====================================================== */

// Filter options
const METRICS = [
  {value: "all", label: "הכל"},
  {value: "quality", label: "מדד איכות חיים"},
  {value: "satisfaction", label: "שביעות רצון"},
];

const AGE_GROUPS = [
  {value: "all", label: "הכל"},
  {value: "18-30", label: "18-30"},
  {value: "31-50", label: "31-50"},
  {value: "51+", label: "51+"},
];

const RELIGION = [
  {value: "all", label: "הכל"},
  {value: "secular", label: "חילונים"},
  {value: "religious", label: "דתיים"},
  {value: "orthodox", label: "חרדים"},
];

const POPULATION = [
  {value: "all", label: "הכל"},
  {value: "jewish", label: "יהודים"},
  {value: "arab", label: "ערבים"},
];

// Chart stub data (PowerBI replacement point)
const LIFE_INDEX_CHART = {
  labels: [
    "רווחה אישית וחברתית",
    "שירותים",
    "שירותי הבריאות",
    "תעסוקה",
    "תחבורה",
    "השכלה גבוהה",
    "חינוך",
    "דיור ותשתיות",
    "בריאות",
  ],
  values: [56, 46, 42, 41, 36, 31, 25, 20, 16],
};

/* ====================================================== */

import {useMemo, useState} from "react";
import TopNav from "@/components/topnav";
import ChatBot from "@/components/chatbot";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs";
import {Button} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import {Bar} from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

/* ------------------ helper ------------------ */

function FilterDropdown({
  label,
  items,
  value,
  onChange,
}: {
  label: string;
  items: {value: string; label: string}[];
  value: string;
  onChange: (v: string) => void;
}) {
  const active = items.find((i) => i.value === value)?.label ?? label;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-40 justify-between">
          {active}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {items.map((item) => (
          <DropdownMenuItem key={item.value} onClick={() => onChange(item.value)}>
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ------------------ page ------------------ */

export default function LifeIndexPage() {
  const [metric, setMetric] = useState("all");
  const [age, setAge] = useState("all");
  const [religion, setReligion] = useState("all");
  const [population, setPopulation] = useState("all");

  // 🔴 Chart wiring – this is where real data will flow in
  const barData: ChartData<"bar"> = useMemo(
    () => ({
      labels: LIFE_INDEX_CHART.labels,
      datasets: [
        {
          label: "אחוז",
          data: LIFE_INDEX_CHART.values,
          backgroundColor: "#4fc3e8",
          borderRadius: 6,
        },
      ],
    }),
    [metric, age, religion, population]
  );

  const barOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {legend: {display: false}},
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {callback: (v) => `${v}%`},
      },
    },
  };

  return (
    <>
      <TopNav />

      <div dir="rtl" className="container mx-auto py-8 text-right">
        <h1 className="text-2xl font-bold text-center mb-6">מדד איכות חיים - אשכול גליל מזרחי</h1>

        <Tabs defaultValue="current">
          {/* RTL content container */}
          <div className="pr-6">
            <TabsList className="flex flex-row-reverse justify-end gap-4 mb-6" dir="ltr">
              <TabsTrigger value="current">זרקור</TabsTrigger>
              <TabsTrigger value="comparison">השוואה לסקר חברתי</TabsTrigger>
              <TabsTrigger value="research">תחקור</TabsTrigger>
            </TabsList>

            <TabsContent value="current">
              <div className="flex flex-row-reverse flex-wrap justify-end gap-4 mb-8">
                <FilterDropdown label="מדד" items={METRICS} value={metric} onChange={setMetric} />
                <FilterDropdown
                  label="קבוצת גיל"
                  items={AGE_GROUPS}
                  value={age}
                  onChange={setAge}
                />
                <FilterDropdown
                  label="מידת דתיות"
                  items={RELIGION}
                  value={religion}
                  onChange={setReligion}
                />
                <FilterDropdown
                  label="קבוצת אוכלוסייה"
                  items={POPULATION}
                  value={population}
                  onChange={setPopulation}
                />
              </div>
              <Card className="max-w-7xl mx-auto">
                <CardHeader>
                  <CardTitle>מדד איכות חיים לפי תחום</CardTitle>
                </CardHeader>
                <CardContent className="h-90">
                  <Bar data={barData} options={barOptions} />
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      <ChatBot />
    </>
  );
}
