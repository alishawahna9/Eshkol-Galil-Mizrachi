"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const triggerClass = cn(
  "relative rounded-none bg-transparent px-3 py-2 text-sm text-muted-foreground shadow-none",
  "data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary",
  "data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:bottom-0",
  "data-[state=active]:after:h-[2px] data-[state=active]:after:w-full data-[state=active]:after:bg-primary"
);

function FilterField({ label }: { label: string }) {
  return (
    <div className="grid grid-cols-[auto_minmax(160px,1fr)] items-center gap-4">
      <span className="text-sm text-muted-foreground whitespace-nowrap">
        {label}
      </span>

      <select
        dir="rtl"
        className="h-10 w-full min-w-40 rounded-md border bg-background px-3 text-sm text-right outline-none focus:ring-2 focus:ring-ring"
      >
        <option>הכל</option>
        <option>אפשרות 1</option>
        <option>אפשרות 2</option>
      </select>
    </div>
  );
}

export default function TopFilterBar() {
  return (
    <section dir="rtl" className="w-full">
      {/* פס כחול דק למעלה */}
      <div className="h-1.5 w-full bg-linear-to-b from-blue-200/80 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 pt-4">
        {/* כותרת */}
        <div className="flex justify-end">
          <h1 className="text-2xl font-semibold text-foreground">
            מדד איכות חיים - אשכול גליל מזרחי - קיץ 2023
          </h1>
        </div>

        {/* Tabs */}
        <div className="mt-3 flex justify-end">
          <Tabs defaultValue="spotlight">
            <TabsList className="bg-transparent p-0 rounded-none gap-10">
              <TabsTrigger value="spotlight" className={triggerClass}>
                זרקור
              </TabsTrigger>
              <TabsTrigger value="compare" className={triggerClass}>
                השוואה לסקר חברתי
              </TabsTrigger>
              <TabsTrigger value="explore" className={triggerClass}>
                תחקור
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* תפריט סינון */}
        <Card className="mt-6 shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-end">
              <span className="text-base font-semibold">תפריט סינון</span>
            </div>

            {/* פילטרים: Grid כדי שלא יגלשו החוצה */}
            <div className="mt-4 grid items-center gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
              <FilterField label="מגדר" />
              <div className="hidden lg:block h-10 w-px bg-blue-200" />

              <FilterField label="קבוצת גיל" />
              <div className="hidden lg:block h-10 w-px bg-blue-200" />

              <FilterField label="מידת דתיות" />
              <div className="hidden lg:block h-10 w-px bg-blue-200" />

              <FilterField label="קבוצת אוכלוסיה" />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
