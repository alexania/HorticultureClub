# GitHub Pages Deployment Guide

## Setup Instructions

### 1. Update Astro Configuration
Before deploying, update the `astro.config.mjs` file:

```javascript
export default defineConfig({
  integrations: [tailwind()],
  site: 'https://alexania.github.io', // Replace with your GitHub username
  base: '/HorticultureClub', // Replace with your repository name
  output: 'static',
  // ... rest of config
});
```

### 2. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **GitHub Actions**

### 3. Deploy
The site will automatically deploy when you:
- Push to the `main` branch
- Manually trigger the workflow from the Actions tab

### 4. Access Your Site
Once deployed, your site will be available at:
`https://alexania.github.io/HorticultureClub`

## Workflow Details

The deployment workflow (`.github/workflows/deploy.yml`) will:
1. Install Node.js dependencies
2. Build the Astro site with proper base path
3. Deploy to GitHub Pages

## Troubleshooting

### Assets Not Loading
If images or assets aren't loading, ensure:
- All asset paths start with `/` (e.g., `/images/logo.png`)
- The `base` path in `astro.config.mjs` matches your repository name
- The `site` URL matches your GitHub Pages URL

### Custom Domain
If you have a custom domain:
1. Update the `site` field in `astro.config.mjs`
2. Remove or comment out the `base` field
3. Add a `CNAME` file to the `public` directory with your domain

### Manual Deployment
You can also build and deploy manually:
```bash
npm run build
# Upload the contents of the `dist` folder to your web server
```

## Environment Variables
No environment variables are required for basic deployment. The workflow automatically configures the site URL and base path from GitHub Pages settings.