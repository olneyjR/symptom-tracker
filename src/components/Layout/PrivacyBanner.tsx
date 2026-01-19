import React from 'react';
import { Lock } from 'lucide-react';

export function PrivacyBanner() {
  return (
    <div className="bg-primary-50 border-l-4 border-primary-500 p-4">
      <div className="flex items-start">
        <Lock className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" />
        <div className="text-sm text-primary-900">
          <p className="font-semibold mb-1">Privacy First</p>
          <p className="text-primary-800">
            All data stored locally in your browser. Never sent to servers except during AI analysis. 
            No account required.
          </p>
        </div>
      </div>
    </div>
  );
}
