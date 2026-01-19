import React from 'react';
import { SymptomEntry } from '../../types';
import { DataProcessor } from '../../services/dataProcessing';

interface CorrelationHeatmapProps {
  entries: SymptomEntry[];
}

export function CorrelationHeatmap({ entries }: CorrelationHeatmapProps) {
  const correlations = DataProcessor.calculateCorrelations(entries);

  if (correlations.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Symptom Correlations
        </h3>
        <p className="text-gray-600">
          Not enough data to calculate correlations. Continue logging symptoms with context factors.
        </p>
      </div>
    );
  }

  const getCorrelationColor = (strength: number, type: string) => {
    if (type === 'neutral') return 'bg-gray-200 text-gray-700';
    if (strength >= 0.7) return type === 'positive' ? 'bg-red-500 text-white' : 'bg-green-500 text-white';
    if (strength >= 0.4) return type === 'positive' ? 'bg-red-300 text-red-900' : 'bg-green-300 text-green-900';
    return type === 'positive' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Symptom Correlations with Context Factors
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Shows how symptoms correlate with stress, sleep, and exercise
      </p>

      <div className="space-y-4">
        {correlations.map((corr, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">{corr.symptom}</h4>
            <div className="grid grid-cols-3 gap-2">
              {corr.correlations.map((c, i) => (
                <div 
                  key={i}
                  className={`p-3 rounded text-center ${getCorrelationColor(c.strength, c.type)}`}
                >
                  <div className="text-xs font-medium mb-1">{c.factor}</div>
                  <div className="text-sm">
                    {c.type === 'positive' ? '↑' : c.type === 'negative' ? '↓' : '→'}
                    {' '}
                    {(c.strength * 100).toFixed(0)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
        <p className="text-xs text-blue-900">
          <strong>Legend:</strong> Red indicates symptoms increase with the factor. 
          Green indicates symptoms decrease with the factor. Percentage shows correlation strength.
        </p>
      </div>
    </div>
  );
}
