"use client";

import {useState} from "react";
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs";
import {BarChart3, Table2} from "lucide-react";
import FilterDropdown from "@/components/FilterDropdown";
import GlilElectricityTable from "@/components/dataexplorer/GlilElectricityTable";
import BarChartCard from "@/components/authorities/BarChartCard";
type Option = {label: string; value: string};

type Props = {
  personalSegmentionOprtions: Option[];
  contentTypeOptions: Option[];
  yearsOptions: Option[];
  tableHeaders: string[];
  tableRows: (string | number)[][];
};

function buildChartTitle(year: string, mainSplit: string) {
  return `אנשים בעלי מוגבלות תפקודית חמורה (סה״כ אנשים) בשנת ${year} באשכול גליל מזרחי, בפילוח לפי ${mainSplit}`;
}

export default function DataExplorerClient({
  personalSegmentionOprtions,
  contentTypeOptions,
  yearsOptions,
  tableHeaders,
  tableRows,
}: Props) {
  const [mainSplit, setMainSplit] = useState("מדד");
  const [contentType, setContentType] = useState<"number" | "percent">("number");
  const [year, setYear] = useState("2023");

  return (
    <Tabs defaultValue="bar" className="flex flex-col flex-1 w-full">
      {/* Top bar */}
      <div
        dir="rtl"
        className="
          w-full
          grid
          grid-cols-1
          gap-3
          items-end
          mb-4
          shrink-0
          sm:grid-cols-2
          md:flex
          md:items-end
          md:justify-start
          md:gap-3
        ">
        <div className="sm:col-span-2 md:col-auto">
          <TabsList className="w-full flex justify-center gap-2 p-1 rounded-xl bg-muted md:w-auto">
            <TabsTrigger value="bar" className="group rounded-lg flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden group-data-[state=active]:inline">גרף</span>
            </TabsTrigger>

            <TabsTrigger value="table" className="group rounded-lg flex items-center gap-2">
              <Table2 className="w-4 h-4" />
              <span className="hidden group-data-[state=active]:inline">טבלה</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <FilterDropdown
          className="w-full md:w-50"
          label="פילוח ראשי"
          value={mainSplit}
          onChange={setMainSplit}
          options={[{label: "מדד", value: "מדד"}, ...personalSegmentionOprtions]}
        />

        <FilterDropdown
          className="w-full md:w-50"
          label="סוג ערך"
          value={contentType}
          onChange={(v) => setContentType(v as "number" | "percent")}
          options={contentTypeOptions}
        />

        <FilterDropdown
          className="w-full md:w-50"
          label="שנת נתונים"
          value={year}
          onChange={setYear}
          options={yearsOptions}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0">
        <TabsContent value="bar" className="h-30 ">
          <div className="h-full min-h-150 border rounded-xl p-4">
            <BarChartCard
              title={buildChartTitle(year, mainSplit)}
              rows={[
                {label: "2019", value: 70},
                {label: "2020", value: 25},
                {label: "2021", value: 50},
              ]}
              valueKind={contentType} // "number" | "percent"
              tickStep={25}
              yLabel={contentType === "percent" ? "אחוזים" : "כמות"}
              xLabel="שנה"
            />
          </div>
        </TabsContent>

        <TabsContent value="table" className="h-full m-0">
          <div className="h-full min-h-150 border rounded-xl flex justify-center p-4">
            <GlilElectricityTable headers={tableHeaders} rows={tableRows} className="m-10" />
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
}
