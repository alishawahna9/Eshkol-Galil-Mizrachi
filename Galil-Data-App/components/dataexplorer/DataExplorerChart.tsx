import BarChartCard from "@/components/authorities/BarChartCard";
import {
  ValueKind,
  DataExplorerResult,
} from "@/components/dataexplorer/dataexplorer-service";

type Props = {
  result: DataExplorerResult | null;
  valueKind: ValueKind;
  error: string | null;
};

export default function DataExplorerChart({ result, valueKind, error }: Props) {
  return (
    <div className="h-full min-h-150 w-full rounded-xl flex p-4">
      {result ? (
        <BarChartCard
          title={result.title}
          rows={result.rows}
          valueKind={valueKind}
          tickStep={result.tickStep}
          yLabel={result.yLabel}
          xLabel={result.xLabel}
          cardClassName="w-full"
          cardContentClassName="h-[520px] p-3"
        />
      ) : (
        <div className="w-full flex items-center justify-center text-sm text-muted-foreground">
          {error ?? "טוען נתונים..."}
        </div>
      )}
    </div>
  );
}
