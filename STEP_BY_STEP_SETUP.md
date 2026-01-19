# Symptom Tracker - Complete Setup Guide

## Step 1: Download and Extract Project

### Download the Project Files

In this Claude conversation, look for the file outputs section. You should see a **symptom-tracker** folder.

**Option A: Download from Claude Interface**
1. Look for the symptom-tracker folder in the outputs/downloads section of this conversation
2. Click to download the entire folder
3. It will download as a .zip file
4. Move the downloaded zip to your Desktop

**Option B: If files are shown individually**
1. Download all the files from the outputs section
2. Create a folder on your Desktop called "symptom-tracker"
3. Move all downloaded files into that folder

### Navigate to Desktop

Open Terminal and run:

```bash
cd ~/Desktop
```

### Extract the Project (if downloaded as zip)

```bash
# If you downloaded a zip file:
unzip symptom-tracker.zip

# Then navigate to it:
cd symptom-tracker
```

**OR if you created the folder manually:**

```bash
cd symptom-tracker
```

### Verify All Files Are Present

```bash
ls -la
```

You should see:
- package.json
- src/ folder
- public/ folder
- index.html
- vite.config.ts
- tsconfig.json
- tailwind.config.js
- README.md
- and other config files

## Step 2: Install Dependencies

### Install Node Packages

```bash
npm install
```

This will install all dependencies listed in package.json. Takes 2-3 minutes.

Wait for it to complete. You should see:
```
added XXX packages, and audited XXX packages in XXs
```

## Step 3: Get Your Groq API Key

### Sign Up for Groq

1. Open browser and go to: https://console.groq.com
2. Click "Sign Up" (free account)
3. Verify your email
4. Log in to Groq Console

### Create API Key

1. Click "API Keys" in the left sidebar
2. Click "Create API Key"
3. Name it: "Symptom Tracker"
4. Click "Create"
5. Copy the API key (starts with `gsk_`)
6. Save it somewhere safe - you'll need it in the next step

## Step 4: Configure Environment Variables

### Create Environment File

```bash
cp .env.example .env.local
```

### Add Your API Key

Open `.env.local` in your text editor:

```bash
# If you have VS Code:
code .env.local

# Or use nano:
nano .env.local

# Or any text editor you prefer
```

Replace the placeholder with your actual API key:

```
VITE_GROQ_API_KEY=gsk_paste_your_actual_key_here
```

Save and close the file.

**Important**: 
- No spaces around the `=` sign
- No quotes around the key
- File must be named exactly `.env.local`

## Step 5: Test Locally

### Start Development Server

```bash
npm run dev
```

