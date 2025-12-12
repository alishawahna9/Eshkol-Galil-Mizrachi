import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"

const data = [
  { name: "צפת", value: 39179 },
  { name: "קריית שמונה", value: 24254 },
  { name: "גליל עליון", value: 21484 },
  { name: "הגליל התחתון", value: 20881 },
  { name: "מרום הגליל", value: 16846 },
  { name: "מגדל שמס", value: 11235 },
  { name: "חצור הגלילית", value: 11061 },
  { name: "מבואות החרמון", value: 8827 },
  { name: "קצרין", value: 8043 },
  { name: "טובא-זנגריה", value: 7109 },
]

const maxValue = Math.max(...data.map(d => d.value))

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 p-6 flex justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-right">
            פירוט רשויות
          </CardTitle>
        </CardHeader>

        <CardContent>
          <ScrollArea className="h-[360px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">שם הרשות</TableHead>
                  <TableHead className="text-right">ערך</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data.map((row) => {
                  const percent = (row.value / maxValue) * 100

                  return (
                    <TableRow key={row.name}>
                      <TableCell className="text-right whitespace-nowrap">
                        {row.name}
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex items-center gap-3">
                          <span className="w-16 text-sm">
                            {row.value.toLocaleString()}
                          </span>
                          <Progress
                            value={percent}
                            className="h-2 flex-1"
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </main>
  )
}
