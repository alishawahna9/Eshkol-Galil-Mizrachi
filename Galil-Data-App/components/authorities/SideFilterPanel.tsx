"use client";

import React, { useState, useEffect } from "react";
import { MetricSummaryPanel } from "./MetricSummaryPanel";
import DomainFilter from "@/components/dataexplorer/DomainFilter";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// הגדרת המדדים: Key = שם השדה בטבלה, Label = מה רואה המשתמש
const METRICS = [
  { key: "total_population", label: "אוכלוסיה" },
  { key: "jews_and_others", label: "אוכלוסיה – יהודים ואחרים" },
  { key: "arabs", label: "אוכלוסיה – ערבים" },
  { key: "muslims", label: "אוכלוסיה – מוסלמים" },
];

export function SideFilterPanel({ onFiltersChange }: { onFiltersChange?: (f: { domain?: string; search?: string; metric?: string }) => void }) {
  // אנו שומרים ב-State את המפתח האמיתי (למשל 'total_population')
  const [selectedKey, setSelectedKey] = useState<string>(METRICS[0].key);

  // domain + search state עבור הפילטרים
  const [domain, setDomain] = useState<string>("localAuthorities");
  const [search, setSearch] = useState<string>("");

  // חישוב המדד שנבחר כדי להעביר גם את הלייבל שלו לקומפוננטה
  const selectedMetric = METRICS.find((m) => m.key === selectedKey) || METRICS[0];

  // Debounced notify: notify parent 100ms אחרי שינוי אחרון
  useEffect(() => {
    const id = setTimeout(() => {
      console.log('SideFilterPanel: notify parent', { domain, search, metric: selectedKey });
      onFiltersChange?.({ domain, search, metric: selectedKey });
    }, 100);
    return () => clearTimeout(id);
  }, [domain, search, selectedKey, onFiltersChange]);

  function handleDomainChange(d: string) {
    console.log('SideFilterPanel: domain changed handler', d);
    setDomain(d);
  }

  return (
    <div className="p-6">
      <Card className="h-fit">
        <CardHeader>
          <CardTitle>בחירת מדד</CardTitle>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="metric" dir="rtl" className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="metric">בחירת מדד</TabsTrigger>
              <TabsTrigger value="filters">בחירת רשויות</TabsTrigger>
            </TabsList>

            <TabsContent value="metric" className="space-y-6">
              {/* אנו מעבירים כעת שני דברים: את המפתח לנתונים, ואת השם לתצוגה */}
              <MetricSummaryPanel 
                metricKey={selectedMetric.key} 
                metricLabel={selectedMetric.label} 
              />
            </TabsContent>

            <TabsContent value="filters" className="space-y-6">
              <div><DomainFilter active={domain as any} onChange={(d) => handleDomainChange(d)} /></div>
              <Button variant="outline" className="w-full">+ מסננים נוספים</Button>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">חיפוש</label>
                <Input value={search} onChange={(e) => setSearch((e.target as HTMLInputElement).value)} placeholder="חיפוש" />
              </div>

              <div className="space-y-3 text-sm">
                <div className="font-medium">בחירת מדד לתחקור</div>

                {/* יצירת כפתורי הרדיו בלולאה (נקי ומסודר) */}
                {METRICS.map((metric) => (
                  <label key={metric.key} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="metric"
                      value={metric.key}
                      checked={selectedKey === metric.key}
                      onChange={() => setSelectedKey(metric.key)}
                    />
                    <span>{metric.label}</span>
                  </label>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}