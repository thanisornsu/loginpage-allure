# Netlify Auth Token Guide

## Important: One Token for All Environments

**NETLIFY_AUTH_TOKEN** is the **same** for both staging and production!

You only need **ONE** `NETLIFY_AUTH_TOKEN` secret in GitHub. It works for:
- ✅ Staging deployments
- ✅ Production deployments
- ✅ All Netlify operations

## What's Different?

| Secret | Purpose | Same or Different? |
|--------|---------|---------------------|
| `NETLIFY_AUTH_TOKEN` | Authentication | **SAME** for both |
| `NETLIFY_SITE_ID` | Production site | Different |
| `NETLIFY_STAGING_SITE_ID` | Staging site | Different |

## How to Get/Create NETLIFY_AUTH_TOKEN

### Step 1: Go to Netlify Personal Access Tokens

Visit: https://app.netlify.com/user/applications#personal-access-tokens

### Step 2: Create New Token

1. Click **"New access token"** button
2. Give it a name (e.g., "GitHub Actions Deploy")
3. Click **"Generate token"**
4. **IMPORTANT:** Copy the token immediately - it's shown only once!

### Step 3: Add to GitHub Secrets

1. Go to: https://github.com/thanisornsu/loginpage-allure/settings/secrets/actions
2. Click **"New repository secret"**
3. Add:
   - **Name**: `NETLIFY_AUTH_TOKEN`
   - **Value**: (paste the token you copied)
4. Click **"Add secret"**

## Current Setup Checklist

You need these secrets in GitHub:

- [ ] `NETLIFY_AUTH_TOKEN` - One token for all environments
- [ ] `NETLIFY_SITE_ID` - Production site ID
- [ ] `NETLIFY_STAGING_SITE_ID` - Staging site ID (`04fea1d2-6ce8-4b8a-8c14-b053e311021f`)

## Verify You Have the Token

### Check in GitHub:
1. Go to: https://github.com/thanisornsu/loginpage-allure/settings/secrets/actions
2. Look for `NETLIFY_AUTH_TOKEN` in the list
3. If it's there → ✅ You're good!
4. If it's missing → Create it using steps above

### Check in Netlify:
1. Go to: https://app.netlify.com/user/applications#personal-access-tokens
2. You'll see all your tokens listed
3. If you see one for "GitHub Actions" → ✅ You have it
4. If not → Create a new one

## Token Permissions

The token needs these permissions:
- ✅ Deploy sites
- ✅ Read site information
- ✅ Update site settings

When you create the token, it has these permissions by default.

## Security Notes

- **Never share** your token publicly
- **Never commit** it to code
- **Store only** in GitHub Secrets
- **Regenerate** if you think it's compromised

## Troubleshooting

### "Authentication failed" Error

**Problem:** Token is invalid or expired

**Solution:**
1. Go to Netlify tokens page
2. Delete old token (if exists)
3. Create new token
4. Update `NETLIFY_AUTH_TOKEN` in GitHub Secrets

### "Token not found" Error

**Problem:** Secret not added to GitHub

**Solution:**
1. Verify secret exists: GitHub → Settings → Secrets
2. Check name is exactly: `NETLIFY_AUTH_TOKEN` (case-sensitive)
3. Re-add if missing

## Quick Links

- **Create Token**: https://app.netlify.com/user/applications#personal-access-tokens
- **GitHub Secrets**: https://github.com/thanisornsu/loginpage-allure/settings/secrets/actions
- **Netlify Dashboard**: https://app.netlify.com

## Summary

✅ **One token** (`NETLIFY_AUTH_TOKEN`) works for **all environments**
✅ **Two site IDs** - one for staging, one for production
✅ Token is created in Netlify, stored in GitHub Secrets

