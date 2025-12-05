/**
 * Centralized chart configuration
 * Contains all style and layout constants for chart components
 */

import { FontWeight, TextAnchor } from '@/utils/enum';
import { ChartConfig, ChartCardStyles } from '../../utils/interface';

export const CHART_CONFIG: ChartConfig = {
  container: {
    width: '100%',
    height: 600,
  },
  margin: {
    top: 20,
    right: 30,
    left: 20,
    bottom: 60,
  },
  grid: {
    strokeDasharray: '3 3',
    stroke: '#e5e7eb',
  },
  xAxis: {
    angle: 0,
    textAnchor: TextAnchor.MIDDLE,
    height: 80,
    interval: 0,
    tick: {
      fill: '#6b7280',
      fontSize: 12,
      fontWeight: FontWeight.BOLD,
    },
  },
  yAxis: {
    tick: {
      fill: '#6b7280',
      fontSize: 12,
      fontWeight: FontWeight.BOLD,
    },
    label: {
      value: '%',
      position: 'top',
      offset: 10,
    },
  },
  tooltip: {
    contentStyle: {
      backgroundColor: '#fff',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
    },
  },
  bar: {
    radius: [8, 8, 0, 0],
  },
  labelList: {
    position: 'top',
    style: {
      fill: '#0F1F38',
      fontWeight: 'bold',
      fontSize: 14,
    },
  },
  gradient: {
    id: 'colorGradient',
    x1: '0',
    y1: '0',
    x2: '0',
    y2: '1',
    stops: [
      { offset: '0%', color: '#6FD1F5' },
      { offset: '100%', color: '#22A7D6' },
    ],
  },
};

/**
 * Chart Card styling using Tailwind CSS
 */
export const CHART_CARD_STYLES: ChartCardStyles = {
  card: 'bg-white dark:bg-[#1B4C8C] rounded-xl shadow-md p-6',
  header: 'mb-6',
  title: 'text-lg font-bold text-[#0F1F38] dark:text-white text-center mb-2',
  subtitle: 'text-sm text-gray-600 dark:text-gray-300 text-center',
  content: 'mb-4',
  actions: 'flex justify-center gap-3 mt-6',
};
