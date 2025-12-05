/**
 * Chart Component Interfaces and Types
 * Centralized type definitions for all chart-related components
 */

import { TextAnchor, FontWeight, LabelPosition } from './enum';

/**
 * Gradient stop configuration for chart gradients
 */
export interface ChartGradientStop {
  offset: string;
  color: string;
}

/**
 * Configuration for chart container dimensions
 */
export interface ChartContainer {
  width: string;
  height: number;
}

/**
 * Configuration for chart margins
 */
export interface ChartMargin {
  top: number;
  right: number;
  left: number;
  bottom: number;
}

/**
 * Configuration for grid styling
 */
export interface ChartGrid {
  strokeDasharray: string;
  stroke: string;
}

/**
 * Configuration for chart axis tick
 */
export interface AxisTick {
  fill: string;
  fontSize: number;
  fontWeight: FontWeight;
}

/**
 * Configuration for X-axis
 */
export interface ChartXAxis {
  angle: number;
  textAnchor: TextAnchor;
  height: number;
  interval: number;
  tick: AxisTick;
}

/**
 * Configuration for axis label
 */
export interface AxisLabel {
  value: string;
  position: string;
  offset: number;
}

/**
 * Configuration for Y-axis
 */
export interface ChartYAxis {
  tick: AxisTick;
  label: AxisLabel;
}

/**
 * Configuration for tooltip styling
 */
export interface TooltipContentStyle {
  backgroundColor: string;
  border: string;
  borderRadius: string;
}

/**
 * Configuration for tooltip
 */
export interface ChartTooltip {
  contentStyle: TooltipContentStyle;
}

/**
 * Configuration for bar chart bars
 */
export interface ChartBar {
  radius: number | [number, number, number, number];
}

/**
 * Configuration for label list
 */
export interface ChartLabelList {
  position: LabelPosition | 'top' | 'bottom';
  style: {
    fill: string;
    fontWeight: 'bold';
    fontSize: number;
  };
}

/**
 * Configuration for chart gradient
 */
export interface ChartGradient {
  id: string;
  x1: string;
  y1: string;
  x2: string;
  y2: string;
  stops: ChartGradientStop[];
}

/**
 * Main chart configuration interface
 */
export interface ChartConfig {
  container: ChartContainer;
  margin: ChartMargin;
  grid: ChartGrid;
  xAxis: ChartXAxis;
  yAxis: ChartYAxis;
  tooltip: ChartTooltip;
  bar: ChartBar;
  labelList: ChartLabelList;
  gradient: ChartGradient;
}

/**
 * Chart card styling classes
 */
export interface ChartCardStyles {
  card: string;
  header: string;
  title: string;
  subtitle: string;
  content: string;
  actions: string;
}

/**
 * Data entry for bar chart
 */
export interface BarChartDataEntry {
  label: string;
  value: number;
}

/**
 * Props for BarChart component
 */
export interface BarChartProps {
  /** Array of data entries to display */
  data?: BarChartDataEntry[];
  /** Maximum value for Y-axis domain */
  maxValue?: number;
  /** Whether to show the grid background */
  showGrid?: boolean;
}

/**
 * Props for ChartCard component
 */
export interface ChartCardProps {
  /** Title of the chart */
  title?: string;
  /** Subtitle or description of the chart */
  subtitle?: string;
  /** Main content of the card - typically a chart component */
  children: React.ReactNode;
  /** Optional action buttons or controls */
  actions?: React.ReactNode;
}
