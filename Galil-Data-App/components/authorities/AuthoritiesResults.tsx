import { getAuthoritiesStats } from "@/lib/authorities-service"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"

// שים לב: הורדנו את "use client"
// הפונקציה הפכה להיות async כי היא מחכה לנתונים מהשרת
export default async function AuthoritiesResults() {
  // 1. שליפה ישירה מהדאטה-בייס (ללא קריאת fetch ל-API)
  // זה רץ בשרת בלבד, המשתמש לא רואה את הקריאה הזו ברשת
  const data = await getAuthoritiesStats()

  return (
    <div className="rounded-xl border bg-card p-2 shadow-sm h-full min-h-0 overflow-hidden">
      {/* Use project's ScrollArea for nicer scrollbar inside rounded container */}
      <div className="h-full">
        <ScrollArea className="h-full rounded-[inherit]">
          <Table dir="rtl" className="table-fixed min-w-full">
            <colgroup>
              <col style={{ width: '70%' }} />
              <col style={{ width: '30%' }} />
            </colgroup>
            <TableCaption>רשימת רשויות ואוכלוסייה.</TableCaption>
            <TableHeader className="sticky">
              <TableRow className="border-b border-border">
                <TableHead className="text-right font-semibold sticky top-0 bg-card/90 backdrop-blur-sm z-20 whitespace-normal">שם הרשות</TableHead>
                <TableHead className="text-right font-semibold sticky top-0 bg-card/90 backdrop-blur-sm z-20 whitespace-normal">אוכלוסייה כוללת</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* 2. אין צורך בבדיקת Loading כי הדף לא נשלח עד שהנתונים מוכנים */}
              
              {data.length > 0 ? (
                data.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell className="font-medium whitespace-normal break-words">{item.name}</TableCell>
                    <TableCell className="whitespace-normal break-words">{item.totalPopulation.toLocaleString()}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="h-24 text-center">
                    לא נמצאו תוצאות.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  )
}