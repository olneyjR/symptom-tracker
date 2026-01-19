# Deployment Guide

This guide covers deploying the Symptom Tracker application to various platforms.

## Platform Options

The application is a static React SPA and can be deployed to:
- Vercel (Recommended)
- Netlify
- GitHub Pages
- Any static hosting service

## Prerequisites

- GitHub account
- Groq API key from https://console.groq.com
- Your code pushed to a GitHub repository

## Deploying to Vercel

### Option 1: Using Vercel Dashboard

1. **Create Vercel Account**
   - Visit https://vercel.com
   - Sign up with your GitHub account

2. **Import Project**
   - Click "Add New Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Build Settings**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Add Environment Variables**
   - Click "Environment Variables"
   - Add: `VITE_GROQ_API_KEY`
   - Value: Your Groq API key (starts with `gsk_`)
   - Click "Add"

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Visit your deployed site

### Option 2: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Add environment variable
vercel env add VITE_GROQ_API_KEY

# Deploy to production
vercel --prod
```

## Deploying to Netlify

### Option 1: Using Netlify Dashboard

1. **Create Netlify Account**
   - Visit https://netlify.com
   - Sign up with your GitHub account

2. **Import Project**
   - Click "Add new site"
   - Select "Import an existing project"
   - Choose GitHub and select your repository

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Add Environment Variables**
   - Go to Site settings > Environment variables
   - Add variable:
     - Key: `VITE_GROQ_API_KEY`
     - Value: Your Groq API key

5. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete
   - Visit your deployed site

### Option 2: Using Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize site
netlify init

# Build the project
npm run build

# Deploy
netlify deploy --prod
```

## Deploying to GitHub Pages

1. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **Update package.json**
Add to scripts:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

Add homepage field:
```json
"homepage": "https://yourusername.github.io/symptom-tracker"
```

3. **Update vite.config.ts**
```typescript
export default defineConfig({
  plugins: [react()],
  base: '/symptom-tracker/', // Your repo name
})
```

4. **Deploy**
```bash
npm run deploy
```

5. **Configure GitHub Pages**
- Go to repository Settings > Pages
- Source: Deploy from branch
- Branch: gh-pages
- Folder: / (root)

## Environment Variables

All platforms require the following environment variable:

```
VITE_GROQ_API_KEY=gsk_your_actual_api_key_here
```

**Important Notes:**
- Environment variables starting with `VITE_` are exposed to the client
- Never commit API keys to git
- Use different API keys for development and production if needed
- Consider rate limits on free tier (30 requests/minute for Groq)

## Custom Domain Setup

### Vercel

1. Go to Project Settings > Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for SSL certificate provisioning

### Netlify

1. Go to Site settings > Domain management
2. Add custom domain
3. Configure DNS as instructed
4. Wait for SSL certificate

## Post-Deployment Checklist

After deploying, verify:

- [ ] Application loads without errors
- [ ] Calendar displays correctly
- [ ] Can add symptom entries
- [ ] Demo mode works
- [ ] Analysis button appears after 7+ entries
- [ ] AI analysis completes successfully
- [ ] Charts render with data
- [ ] Export/import functionality works
- [ ] Privacy banner displays
- [ ] Medical disclaimer is visible

## Monitoring

### Vercel Analytics

Enable in Vercel dashboard:
- Project Settings > Analytics
- Enable "Web Analytics"
- View traffic and performance metrics

### Error Tracking

Consider adding error tracking:

1. Install Sentry:
```bash
npm install @sentry/react
```

2. Initialize in main.tsx:
```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: import.meta.env.MODE,
});
```

## Performance Optimization

### Build Optimization

Already configured in vite.config.ts:
- Code splitting
- Tree shaking
- Minification
- Source maps for debugging

### Further Improvements

1. **Enable Compression**
For Netlify, add netlify.toml:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    Content-Encoding = "gzip"
```

2. **Cache Headers**
Configure in hosting platform for static assets

3. **Lazy Loading**
Consider code-splitting heavy components:
```typescript
const Charts = React.lazy(() => import('./components/Charts'));
```

## Troubleshooting

### Build Fails

**Error: Cannot find module**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**TypeScript errors**
```bash
npm run build
# Fix any type errors shown
```

**Environment variable not working**
- Ensure it starts with `VITE_`
- Redeploy after adding variables
- Check build logs for the variable

### Runtime Errors

**API key not working**
- Verify key starts with `gsk_`
- Check it's set in platform environment variables
- Ensure variable name is exactly `VITE_GROQ_API_KEY`

**localStorage errors**
- Check browser console
- Verify not in private/incognito mode
- Check localStorage quota

**CORS errors**
- Not applicable for this app (client-side only)
- If using backend proxy, configure CORS headers

## Rollback

### Vercel
- Go to Deployments
- Find previous working deployment
- Click "..." > "Promote to Production"

### Netlify
- Go to Deploys
- Find previous deploy
- Click "Publish deploy"

## Security Considerations

1. **API Key Protection**
   - Never commit .env files
   - Rotate keys if exposed
   - Use different keys per environment

2. **Rate Limiting**
   - Groq free tier: 30 req/min
   - Implement client-side throttling if needed
   - Consider caching analysis results

3. **Content Security Policy**
   - Add CSP headers in hosting platform
   - Restrict script sources
   - Configure for Groq API domain

## Continuous Deployment

### Automatic Deploys

Both Vercel and Netlify support automatic deployment on git push:

1. **Enable Auto Deploy**
   - Automatically enabled for main/master branch
   - Configure branch-specific deployments in settings

2. **Preview Deployments**
   - Pull requests get preview URLs
   - Test before merging

3. **Deploy Hooks**
   - Generate webhook URL in platform
   - Trigger deploys via API

## Cost Considerations

### Free Tier Limits

**Vercel Free Tier:**
- Unlimited personal projects
- 100GB bandwidth/month
- Serverless function execution limits

**Netlify Free Tier:**
- Unlimited sites
- 100GB bandwidth/month
- 300 build minutes/month

**Groq API Free Tier:**
- 30 requests/minute
- Suitable for personal use and demos

### Scaling Considerations

For production use beyond free tier:
- Implement request caching
- Add backend proxy for API key protection
- Consider usage-based pricing
- Monitor API consumption

## Support

If deployment issues persist:
- Check build logs in platform dashboard
- Review browser console for client errors
- Verify environment variables are set
- Test locally with production build: `npm run build && npm run preview`

## Additional Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [Groq API Documentation](https://console.groq.com/docs)
