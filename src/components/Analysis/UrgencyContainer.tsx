import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { URGENCY_THRESHOLDS } from '../../utils/constants';

interface UrgencyContainerProps {
  urgencyScore: number;
  urgencyReasoning: string;
  redFlags?: string[];
}

export function UrgencyContainer({ 
  urgencyScore, 
  urgencyReasoning, 
  redFlags 
}: UrgencyContainerProps) {
  const getUrgencyLevel = (score: number) => {
    if (score >= URGENCY_THRESHOLDS.high) return 'HIGH';
    if (score >= URGENCY_THRESHOLDS.medium) return 'MODERATE';
    return 'LOW';
  };

  const getUrgencyColor = (score: number) => {
    if (score >= URGENCY_THRESHOLDS.high) return 'border-red-500 bg-red-50';
    if (score >= URGENCY_THRESHOLDS.medium) return 'border-yellow-500 bg-yellow-50';
    return 'border-green-500 bg-green-50';
  };

  const getScoreColor = (score: number) => {
    if (score >= URGENCY_THRESHOLDS.high) return 'text-red-700';
    if (score >= URGENCY_THRESHOLDS.medium) return 'text-yellow-700';
    return 'text-green-700';
  };

  const urgencyLevel = getUrgencyLevel(urgencyScore);

  return (
    <div className={`border-2 rounded-lg p-6 ${getUrgencyColor(urgencyScore)}`}>
      <div className="flex items-center space-x-3 mb-4">
        <AlertTriangle className={`w-6 h-6 ${getScoreColor(urgencyScore)}`} />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Urgency Score: {urgencyScore}/10
          </h3>
          <p className={`text-sm font-medium ${getScoreColor(urgencyScore)}`}>
            Severity: {urgencyLevel}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-2">Reasoning:</h4>
        <p className="text-gray-700">
          {urgencyReasoning}
        </p>
      </div>

      {redFlags && redFlags.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-300">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-red-900 mb-2">
                Seek immediate care if you experience:
              </h4>
              <ul className="space-y-1">
                {redFlags.map((flag, index) => (
                  <li key={index} className="text-sm text-red-800 flex items-start">
                    <span className="mr-2">•</span>
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {urgencyScore >= URGENCY_THRESHOLDS.medium && (
        <div className="mt-4 p-3 bg-white rounded border border-gray-300">
          <p className="text-sm text-gray-700">
            <strong>Recommendation:</strong> Consider scheduling a consultation with a healthcare provider 
            {urgencyScore >= URGENCY_THRESHOLDS.high ? ' soon' : ' within 2-4 weeks'} to discuss these symptoms.
          </p>
        </div>
      )}
    </div>
  );
}
