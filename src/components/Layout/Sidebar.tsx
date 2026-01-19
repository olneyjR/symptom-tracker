import React from 'react';
import { Calendar, BarChart3, Brain, Download, Upload, Trash2 } from 'lucide-react';

interface SidebarProps {
  activeView: 'calendar' | 'charts' | 'analysis';
  onViewChange: (view: 'calendar' | 'charts' | 'analysis') => void;
  onExport: () => void;
  onImport: () => void;
  onClear: () => void;
  demoMode: boolean;
  onDemoModeToggle: () => void;
}

export function Sidebar({
  activeView,
  onViewChange,
  onExport,
  onImport,
  onClear,
  demoMode,
  onDemoModeToggle
}: SidebarProps) {
  const navItems = [
    { id: 'calendar' as const, label: 'Calendar', icon: Calendar },
    { id: 'charts' as const, label: 'Charts', icon: BarChart3 },
    { id: 'analysis' as const, label: 'Analysis', icon: Brain },
  ];

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 p-4 flex flex-col">
      <nav className="space-y-2 mb-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors
                ${isActive 
                  ? 'bg-primary-100 text-primary-900 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="border-t border-gray-200 pt-4 mb-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">
          Data Management
        </h3>
        <div className="space-y-2">
          <button
            onClick={onExport}
            className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </button>
          <button
            onClick={onImport}
            className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Upload className="w-4 h-4" />
            <span>Import Data</span>
          </button>
          <button
            onClick={onClear}
            className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear All Data</span>
          </button>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 mt-auto">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={demoMode}
            onChange={onDemoModeToggle}
            className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
          />
          <span className="text-sm text-gray-700">Demo Mode</span>
        </label>
        <p className="text-xs text-gray-500 mt-2 pl-7">
          Pre-populate with sample data
        </p>
      </div>
    </aside>
  );
}
