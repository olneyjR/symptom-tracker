import { SymptomEntry, Symptom } from '../types';
import { parseISODate } from '../utils/dateHelpers';

export interface SymptomFrequency {
  name: string;
  count: number;
  category: string;
  averageSeverity: number;
}

export interface SeverityTrend {
  date: string;
  averageSeverity: number;
  maxSeverity: number;
  symptomCount: number;
}

export interface CorrelationData {
  symptom: string;
  correlations: {
    factor: string;
    strength: number;
    type: 'positive' | 'negative' | 'neutral';
  }[];
}

export class DataProcessor {
  static getSymptomFrequencies(entries: SymptomEntry[]): SymptomFrequency[] {
    const frequencyMap = new Map<string, { 
      count: number; 
      totalSeverity: number; 
      category: string;
    }>();

    entries.forEach(entry => {
      entry.symptoms.forEach(symptom => {
        const existing = frequencyMap.get(symptom.name);
        if (existing) {
          existing.count++;
          existing.totalSeverity += symptom.severity;
        } else {
          frequencyMap.set(symptom.name, {
            count: 1,
            totalSeverity: symptom.severity,
            category: symptom.category
          });
        }
      });
    });

    return Array.from(frequencyMap.entries())
      .map(([name, data]) => ({
        name,
        count: data.count,
        category: data.category,
        averageSeverity: data.totalSeverity / data.count
      }))
      .sort((a, b) => b.count - a.count);
  }

  static getSeverityTrends(entries: SymptomEntry[]): SeverityTrend[] {
    return entries.map(entry => {
      const severities = entry.symptoms.map(s => s.severity);
      const avgSeverity = severities.length > 0 
        ? severities.reduce((a, b) => a + b, 0) / severities.length 
        : 0;
      const maxSeverity = severities.length > 0 
        ? Math.max(...severities) 
        : 0;

      return {
        date: entry.date,
        averageSeverity: Math.round(avgSeverity * 10) / 10,
        maxSeverity,
        symptomCount: entry.symptoms.length
      };
    }).sort((a, b) => a.date.localeCompare(b.date));
  }

  static getWeeklySummary(entries: SymptomEntry[]): {
    weekStart: string;
    averageSeverity: number;
    symptomCount: number;
    mostCommon: string;
  }[] {
    // Group entries by week
    const weeks = new Map<string, SymptomEntry[]>();
    
    entries.forEach(entry => {
      const date = parseISODate(entry.date);
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      const weekKey = weekStart.toISOString().split('T')[0];
      
      if (!weeks.has(weekKey)) {
        weeks.set(weekKey, []);
      }
      weeks.get(weekKey)!.push(entry);
    });

    return Array.from(weeks.entries()).map(([weekStart, weekEntries]) => {
      const allSymptoms = weekEntries.flatMap(e => e.symptoms);
      const avgSeverity = allSymptoms.length > 0
        ? allSymptoms.reduce((sum, s) => sum + s.severity, 0) / allSymptoms.length
        : 0;

      // Find most common symptom
      const symptomCounts = new Map<string, number>();
      allSymptoms.forEach(s => {
        symptomCounts.set(s.name, (symptomCounts.get(s.name) || 0) + 1);
      });
      const mostCommon = Array.from(symptomCounts.entries())
        .sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';

      return {
        weekStart,
        averageSeverity: Math.round(avgSeverity * 10) / 10,
        symptomCount: allSymptoms.length,
        mostCommon
      };
    }).sort((a, b) => a.weekStart.localeCompare(b.weekStart));
  }

  static calculateCorrelations(entries: SymptomEntry[]): CorrelationData[] {
    // Simple correlation analysis between symptoms and context factors
    const correlations: CorrelationData[] = [];
    
    // Get unique symptoms
    const symptomSet = new Set<string>();
    entries.forEach(entry => {
      entry.symptoms.forEach(s => symptomSet.add(s.name));
    });

    symptomSet.forEach(symptomName => {
      const symptomCorrelations: CorrelationData['correlations'] = [];
      
      // Analyze correlation with stress
      const stressCorrelation = this.calculateSimpleCorrelation(
        entries,
        symptomName,
        'stress'
      );
      if (stressCorrelation !== null) {
        symptomCorrelations.push(stressCorrelation);
      }

      // Analyze correlation with sleep
      const sleepCorrelation = this.calculateSimpleCorrelation(
        entries,
        symptomName,
        'sleep'
      );
      if (sleepCorrelation !== null) {
        symptomCorrelations.push(sleepCorrelation);
      }

      // Analyze correlation with exercise
      const exerciseCorrelation = this.calculateSimpleCorrelation(
        entries,
        symptomName,
        'exercise'
      );
      if (exerciseCorrelation !== null) {
        symptomCorrelations.push(exerciseCorrelation);
      }

      if (symptomCorrelations.length > 0) {
        correlations.push({
          symptom: symptomName,
          correlations: symptomCorrelations
        });
      }
    });

    return correlations;
  }

  private static calculateSimpleCorrelation(
    entries: SymptomEntry[],
    symptomName: string,
    factor: 'stress' | 'sleep' | 'exercise'
  ): { factor: string; strength: number; type: 'positive' | 'negative' | 'neutral' } | null {
    const data: { hasSymptom: boolean; factorValue: number }[] = [];

    entries.forEach(entry => {
      if (!entry.contextFactors) return;

      const hasSymptom = entry.symptoms.some(s => s.name === symptomName);
      let factorValue: number;

      if (factor === 'exercise') {
        factorValue = entry.contextFactors.exercise ? 1 : 0;
      } else {
        factorValue = entry.contextFactors[factor] || 0;
      }

      data.push({ hasSymptom, factorValue });
    });

    if (data.length < 3) return null;

    // Simple correlation coefficient calculation
    const withSymptom = data.filter(d => d.hasSymptom).map(d => d.factorValue);
    const withoutSymptom = data.filter(d => !d.hasSymptom).map(d => d.factorValue);

    if (withSymptom.length === 0 || withoutSymptom.length === 0) return null;

    const avgWith = withSymptom.reduce((a, b) => a + b, 0) / withSymptom.length;
    const avgWithout = withoutSymptom.reduce((a, b) => a + b, 0) / withoutSymptom.length;

    const difference = avgWith - avgWithout;
    const strength = Math.min(Math.abs(difference) / 5, 1); // Normalize to 0-1

    let type: 'positive' | 'negative' | 'neutral';
    if (strength < 0.2) {
      type = 'neutral';
    } else if (factor === 'sleep') {
      type = difference < 0 ? 'positive' : 'negative'; // Less sleep = more symptoms
    } else {
      type = difference > 0 ? 'positive' : 'negative';
    }

    const factorLabel = factor === 'exercise' 
      ? 'Exercise' 
      : factor.charAt(0).toUpperCase() + factor.slice(1);

    return {
      factor: factorLabel,
      strength: Math.round(strength * 100) / 100,
      type
    };
  }

  static getSymptomsByCategory(entries: SymptomEntry[]): Record<string, number> {
    const categoryCounts: Record<string, number> = {};

    entries.forEach(entry => {
      entry.symptoms.forEach(symptom => {
        categoryCounts[symptom.category] = (categoryCounts[symptom.category] || 0) + 1;
      });
    });

    return categoryCounts;
  }
}
