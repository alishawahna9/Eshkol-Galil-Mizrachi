"use client";

import { useState } from "react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BarChart3, Table2, LineChart } from "lucide-react";

import SideFilterPanel from "@/app/authorities/components/SideFilterPanel";
import ChatBot from "@/components/chatbot";
import TopNav from "@/components/topnav";
import FilterDropdown from "@/components/ui/FilterDropdown";

export default function DataExplorerPage() {
  const [mainSplit, setMainSplit] = useState("מדד");
  const [contentType, setContentType] = useState("מספרי");
  const [year, setYear] = useState("2023");
  const personalSegmentionOprtions = [
    { label: "מגדר", value: "gender" },
    { label: "גיל", value: "age" },
    { label: "מצב משפחתי", value: "family_status" },
    { label: "דת", value: "religion" },
  ];
  const contentTypeOptions = [
    { label: "מספרי", value: "number" },
    { label: "אחוזים", value: "percentage" },
  ];
  const yearsOptions = [
    { label: "2021", value: "y2021" },
    { label: "2022", value: "y2022" },
    { label: "2023", value: "y2023" },
  ];

  function handleYearChange(value: string) {
    setYear(value);
  }

  function handleContentTypeChange(value: string) {
    setContentType(value);
  }

  function handlePersonalSegmentationChange(value: string) {
    setMainSplit(value);
  }
  return (
    <>
      <TopNav />

      <main dir="rtl" className="px-6 py-4">
        <div
          className="
            mx-auto
            grid
            grid-cols-[minmax(360px,400px)_1fr]
            gap-8
            items-stretch
          "
        >
          {/* SIDE FILTER – RIGHT */}
          <aside className="w-full">
            <SideFilterPanel />
          </aside>

          {/* MAIN CONTENT – LEFT */}
          <section className="w-full min-w-0 flex flex-col">
            <Tabs defaultValue="bar" className="flex flex-col flex-1 w-full">
              {/* TOP BAR: Tabs + Select (RIGHT aligned) */}
              <div dir="rtl" className="w-full flex items-end justify-start gap-3 mb-4 shrink-0">
                <TabsList className="flex gap-2 bg-muted p-1 rounded-lg">
                  <TabsTrigger value="bar">
                    <BarChart3 className="w-4 h-4" />
                  </TabsTrigger>

                  <TabsTrigger value="table">
                    <Table2 className="w-4 h-4" />
                  </TabsTrigger>

                  <TabsTrigger value="line">
                    <LineChart className="w-4 h-4" />
                  </TabsTrigger>
                </TabsList>
                {/* Personal Segmentation Dropdown */}
                <FilterDropdown
                  label="פילוח ראשי"
                  value={mainSplit}
                  onChange={handlePersonalSegmentationChange}
                  options={personalSegmentionOprtions}
                />
                <FilterDropdown
                  label="סוג ערך"
                  value={contentType}
                  onChange={handleContentTypeChange}
                  options={contentTypeOptions}
                />
                <FilterDropdown
                  label="שנת נתונים"
                  value={year}
                  onChange={handleYearChange}
                  options={yearsOptions}
                />  
              </div>

              {/* CONTENT */}
              <div className="flex-1 min-h-0">
                <TabsContent value="bar" className="h-full m-0">
                  <div className="h-full min-h-[600px] border rounded-xl flex items-center justify-center">
                    כאן יוצג גרף עמודות
                  </div>
                </TabsContent>

                <TabsContent value="table" className="h-full m-0">
                  <div className="h-full min-h-[600px] border rounded-xl flex items-center justify-center">
                    כאן תוצג טבלה
                  </div>
                </TabsContent>

                <TabsContent value="line" className="h-full m-0">
                  <div className="h-full min-h-[600px] border rounded-xl flex items-center justify-center">
                    כאן יוצג גרף קו
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </section>
        </div>
      </main>

      <ChatBot />
    </>
  );
}
