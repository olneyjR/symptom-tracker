import React from 'react';
import { Brain, Loader2 } from 'lucide-react';
import { AnalysisState } from '../../types';

interface AnalysisButtonProps {
  state: AnalysisState;
  canAnalyze: boolean;
  daysUntilAnalysis: number;
  onAnalyze: () => void;
}

export function AnalysisButton({ 
  state, 
  canAnalyze, 
  daysUntilAnalysis, 
  onAnalyze 
}: AnalysisButtonProps) {
  if (state === 'analyzing') {
    return (
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 flex items-center justify-center space-x-3">
        <Loader2 className="w-6 h-6 text-primary-600 animate-spin" />
        <p className="text-primary-900 font-medium">
          Analyzing patterns...
        </p>
      </div>
    );
  }

  if (!canAnalyze) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <Brain className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Analysis Available Soon
        </h3>
        <p className="text-gray-600">
          Log {daysUntilAnalysis} more day{daysUntilAnalysis !== 1 ? 's' : ''} of symptoms to unlock pattern analysis
        </p>
        <div className="mt-4 bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-primary-500 h-full transition-all"
            style={{ width: `${Math.min((7 - daysUntilAnalysis) / 7 * 100, 100)}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={onAnalyze}
      className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg p-6 hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl"
    >
      <div className="flex items-center justify-center space-x-3">
        <Brain className="w-6 h-6" />
        <span className="text-lg font-semibold">
          Analyze Symptom Patterns
        </span>
      </div>
      <p className="text-primary-100 text-sm mt-2">
        Get AI-powered insights from your symptom data
      </p>
    </button>
  );
}
