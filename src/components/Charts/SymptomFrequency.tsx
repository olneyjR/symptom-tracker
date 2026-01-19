import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SymptomEntry } from '../../types';
import { DataProcessor } from '../../services/dataProcessing';

interface SymptomFrequencyProps {
  entries: SymptomEntry[];
}

export function SymptomFrequency({ entries }: SymptomFrequencyProps) {
  const frequencies = DataProcessor.getSymptomFrequencies(entries);
  const topSymptoms = frequencies.slice(0, 10);

  if (topSymptoms.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Symptom Frequency
        </h3>
        <p className="text-gray-600">No symptom data available yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Most Common Symptoms
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={topSymptoms}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            angle={-45}
            textAnchor="end"
            height={100}
            fontSize={12}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#0ea5e9" name="Occurrences" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
