import GlilElectricityTable from "@/components/dataexplorer/GlilElectricityTable";
import { DataExplorerResult } from "@/components/dataexplorer/dataexplorer-service";

type Props = {
  result: DataExplorerResult | null;
  error: string | null;
};

export default function DataExplorerTable({ result, error }: Props) {
  return (
    <div className="h-full min-h-150 rounded-xl flex justify-center p-4">
      {result ? (
        <GlilElectricityTable
          title={result.title}
          headers={result.tableHeaders}
          rows={result.tableRows}
          className="m-10"
          tableClassName="min-w-[680px] min-h-[300px]"
          enableSearch={true}
          searchPlaceholder="חיפוש ברשויות..."
        />
      ) : (
        <div className="w-full flex items-center justify-center text-sm text-muted-foreground">
          {error ?? "טוען נתונים..."}
        </div>
      )}
    </div>
  );
}
