# Getting Started - Complete Guide

This guide will help you get the Symptom Tracker application running from scratch.

## What You Have

You now have a complete, production-ready React application with:
- 20+ React components
- AI-powered pattern analysis
- Data visualization charts
- Local data persistence
- Privacy-first architecture
- Full TypeScript type safety
- Comprehensive documentation

## Before You Begin

### Required Tools

1. **Node.js** (version 18 or higher)
   - Download from https://nodejs.org
   - Verify installation: `node --version`

2. **npm** (comes with Node.js)
   - Verify installation: `npm --version`

3. **Git** (for version control)
   - Download from https://git-scm.com
   - Verify installation: `git --version`

4. **Code Editor** (recommended: VS Code)
   - Download from https://code.visualstudio.com

### Required Accounts

1. **Groq API Account** (free)
   - Sign up at https://console.groq.com
   - Create an API key
   - Free tier: 30 requests/minute

2. **GitHub Account** (for deployment)
   - Sign up at https://github.com

3. **Vercel or Netlify Account** (for hosting)
   - Vercel: https://vercel.com
   - Netlify: https://netlify.com
   - Both offer free hosting

## Step-by-Step Setup

### Step 1: Extract and Navigate

```bash
# Navigate to the symptom-tracker directory
cd symptom-tracker

# Verify all files are present
ls -la
```

You should see:
- package.json
- src/ folder
- public/ folder
- Configuration files (tsconfig.json, vite.config.ts, etc.)
- Documentation files (README.md, SETUP.md, etc.)

### Step 2: Install Dependencies

```bash
# Install all required packages
npm install

# This will install:
# - React and React DOM
# - TypeScript and type definitions
# - Vite build tool
# - TailwindCSS for styling
# - Recharts for visualizations
# - date-fns for date handling
# - lucide-react for icons
```

Wait for installation to complete (2-5 minutes depending on internet speed).

### Step 3: Get Your Groq API Key

1. Visit https://console.groq.com
2. Click "Sign Up" (free)
3. Verify your email
4. Navigate to "API Keys" section
5. Click "Create API Key"
6. Name it "Symptom Tracker"
7. Copy the key (starts with `gsk_`)
8. Keep it safe - you'll need it in the next step

### Step 4: Configure Environment Variables

```bash
# Copy the example file
cp .env.example .env.local

# Open .env.local in your text editor
# Add your API key:
# VITE_GROQ_API_KEY=gsk_paste_your_key_here

# Save the file
```

Important notes:
- File must be named exactly `.env.local`
- Variable must start with `VITE_`
- No spaces around the `=` sign
- Don't share this file or commit it to git

### Step 5: Start Development Server

```bash
# Start the application
npm run dev
```

You should see:
```
VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

### Step 6: Open in Browser

1. Open your browser
2. Navigate to http://localhost:3000
3. You should see the Symptom Tracker application

## First Time Usage

### Option A: Try Demo Mode (Recommended)

1. Click the sidebar on the left
2. Find "Demo Mode" toggle at the bottom
3. Enable it
4. Confirm the prompt
5. You'll see 14 days of sample data loaded
6. Explore all features:
   - Calendar view with logged symptoms
   - Charts showing trends
   - Analysis view with AI insights

### Option B: Start Fresh

1. Navigate to Calendar view
2. Click today's date
3. Select symptoms from the categories:
   - Pain (headache, back pain, etc.)
   - Digestive (nausea, bloating, etc.)
   - Respiratory (cough, congestion, etc.)
   - Mental (anxiety, fatigue, etc.)
   - Other (fever, dizziness, etc.)
4. Rate severity (1-10)
5. Add context factors:
   - Stress level
   - Hours of sleep
   - Exercise today (yes/no)
6. Add notes (optional)
7. Click "Save Entry"

### Exploring Features

**Calendar View:**
- Green dot = mild symptoms
- Yellow dot = moderate symptoms
- Red dot = severe symptoms
- Click any date to view/edit

**Charts View:**
- Symptom frequency bar chart
- Severity trends line chart
- Correlation heatmap

**Analysis View:**
- Available after 7+ days of data
- Click "Analyze Symptom Patterns"
- Wait 5-15 seconds for AI analysis
- Review 4 result containers:
  1. Detected Patterns
  2. Possible Causes
  3. Urgency Assessment
  4. Action Items

## Testing the Application

### Manual Testing Checklist

Calendar Functionality:
- [ ] Can add symptoms for today
- [ ] Can edit existing entries
- [ ] Can delete entries
- [ ] Calendar navigation works
- [ ] Visual indicators show correctly

Charts:
- [ ] Symptom frequency displays
- [ ] Severity trend renders
- [ ] Correlation heatmap works

Analysis:
- [ ] Button appears after 7+ days
- [ ] Analysis completes successfully
- [ ] All 4 containers populate
- [ ] Patterns make sense
- [ ] Urgency score is reasonable

Data Management:
- [ ] Export downloads JSON file
- [ ] Import loads data correctly
- [ ] Clear all works (with confirmation)
- [ ] Demo mode loads sample data

## Building for Production

### Create Production Build

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

The build creates:
- Optimized JavaScript bundles
- Minified CSS
- Source maps for debugging
- All files in `dist/` folder

### Verify Production Build

1. Run `npm run preview`
2. Open http://localhost:4173
3. Test all features work correctly
4. Check browser console for errors
5. Verify performance is good

## Deploying to Vercel

### Quick Deploy

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

Follow prompts:
1. Set up new project? Yes
2. Project name: symptom-tracker
3. Link to existing project? No
4. Deploy? Yes

### Add Environment Variable

After deployment:
1. Go to vercel.com/dashboard
2. Find your project
3. Settings > Environment Variables
4. Add: `VITE_GROQ_API_KEY`
5. Value: Your Groq API key
6. Scope: Production
7. Save
8. Redeploy: `vercel --prod`

### Get Your Live URL

Your application is now live at:
`https://symptom-tracker-[random].vercel.app`

