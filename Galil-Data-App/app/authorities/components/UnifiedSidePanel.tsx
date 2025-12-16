"use client";

import {useState} from "react";
import {Card, CardHeader, CardContent} from "@/components/ui/card";
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs";
import {MetricSummaryPanel} from "./MetricSummaryPanel";
import DomainFilter from "@/app/dataexplorer/components/DomainFilter";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

export function UnifiedSidePanel() {
  const [tab, setTab] = useState<"metric" | "authorities">("metric");

  return (
    <Card className="h-fit" dir="rtl">
      <CardHeader>
        <Tabs value={tab} onValueChange={(v) => setTab(v as any)}>
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="metric">בחירת מדד</TabsTrigger>
            <TabsTrigger value="authorities">בחירת רשויות</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>

      <CardContent>
        <Tabs value={tab}>
          <TabsContent value="metric">
            <MetricSummaryPanel />
          </TabsContent>

          <TabsContent value="authorities" className="space-y-6">
            <div>
              <h3 className="mb-2 font-semibold">סינון תחום</h3>
              <DomainFilter />
            </div>

            <Button variant="outline" className="w-full">
              + מסננים נוספים
            </Button>

            <div className="space-y-2">
              <label className="text-sm font-medium">חיפוש</label>
              <Input placeholder="חיפוש" />
            </div>

            <div className="space-y-3 text-sm">
              <div className="font-medium">בחירת מדד לתחקור</div>

              <label className="flex items-center gap-2">
                <input type="radio" name="metric" defaultChecked />
                <span>אוכלוסיה</span>
              </label>

              <label className="flex items-center gap-2">
                <input type="radio" name="metric" />
                <span>אוכלוסיה – יהודים ואחרים</span>
              </label>

              <label className="flex items-center gap-2">
                <input type="radio" name="metric" />
                <span>אוכלוסיה – ערבים</span>
              </label>

              <label className="flex items-center gap-2">
                <input type="radio" name="metric" />
                <span>אוכלוסיה – מוסלמים</span>
              </label>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
