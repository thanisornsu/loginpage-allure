# Verify Staging Site Configuration

## Your Staging Site

**Site URL:** https://app.netlify.com/projects/swaglabs-allure-staging/overview

## Steps to Verify Site ID

### Step 1: Get the Site ID

1. Go to your staging site: https://app.netlify.com/projects/swaglabs-allure-staging/overview
2. Click **"Site settings"** (in the left sidebar or top menu)
3. Click **"General"** tab
4. Scroll to **"Site details"** section
5. Find **"Site ID"** - it should look like: `04fea1d2-6ce8-4b8a-8c14-b053e311021f`
6. Copy this Site ID

### Step 2: Verify in GitHub Secrets

1. Go to: https://github.com/thanisornsu/loginpage-allure/settings/secrets/actions
2. Find `NETLIFY_STAGING_SITE_ID`
3. Verify the value matches the Site ID from Netlify
4. If different, update it

### Step 3: Verify Token Has Access

The token needs access to this site. To verify:

1. Go to: https://app.netlify.com/user/applications#personal-access-tokens
2. Check if your token exists
3. If not, create a new one (see below)

## Current Configuration

Based on your setup:
- **Staging Site:** https://app.netlify.com/projects/swaglabs-allure-staging/overview
- **Expected Site ID:** `04fea1d2-6ce8-4b8a-8c14-b053e311021f`
- **GitHub Secret:** `NETLIFY_STAGING_SITE_ID`

## If Site ID is Different

If the Site ID in Netlify is different from `04fea1d2-6ce8-4b8a-8c14-b053e311021f`:

1. Copy the correct Site ID from Netlify
2. Go to GitHub Secrets
3. Update `NETLIFY_STAGING_SITE_ID` with the correct value
4. Push to develop again

## Next Steps

After verifying the Site ID:

1. **Regenerate Token** (if still getting "Unauthorized"):
   - Create new token at: https://app.netlify.com/user/applications#personal-access-tokens
   - Update `NETLIFY_AUTH_TOKEN` in GitHub Secrets

2. **Test Deployment:**
   ```bash
   git push origin develop
   ```

3. **Check Results:**
   - GitHub Actions should show successful deployment
   - Netlify dashboard should show new deployment