You should see:
```
VITE v5.0.8  ready in XXX ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### Open in Browser

1. Open your browser
2. Go to: http://localhost:3000
3. You should see the Symptom Tracker application

### Test Basic Functionality

1. Click on today's date in the calendar
2. Select a symptom (e.g., "Headache")
3. Adjust the severity slider
4. Add context factors
5. Click "Save Entry"
6. Verify the entry appears on the calendar

### Stop the Server

Press `Ctrl+C` in the terminal to stop the dev server.

## Step 6: Test Demo Mode

### Restart Server

```bash
npm run dev
```

### Enable Demo Mode

1. In the browser at http://localhost:3000
2. Look at the left sidebar
3. Find "Demo Mode" toggle at the bottom
4. Toggle it ON
5. Confirm the prompt
6. You should see 14 days of sample data load

### Test AI Analysis

1. Navigate to "Analysis" view (sidebar)
2. Click "Analyze Symptom Patterns" button
3. Wait 10-15 seconds
4. Verify all 4 result containers populate:
   - Patterns Detected
   - Possible Causes
   - Urgency Score
   - Action Items

### Test Charts

1. Navigate to "Charts" view (sidebar)
2. Verify three charts display:
   - Symptom Frequency (bar chart)
   - Severity Over Time (line chart)
   - Symptom Correlations (heatmap)

### Stop Server

Press `Ctrl+C` when testing is complete.

## Step 7: Build for Production

### Create Production Build

```bash
npm run build
```

You should see:
```
vite v5.0.8 building for production...
✓ XXX modules transformed.
dist/index.html                  X.XX kB
dist/assets/index-XXXXX.js      XXX.XX kB
✓ built in XXXms
```

### Preview Production Build

```bash
npm run preview
```

Browser should open to http://localhost:4173

Test the production build:
- [ ] Application loads
- [ ] Can log symptoms
- [ ] Charts display
- [ ] Analysis works
- [ ] No console errors (press F12 to check)

Press `Ctrl+C` to stop preview server.

## Step 8: Initialize Git Repository

### Initialize Git

```bash
git init
```

### Create .gitignore (if not already present)

Verify .gitignore exists and contains:
```bash
cat .gitignore
```

Should include:
- node_modules
- dist
- .env.local
- *.local

### Make Initial Commit

```bash
git add .
git commit -m "Initial commit: Symptom Tracker application"
```

## Step 9: Push to GitHub

### Create GitHub Repository

1. Go to https://github.com
2. Click "+" icon in top right
3. Click "New repository"
4. Repository name: `symptom-tracker`
5. Description: "AI-powered symptom tracking with pattern analysis"
6. Keep it Public
7. Do NOT initialize with README (we already have one)
8. Click "Create repository"

### Connect Local to GitHub

Replace `YOUR_USERNAME` with your actual GitHub username:

```bash
git remote add origin https://github.com/YOUR_USERNAME/symptom-tracker.git
git branch -M main
git push -u origin main
```

Enter your GitHub credentials when prompted.

### Verify on GitHub

1. Go to https://github.com/YOUR_USERNAME/symptom-tracker
2. Verify all files are there
3. Check that README.md displays properly

## Step 10: Deploy to Vercel

### Install Vercel CLI

```bash
npm install -g vercel
```

### Login to Vercel

```bash
vercel login
```

Follow the prompts:
1. Choose authentication method (GitHub recommended)
2. Authorize in browser
3. Return to terminal

### Deploy

```bash
vercel
```

Answer the prompts:
```
? Set up and deploy "~/Desktop/symptom-tracker"? [Y/n] Y
? Which scope do you want to deploy to? [Your account]
? Link to existing project? [y/N] N
? What's your project's name? symptom-tracker
? In which directory is your code located? ./
```

Vercel will:
1. Detect it's a Vite project
2. Configure build settings automatically
3. Deploy your application

You'll see:
```
🔗  Preview: https://symptom-tracker-xxxxx.vercel.app
```

### Add Environment Variable

```bash
vercel env add VITE_GROQ_API_KEY
```

When prompted:
```
? What's the value of VITE_GROQ_API_KEY? [paste your API key]
? Add VITE_GROQ_API_KEY to which Environments? Production
```

### Deploy to Production

```bash
vercel --prod
```

Your production URL will be displayed:
```
🔗  Production: https://symptom-tracker-xxxxx.vercel.app
```

## Step 11: Verify Deployment

### Test Live Site

1. Open the production URL in your browser
2. Test all features:
   - [ ] Calendar loads
   - [ ] Can add symptoms
   - [ ] Demo mode works
   - [ ] Analysis runs (after 7+ days of data)
   - [ ] Charts display
   - [ ] Export/import works
   - [ ] No console errors

### Check Build Logs

If something doesn't work:
1. Go to https://vercel.com/dashboard
2. Find your project
3. Click on the deployment
4. Check "Build Logs" for errors

## Step 12: Update Deployment (when needed)

### Make Changes Locally

1. Edit files in your project
2. Test locally: `npm run dev`
3. Build: `npm run build`
4. Preview: `npm run preview`

### Commit and Push

```bash
git add .
git commit -m "Description of your changes"
git push
```

Vercel will automatically redeploy in 1-2 minutes.

## Common Issues and Solutions

### Issue: "npm: command not found"

**Solution**: Install Node.js from https://nodejs.org
```bash
node --version  # Should show v18 or higher
npm --version   # Should show 9 or higher
```

### Issue: Dependencies won't install

**Solution**: Clear npm cache and retry
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Issue: Port 3000 already in use

**Solution**: Vite will automatically use next available port (3001, 3002, etc.)

Or specify a port:
```bash
npm run dev -- --port 3001
```

### Issue: "VITE_GROQ_API_KEY is not defined"

**Solution**: 
1. Verify `.env.local` exists
2. Verify the key is correct (starts with `gsk_`)
3. Restart the dev server
4. No quotes around the key value

### Issue: API key works locally but not on Vercel

**Solution**: Add environment variable to Vercel
```bash
vercel env add VITE_GROQ_API_KEY
```

Or via dashboard:
1. Go to vercel.com/dashboard
2. Select project
3. Settings > Environment Variables
4. Add `VITE_GROQ_API_KEY`
5. Redeploy

### Issue: Analysis fails with API error

**Solutions**:
1. Check API key is valid at https://console.groq.com
2. Check you haven't hit rate limit (30 req/min free tier)
3. Wait a minute and try again
4. Check browser console for specific error message

### Issue: Build fails

**Solution**: Check build logs
```bash
npm run build
```

Common fixes:
- TypeScript errors: Fix type issues shown
- Missing dependencies: Run `npm install`
- Node version: Upgrade to Node 18+

### Issue: Charts not rendering

**Solution**:
1. Check browser console for errors
2. Verify data exists (add symptoms first)
3. Try different browser
4. Clear browser cache

## File Structure Reference

After setup, your project looks like:

```
symptom-tracker/
├── .git/
├── node_modules/                # Not committed to GitHub
├── dist/                        # Created by build, not committed
├── src/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── .env.local                   # Not committed to GitHub
├── .env.example
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── README.md
└── other config files
```

## Portfolio Integration

### Add to Resume

Under Projects section:
```
Symptom Tracker + Pattern Analyzer
- Built AI-powered health tracking application with intelligent pattern recognition
- Integrated Groq API (llama-3.1-70b) for clinical reasoning and root cause analysis
- Calculated urgency scores and generated evidence-based self-care recommendations
- Technologies: React, TypeScript, TailwindCSS, Groq API, Recharts, Vite
- Live demo: https://symptom-tracker-xxxxx.vercel.app
- GitHub: https://github.com/YOUR_USERNAME/symptom-tracker
```

### Add to LinkedIn

1. Go to your LinkedIn profile
2. Click "Add profile section" → "Featured"
3. Click "Add link"
4. URL: Your Vercel deployment URL
5. Title: "Symptom Tracker + Pattern Analyzer"
6. Description: "AI-powered symptom tracking application with intelligent pattern recognition. Built with React, TypeScript, and Groq API for healthcare ML engineering portfolio."

### Update GitHub README

Your repository is already set up with a comprehensive README. Consider adding:
1. Screenshot of the application
2. Your live demo link at the top
3. Demo video (optional, 2-3 minutes)

### Create Demo Video (Optional)

Record a 3-minute walkthrough:
1. Enable demo mode
2. Show calendar with logged symptoms
3. Navigate to charts
4. Run AI analysis
5. Explain the insights

Upload to YouTube (unlisted) and add link to README.

## Testing Checklist

Before considering deployment complete:

### Local Testing
- [ ] `npm install` completes without errors
- [ ] `npm run dev` starts server
- [ ] Application loads at http://localhost:3000
- [ ] Can log symptoms
- [ ] Demo mode works
- [ ] Charts display
- [ ] AI analysis completes
- [ ] Export/import functions
- [ ] `npm run build` succeeds
- [ ] `npm run preview` works

### Deployment Testing
- [ ] Code pushed to GitHub
- [ ] All files visible on GitHub
- [ ] README displays properly
- [ ] Vercel deployment succeeds
- [ ] Environment variable added
- [ ] Live site loads
- [ ] All features work on live site
- [ ] No console errors on live site

### Documentation
- [ ] README is complete
- [ ] Live demo link added
- [ ] GitHub repository public
- [ ] License file included

## Next Steps

1. **Today**: Complete Steps 1-7 (local setup and testing)
2. **This Week**: Complete Steps 8-11 (GitHub and deployment)
3. **Before Applying**: Add to portfolio, resume, LinkedIn
4. **Interview Prep**: Practice explaining technical decisions

## Quick Command Reference

```bash
# Development
npm install              # Install dependencies
npm run dev             # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build

# Git
git add .               # Stage changes
git commit -m "msg"     # Commit changes
git push                # Push to GitHub

# Deployment
vercel login            # Login to Vercel
vercel                  # Deploy preview
vercel --prod           # Deploy production
vercel env add KEY      # Add environment variable
```

## Success Criteria

You're ready when:
- [ ] Application runs locally without errors
- [ ] Deployed to Vercel successfully
- [ ] Live demo URL works for all features
- [ ] Added to resume/portfolio
- [ ] GitHub repository is public and polished
- [ ] Can explain the project in 2 minutes
- [ ] Can discuss technical decisions

## Support

All detailed documentation is in the project:
- README.md - Full project documentation
- GETTING_STARTED.md - Comprehensive walkthrough  
- DEPLOYMENT.md - Deployment details
- PROJECT_OVERVIEW.md - Technical architecture

Start with this guide. If you need more detail on any step, consult the other documentation files.

---

**Ready to begin?**

Start with Step 1 and work through methodically. Each command is provided exactly as you need to type it.

Good luck with your healthcare ML engineering application!
