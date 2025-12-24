"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function MetricSummaryPanel() {
  return (
    <Card className="h-full">
      <CardContent className="p-6 space-y-6">

        {/* כותרת + מספר גדול */}
        <div className="text-center space-y-2">
          <div className="text-sm text-muted-foreground">
            אוכלוסיה בשנת 2023 באשכול
          </div>
          <div className="text-4xl font-bold">
            195,778
          </div>
        </div>

        {/* תת כותרת */}
        <div className="text-center text-sm text-muted-foreground">
          בחירת רשויות האשכול<br />
          מספר רשויות שנבחרו: 18
        </div>

        {/* כפתורים */}
        <div className="flex justify-center gap-2">
          <Button variant="outline">ניקוי</Button>
          <Button>סינון מורחב</Button>
        </div>

        {/* חיפוש */}
        <div className="space-y-2">
          <Input placeholder="חיפוש" />
        </div>

        {/* רשימת רשויות – placeholder */}
        <div className="border rounded-md p-2 text-sm text-muted-foreground">
          כאן תיכנס רשימת רשויות עם checkbox
        </div>

      </CardContent>
    </Card>
  )
}
