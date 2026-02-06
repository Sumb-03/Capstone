# 🚀 Netlify Deployment Guide

## Quick Deploy (Easiest Method)

### Option 1: Deploy from GitHub

1. **Push your code to GitHub**:
   ```powershell
   cd "c:\Users\ricsimoe\OneDrive - Cisco\Ricardo\Capstone\capstone-timeline"
   git init
   git add .
   git commit -m "Initial commit - Capstone Timeline"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub" and authorize
   - Select your repository
   - Netlify will auto-detect Next.js settings
   - Click "Deploy site"

3. **Done!** 🎉
   - Your site will be live at: `https://random-name.netlify.app`
   - You can change the domain name in site settings

### Option 2: Manual Deploy (No GitHub needed)

1. **Build the project**:
   ```powershell
   cd "c:\Users\ricsimoe\OneDrive - Cisco\Ricardo\Capstone\capstone-timeline"
   npm run build
   ```

2. **Install Netlify CLI**:
   ```powershell
   npm install -g netlify-cli
   ```

3. **Login to Netlify**:
   ```powershell
   netlify login
   ```
   This opens your browser to authenticate.

4. **Deploy**:
   ```powershell
   netlify deploy --prod
   ```
   - Follow the prompts
   - Choose "Create a new site"
   - Your site will be deployed!

### Option 3: Drag & Drop Deploy

1. **Build the project**:
   ```powershell
   npm run build
   ```

2. **Go to Netlify**:
   - Visit [app.netlify.com/drop](https://app.netlify.com/drop)
   - Drag and drop your `.next` folder
   - Wait for deployment
   - Done!

## Automated Deploy Script

For easy redeployment, use this script:

```powershell
.\deploy.ps1
```

## Configuration Files

The following files have been added for Netlify:

- **netlify.toml** - Netlify configuration
- **NETLIFY_DEPLOY.md** - This guide

## Build Settings

If you need to manually configure build settings on Netlify:

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Publish directory | `.next` |
| Node version | `18` |

## Environment Variables

If you need to add environment variables on Netlify:

1. Go to Site settings → Environment variables
2. Add any needed variables
3. Redeploy the site

## Custom Domain

To add a custom domain:

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow the DNS setup instructions
4. Wait for DNS propagation (can take up to 48 hours)

## Continuous Deployment

Once connected to GitHub, Netlify will automatically:
- Deploy when you push to main branch
- Create preview deployments for pull requests
- Show build logs for debugging

## Troubleshooting

### Build fails
- Check the build logs in Netlify dashboard
- Ensure all dependencies are in `package.json`
- Try building locally first: `npm run build`

### Images not loading
- Images from `public/` folder should work automatically
- For external images, they're already configured in `next.config.js`

### Animations not working
- Framer Motion should work out of the box
- Check browser console for errors

### Site is blank
- Check the build logs
- Ensure the build completed successfully
- Try clearing Netlify cache and redeploying

## Redeploy

To redeploy after making changes:

**If using GitHub:**
```powershell
git add .
git commit -m "Update content"
git push
```
Netlify auto-deploys!

**If using CLI:**
```powershell
npm run build
netlify deploy --prod
```

## Preview Deploys

Every time you push to a branch other than main, Netlify creates a preview:
- Preview URL: `https://deploy-preview-123--your-site.netlify.app`
- Perfect for testing before going live

## Performance Tips

Your site is already optimized with:
- ✅ Next.js automatic code splitting
- ✅ Image optimization
- ✅ Static generation where possible
- ✅ Netlify Edge CDN

## Cost

- Netlify offers a generous **free tier**:
  - 100 GB bandwidth/month
  - 300 build minutes/month
  - Perfect for this project!

## Support

- [Netlify Docs](https://docs.netlify.com/)
- [Next.js on Netlify](https://docs.netlify.com/frameworks/next-js/)
- [Netlify Support](https://www.netlify.com/support/)

---

**Ready to deploy?** Choose one of the methods above and go live! 🚀
