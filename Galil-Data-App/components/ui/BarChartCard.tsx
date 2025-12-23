// components/BarChartCard.tsx
"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type BarRow = { label: string; value: number };
type ValueKind = "number" | "percent";

type Props = {
  title: string;
  subtitle?: string;
  xLabel?: string;
  yLabel?: string;
  seriesName?: string;
  rows: BarRow[];
  valueKind?: ValueKind;
  decimals?: number;
  maxY?: number;
  tickStep?: number;
  className?: string;
  chartHeightClassName?: string;
};

function formatValue(v: number, kind: ValueKind, decimals: number) {
  const fixed = v.toFixed(decimals);
  return kind === "percent" ? `${fixed}%` : fixed;
}

function buildNumberTicks(max: number, step: number) {
  const safeStep = step > 0 ? step : 1;
  const top = Math.ceil(max / safeStep) * safeStep;
  const ticks: number[] = [];
  for (let t = 0; t <= top; t += safeStep) ticks.push(t);
  return { ticks, top };
}

export default function BarChartCard({
  title,
  subtitle,
  xLabel,
  yLabel,
  seriesName = "Total",
  rows,
  valueKind = "percent",
  decimals,
  maxY,
  tickStep = 500,
  className,
  chartHeightClassName = "h-[520px] md:h-[600px]",
}: Props) {
  const d =
    typeof decimals === "number" ? decimals : valueKind === "percent" ? 1 : 0;

  const dataMax = Math.max(0, ...rows.map((r) => r.value));

  // default max
  let safeMax =
    typeof maxY === "number"
      ? maxY
      : valueKind === "percent"
      ? 100
      : Math.max(1, dataMax * 1.15);

  // ticks
  let ticks: number[] =
    valueKind === "percent"
      ? [0, 20, 40, 60, 80, 100]
      : Array.from({ length: 6 }, (_, i) => Math.round((safeMax * i) / 5));

  // ✅ if number chart -> use step ticks like 500
  if (valueKind === "number") {
    const built = buildNumberTicks(
      typeof maxY === "number" ? maxY : dataMax,
      tickStep
    );
    ticks = built.ticks;
    // make sure chart max matches the tick top (so grid is clean)
    if (typeof maxY !== "number") safeMax = built.top;
  }

  return (
    <Card dir="rtl" className={["w-full", className].filter(Boolean).join(" ")}>
      <CardHeader className="space-y-1">
        <CardTitle className="text-base md:text-lg leading-snug">
          {title}
        </CardTitle>
        {subtitle && (
          <div className="text-sm text-muted-foreground">{subtitle}</div>
        )}
      </CardHeader>

      <CardContent className="pt-2">
        <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground mb-3">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-500" />
          <span>{seriesName}</span>
        </div>

        <div className={["relative w-full", chartHeightClassName].join(" ")}>
          {ticks.map((tick) => (
            <div
              key={tick}
              className="absolute left-0 right-0 flex items-center"
              style={{ bottom: `${(tick / safeMax) * 100}%` }}
            >
              <div className="w-16 text-[11px] text-muted-foreground text-left pr-2 tabular-nums">
                {valueKind === "percent"
                  ? `${tick}%`
                  : tick.toLocaleString("he-IL")}
              </div>
              <div className="flex-1 border-t border-dashed border-muted-foreground/30" />
            </div>
          ))}

          <div className="absolute inset-0 pr-16 pl-4">
            <div className="h-full w-full flex items-end justify-center gap-10">
              {rows.map((r) => {
                const hPct = Math.max(
                  0,
                  Math.min(100, (r.value / safeMax) * 100)
                );

                return (
                  <div
                    key={r.label}
                    className="h-full flex flex-col items-center justify-end min-w-40"
                  >
                    <div className="mb-2 text-[11px] px-2 py-1 rounded-md bg-muted tabular-nums">
                      {formatValue(r.value, valueKind, d)}
                    </div>

                    <div className="w-40 h-full flex items-end">
                      <div
                        className="w-full rounded-t-md bg-blue-500"
                        style={{ height: `${hPct}%` }}
                        title={`${r.label}: ${formatValue(
                          r.value,
                          valueKind,
                          d
                        )}`}
                      />
                    </div>

                    <div className="mt-3 text-xs text-muted-foreground text-center whitespace-nowrap">
                      {r.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {yLabel && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-muted-foreground">
              {yLabel}
            </div>
          )}
        </div>

        {xLabel && (
          <div className="mt-3 text-xs text-muted-foreground text-center">
            {xLabel}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
