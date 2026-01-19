import { SymptomEntry, StorageData, StoredAnalysis, AIAnalysisResult } from '../types';
import { STORAGE_KEY, STORAGE_VERSION } from '../utils/constants';

const DEFAULT_STORAGE: StorageData = {
  version: STORAGE_VERSION,
  entries: [],
  analyses: [],
  preferences: {
    demoMode: false,
    notificationsEnabled: false
  }
};

export class StorageService {
  private static getData(): StorageData {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return DEFAULT_STORAGE;
      
      const parsed = JSON.parse(data);
      
      // Handle version migrations if needed
      if (parsed.version !== STORAGE_VERSION) {
        return this.migrateData(parsed);
      }
      
      return parsed;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return DEFAULT_STORAGE;
    }
  }

  private static saveData(data: StorageData): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
      throw new Error('Failed to save data. Storage may be full.');
    }
  }

  private static migrateData(oldData: any): StorageData {
    // Future version migrations would go here
    return {
      ...DEFAULT_STORAGE,
      ...oldData,
      version: STORAGE_VERSION
    };
  }

  // Entry operations
  static getAllEntries(): SymptomEntry[] {
    return this.getData().entries;
  }

  static getEntryByDate(date: string): SymptomEntry | null {
    const entries = this.getAllEntries();
    return entries.find(entry => entry.date === date) || null;
  }

  static addEntry(entry: SymptomEntry): void {
    const data = this.getData();
    
    // Remove existing entry for this date if it exists
    data.entries = data.entries.filter(e => e.date !== entry.date);
    
    // Add new entry
    data.entries.push(entry);
    
    // Sort by date
    data.entries.sort((a, b) => a.date.localeCompare(b.date));
    
    this.saveData(data);
  }

  static updateEntry(date: string, updatedEntry: SymptomEntry): void {
    const data = this.getData();
    const index = data.entries.findIndex(e => e.date === date);
    
    if (index !== -1) {
      data.entries[index] = updatedEntry;
      this.saveData(data);
    }
  }

  static deleteEntry(date: string): void {
    const data = this.getData();
    data.entries = data.entries.filter(e => e.date !== date);
    this.saveData(data);
  }

  // Analysis operations
  static saveAnalysis(analysis: AIAnalysisResult, dataSnapshot: SymptomEntry[]): void {
    const data = this.getData();
    
    const storedAnalysis: StoredAnalysis = {
      date: new Date().toISOString(),
      analysis,
      dataSnapshot
    };
    
    data.analyses.push(storedAnalysis);
    
    // Keep only last 10 analyses
    if (data.analyses.length > 10) {
      data.analyses = data.analyses.slice(-10);
    }
    
    this.saveData(data);
  }

  static getLatestAnalysis(): StoredAnalysis | null {
    const data = this.getData();
    return data.analyses.length > 0 
      ? data.analyses[data.analyses.length - 1]
      : null;
  }

  static getAllAnalyses(): StoredAnalysis[] {
    return this.getData().analyses;
  }

  // Preferences
  static getPreferences() {
    return this.getData().preferences;
  }

  static setDemoMode(enabled: boolean): void {
    const data = this.getData();
    data.preferences.demoMode = enabled;
    this.saveData(data);
  }

  static isDemoMode(): boolean {
    return this.getData().preferences.demoMode;
  }

  // Data management
  static exportData(): string {
    const data = this.getData();
    return JSON.stringify(data, null, 2);
  }

  static importData(jsonData: string): void {
    try {
      const data = JSON.parse(jsonData);
      
      // Validate structure
      if (!data.entries || !Array.isArray(data.entries)) {
        throw new Error('Invalid data format');
      }
      
      this.saveData({
        ...DEFAULT_STORAGE,
        ...data,
        version: STORAGE_VERSION
      });
    } catch (error) {
      console.error('Error importing data:', error);
      throw new Error('Invalid data format. Please check your JSON file.');
    }
  }

  static clearAllData(): void {
    this.saveData(DEFAULT_STORAGE);
  }

  static clearEntries(): void {
    const data = this.getData();
    data.entries = [];
    this.saveData(data);
  }
}
