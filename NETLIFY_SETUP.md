# 🚀 Netlify Setup Guide for Allure Report Deployment

## Step 1: Create Site in Netlify

### Method 1: Create Site Manually (Recommended)

1. **Go to Netlify Dashboard**
   - Open: https://app.netlify.com/
   - Click **"Add new project"** (green button)

2. **Select "Deploy manually"**
   - Choose **"Deploy manually"** or **"Import an existing project"**
   - Select **"Deploy manually"**

3. **Name Your Site**
   - Set site name (e.g., `loginpage-allure-report`)
   - Or use auto-generated name from Netlify

4. **Save Site ID**
   - After creating site
   - Site ID will be shown on Site overview page
   - Or check URL: `https://app.netlify.com/sites/<site-name>/overview`

### Method 2: Use Existing Site

1. **Click on existing site** (e.g., `golden-sfogliatella-daf89b`)
2. **Go to Site settings**
   - Click **"Site settings"** (gear icon) at the top
   - Or go to left menu → **"Site configuration"** → **"General"**
3. **Find Site ID**
   - Under **"Site details"** section
   - You'll see **"Site ID"** (format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)
   - Copy this Site ID

## Step 2: Create Access Token

1. **Go to Personal Access Tokens**
   - Open: https://app.netlify.com/user/applications#personal-access-tokens
   - Or: Click Profile (top right) → **"User settings"** → **"Applications"** → **"Personal access tokens"**

2. **Create New Token**
   - Click **"New access token"**
   - Set name (e.g., `GitHub Actions Deploy`)
   - Click **"Generate token"**

3. **Copy Token**
   - ⚠️ **Important**: Token will only be shown once!
   - Copy token immediately (format: `nfp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)
   - Store it securely

## Step 3: Add Secrets to GitHub

1. **Go to Repository Settings**
   - Open: https://github.com/thanisornsu/loginpage-allure/settings
   - Or: Click **"Settings"** in repository

2. **Go to Secrets**
   - Left menu: **"Secrets and variables"** → **"Actions"**

3. **Add NETLIFY_AUTH_TOKEN**
   - Click **"New repository secret"**
   - **Name**: `NETLIFY_AUTH_TOKEN`
   - **Secret**: Paste token copied from Netlify
   - Click **"Add secret"**

4. **Add NETLIFY_SITE_ID**
   - Click **"New repository secret"** again
   - **Name**: `NETLIFY_SITE_ID`
   - **Secret**: Paste Site ID copied earlier
   - Click **"Add secret"**

## Step 4: Test Deployment

1. **Push code to main branch**
   ```bash
   git push origin main
   ```

2. **Check GitHub Actions**
   - Go to: https://github.com/thanisornsu/loginpage-allure/actions
   - View workflow run
   - Should see "Deploy to Netlify" step succeed

3. **Check Netlify**
   - Go to Netlify Dashboard
   - Click on your site
   - View Deploys → Should see new deployment
   - Click deployment → Will see report URL

## 🔍 How to Find Site ID (If Still Can't Find)

### From Netlify Dashboard:
1. Click on your site
2. Check URL: `https://app.netlify.com/sites/<site-name>/overview`
3. Site ID may be in URL or check:
   - **Site settings** → **General** → **Site details**
   - Or **Site settings** → **Build & deploy** → **Build settings**

### From Netlify CLI:
```bash
# Install Netlify CLI (if not installed)
npm install -g netlify-cli

# Login
netlify login

# List sites
netlify sites:list
```

### From API:
```bash
# Using curl (need token)
curl -H "Authorization: Bearer YOUR_TOKEN" https://api.netlify.com/api/v1/sites
```

## ✅ Verify Setup is Complete

After adding Secrets:

1. **Check in GitHub**
   - Go to: Settings → Secrets and variables → Actions
   - Should see 2 secrets:
     - ✅ `NETLIFY_AUTH_TOKEN`
     - ✅ `NETLIFY_SITE_ID`

2. **Test by Pushing**
   - Push code to main branch
   - Check workflow logs
   - Should see "✅ Report deployed successfully to Netlify!"

## 🆘 Troubleshooting

### If Deployment Fails:
- Verify Secrets are correct
- Verify Site ID is correct
- Check logs in GitHub Actions
- Check logs in Netlify Dashboard

### If Can't Find Site ID:
- Try creating a new site
- Or use existing site (golden-sfogliatella-daf89b)
- Site ID will be in Site settings → General

## 📝 Notes

- Site ID format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
- Access Token format: `nfp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- Both must be correct for deployment to work
