import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Pattern } from '../../types';

interface PatternContainerProps {
  patterns: Pattern[];
}

export function PatternContainer({ patterns }: PatternContainerProps) {
  const getConfidenceBadge = (confidence: string) => {
    const colors = {
      high: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-gray-100 text-gray-800'
    };
    return colors[confidence as keyof typeof colors] || colors.low;
  };

  if (patterns.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <TrendingUp className="w-5 h-5" />
          <span>Patterns Detected</span>
        </h3>
        <p className="text-gray-600">No significant patterns detected in the current data.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
        <TrendingUp className="w-5 h-5 text-primary-600" />
        <span>Patterns Detected</span>
      </h3>

      <div className="space-y-4">
        {patterns.map((pattern, index) => (
          <div 
            key={index}
            className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <p className="font-medium text-gray-900 flex-1">
                {pattern.description}
              </p>
              <span className={`
                px-2 py-1 rounded text-xs font-medium uppercase ml-2 flex-shrink-0
                ${getConfidenceBadge(pattern.confidence)}
              `}>
                {pattern.confidence}
              </span>
            </div>

            {pattern.evidence && pattern.evidence.length > 0 && (
              <div className="mt-3">
                <p className="text-xs font-medium text-gray-700 mb-2">Evidence:</p>
                <ul className="space-y-1">
                  {pattern.evidence.map((item, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start">
                      <span className="text-primary-600 mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
