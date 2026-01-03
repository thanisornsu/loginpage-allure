# Staging Secret Setup

## Your Staging Site Information

- **Staging Site URL**: https://app.netlify.com/projects/swaglabs-allure-staging
- **Site ID**: `04fea1d2-6ce8-4b8a-8c14-b053e311021f`

## Next Step: Add to GitHub Secrets

1. Go to: https://github.com/thanisornsu/loginpage-allure/settings/secrets/actions

2. Click **New repository secret**

3. Add the secret:
   - **Name**: `NETLIFY_STAGING_SITE_ID`
   - **Value**: `04fea1d2-6ce8-4b8a-8c14-b053e311021f`
   - Click **Add secret**

## Verify Site ID

To double-check the Site ID is correct:
1. Go to: https://app.netlify.com/projects/swaglabs-allure-staging
2. Click **Site settings** → **General** → **Site details**
3. Look for **Site ID** - should match: `04fea1d2-6ce8-4b8a-8c14-b053e311021f`

## Test After Adding Secret

Once you've added the secret:

```bash
git checkout develop
# Make a small change
git add .
git commit -m "test: verify staging deployment"
git push origin develop
```

Then check:
- GitHub Actions → Should see "Deploy to Staging" job
- Netlify Dashboard → Staging site should show new deployment

