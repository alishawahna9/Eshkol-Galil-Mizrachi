// Main Data Explorer page layout
import { SideFilterPanel } from "@/components/authorities/SideFilterPanel";
import DataExplorerView from "@/components/dataexplorer/DataExplorerView";
import { getDataExplorerOptions } from "@/components/dataexplorer/dataexplorer-service";

export default function DataExplorerPage() {
  // Options for metric / value type dropdowns
  const { splitOptions, contentTypeOptions, statusOptions } =
    getDataExplorerOptions();

  return (
    <main dir="rtl" className="px-6 py-4">
      {/* Page title */}
      <h1 className="text-3xl font-bold text-center mb-8 mt-5">
        חקר נתונים - אשכול גליל מזרחי
      </h1>

      <div
        className="
          mx-auto
          grid
          grid-cols-1
          gap-6
          items-stretch
          md:grid-cols-[minmax(360px,400px)_1fr]
          md:gap-8
        "
        dir="rtl"
      >
        {/* Right column: side filter and metric panel */}
        <aside className="w-full order-1 md:order-0" dir="rtl">
          <SideFilterPanel />
        </aside>

        {/* Left column: main data explorer (chart / table) */}
        <section
          className="w-full min-w-0 flex-row-reverse flex-row-reverse-col order-2 md:order-0"
          dir="rtl"
        >
          <DataExplorerView
            splitOptions={splitOptions}
            statusOptions={statusOptions.map((o) => ({
              label: o.label,
              value: o.value,
            }))}
            contentTypeOptions={contentTypeOptions}
          />
        </section>
      </div>
    </main>
  );
}
