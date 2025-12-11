import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Career } from '../types';

interface StatsChartProps {
  careers: Career[];
}

export const StatsChart: React.FC<StatsChartProps> = ({ careers }) => {
  const data = careers.map(c => ({
    name: c.title.split(' ')[0], // Shorten name for axis
    fullName: c.title,
    salary: c.salary,
    growth: c.growth
  }));

  return (
    <div className="w-full h-64 print-break-inside">
      <h3 className="text-lg font-display font-bold text-physics-accent mb-4 print-text-black">Salary Potential (INR)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 10, right: 30, top: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
          <XAxis type="number" hide />
          <YAxis 
            dataKey="name" 
            type="category" 
            width={80} 
            tick={{ fill: '#94a3b8', fontSize: 12 }} 
            interval={0}
          />
          <Tooltip 
            cursor={{fill: '#1e293b'}}
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
            formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Avg Salary']}
            labelStyle={{ color: '#38bdf8' }}
          />
          <Bar dataKey="salary" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#38bdf8' : '#818cf8'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};