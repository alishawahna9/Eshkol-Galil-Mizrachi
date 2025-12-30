"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type Row = { year: number; value: number };

const sample: Row[] = [
  { year: 2002, value: 133000 },
  { year: 2003, value: 135000 },
  { year: 2004, value: 137500 },
  { year: 2005, value: 140000 },
  { year: 2006, value: 142000 },
  { year: 2007, value: 144000 },
  { year: 2008, value: 146000 },
  { year: 2009, value: 150500 },
  { year: 2010, value: 154000 },
  { year: 2011, value: 158000 },
  { year: 2012, value: 163000 },
  { year: 2013, value: 167000 },
  { year: 2014, value: 170000 },
  { year: 2015, value: 173000 },
  { year: 2016, value: 175000 },
  { year: 2017, value: 179000 },
  { year: 2018, value: 183000 },
  { year: 2019, value: 187000 },
  { year: 2020, value: 190000 },
  { year: 2021, value: 196000 },
  { year: 2022, value: 198000 },
  { year: 2023, value: 200000 },
  { year: 2024, value: 202000 },
  { year: 2025, value: 204000 },
  { year: 2026, value: 206000 },
];

function formatShort(n: number) {
  return `${Math.round(n / 1000)}אלף`;
}

export default function TrendChart() {
  const rows = sample;
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);
  const [tipPos, setTipPos] = React.useState<{ x: number; y: number } | null>(null);
  // move y-axis a bit further left so x-labels don't sit under it
  const padding = { top: 24, right: 40, bottom: 36, left: 20 };
  // Slightly larger drawing area for better readability
  const width = 1100;
  const height = 380;

  const values = rows.map((r) => r.value);
  const min = Math.min(...values);
  const max = Math.max(...values);

  const x = (i: number) =>
    padding.left + (i / (rows.length - 1)) * (width - padding.left - padding.right);
  const y = (v: number) =>
    padding.top + ((max - v) / (max - min || 1)) * (height - padding.top - padding.bottom);

  const points = rows.map((r, i) => `${x(i)},${y(r.value)}`).join(" ");

  // ticks for y
  const ticks = 6;
  const tickVals = Array.from({ length: ticks }, (_, i) =>
    Math.round(min + ((max - min) * i) / (ticks - 1))
  );

  function showTooltip(e: React.MouseEvent, i: number) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setHoverIndex(i);
    setTipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  function moveTooltip(e: React.MouseEvent) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  function hideTooltip() {
    setHoverIndex(null);
    setTipPos(null);
  }

  return (
    <Card dir="rtl">
      <CardHeader>
        <CardTitle className="text-base md:text-lg leading-snug">
          מגמה אחוזה של הרשויות שנבחרו במדד אוכלוסיה (אנשים) בשנים 2002 - 2026 ביחס לממוצע הארצי
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="relative overflow-visible" ref={containerRef}>
          <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: `${width}px` }}> 
            {/* grid lines */}
            {tickVals.map((t, i) => {
              const yy = y(t);
              return (
                <g key={t}>
                  <line x1={padding.left} x2={width - padding.right} y1={yy} y2={yy} stroke="#e6e6e6" strokeWidth={1} strokeDasharray="4 6" />
                  <text x={padding.left - 8} y={yy + 4} textAnchor="end" fontSize={12} fill="#6b7280">{formatShort(t)}</text>
                </g>
              );
            })}

            {/* x labels */}
            {rows.map((r, i) => (
              <text key={r.year} x={x(i)} y={height - 8} textAnchor="middle" fontSize={12} fill="#6b7280">
                {r.year}
              </text>
            ))}

            {/* polyline */}
            <polyline fill="none" stroke="#38bdf8" strokeWidth={3} points={points} strokeLinecap="round" strokeLinejoin="round" />

            {/* points and labels */}
            {rows.map((r, i) => {
              const cx = x(i);
              const cy = y(r.value);
              return (
                <g key={r.year}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={5}
                    fill="#38bdf8"
                    stroke="#fff"
                    strokeWidth={2}
                    onMouseEnter={(e) => showTooltip(e, i)}
                    onMouseMove={(e) => moveTooltip(e)}
                    onMouseLeave={() => hideTooltip()}
                    style={{ cursor: "pointer" }}
                  />
                  <text x={cx} y={cy - 10} textAnchor="middle" fontSize={11} fill="#0f172a">{formatShort(r.value)}</text>
                </g>
              );
            })}

            {/* y-axis label (rotated) */}
            <text
              x={padding.left - 12}
              y={height / 2}
              textAnchor="middle"
              fontSize={13}
              fill="#374151"
              transform={`rotate(-90 ${padding.left - 12} ${height / 2})`}
            >
              אנשים
            </text>
          </svg>

          {hoverIndex !== null && tipPos && (
            <div
              className="absolute z-50 bg-card border border-border rounded shadow-lg p-2 text-sm"
              style={{ left: tipPos.x + 12, top: tipPos.y + 12, minWidth: 140 }}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-400" />
                  <div className="text-xs text-muted-foreground">רשויות שנבחרו</div>
                </div>
                <div className="text-xs font-medium">{rows[hoverIndex].year}</div>
              </div>

              <div className="mt-1 text-right text-sm font-semibold">{rows[hoverIndex].value.toLocaleString("he-IL")} אנשים</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
