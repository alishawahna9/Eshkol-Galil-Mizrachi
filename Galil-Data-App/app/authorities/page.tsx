"use client"

import { MetricSummaryPanel } from "./components/MetricSummaryPanel"
import DomainFilter from "@/components/ui/DomainFilter"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function Page() {
  return (
    <div className="p-6">
      {/* RTL grid: ימין = פאנל, שמאל = תוכן */}
      <div className="grid grid-cols-[360px_1fr] gap-6 items-start">

        {/* פאנל מאוחד – ימין */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>בחירת מדד</CardTitle>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="metric" dir="rtl" className="w-full">

              {/* לשוניות */}
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="metric">בחירת מדד</TabsTrigger>
                <TabsTrigger value="filters">בחירת רשויות</TabsTrigger>
              </TabsList>

              {/* לשונית: בחירת מדד */}
              <TabsContent value="metric" className="space-y-6">
                <MetricSummaryPanel />
              </TabsContent>

              {/* לשונית: בחירת רשויות / סינונים */}
              <TabsContent value="filters" className="space-y-6">

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

        {/* תוכן גדול – שמאל */}
        <div className="rounded-xl border bg-muted min-h-[600px]" />

      </div>
    </div>
  )
}
