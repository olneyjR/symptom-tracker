import React from 'react';
import { Target } from 'lucide-react';
import { PossibleCause } from '../../types';

interface CausesContainerProps {
  causes: PossibleCause[];
}

export function CausesContainer({ causes }: CausesContainerProps) {
  const getLikelihoodColor = (likelihood: string) => {
    const colors = {
      high: 'border-red-300 bg-red-50',
      medium: 'border-yellow-300 bg-yellow-50',
      low: 'border-gray-300 bg-gray-50'
    };
    return colors[likelihood as keyof typeof colors] || colors.low;
  };

  const getLikelihoodBadge = (likelihood: string) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-gray-100 text-gray-800'
    };
    return colors[likelihood as keyof typeof colors] || colors.low;
  };

  if (causes.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Target className="w-5 h-5" />
          <span>Possible Causes (Ranked)</span>
        </h3>
        <p className="text-gray-600">Unable to identify specific causes from current data.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
        <Target className="w-5 h-5 text-primary-600" />
        <span>Possible Causes (Ranked)</span>
      </h3>

      <div className="space-y-3">
        {causes.map((cause, index) => (
          <div 
            key={index}
            className={`border-l-4 rounded-lg p-4 ${getLikelihoodColor(cause.likelihood)}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-700">
                  {index + 1}.
                </span>
                <h4 className="font-medium text-gray-900">
                  {cause.cause}
                </h4>
              </div>
              <span className={`
                px-2 py-1 rounded text-xs font-medium uppercase ml-2 flex-shrink-0
                ${getLikelihoodBadge(cause.likelihood)}
              `}>
                {cause.likelihood}
              </span>
            </div>
            <p className="text-sm text-gray-700 ml-6">
              {cause.reasoning}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
