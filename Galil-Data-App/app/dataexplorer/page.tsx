// Main Data Explorer page layout
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

      <div className="mx-auto max-w-[85%] flex justify-center">
        <DataExplorerView
          splitOptions={splitOptions}
          statusOptions={statusOptions.map((o) => ({
            label: o.label,
            value: o.value,
          }))}
          contentTypeOptions={contentTypeOptions}
        />
      </div>
    </main>
  );
}
