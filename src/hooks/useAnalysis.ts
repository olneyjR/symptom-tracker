import { useState, useEffect } from 'react';
import { AIAnalysisResult, AnalysisState, SymptomEntry } from '../types';
import { AIAnalysisService } from '../services/aiAnalysis';
import { StorageService } from '../services/storage';
import { MIN_DAYS_FOR_ANALYSIS } from '../utils/constants';

export function useAnalysis(entries: SymptomEntry[]) {
  const [analysisState, setAnalysisState] = useState<AnalysisState>('empty');
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load latest analysis on mount
    const latest = StorageService.getLatestAnalysis();
    if (latest && latest.analysis) {
      setAnalysisResult(latest.analysis);
      setAnalysisState('complete');
    } else if (entries.length >= MIN_DAYS_FOR_ANALYSIS) {
      setAnalysisState('insufficient-data');
    } else {
      setAnalysisState('empty');
    }
  }, [entries.length]);

  const canAnalyze = entries.length >= MIN_DAYS_FOR_ANALYSIS;

  const analyzeSymptoms = async () => {
    if (!canAnalyze) {
      setError(`Need at least ${MIN_DAYS_FOR_ANALYSIS} days of data to analyze patterns`);
      return;
    }

    setAnalysisState('analyzing');
    setError(null);

    try {
      const result = await AIAnalysisService.analyzeSymptoms(entries);
      setAnalysisResult(result);
      setAnalysisState('complete');
      
      // Save analysis to storage
      StorageService.saveAnalysis(result, entries);
    } catch (err: any) {
      console.error('Analysis failed:', err);
      setError(err.message || 'Analysis failed. Please try again.');
      setAnalysisState('error');
    }
  };

  const clearAnalysis = () => {
    setAnalysisResult(null);
    setAnalysisState(entries.length >= MIN_DAYS_FOR_ANALYSIS ? 'insufficient-data' : 'empty');
    setError(null);
  };

  return {
    analysisState,
    analysisResult,
    error,
    canAnalyze,
    analyzeSymptoms,
    clearAnalysis,
    daysUntilAnalysis: Math.max(0, MIN_DAYS_FOR_ANALYSIS - entries.length)
  };
}
