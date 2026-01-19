import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SymptomEntry } from '../../types';
import { DataProcessor } from '../../services/dataProcessing';
import { format, parseISO } from 'date-fns';

interface SeverityTrendProps {
  entries: SymptomEntry[];
}

export function SeverityTrend({ entries }: SeverityTrendProps) {
  const trends = DataProcessor.getSeverityTrends(entries);

  const formattedData = trends.map(t => ({
    ...t,
    displayDate: format(parseISO(t.date), 'MMM d')
  }));

  if (trends.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Severity Trends
        </h3>
        <p className="text-gray-600">No severity data available yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Severity Over Time
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="displayDate"
            fontSize={12}
          />
          <YAxis domain={[0, 10]} />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="averageSeverity" 
            stroke="#0ea5e9" 
            name="Avg Severity"
            strokeWidth={2}
          />
          <Line 
            type="monotone" 
            dataKey="maxSeverity" 
            stroke="#ef4444" 
            name="Max Severity"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