Share this link for demonstrations!

## Deploying to Netlify

### Quick Deploy

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize
netlify init

# Deploy
netlify deploy --prod
```

Follow prompts:
1. Create new site
2. Site name: symptom-tracker
3. Build command: `npm run build`
4. Publish directory: `dist`

### Add Environment Variable

1. Go to app.netlify.com
2. Your site > Site settings
3. Environment variables
4. Add variable:
   - Key: `VITE_GROQ_API_KEY`
   - Value: Your API key
5. Save
6. Redeploy

## Common Issues and Solutions

### Issue: Port 3000 already in use

**Solution:**
```bash
# Vite will automatically use next available port
# Or specify a port:
npm run dev -- --port 3001
```

### Issue: Dependencies won't install

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: TypeScript errors

**Solution:**
```bash
# Check Node.js version
node --version  # Should be 18+

# Update TypeScript
npm install -D typescript@latest

# Rebuild
npm run build
```

### Issue: API key not working

**Solutions:**
1. Verify key starts with `gsk_`
2. Check file is named `.env.local` exactly
3. Restart dev server after adding key
4. Variable name is `VITE_GROQ_API_KEY` exactly
5. No quotes around the key in .env.local

### Issue: Analysis fails

**Solutions:**
1. Check browser console for errors
2. Verify API key is correct
3. Check Groq API status
4. Ensure 7+ days of data logged
5. Check internet connection

### Issue: Charts not rendering

**Solutions:**
1. Check browser console
2. Ensure data exists (add symptoms)
3. Verify recharts is installed
4. Clear browser cache
5. Try different browser

## Project Structure Reference

```
symptom-tracker/
├── src/
│   ├── components/
│   │   ├── Analysis/          # AI results display
│   │   ├── Calendar/          # Symptom logging
│   │   ├── Charts/            # Visualizations
│   │   ├── DataManagement/    # Import/Export
│   │   └── Layout/            # Header, Sidebar
│   ├── hooks/
│   │   ├── useSymptomData.ts  # Data management
│   │   └── useAnalysis.ts     # AI analysis
│   ├── services/
│   │   ├── storage.ts         # localStorage
│   │   ├── aiAnalysis.ts      # Groq API
│   │   └── dataProcessing.ts  # Charts data
│   ├── types/
│   │   └── index.ts           # TypeScript types
│   ├── utils/
│   │   ├── constants.ts       # Configuration
│   │   ├── dateHelpers.ts     # Date utils
│   │   └── demoData.ts        # Sample data
│   ├── App.tsx                # Main component
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles
├── public/                     # Static files
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
├── vite.config.ts             # Build config
├── tailwind.config.js         # Styling config
├── .env.example               # Env template
├── .gitignore                 # Git ignore rules
├── README.md                  # Main documentation
├── SETUP.md                   # Quick setup guide
├── DEPLOYMENT.md              # Deploy instructions
└── PROJECT_OVERVIEW.md        # Technical overview
```

## Next Steps

### For Development
1. Customize symptom categories in `src/utils/constants.ts`
2. Modify AI prompt in `src/services/aiAnalysis.ts`
3. Add new chart types in `src/components/Charts/`
4. Enhance analysis logic in `src/services/dataProcessing.ts`

### For Portfolio
1. Deploy to Vercel/Netlify
2. Add screenshots to README
3. Record demo video (3-5 minutes)
4. Write blog post about development process
5. Share on LinkedIn/GitHub

### For Job Application
1. Include in resume projects section
2. Add live demo link
3. Highlight in cover letter:
   - AI/ML integration
   - Healthcare domain knowledge
   - Modern web development
   - Privacy-first design
4. Prepare to discuss:
   - Technical decisions
   - Healthcare considerations
   - Scalability plans
   - User research insights

## Getting Help

### Resources
- **Full Documentation:** See README.md
- **Deployment Guide:** See DEPLOYMENT.md
- **Technical Overview:** See PROJECT_OVERVIEW.md
- **React Docs:** https://react.dev
- **Vite Docs:** https://vitejs.dev
- **Groq Docs:** https://console.groq.com/docs

### Troubleshooting
1. Check browser console (F12)
2. Check terminal output
3. Verify all dependencies installed
4. Review error messages carefully
5. Check environment variables

### Support
- GitHub Issues (if public repo)
- Stack Overflow for general questions
- Groq Discord for API issues

## Success Checklist

Before considering the project complete:

Setup:
- [ ] All dependencies installed
- [ ] Environment variables configured
- [ ] Development server runs
- [ ] Application loads in browser

Features:
- [ ] Can log symptoms
- [ ] Charts display data
- [ ] AI analysis works
- [ ] Export/import functions
- [ ] Demo mode loads

Deployment:
- [ ] Production build succeeds
- [ ] Deployed to hosting platform
- [ ] Environment variables set
- [ ] Live site accessible
- [ ] All features work on live site

Documentation:
- [ ] README is complete
- [ ] API key instructions clear
- [ ] Deployment steps documented
- [ ] Code is commented

## You're Ready!

You now have a fully functional, production-ready symptom tracking application. The codebase demonstrates:

- Modern React development
- TypeScript best practices
- AI/ML integration
- Healthcare domain knowledge
- Privacy-first architecture
- Professional documentation

Use this project to showcase your skills to potential employers in healthcare technology roles!

Good luck with your job application!
