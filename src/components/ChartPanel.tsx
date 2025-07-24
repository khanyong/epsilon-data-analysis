import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell } from 'recharts';

interface ChartPanelProps {
  data: any[];
  xKey: string;
  yKey: string;
  barColors?: string[];
  highlightKey?: string;
  onBarClick?: (entry: any) => void;
}

export function ChartPanel({ data, xKey, yKey, barColors, highlightKey, onBarClick }: ChartPanelProps) {
  return (
    <BarChart width={600} height={300} data={data}>
      <XAxis dataKey={xKey} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey={yKey}>
        {data.map((entry, idx) => (
          <Cell
            key={`cell-${idx}`}
            fill={barColors ? barColors[idx % barColors.length] : '#8884d8'}
            cursor={highlightKey && entry.name === highlightKey ? 'pointer' : 'default'}
            onClick={
              highlightKey && entry.name === highlightKey && onBarClick
                ? () => onBarClick(entry)
                : undefined
            }
          />
        ))}
      </Bar>
    </BarChart>
  );
}
