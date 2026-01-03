"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type Row = { year: number; value: number; target?: number; previousYear?: number; previousMonth?: number };

const sample: Row[] = [
  { year: 2002, value: 133000, target: 135000, previousYear: 130000, previousMonth: 118000 },
  { year: 2003, value: 135000, target: 137000, previousYear: 133000, previousMonth: 120000 },
  { year: 2004, value: 137500, target: 139000, previousYear: 135000, previousMonth: 122000 },
  { year: 2005, value: 140000, target: 141000, previousYear: 137500, previousMonth: 124500 },
  { year: 2006, value: 142000, target: 143000, previousYear: 140000, previousMonth: 126000 },
  { year: 2007, value: 144000, target: 145000, previousYear: 142000, previousMonth: 128000 },
  { year: 2008, value: 146000, target: 147000, previousYear: 144000, previousMonth: 130000 },
  { year: 2009, value: 150500, target: 149000, previousYear: 146000, previousMonth: 133500 },
  { year: 2010, value: 154000, target: 152000, previousYear: 150500, previousMonth: 137000 },
  { year: 2011, value: 158000, target: 156000, previousYear: 154000, previousMonth: 140500 },
  { year: 2012, value: 163000, target: 160000, previousYear: 158000, previousMonth: 145000 },
  { year: 2013, value: 167000, target: 164000, previousYear: 163000, previousMonth: 148500 },
  { year: 2014, value: 170000, target: 168000, previousYear: 167000, previousMonth: 151000 },
  { year: 2015, value: 173000, target: 171000, previousYear: 170000, previousMonth: 154000 },
  { year: 2016, value: 175000, target: 174000, previousYear: 173000, previousMonth: 155500 },
  { year: 2017, value: 179000, target: 177000, previousYear: 175000, previousMonth: 159000 },
  { year: 2018, value: 183000, target: 180000, previousYear: 179000, previousMonth: 162500 },
  { year: 2019, value: 187000, target: 184000, previousYear: 183000, previousMonth: 166000 },
  { year: 2020, value: 190000, target: 188000, previousYear: 187000, previousMonth: 169000 },
  { year: 2021, value: 196000, target: 192000, previousYear: 190000, previousMonth: 174000 },
  { year: 2022, value: 198000, target: 196000, previousYear: 196000, previousMonth: 176000 },
  { year: 2023, value: 200000, target: 199000, previousYear: 198000, previousMonth: 178000 },
  { year: 2024, value: 202000, target: 201000, previousYear: 200000, previousMonth: 180000 },
  { year: 2025, value: 204000, target: 203000, previousYear: 202000, previousMonth: 181500 },
  { year: 2026, value: 206000, target: 205000, previousYear: 204000, previousMonth: 183000 },
];

function formatShort(n: number, valueType: "number" | "percent" = "number") {
  if (valueType === "percent") {
    return `${n.toFixed(1)}%`;
  }
  return `${Math.round(n / 1000)}אלף`;
}

function formatValue(n: number, valueType: "number" | "percent" = "number") {
  if (valueType === "percent") {
    return `${n.toFixed(1)}%`;
  }
  return n.toLocaleString("he-IL");
}

function getAreaLabel(area: string): string {
  switch (area) {
    case "national":
      return "ארצי";
    case "north":
      return "צפון";
    case "center":
      return "מרכז";
    default:
      return "ארצי";
  }
}

export default function TrendChart() {
  const searchParams = useSearchParams();
  const area = searchParams?.get("area") || "national";
  const valueType = (searchParams?.get("valueType") || "number") as "number" | "percent";
  const year = searchParams?.get("year");
  const compareType = searchParams?.get("compareType");
  const comparePoint = searchParams?.get("comparePoint");

  // Get data based on filters
  const filteredRows = React.useMemo(() => {
    let rows = sample;
    
    // Apply area multiplier (just for visual differentiation - you can adjust these)
    const areaMultiplier: Record<string, number> = {
      national: 1,
      north: 0.36, // roughly 45k vs 133k
      center: 0.44, // roughly 58k vs 133k
    };
    const multiplier = areaMultiplier[area] || 1;
    
    // Apply comparison logic if specified
    rows = rows.map(row => {
      let displayValue = row.value * multiplier;
      
      // If comparing to target, show target values instead
      if (compareType === "target" && row.target !== undefined) {
        displayValue = row.target * multiplier;
      }
      // If comparing to previous period
      else if (compareType === "previous") {
        if (comparePoint === "prev-year" && row.previousYear !== undefined) {
          displayValue = row.previousYear * multiplier;
        } else if (comparePoint === "prev-month" && row.previousMonth !== undefined) {
          displayValue = row.previousMonth * multiplier;
        }
      }
      
      return {
        ...row,
        value: displayValue,
      };
    });
    
    // If year is specified, filter to show data around that year (e.g., ±5 years)
    if (year) {
      const yearNum = parseInt(year);
      rows = rows.filter(r => r.year >= yearNum - 5 && r.year <= yearNum + 2);
    }
    
    return rows.length > 0 ? rows : sample;
  }, [area, year, compareType, comparePoint]);

  const rows = filteredRows;
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

  // Get area label for title
  const areaLabel = getAreaLabel(area);
  
  // Build subtitle based on filters
  const subtitle = React.useMemo(() => {
    const parts: string[] = [];
    if (compareType === "target") {
      parts.push("מול יעד");
    } else if (compareType === "previous" && comparePoint) {
      if (comparePoint === "prev-month") {
        parts.push("מול חודש קודם");
      } else if (comparePoint === "prev-year") {
        parts.push("מול שנה קודמת");
      }
    }
    return parts.length > 0 ? `(${parts.join(", ")})` : "";
  }, [compareType, comparePoint]);

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

  const yearRange = rows.length > 0 
    ? `${rows[0].year} - ${rows[rows.length - 1].year}`
    : "2002 - 2026";

  const valueLabel = valueType === "percent" ? "אחוזים" : "אנשים";

  return (
    <Card dir="rtl">
      <CardHeader>
        <CardTitle className="text-base md:text-lg leading-snug">
          מגמה אחודה של הרשויות שנבחרו במדד אוכלוסיה ({valueLabel}) בשנים {yearRange}
          {area !== "national" && ` - אזור ${areaLabel}`}
          {subtitle && ` ${subtitle}`}
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
                  <text x={padding.left - 8} y={yy + 4} textAnchor="end" fontSize={12} fill="#6b7280">{formatShort(t, valueType)}</text>
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
                  <text x={cx} y={cy - 10} textAnchor="middle" fontSize={11} fill="#0f172a">{formatShort(r.value, valueType)}</text>
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
              {valueLabel}
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

              <div className="mt-1 text-right text-sm font-semibold">{formatValue(rows[hoverIndex].value, valueType)} {valueLabel}</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
