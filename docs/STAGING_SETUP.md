# Staging Environment Setup Guide

## Current Situation

You have:
- ✅ `NETLIFY_AUTH_TOKEN` - Configured
- ✅ `NETLIFY_SITE_ID` - Configured (for production/main branch)
- ❌ `NETLIFY_STAGING_SITE_ID` - **Missing** (needed for staging/develop branch)

That's why you only see deployments from `main` branch in Netlify!

## Solution: Create Staging Site

You have two options:

### Option 1: Separate Staging Site (Recommended)

Create a separate Netlify site for staging:

1. **Create New Site in Netlify:**
   - Go to: https://app.netlify.com
   - Click **Add new site** → **Create a new site**
   - Choose **Deploy manually** (or connect to a dummy repo)
   - Name it: `your-project-staging` or similar

2. **Get Staging Site ID:**
   - Go to Site settings → General → Site details
   - Copy the **Site ID**

3. **Add to GitHub Secrets:**
   - Go to: https://github.com/thanisornsu/loginpage-allure/settings/secrets/actions
   - Click **New repository secret**
   - Name: `NETLIFY_STAGING_SITE_ID`
   - Value: (paste staging site ID)
   - Click **Add secret**

4. **Test:**
   - Push to `develop` branch
   - Check Netlify dashboard - you should see staging site getting deployed

### Option 2: Use Same Site for Both (Simpler)

If you don't need separate staging, you can use the same site for both:

1. **Update GitHub Secret:**
   - Go to: https://github.com/thanisornsu/loginpage-allure/settings/secrets/actions
   - Add new secret: `NETLIFY_STAGING_SITE_ID`
   - Use the **same value** as `NETLIFY_SITE_ID` (your production site ID)

2. **Result:**
   - Both `develop` and `main` will deploy to the same Netlify site
   - Staging deployments will overwrite production (not recommended for production use)

## Recommended Setup

**Best Practice:**
- **Staging Site**: For testing (from `develop` branch)
- **Production Site**: For live reports (from `main` branch)

This way:
- You can test in staging without affecting production
- Production stays stable
- You can preview changes before going live

## Quick Setup Steps

### Step 1: Create Staging Site
```
1. Netlify Dashboard → Add new site
2. Deploy manually
3. Name: "swaglabs-allure-staging"
4. Copy Site ID
```

### Step 2: Add Secret
```
1. GitHub → Settings → Secrets → Actions
2. New secret: NETLIFY_STAGING_SITE_ID
3. Paste staging site ID
4. Save
```

### Step 3: Test
```bash
git checkout develop
git push origin develop
```

### Step 4: Verify
- Check Netlify dashboard
- You should see staging site with new deployment
- Check GitHub Actions - staging deployment should run

## Current Configuration

Your workflow uses:
- **Staging**: `NETLIFY_STAGING_SITE_ID` (from `develop` branch)
- **Production**: `NETLIFY_SITE_ID` (from `main` branch)

## Troubleshooting

### Staging Still Not Deploying?

1. **Check Secret Name:**
   - Must be exactly: `NETLIFY_STAGING_SITE_ID` (case-sensitive)

2. **Check Workflow Logs:**
   - Go to Actions → Latest workflow run
   - Check "Deploy to Staging" job
   - Look for error messages

3. **Verify Branch:**
   - Make sure you're pushing to `develop` branch
   - Check: `git branch` to see current branch

4. **Check Netlify:**
   - Verify staging site exists
   - Verify site ID is correct

## Summary

**Problem:** Only seeing `main` branch deployments
**Cause:** Missing `NETLIFY_STAGING_SITE_ID` secret
**Solution:** Create staging site and add the secret

After setup, you'll see:
- `develop` → Staging site
- `main` → Production site

