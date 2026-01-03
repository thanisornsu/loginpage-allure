# Fix "Unauthorized: could not retrieve project" Error

## The Problem

You're seeing: `Error: Unauthorized: could not retrieve project`

This means:
- ✅ Site ID is correct (staging site ID is being used)
- ❌ Token authentication is failing

## Solution: Regenerate Netlify Token

The token is likely expired or invalid. Here's how to fix it:

### Step 1: Create New Token

1. Go to: https://app.netlify.com/user/applications#personal-access-tokens
2. **Delete the old token** (if you see it) - click the trash icon
3. Click **"New access token"**
4. Name: "GitHub Actions Deploy"
5. Click **"Generate token"**
6. **IMPORTANT:** Copy the token immediately - it's shown only once!

### Step 2: Update GitHub Secret

1. Go to: https://github.com/thanisornsu/loginpage-allure/settings/secrets/actions
2. Find `NETLIFY_AUTH_TOKEN`
3. Click the **pencil icon** (edit)
4. **Delete the old value** and paste the new token
5. Click **"Update secret"**

### Step 3: Verify Secrets

Make sure you have all three secrets:
- ✅ `NETLIFY_AUTH_TOKEN` - **NEW TOKEN** (just updated)
- ✅ `NETLIFY_SITE_ID` - Production site ID
- ✅ `NETLIFY_STAGING_SITE_ID` - `04fea1d2-6ce8-4b8a-8c14-b053e311021f`

### Step 4: Test Again

After updating the token, push to develop again:

```bash
git add .
git commit -m "test: verify deployment with new token"
git push origin develop
```

## Why This Happens

- Tokens can expire
- Tokens can be revoked
- Tokens might not have access to the site
- Token might have been copied incorrectly

## Verification

After regenerating the token, check the workflow logs. You should see:
- ✅ No "Unauthorized" error
- ✅ "🚀 Starting deployment..."
- ✅ "✅ Report deployed successfully to Netlify Staging!"

## Still Not Working?

If it still fails after regenerating:

1. **Verify token in Netlify:**
   - Go to tokens page
   - Make sure the token exists and is active

2. **Check site access:**
   - Make sure the token has access to the staging site
   - The token should have access to all your sites

3. **Try manual deployment:**
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify deploy --dir=allure-report --site=04fea1d2-6ce8-4b8a-8c14-b053e311021f
   ```
   This will help identify if it's a token issue or something else.

## Quick Checklist

- [ ] Old token deleted from Netlify
- [ ] New token created
- [ ] New token copied (before closing the page!)
- [ ] GitHub secret `NETLIFY_AUTH_TOKEN` updated
- [ ] Pushed to develop branch
- [ ] Checked workflow logs for success

