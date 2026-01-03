# Troubleshooting Netlify Deployment Errors

## Error: "Unauthorized: could not retrieve project"

This error means Netlify can't authenticate or access the site. Here's how to fix it:

### Possible Causes:

1. **Invalid or Expired Token**
2. **Token doesn't have access to the site**
3. **Incorrect Site ID**
4. **Token needs to be regenerated**

## Solution Steps

### Step 1: Verify Site ID

1. Go to: https://app.netlify.com/projects/swaglabs-allure-staging
2. Click **Site settings** → **General** → **Site details**
3. Copy the **Site ID** (should be: `04fea1d2-6ce8-4b8a-8c14-b053e311021f`)
4. Verify it matches what's in GitHub Secrets

### Step 2: Regenerate Netlify Token

The token might be expired or invalid. Regenerate it:

1. Go to: https://app.netlify.com/user/applications#personal-access-tokens
2. Find your existing token (or delete old ones)
3. Click **New access token**
4. Name: "GitHub Actions Deploy"
5. Click **Generate token**
6. **Copy immediately** (shown only once!)

### Step 3: Update GitHub Secret

1. Go to: https://github.com/thanisornsu/loginpage-allure/settings/secrets/actions
2. Find `NETLIFY_AUTH_TOKEN`
3. Click the **pencil icon** (edit)
4. Paste the new token
5. Click **Update secret**

### Step 4: Verify Site ID Secret

1. In GitHub Secrets, find `NETLIFY_STAGING_SITE_ID`
2. Verify the value is: `04fea1d2-6ce8-4b8a-8c14-b053e311021f`
3. If different, update it

### Step 5: Test Again

After updating the token, push again to test.

## Alternative: Check Token Permissions

Make sure the token has these permissions:

- ✅ Deploy sites
- ✅ Read site information
- ✅ Update site settings

## Quick Fix Checklist

- [ ] Site ID is correct: `04fea1d2-6ce8-4b8a-8c14-b053e311021f`
- [ ] Token is regenerated (new token created)
- [ ] Token is updated in GitHub Secrets
- [ ] Token has correct permissions
- [ ] Site exists in Netlify dashboard

## Still Not Working?

If it still fails after regenerating the token:

1. **Check Netlify Dashboard:**

   - Verify the site exists
   - Check if site is active (not deleted/suspended)

2. **Try Manual Deployment:**

   - Install Netlify CLI locally: `npm install -g netlify-cli`
   - Run: `netlify deploy --dir=allure-report --site=04fea1d2-6ce8-4b8a-8c14-b053e311021f`
   - This will help identify if it's a token issue or site issue

3. **Check Workflow Logs:**
   - Look for more detailed error messages
   - Check if token is being read correctly
