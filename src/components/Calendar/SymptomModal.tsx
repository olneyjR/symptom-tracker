import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { SymptomEntry, Symptom, ContextFactors } from '../../types';
import { SYMPTOM_CATEGORIES } from '../../utils/constants';
import { formatDisplayDate } from '../../utils/dateHelpers';

interface SymptomModalProps {
  date: string;
  existingEntry: SymptomEntry | null;
  onSave: (entry: SymptomEntry) => void;
  onDelete?: () => void;
  onClose: () => void;
}

export function SymptomModal({ date, existingEntry, onSave, onDelete, onClose }: SymptomModalProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>(
    existingEntry?.symptoms || []
  );
  const [notes, setNotes] = useState(existingEntry?.notes || '');
  const [contextFactors, setContextFactors] = useState<ContextFactors>(
    existingEntry?.contextFactors || {
      stress: 5,
      sleep: 7,
      exercise: false,
      medication: []
    }
  );

  const handleSymptomToggle = (symptomName: string, category: string) => {
    const existing = selectedSymptoms.find(s => s.name === symptomName);
    
    if (existing) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s.name !== symptomName));
    } else {
      setSelectedSymptoms([
        ...selectedSymptoms,
        { name: symptomName, severity: 5, category }
      ]);
    }
  };

  const handleSeverityChange = (symptomName: string, severity: number) => {
    setSelectedSymptoms(
      selectedSymptoms.map(s =>
        s.name === symptomName ? { ...s, severity } : s
      )
    );
  };

  const handleSave = () => {
    const entry: SymptomEntry = {
      date,
      symptoms: selectedSymptoms,
      notes,
      contextFactors
    };
    onSave(entry);
  };

  const displayDate = new Date(date);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">
            Log Symptoms for {formatDisplayDate(displayDate)}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Symptoms Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Select Symptoms
            </h3>
            {Object.entries(SYMPTOM_CATEGORIES).map(([category, symptoms]) => (
              <div key={category} className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 capitalize mb-2">
                  {category}
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {symptoms.map((symptom) => {
                    const isSelected = selectedSymptoms.some(s => s.name === symptom);
                    return (
                      <button
                        key={symptom}
                        onClick={() => handleSymptomToggle(symptom, category)}
                        className={`
                          px-3 py-2 rounded-lg text-sm transition-colors border
                          ${isSelected
                            ? 'bg-primary-100 border-primary-500 text-primary-900'
                            : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                          }
                        `}
                      >
                        {symptom}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Severity Sliders */}
          {selectedSymptoms.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Severity (1-10)
              </h3>
              <div className="space-y-3">
                {selectedSymptoms.map((symptom) => (
                  <div key={symptom.name} className="flex items-center space-x-4">
                    <label className="w-32 text-sm text-gray-700">
                      {symptom.name}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={symptom.severity}
                      onChange={(e) => handleSeverityChange(symptom.name, Number(e.target.value))}
                      className="flex-1"
                    />
                    <span className="w-8 text-center font-medium text-gray-900">
                      {symptom.severity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Context Factors */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Context Factors
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Stress Level (1-10)
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={contextFactors.stress}
                  onChange={(e) => setContextFactors({ ...contextFactors, stress: Number(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Low</span>
                  <span className="font-medium">{contextFactors.stress}</span>
                  <span>High</span>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Hours of Sleep
                </label>
                <input
                  type="number"
                  min="0"
                  max="24"
                  step="0.5"
                  value={contextFactors.sleep}
                  onChange={(e) => setContextFactors({ ...contextFactors, sleep: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={contextFactors.exercise}
                    onChange={(e) => setContextFactors({ ...contextFactors, exercise: e.target.checked })}
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">Exercise today</span>
                </label>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Any additional observations or context..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-between">
          <div>
            {existingEntry && onDelete && (
              <button
                onClick={() => {
                  if (window.confirm('Delete this entry?')) {
                    onDelete();
                  }
                }}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                Delete Entry
              </button>
            )}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={selectedSymptoms.length === 0}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Save Entry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
