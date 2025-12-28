"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type Point = { x: number | string; y: number };
type Series = { name: string; points: Point[] };

type Props = {
  title: string;
  subtitle?: string;
  yLabel?: string;
  xLabel?: string;
  series: Series[];
  className?: string;
  height?: number; // px
};

function niceMax(n: number) {
  if (n <= 0) return 1;
  const pow = Math.pow(10, Math.floor(Math.log10(n)));
  const scaled = n / pow;
  const rounded = scaled <= 1 ? 1 : scaled <= 2 ? 2 : scaled <= 5 ? 5 : 10;
  return rounded * pow;
}

const PALETTE = [
  "#22c55e",
  "#3b82f6",
  "#0ea5e9",
  "#a855f7",
  "#f97316",
  "#ef4444",
  "#111827",
  "#14b8a6",
];

export default function TrendChartCard({
  title,
  subtitle,
  yLabel = "ערך",
  xLabel = "שנה",
  series,
  className,
  height = 420,
}: Props) {
  const allPoints = series.flatMap((s) => s.points);
  const yMaxRaw = Math.max(0, ...allPoints.map((p) => p.y));
  const yMax = niceMax(yMaxRaw);

  const xLabels = Array.from(new Set(allPoints.map((p) => String(p.x))));
  const xIndex = (label: string) => xLabels.indexOf(label);

  const W = 1000;
  const H = 500;
  const padL = 70;
  const padR = 110;
  const padT = 20;
  const padB = 60;

  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  const xToPx = (label: string) => {
    const i = Math.max(0, xIndex(label));
    const denom = Math.max(1, xLabels.length - 1);
    return padL + (i / denom) * innerW;
  };

  const yToPx = (v: number) => padT + (1 - v / yMax) * innerH;

  const yTicks = 6;
  const ticks = Array.from({ length: yTicks }, (_, i) =>
    Math.round((yMax * i) / (yTicks - 1))
  );

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
        {/* legend */}
        <div className="flex flex-wrap items-center justify-end gap-4 text-xs text-muted-foreground mb-3">
          {series.map((s, idx) => (
            <div key={s.name} className="flex items-center gap-2">
              <span
                className="inline-block w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: PALETTE[idx % PALETTE.length] }}
              />
              <span>{s.name}</span>
            </div>
          ))}
        </div>

        {/* responsive svg */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[900px]" style={{ height }}>
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
              {/* grid + y labels */}
              {ticks.map((t) => {
                const y = yToPx(t);
                return (
                  <g key={t}>
                    <line
                      x1={padL}
                      x2={W - padR}
                      y1={y}
                      y2={y}
                      stroke="rgba(148,163,184,0.45)"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={padL - 10}
                      y={y + 4}
                      fontSize="12"
                      textAnchor="end"
                      fill="rgba(100,116,139,1)"
                    >
                      {t.toLocaleString("he-IL")}
                    </text>
                  </g>
                );
              })}

              {/* x labels */}
              {xLabels.map((lab, i) => {
                const x = xToPx(lab);
                const step =
                  xLabels.length > 14 ? 3 : xLabels.length > 10 ? 2 : 1;
                if (i % step !== 0 && i !== xLabels.length - 1) return null;

                return (
                  <text
                    key={lab}
                    x={x}
                    y={H - padB + 30}
                    fontSize="12"
                    textAnchor="middle"
                    fill="rgba(100,116,139,1)"
                  >
                    {lab}
                  </text>
                );
              })}

              {/* axis labels */}
              <text
                x={padL + innerW / 2}
                y={H - 15}
                fontSize="12"
                textAnchor="middle"
                fill="rgba(100,116,139,1)"
              >
                {xLabel}
              </text>

              <text
                x={20}
                y={padT + innerH / 2}
                fontSize="12"
                textAnchor="middle"
                fill="rgba(100,116,139,1)"
                transform={`rotate(-90 20 ${padT + innerH / 2})`}
              >
                {yLabel}
              </text>

              {/* series lines */}
              {series.map((s, idx) => {
                const color = PALETTE[idx % PALETTE.length];
                const pts = s.points
                  .slice()
                  .sort((a, b) => xIndex(String(a.x)) - xIndex(String(b.x)));

                const path = pts
                  .map((p, i) => {
                    const x = xToPx(String(p.x));
                    const y = yToPx(p.y);
                    return `${i === 0 ? "M" : "L"} ${x} ${y}`;
                  })
                  .join(" ");

                const last = pts[pts.length - 1];
                const lx = W - padR + 10;
                const ly = yToPx(last?.y ?? 0);

                return (
                  <g key={s.name}>
                    <path d={path} fill="none" stroke={color} strokeWidth="3" />
                    {pts.map((p) => {
                      const x = xToPx(String(p.x));
                      const y = yToPx(p.y);
                      return (
                        <circle
                          key={`${s.name}-${p.x}`}
                          cx={x}
                          cy={y}
                          r="5"
                          fill={color}
                        />
                      );
                    })}
                    <text
                      x={lx}
                      y={ly + 4}
                      fontSize="12"
                      fill="rgba(75,85,99,1)"
                    >
                      {s.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
