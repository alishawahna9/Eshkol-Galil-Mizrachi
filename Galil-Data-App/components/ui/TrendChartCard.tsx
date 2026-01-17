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
  variant?: "card" | "bare";
};

type TooltipData = {
  seriesName: string;
  point: Point;
  x: number;
  y: number;
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
  variant = "card",
}: Props) {
  const [tooltip, setTooltip] = React.useState<TooltipData | null>(null);

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

  const Tooltip = ({ data }: { data: TooltipData }) => (
    <div
      className="absolute z-50 bg-white border border-gray-300 rounded-lg shadow-lg px-3 py-2 text-sm pointer-events-none"
      style={{
        left: data.x + 10,
        top: data.y - 10,
        transform: 'translate(-50%, -100%)',
      }}
    >
      <div className="font-medium text-gray-900">{data.seriesName}</div>
      <div className="text-gray-600">
        {xLabel}: {data.point.x}
      </div>
      <div className="text-gray-600">
        {yLabel}: {data.point.y.toLocaleString("he-IL")}
      </div>
    </div>
  );

  const handleMouseEnter = (seriesName: string, point: Point, event: React.MouseEvent<SVGCircleElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const svgRect = event.currentTarget.ownerSVGElement!.getBoundingClientRect();
    setTooltip({
      seriesName,
      point,
      x: rect.left - svgRect.left + rect.width / 2,
      y: rect.top - svgRect.top + rect.height / 2,
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return variant === "card" ? (
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
          <div className="min-w-225 relative" style={{ height }}>
            {tooltip && <Tooltip data={tooltip} />}
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
                          onMouseEnter={(e) => handleMouseEnter(s.name, p, e)}
                          onMouseLeave={handleMouseLeave}
                          className="cursor-pointer"
                        />
                      );
                    })}

                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  ) : (
    <div dir="rtl" className={["w-full relative", className].filter(Boolean).join(" ")}>
      <div className="space-y-1 mb-2">
        <div className="text-base md:text-lg leading-snug font-bold text-foreground">{title}</div>
        {subtitle && (
          <div className="text-sm text-muted-foreground">{subtitle}</div>
        )}
      </div>

      {/* legend */}
      <div className="flex flex-wrap items-center justify-end gap-4 text-xs text-muted-foreground mb-3 absolute top-12 right-0">
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
        <div className="min-w-[900px] relative" style={{ height }}>
          {tooltip && <Tooltip data={tooltip} />}
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
                        onMouseEnter={(e) => handleMouseEnter(s.name, p, e)}
                        onMouseLeave={handleMouseLeave}
                        className="cursor-pointer"
                      />
                    );
                  })}
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
