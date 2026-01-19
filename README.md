# Symptom Tracker + Pattern Analyzer

AI-powered symptom tracking with intelligent pattern recognition to help users understand their health trends.

## Features

- **Daily Symptom Logging** - Track symptoms with severity ratings and contextual factors
- **Pattern Detection** - AI identifies correlations and trends in symptom data
- **Root Cause Analysis** - Ranked possible causes with supporting evidence
- **Urgency Assessment** - 1-10 score with red flag detection for emergency situations
- **Actionable Insights** - Evidence-based self-care suggestions and doctor consultation questions
- **Data Visualizations** - Charts showing symptom frequency, severity trends, and correlations
- **Privacy-First** - All data stored locally in browser (localStorage)

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** TailwindCSS
- **AI:** Groq API (llama-3.1-70b-versatile)
- **Charts:** Recharts
- **Storage:** Browser localStorage
- **Deployment:** Vercel/Netlify compatible

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Groq API key (free tier available at https://console.groq.com)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/symptom-tracker.git
cd symptom-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Add your Groq API key to `.env.local`:
```
VITE_GROQ_API_KEY=gsk_your_api_key_here
```

5. Start the development server:
```bash
npm run dev
```

6. Open http://localhost:3000 in your browser

## Usage Guide

### Logging Symptoms

1. Navigate to the Calendar view
2. Click any date to open the symptom entry modal
3. Select symptoms from categorized lists (pain, digestive, respiratory, mental, other)
4. Rate each symptom's severity on a 1-10 scale
5. Add context factors (stress level, sleep hours, exercise)
6. Optionally add notes
7. Save the entry

### Analyzing Patterns

1. Log symptoms for at least 7 days
2. Navigate to the Analysis view
3. Click "Analyze Symptom Patterns"
4. Review the AI-generated insights:
   - Detected patterns with confidence levels
   - Possible causes ranked by likelihood
   - Urgency assessment with red flags
   - Self-care suggestions and doctor questions

### Viewing Charts

1. Navigate to the Charts view
2. Review visualizations:
   - Most common symptoms (bar chart)
   - Severity over time (line chart)
   - Symptom correlations with context factors

### Data Management

- **Export:** Download your data as JSON for backup or device transfer
- **Import:** Load previously exported data
- **Demo Mode:** Pre-populate with 14 days of sample data to explore features
- **Clear All:** Delete all stored data

## Project Structure

```
symptom-tracker/
├── public/                     # Static assets
├── src/
│   ├── components/
│   │   ├── Calendar/          # Calendar and symptom entry components
│   │   ├── Analysis/          # AI analysis result containers
│   │   ├── Charts/            # Data visualization components
│   │   ├── DataManagement/    # Import/export components
│   │   └── Layout/            # Header, sidebar, privacy banner
│   ├── hooks/
│   │   ├── useSymptomData.ts  # Symptom data CRUD operations
│   │   └── useAnalysis.ts     # AI analysis state management
│   ├── services/
│   │   ├── storage.ts         # localStorage wrapper
│   │   ├── aiAnalysis.ts      # Groq API integration
│   │   └── dataProcessing.ts  # Data transformation for charts
│   ├── types/
│   │   └── index.ts           # TypeScript type definitions
│   ├── utils/
│   │   ├── constants.ts       # Symptom categories, thresholds
│   │   ├── dateHelpers.ts     # Date manipulation utilities
│   │   └── demoData.ts        # Sample data generator
│   ├── App.tsx                # Main application component
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles and Tailwind imports
├── .env.example               # Environment variable template
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.js         # TailwindCSS configuration
├── vite.config.ts             # Vite build configuration
└── README.md                  # This file
```

## Deployment

### Deploying to Vercel

1. Push your code to GitHub

2. Import the repository in Vercel dashboard

3. Add environment variable:
   - Key: `VITE_GROQ_API_KEY`
   - Value: Your Groq API key

4. Deploy

### Deploying to Netlify

1. Push your code to GitHub

2. Import the repository in Netlify dashboard

3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

4. Add environment variable:
   - Key: `VITE_GROQ_API_KEY`
   - Value: Your Groq API key

5. Deploy

## API Key Setup

### Getting a Groq API Key

1. Visit https://console.groq.com
2. Sign up for a free account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (starts with `gsk_`)
6. Add to your `.env.local` file

The free tier includes:
- 30 requests per minute
- Sufficient for personal use and demonstrations

## Data Privacy

- **Local Storage:** All symptom data is stored in your browser's localStorage
- **No Account Required:** No user registration or authentication
- **AI Analysis Only:** Data is only sent to external services (Groq API) during analysis requests
- **No Tracking:** No analytics or tracking scripts
- **Export Control:** Full control over your data with export/import functionality

## Important Disclaimers

**For Demonstration and Personal Tracking Purposes Only**

This application:
- Is NOT intended for medical diagnosis
- Should NOT replace professional medical advice
- Does NOT store data on external servers (except during AI analysis)
- Is NOT HIPAA compliant for clinical use
- Should be used alongside, not instead of, healthcare provider consultations

Always consult qualified healthcare professionals for medical concerns.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Adding New Features

1. **New Symptom Category:** Update `SYMPTOM_CATEGORIES` in `src/utils/constants.ts`
2. **Custom Analysis Prompt:** Modify `buildPrompt()` in `src/services/aiAnalysis.ts`
3. **Additional Charts:** Create new component in `src/components/Charts/`
4. **Context Factors:** Update `ContextFactors` type and modal UI

## Troubleshooting

### Analysis Not Working

- Verify Groq API key is set in `.env.local`
- Check browser console for error messages
- Ensure at least 7 days of data are logged
- Try refreshing the page

### Data Not Persisting

- Check browser localStorage is enabled
- Verify you're not in private/incognito mode
- Try exporting data as backup

### Build Errors

- Delete `node_modules` and run `npm install` again
- Ensure Node.js version is 18+
- Check TypeScript errors with `npm run build`

## Architecture Decisions

### Why localStorage?

- Privacy-first: No server-side storage
- Zero setup for users
- Works offline
- HIPAA-safe for demonstrations (no PHI on servers)

### Why Groq API?

- Fast inference (llama-3.1-70b)
- Generous free tier
- Good medical reasoning capabilities
- Simple REST API

### Why Client-Side Analysis?

- Simpler deployment (static hosting)
- Lower costs (no backend servers)
- Privacy-focused (data stays local)
- Suitable for portfolio demonstration

## Future Enhancements

Potential improvements (not currently implemented):

- PWA support for offline functionality
- Reminder notifications for daily logging
- Multi-user support for family tracking
- Export to PDF for doctor visits
- Wearable device integration
- Symptom prediction based on patterns
- Backend API for cross-device sync (optional)

## License

MIT License - See LICENSE file for details

## Contributing

This is a portfolio project. If you'd like to use it as a base for your own work, feel free to fork and modify.

## Contact

For questions about this project, please open an issue on GitHub.

---

**Built as a demonstration project for healthcare ML engineering applications.**
