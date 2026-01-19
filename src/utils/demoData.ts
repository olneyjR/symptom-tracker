import { SymptomEntry } from '../types';
import { formatDate } from './dateHelpers';

export function generateDemoData(): SymptomEntry[] {
  const today = new Date();
  const entries: SymptomEntry[] = [];

  // Generate 14 days of sample data
  for (let i = 13; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = formatDate(date);

    // Vary the symptoms and severity
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    let entry: SymptomEntry;

    if (i % 3 === 0) {
      // Headache days
      entry = {
        date: dateStr,
        symptoms: [
          { name: 'Headache', severity: 6 + Math.floor(Math.random() * 3), category: 'pain' },
          { name: 'Fatigue', severity: 5 + Math.floor(Math.random() * 3), category: 'mental' }
        ],
        notes: 'Long day, poor sleep last night',
        contextFactors: {
          stress: isWeekend ? 3 : 7 + Math.floor(Math.random() * 2),
          sleep: 5 + Math.random() * 2,
          exercise: false,
          medication: []
        }
      };
    } else if (i % 4 === 0) {
      // Digestive issues
      entry = {
        date: dateStr,
        symptoms: [
          { name: 'Nausea', severity: 4 + Math.floor(Math.random() * 3), category: 'digestive' },
          { name: 'Bloating', severity: 5 + Math.floor(Math.random() * 2), category: 'digestive' }
        ],
        notes: 'After eating lunch',
        contextFactors: {
          stress: 5 + Math.floor(Math.random() * 3),
          sleep: 6 + Math.random() * 2,
          exercise: Math.random() > 0.5,
          medication: []
        }
      };
    } else if (i % 5 === 0) {
      // Anxiety days
      entry = {
        date: dateStr,
        symptoms: [
          { name: 'Anxiety', severity: 6 + Math.floor(Math.random() * 3), category: 'mental' },
          { name: 'Insomnia', severity: 5 + Math.floor(Math.random() * 3), category: 'mental' }
        ],
        notes: 'Work deadline approaching',
        contextFactors: {
          stress: 8 + Math.floor(Math.random() * 2),
          sleep: 4 + Math.random() * 2,
          exercise: false,
          medication: []
        }
      };
    } else if (Math.random() > 0.6) {
      // Mixed symptoms
      entry = {
        date: dateStr,
        symptoms: [
          { name: 'Back pain', severity: 4 + Math.floor(Math.random() * 2), category: 'pain' },
          { name: 'Fatigue', severity: 4 + Math.floor(Math.random() * 2), category: 'mental' }
        ],
        notes: 'Sitting at desk all day',
        contextFactors: {
          stress: 5 + Math.floor(Math.random() * 3),
          sleep: 6 + Math.random() * 2,
          exercise: Math.random() > 0.7,
          medication: []
        }
      };
    } else {
      // Good days
      entry = {
        date: dateStr,
        symptoms: [
          { name: 'Fatigue', severity: 2 + Math.floor(Math.random() * 2), category: 'mental' }
        ],
        notes: 'Feeling better today',
        contextFactors: {
          stress: 3 + Math.floor(Math.random() * 2),
          sleep: 7 + Math.random() * 1.5,
          exercise: true,
          medication: []
        }
      };
    }

    entries.push(entry);
  }

  return entries;
}
