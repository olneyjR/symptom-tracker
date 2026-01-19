import React, { useState, useEffect } from 'react';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { PrivacyBanner } from './components/Layout/PrivacyBanner';
import { CalendarView } from './components/Calendar/CalendarView';
import { SymptomFrequency } from './components/Charts/SymptomFrequency';
import { SeverityTrend } from './components/Charts/SeverityTrend';
import { CorrelationHeatmap } from './components/Charts/CorrelationHeatmap';
import { AnalysisButton } from './components/Analysis/AnalysisButton';
import { PatternContainer } from './components/Analysis/PatternContainer';
import { CausesContainer } from './components/Analysis/CausesContainer';
import { UrgencyContainer } from './components/Analysis/UrgencyContainer';
import { ActionsContainer } from './components/Analysis/ActionsContainer';
import { useSymptomData } from './hooks/useSymptomData';
import { useAnalysis } from './hooks/useAnalysis';
import { StorageService } from './services/storage';
import { AlertCircle } from 'lucide-react';

type View = 'calendar' | 'charts' | 'analysis';

function App() {
  const [activeView, setActiveView] = useState<View>('calendar');
  const [demoMode, setDemoMode] = useState(false);

  const { 
    entries, 
    addEntry, 
    deleteEntry, 
    refresh 
  } = useSymptomData();

  const {
    analysisState,
    analysisResult,
    error: analysisError,
    canAnalyze,
    analyzeSymptoms,
    daysUntilAnalysis
  } = useAnalysis(entries);

  useEffect(() => {
    setDemoMode(StorageService.isDemoMode());
  }, []);

  const handleExport = () => {
    try {
      const data = StorageService.exportData();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `symptom-tracker-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      alert('Failed to export data');
    }
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      try {         const text = await file.text();
        StorageService.importData(text);
        refresh();
        alert('Data imported successfully!');
      } catch (error) {
        alert('Failed to import data. Please check the file format.');
      }
    };
    input.click();
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to delete all data? This cannot be undone.')) {
      StorageService.clearAllData();
      setDemoMode(false);
      // Force a page reload to ensure clean state
      window.location.reload();
    }
  };

  const handleDemoModeToggle = () => {
    setDemoMode(!demoMode);
    refresh();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="flex">
        <Sidebar
          activeView={activeView}
          onViewChange={setActiveView}
          onExport={handleExport}
          onImport={handleImport}
          onClear={handleClear}
          demoMode={demoMode}
          onDemoModeToggle={handleDemoModeToggle}
        />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <PrivacyBanner />

            {/* Calendar View */}
            {activeView === 'calendar' && (
              <CalendarView
                entries={entries}
                onSaveEntry={addEntry}
                onDeleteEntry={deleteEntry}
              />
            )}

            {/* Charts View */}
            {activeView === 'charts' && (
              <div className="space-y-6">
                <SymptomFrequency entries={entries} />
                <SeverityTrend entries={entries} />
                <CorrelationHeatmap entries={entries} />
              </div>
            )}

            {/* Analysis View */}
            {activeView === 'analysis' && (
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    AI Pattern Analysis
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {entries.length === 0 
                      ? 'Start logging symptoms to unlock AI analysis'
                      : `You have logged ${entries.length} days of data`
                    }
                  </p>

                  {analysisError && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-red-900">Analysis Error</p>
                        <p className="text-sm text-red-800 mt-1">{analysisError}</p>
                      </div>
                    </div>
                  )}

                  <AnalysisButton
                    state={analysisState}
                    canAnalyze={canAnalyze}
                    daysUntilAnalysis={daysUntilAnalysis}
                    onAnalyze={analyzeSymptoms}
                  />
                </div>

                {/* Show results if analysis is complete */}
                {analysisState === 'complete' && analysisResult && (
                  <div className="space-y-6">
                    <PatternContainer patterns={analysisResult.patterns} />
                    <CausesContainer causes={analysisResult.possibleCauses} />
                    <UrgencyContainer
                      urgencyScore={analysisResult.urgencyScore}
                      urgencyReasoning={analysisResult.urgencyReasoning}
                      redFlags={analysisResult.redFlags}
                    />
                    <ActionsContainer
                      selfCareActions={analysisResult.selfCareActions}
                      doctorQuestions={analysisResult.doctorQuestions}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Disclaimer */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-900">
                <strong>Medical Disclaimer:</strong> This application is for demonstration and personal tracking purposes only. 
                It is not intended for medical diagnosis. Always consult healthcare professionals for medical advice.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
