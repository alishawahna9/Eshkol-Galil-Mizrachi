import React, { useMemo, ReactNode } from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts';
import { BarChartProps } from '../../utils/interface';
import { CHART_CONFIG } from './chart.config';

/**
 * BarChart Component
 * Displays data in a responsive bar chart with gradient styling
 *
 * @example
 * ```tsx
 * <BarChart
 *   data={[{ label: 'Q1', value: 65 }, { label: 'Q2', value: 78 }]}
 *   maxValue={100}
 *   showGrid
 * />
 * ```
 */
const BarChart: React.FC<BarChartProps> = ({
  data = [],
  maxValue = 100,
  showGrid = true,
}) => {
  /**
   * Memoize gradient stops rendering for performance
   */
  const gradientStops = useMemo<ReactNode>(() => {
    return CHART_CONFIG.gradient.stops.map((stop, index) => (
      <stop
        key={`gradient-stop-${index}`}
        offset={stop.offset}
        stopColor={stop.color}
      />
    ));
  }, []);

  /**
   * Memoize bar cells rendering based on data changes
   */
  const barCells = useMemo<ReactNode>(() => {
    return data.map((entry, index) => (
      <Cell
        key={`bar-cell-${index}`}
        fill={`url(#${CHART_CONFIG.gradient.id})`}
      />
    ));
  }, [data]);

  /**
   * Format tooltip values with percentage
   */
  const formatTooltip = (value: number): string => `${value}%`;

  return (
    <ResponsiveContainer
      width={CHART_CONFIG.container.width}
      height={CHART_CONFIG.container.height}
    >
      <RechartsBarChart data={data} margin={CHART_CONFIG.margin}>
        {showGrid && (
          <CartesianGrid
            strokeDasharray={CHART_CONFIG.grid.strokeDasharray}
            stroke={CHART_CONFIG.grid.stroke}
          />
        )}
        <XAxis
          dataKey="label"
          angle={CHART_CONFIG.xAxis.angle}
          textAnchor={CHART_CONFIG.xAxis.textAnchor}
          height={CHART_CONFIG.xAxis.height}
          interval={CHART_CONFIG.xAxis.interval}
          tick={CHART_CONFIG.xAxis.tick}
        />
        <YAxis
          domain={[0, maxValue]}
          tick={CHART_CONFIG.yAxis.tick}
          label={CHART_CONFIG.yAxis.label}
        />
        <Tooltip
          contentStyle={CHART_CONFIG.tooltip.contentStyle}
          formatter={formatTooltip}
        />
        <Bar dataKey="value" radius={CHART_CONFIG.bar.radius}>
          {barCells}
          <LabelList
            dataKey="value"
            position={CHART_CONFIG.labelList.position}
            formatter={formatTooltip}
            style={CHART_CONFIG.labelList.style}
          />
        </Bar>
        <defs>
          <linearGradient
            id={CHART_CONFIG.gradient.id}
            x1={CHART_CONFIG.gradient.x1}
            y1={CHART_CONFIG.gradient.y1}
            x2={CHART_CONFIG.gradient.x2}
            y2={CHART_CONFIG.gradient.y2}
          >
            {gradientStops}
          </linearGradient>
        </defs>
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default React.memo(BarChart);
