"use client";

import BarChartCard from "@/components/authorities/BarChartCard";
import { useIsMobile } from "@/hooks/use-mobile";
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
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="h-full min-h-150 w-full rounded-xl flex items-center justify-center p-4">
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-lg font-semibold text-muted-foreground mb-2">
            Charts not available on mobile
          </p>
          <p className="text-sm text-muted-foreground">
            Please use the desktop version to view the graphs
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full min-h-150 w-full rounded-xl flex p-4">
      {result ? (
        <>
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
        </>
      ) : (
        <div className="w-full flex items-center justify-center text-sm text-muted-foreground">
          {error ?? "טוען נתונים..."}
        </div>
      )}
    </div>
  );
}
