export interface Symptom {
  name: string;
  severity: number; // 1-10
  category: string;
}

export interface ContextFactors {
  stress: number; // 1-10
  sleep: number; // hours
  exercise: boolean;
  medication: string[];
}

export interface SymptomEntry {
  date: string; // ISO date format
  symptoms: Symptom[];
  notes: string;
  contextFactors?: ContextFactors;
}

export interface Pattern {
  description: string;
  confidence: 'high' | 'medium' | 'low';
  evidence: string[];
}

export interface PossibleCause {
  cause: string;
  likelihood: 'high' | 'medium' | 'low';
  reasoning: string;
}

export interface AIAnalysisResult {
  patterns: Pattern[];
  possibleCauses: PossibleCause[];
  urgencyScore: number; // 1-10
  urgencyReasoning: string;
  selfCareActions: string[];
  doctorQuestions: string[];
  redFlags?: string[];
}

export interface StoredAnalysis {
  date: string;
  analysis: AIAnalysisResult;
  dataSnapshot: SymptomEntry[];
}

export interface StorageData {
  version: string;
  entries: SymptomEntry[];
  analyses: StoredAnalysis[];
  preferences: {
    demoMode: boolean;
    notificationsEnabled: boolean;
  };
}

export type AnalysisState = 'empty' | 'insufficient-data' | 'analyzing' | 'complete' | 'error';
