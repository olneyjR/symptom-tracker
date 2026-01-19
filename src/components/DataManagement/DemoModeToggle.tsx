import React from 'react';
import { StorageService } from '../../services/storage';
import { generateDemoData } from '../../utils/demoData';

interface DemoModeToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export function DemoModeToggle({ enabled, onToggle }: DemoModeToggleProps) {
  const handleToggle = () => {
    if (!enabled) {
      // Turning on demo mode - load demo data
      if (window.confirm('This will load sample data for demonstration. Your existing data will be preserved. Continue?')) {
        const demoData = generateDemoData();
        demoData.forEach(entry => StorageService.addEntry(entry));
        StorageService.setDemoMode(true);
        onToggle();
      }
    } else {
      // Turning off demo mode
      if (window.confirm('Turn off demo mode? This will clear all demo data.')) {
        StorageService.clearEntries();
        StorageService.setDemoMode(false);
        onToggle();
      }
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
      <div>
        <h4 className="font-medium text-gray-900">Demo Mode</h4>
        <p className="text-sm text-gray-600">
          {enabled ? 'Sample data loaded' : 'Load sample data to explore features'}
        </p>
      </div>
      <button
        onClick={handleToggle}
        className={`
          px-4 py-2 rounded-lg font-medium transition-colors
          ${enabled 
            ? 'bg-red-600 text-white hover:bg-red-700' 
            : 'bg-primary-600 text-white hover:bg-primary-700'
          }
        `}
      >
        {enabled ? 'Disable' : 'Enable'}
      </button>
    </div>
  );
}
