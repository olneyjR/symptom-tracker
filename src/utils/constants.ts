export const SYMPTOM_CATEGORIES = {
  pain: ['Headache', 'Back pain', 'Joint pain', 'Chest pain', 'Abdominal pain', 'Muscle pain', 'Neck pain'],
  digestive: ['Nausea', 'Vomiting', 'Diarrhea', 'Constipation', 'Bloating', 'Heartburn', 'Loss of appetite'],
  respiratory: ['Cough', 'Shortness of breath', 'Wheezing', 'Congestion', 'Sore throat', 'Runny nose'],
  mental: ['Anxiety', 'Depression', 'Fatigue', 'Insomnia', 'Irritability', 'Brain fog', 'Mood swings'],
  other: ['Fever', 'Dizziness', 'Rash', 'Swelling', 'Numbness', 'Tingling', 'Weakness']
};

export const STORAGE_KEY = 'symptom-tracker-data';
export const STORAGE_VERSION = '1.0.0';
export const MIN_DAYS_FOR_ANALYSIS = 7;

export const SEVERITY_LABELS = {
  1: 'Very Mild',
  2: 'Mild',
  3: 'Mild-Moderate',
  4: 'Moderate',
  5: 'Moderate',
  6: 'Moderate-Severe',
  7: 'Severe',
  8: 'Very Severe',
  9: 'Extremely Severe',
  10: 'Emergency'
};

export const URGENCY_THRESHOLDS = {
  low: 3,
  medium: 6,
  high: 8
};
