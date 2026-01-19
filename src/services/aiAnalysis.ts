import { SymptomEntry, AIAnalysisResult } from '../types';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

export class AIAnalysisService {
  private static getApiKey(): string {
    const key = import.meta.env.VITE_GROQ_API_KEY;
    if (!key) {
      throw new Error('GROQ_API_KEY not configured. Please add it to your .env.local file.');
    }
    return key;
  }

  private static buildPrompt(entries: SymptomEntry[]): string {
    const symptomData = JSON.stringify(entries, null, 2);

    return `You are a medical pattern analyst assistant. Analyze this symptom log and provide structured insights.

SYMPTOM DATA:
${symptomData}

Provide your analysis in valid JSON format with the following structure:
{
  "patterns": [
    {
      "description": "Clear description of the pattern observed",
      "confidence": "high|medium|low",
      "evidence": ["Specific observation 1", "Specific observation 2"]
    }
  ],
  "possibleCauses": [
    {
      "cause": "Name of potential cause",
      "likelihood": "high|medium|low",
      "reasoning": "Why this is a likely cause"
    }
  ],
  "urgencyScore": 1-10,
  "urgencyReasoning": "Explanation of urgency level",
  "redFlags": ["Emergency warning sign 1", "Emergency warning sign 2"],
  "selfCareActions": ["Evidence-based self-care suggestion 1", "Self-care suggestion 2"],
  "doctorQuestions": ["Question to ask healthcare provider 1", "Question 2"]
}

IMPORTANT GUIDELINES:
1. Be medically conservative - encourage professional consultation for concerning patterns
2. Base patterns on temporal correlations, frequency changes, and severity trends
3. Consider common conditions but DO NOT diagnose
4. Use plain language, avoid excessive medical jargon
5. If urgency score > 7, emphasize seeking immediate medical care
6. Include red flags that would warrant emergency care
7. Focus on actionable insights
8. Provide 3-5 patterns maximum
9. Rank possible causes by likelihood
10. Return ONLY valid JSON, no additional text

Analyze the data now:`;
  }

  static async analyzeSymptoms(entries: SymptomEntry[]): Promise<AIAnalysisResult> {
    const apiKey = this.getApiKey();
    const prompt = this.buildPrompt(entries);

    try {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [
            {
              role: 'system',
              content: 'You are a helpful medical pattern analysis assistant. You provide structured JSON responses for symptom analysis.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.3,
          max_tokens: 2000,
          response_format: { type: 'json_object' }
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please try again in a moment.');
        } else if (response.status === 401) {
          throw new Error('Invalid API key. Please check your GROQ_API_KEY in .env.local');
        } else {
          throw new Error(errorData.error?.message || `API error: ${response.status}`);
        }
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;

      if (!content) {
        throw new Error('Empty response from API');
      }

      // Parse and validate the JSON response
      const analysis = JSON.parse(content);

      // Validate required fields
      if (!analysis.patterns || !analysis.possibleCauses || typeof analysis.urgencyScore !== 'number') {
        throw new Error('Invalid response format from AI');
      }

      // Ensure all required fields exist with defaults
      return {
        patterns: analysis.patterns || [],
        possibleCauses: analysis.possibleCauses || [],
        urgencyScore: Math.min(Math.max(analysis.urgencyScore, 1), 10),
        urgencyReasoning: analysis.urgencyReasoning || 'No specific reasoning provided.',
        selfCareActions: analysis.selfCareActions || [],
        doctorQuestions: analysis.doctorQuestions || [],
        redFlags: analysis.redFlags || []
      };

    } catch (error: any) {
      console.error('Analysis error:', error);

      // Provide helpful error messages
      if (error.message.includes('API key')) {
        throw error;
      } else if (error.message.includes('Rate limit')) {
        throw error;
      } else if (error instanceof SyntaxError) {
        throw new Error('Failed to parse AI response. Please try again.');
      } else {
        throw new Error(error.message || 'Analysis failed. Please check your connection and try again.');
      }
    }
  }

  // Fallback method for when Groq is unavailable (demo purposes)
  static getMockAnalysis(entries: SymptomEntry[]): AIAnalysisResult {
    const symptomNames = entries.flatMap(e => e.symptoms.map(s => s.name));
    const uniqueSymptoms = Array.from(new Set(symptomNames));
    const avgSeverity = entries.flatMap(e => e.symptoms.map(s => s.severity))
      .reduce((a, b) => a + b, 0) / Math.max(entries.flatMap(e => e.symptoms).length, 1);

    return {
      patterns: [
        {
          description: `${uniqueSymptoms[0] || 'Symptoms'} occur with varying frequency across the tracking period`,
          confidence: 'medium',
          evidence: [
            `Tracked across ${entries.length} days`,
            `Average severity: ${avgSeverity.toFixed(1)}/10`
          ]
        }
      ],
      possibleCauses: [
        {
          cause: 'Multiple factors contributing',
          likelihood: 'medium',
          reasoning: 'Patterns suggest lifestyle and environmental factors may be involved'
        }
      ],
      urgencyScore: Math.min(Math.ceil(avgSeverity), 10),
      urgencyReasoning: 'Symptoms appear manageable but warrant medical consultation if persistent',
      selfCareActions: [
        'Continue tracking symptoms daily',
        'Note any triggering factors or patterns',
        'Maintain regular sleep schedule'
      ],
      doctorQuestions: [
        'What diagnostic tests would you recommend?',
        'Are these symptoms related to a specific condition?',
        'What treatment options are available?'
      ],
      redFlags: [
        'Sudden severe worsening of symptoms',
        'New symptoms that develop rapidly',
        'Difficulty performing daily activities'
      ]
    };
  }
}
