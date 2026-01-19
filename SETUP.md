# Quick Setup Guide

Get the Symptom Tracker running locally in 5 minutes.

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- A Groq API key (free at https://console.groq.com)

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/symptom-tracker.git
cd symptom-tracker
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
# Copy the example environment file
cp .env.example .env.local

# Open .env.local and add your Groq API key
# VITE_GROQ_API_KEY=gsk_your_api_key_here
```

To get a Groq API key:
1. Visit https://console.groq.com
2. Sign up for a free account
3. Go to API Keys section
4. Create a new key
5. Copy the key (starts with `gsk_`)

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at http://localhost:3000

## First Time Usage

1. **Try Demo Mode**
   - Click the sidebar
   - Enable "Demo Mode" toggle
   - This loads 14 days of sample data
   - Great for exploring features

2. **Or Start Fresh**
   - Click any date in the calendar
   - Add symptoms and severity ratings
   - Include context factors (stress, sleep, exercise)
   - Save the entry

3. **Analyze Patterns**
   - After logging 7+ days
   - Navigate to Analysis view
   - Click "Analyze Symptom Patterns"
   - Review AI-generated insights

## Project Structure

```
symptom-tracker/
├── src/
│   ├── components/     # React components
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API and storage logic
│   ├── types/          # TypeScript definitions
│   ├── utils/          # Helper functions
│   └── App.tsx         # Main app component
├── public/             # Static assets
└── package.json        # Dependencies
```

## Available Commands

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build            # Build for production
npm run preview          # Preview production build

# Deployment
vercel                   # Deploy to Vercel
netlify deploy           # Deploy to Netlify
```

## Key Features to Test

1. **Calendar Logging**
   - Click dates to add symptoms
   - Rate severity 1-10
   - Add context factors

2. **Charts View**
   - Symptom frequency bar chart
   - Severity trends line chart
   - Correlation heatmap

3. **AI Analysis**
   - Pattern detection
   - Possible causes ranking
   - Urgency assessment
   - Self-care suggestions

4. **Data Management**
   - Export data as JSON
   - Import previously exported data
   - Clear all data

## Troubleshooting

**Port 3000 already in use?**
```bash
# The dev server will automatically try port 3001, 3002, etc.
# Or specify a port:
npm run dev -- --port 3001
```

**Dependencies won't install?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors?**
```bash
# Check your Node.js version
node --version  # Should be 18+

# Rebuild
npm run build
```

**API key not working?**
- Ensure it starts with `gsk_`
- Check it's in `.env.local` not `.env`
- Restart dev server after adding key
- Variable name must be exactly `VITE_GROQ_API_KEY`

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment instructions
- Explore the codebase to understand the architecture
- Customize symptom categories in `src/utils/constants.ts`

## Getting Help

- Check browser console for error messages
- Review application logs in terminal
- Ensure all dependencies installed correctly
- Verify Node.js version compatibility

## Configuration Files

- `vite.config.ts` - Build configuration
- `tsconfig.json` - TypeScript settings
- `tailwind.config.js` - Styling configuration
- `.env.local` - Environment variables (not in git)

## Privacy & Security

- All data stored in browser localStorage
- No server-side storage
- Data only sent to Groq API during analysis
- Export your data regularly as backup
- Use demo mode for testing

## Development Tips

1. **Hot Module Replacement**
   - Changes reload automatically
   - State preserved where possible

2. **TypeScript**
   - Types defined in `src/types/`
   - Check with `npm run build`

3. **Component Structure**
   - Organized by feature
   - Reusable components in shared folders

4. **State Management**
   - React hooks for local state
   - localStorage for persistence

## Ready to Deploy?

See [DEPLOYMENT.md](DEPLOYMENT.md) for:
- Vercel deployment
- Netlify deployment
- Custom domain setup
- Production optimization

## License

MIT License - Free to use and modify
