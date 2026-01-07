"use client";

import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
  type Tick,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "next-themes";

// Chart.js requires explicit registration of the scales/elements we use.
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

type ValueKind = "number" | "percent";
type Row = { label: string; value: number };

function formatNumber(n: number, decimals: number) {
  // Used for ticks + tooltips; keeps formatting consistent (number vs percent).
  return n.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function buildNumberTicks(max: number, step: number) {
  // Generates stable tick spacing in "number" mode (avoids crowded/uneven axes).
  const safeMax = Math.max(0, max);
  const safeStep = Math.max(1, step);
  const top = Math.ceil(safeMax / safeStep) * safeStep || safeStep;

  const ticks: number[] = [];
  for (let t = 0; t <= top; t += safeStep) ticks.push(t);

  return { top, ticks };
}

type Props = {
  title: string;
  rows: Row[];
  valueKind: ValueKind; // "number" | "percent"
  tickStep: number;
  yLabel: string;
  xLabel: string;
  cardClassName?: string;
  cardContentClassName?: string;
};

export default function BarChartCard({
  title,
  rows,
  valueKind,
  tickStep,
  yLabel,
  xLabel,
  cardClassName,
  cardContentClassName,
}: Props) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const labels = rows.map((r) => r.label);
  const values = rows.map((r) => r.value);

  const decimals = valueKind === "percent" ? 1 : 0;
  const suffix = valueKind === "percent" ? "%" : "";

  const dataMax = Math.max(0, ...values);

  // Percent mode always uses a 0..100 axis. Number mode uses a padded max.
  let safeMax = valueKind === "percent" ? 100 : Math.max(1, dataMax * 1.15);

  // Percent mode uses fixed ticks; number mode uses computed ticks.
  let ticks: number[] =
    valueKind === "percent" ? [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100] : [];

  if (valueKind === "number") {
    const built = buildNumberTicks(dataMax, tickStep);
    ticks = built.ticks;
    safeMax = built.top;
  }

  const data: ChartData<"bar"> = {
    labels,
    datasets: [
      {
        label: "Series",
        data: values,
        backgroundColor: "rgba(92, 200, 231, 1)",
        borderRadius: 8,
        borderSkipped: false,
        maxBarThickness: 100,
        barPercentage: 0.7,
        categoryPercentage: 0.8,
      },
    ],
  };
  const chartColors = useMemo(() => {
    // Theme-aware colors; memoized so Chart.js options stay referentially stable.
    return {
      tick: isDark ? "rgba(226,232,240,0.92)" : "rgba(15,23,42,0.88)", // slate-200 / slate-900
      title: isDark ? "rgba(226,232,240,0.92)" : "rgba(15,23,42,0.88)",
      grid: isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)",
      tooltipBg: isDark ? "rgba(15,23,42,0.95)" : "rgba(255,255,255,0.98)",
      tooltipBorder: isDark ? "rgba(148,163,184,0.35)" : "rgba(15,23,42,0.15)",
      tooltipText: isDark ? "rgba(226,232,240,0.95)" : "rgba(15,23,42,0.95)",
    };
  }, [isDark]);

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: { top: 18, right: 18, left: 18, bottom: 8 } },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: chartColors.tooltipBg,
        borderColor: chartColors.tooltipBorder,
        borderWidth: 1,
        titleColor: chartColors.tooltipText,
        bodyColor: chartColors.tooltipText,
        callbacks: {
          label: (ctx) =>
            `${formatNumber(Number(ctx.parsed.y ?? 0), decimals)}${suffix}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          maxRotation: 0,
          minRotation: 0,
          padding: 10,
          font: { size: 12 },
          color: chartColors.tick,
        },
        title: {
          display: true,
          text: xLabel,
          font: { size: 13 },
          padding: { top: 10 },
          color: chartColors.title,
        },
      },
      y: {
        beginAtZero: true,
        min: 0,
        max: safeMax,
        afterBuildTicks: (axis) => {
          // Force Chart.js to use our tick list (keeps 0..100 for percent, stable steps for numbers).
          axis.ticks = ticks.map((v) => ({ value: v })) as unknown as Tick[];
        },
        ticks: {
          callback: (v) => `${formatNumber(Number(v), decimals)}${suffix}`,
          font: { size: 12 },
          color: chartColors.tick,
        },
        grid: { color: chartColors.grid },
        title: {
          display: true,
          text: yLabel,
          font: { size: 13, weight: "bold" },
          padding: { bottom: 10 },
          color: chartColors.title,
        },
      },
    },
  };

  return (
    <Card className={cardClassName ?? "m-15 w-250 max-w-full mx-auto"}>
      <CardHeader className="py-3">
        <CardTitle className="text-base dark:text-slate-100">{title}</CardTitle>
      </CardHeader>

      <CardContent className={cardContentClassName ?? "h-80 p-3"}>
        <Bar data={data} options={options} />
      </CardContent>
    </Card>
  );
}
