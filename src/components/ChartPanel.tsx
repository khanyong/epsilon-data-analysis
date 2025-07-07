import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface ChartPanelProps {
  data: any[];
  xKey: string;
  yKey: string;
}

export function ChartPanel({ data, xKey, yKey }: ChartPanelProps) {
  return (
    <BarChart width={600} height={300} data={data}>
      <XAxis dataKey={xKey} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey={yKey} fill="#8884d8" />
    </BarChart>
  );
}
