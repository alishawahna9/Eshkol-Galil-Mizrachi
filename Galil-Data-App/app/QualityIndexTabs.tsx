import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import DomainFilter from "@/components/ui/DomainFilter"

export default function TopTabs() {
const triggerClass =
  "relative rounded-none bg-transparent px-2 py-1 text-sm text-muted-foreground cursor-pointer " +
  "shadow-none data-[state=active]:bg-transparent data-[state=active]:shadow-none " +
  "data-[state=active]:text-primary " +
  "data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:bottom-0 " +
  "data-[state=active]:after:h-[2px] data-[state=active]:after:w-full " +
  "data-[state=active]:after:bg-primary"

  return (
    <Tabs defaultValue="insights" className="w-full">
      <div className="ms-auto w-full max-w-md">
        <TabsList className="grid w-full grid-cols-3 bg-transparent p-0">
          <TabsTrigger value="insights" className={triggerClass}>
            זרקור
          </TabsTrigger>
          <TabsTrigger value="compare" className={triggerClass}>
            השוואה לסקר חברתי
          </TabsTrigger>
          <TabsTrigger value="explore" className={triggerClass}>
            תחקור
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="explore" className="mt-6">
        <div className="flex justify-between gap-8">
          <div className="flex-1">
            tehkor content
          </div>

          <div className="flex-1 flex justify-end">
            <DomainFilter />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="compare" className="mt-6"> hshvah content</TabsContent>
      <TabsContent value="insights" className="mt-6">dkot content</TabsContent>
    </Tabs>
  )
}
