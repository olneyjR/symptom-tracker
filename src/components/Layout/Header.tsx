import React from 'react';
import { Activity } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center space-x-3">
        <Activity className="w-8 h-8 text-primary-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Symptom Tracker
          </h1>
          <p className="text-sm text-gray-600">
            Track symptoms, discover patterns
          </p>
        </div>
      </div>
    </header>
  );
}
