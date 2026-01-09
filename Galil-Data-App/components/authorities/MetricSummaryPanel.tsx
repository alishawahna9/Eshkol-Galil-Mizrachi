"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// עדכון ה-Interface לקבלת שני הפרמטרים
export interface MetricSummaryPanelProps {
  metricKey: string;   // שם השדה האמיתי (למשל: 'total_population')
  metricLabel: string; // שם לתצוגה (למשל: 'אוכלוסיה')
}

export function MetricSummaryPanel({ metricKey, metricLabel }: MetricSummaryPanelProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-6 space-y-6">

        <div className="text-center space-y-2">
          <div className="text-sm text-muted-foreground">
            {/* שימוש בלייבל לתצוגה */}
            {metricLabel} בשנת 2023 באשכול
          </div>
          
          <div className="text-4xl font-bold">
            {/* כאן בעתיד תשתמש ב-metricKey כדי לשלוף את המספר הנכון מהדאטה */}
            {/* לדוגמה: data[metricKey] */}
            195,778
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          בחירת רשויות האשכול<br />
          מספר רשויות שנבחרו: 18
        </div>

        <div className="flex justify-center gap-2">
          <Button variant="outline">ניקוי</Button>
          <Button>סינון מורחב</Button>
        </div>

        <div className="space-y-2">
          <Input placeholder="חיפוש" />
        </div>

        <div className="border rounded-md p-2 text-sm text-muted-foreground">
          כאן תיכנס רשימת רשויות עם checkbox
        </div>

      </CardContent>
    </Card>
  )
}