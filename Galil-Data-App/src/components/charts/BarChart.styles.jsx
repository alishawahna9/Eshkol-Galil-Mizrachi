
import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

export const styles = {
  container: { width: "100%", height: 600 },
  margin: { top: 20, right: 30, left: 20, bottom: 60 },
  grid: {
    strokeDasharray: "3 3",
    stroke: "#e5e7eb"
  },
  xAxis: {
    angle: 0,
    textAnchor: "middle",
    height: 80,
    interval: 0,
    tick: { fill: '#6b7280', fontSize: 12, fontWeight: 'bold' }
  },
  yAxis: {
    // domain will be dynamically set using maxValue prop
    tick: { fill: '#6b7280', fontSize: 12 },
    label: { value: '%', position: 'top', offset: 10 }
  },
  tooltip: {
    contentStyle: { 
      backgroundColor: '#fff', 
      border: '1px solid #d1d5db',
      borderRadius: '8px'
    }
  },
  bar: {
    radius: [8, 8, 0, 0]
  },
  labelList: {
    position: "top",
    style: { fill: '#0F1F38', fontWeight: 'bold', fontSize: 14 }
  },
  gradient: {
    id: "colorGradient",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1",
    stops: [
      { offset: "0%", color: "#6FD1F5" },
      { offset: "100%", color: "#22A7D6" }
    ]
  }
};

export default function BarChart({ data = [], maxValue = 100, showGrid = true }) {
  return (
    <ResponsiveContainer width={styles.container.width} height={styles.container.height}>
      <RechartsBarChart data={data} margin={styles.margin}>
        {showGrid && <CartesianGrid strokeDasharray={styles.grid.strokeDasharray} stroke={styles.grid.stroke} />}
        <XAxis 
          dataKey="label" 
          angle={styles.xAxis.angle}
          textAnchor={styles.xAxis.textAnchor}
          height={styles.xAxis.height}
          interval={styles.xAxis.interval}
          tick={styles.xAxis.tick}
        />
        <YAxis 
          domain={[0, maxValue]} // Keep dynamic maxValue
          tick={styles.yAxis.tick}
          label={styles.yAxis.label}
        />
        <Tooltip 
          contentStyle={styles.tooltip.contentStyle}
          formatter={(value) => `${value}%`}
        />
        <Bar dataKey="value" radius={styles.bar.radius}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={`url(#${styles.gradient.id})`} />
          ))}
          <LabelList 
            dataKey="value" 
            position={styles.labelList.position} 
            formatter={(value) => `${value}%`}
            style={styles.labelList.style}
          />
        </Bar>
        <defs>
          <linearGradient 
            id={styles.gradient.id} 
            x1={styles.gradient.x1} 
            y1={styles.gradient.y1} 
            x2={styles.gradient.x2} 
            y2={styles.gradient.y2}
          >
            {styles.gradient.stops.map((stop, index) => (
              <stop key={`stop-${index}`} offset={stop.offset} stopColor={stop.color} />
            ))}
          </linearGradient>
        </defs>
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
