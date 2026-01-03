# Credentials Guide

This guide explains where all credentials are stored and how to access them.

## 📍 Credential Locations

### 1. Test Credentials (SwagLabs Demo Site)

**Location:** `src/utils/test-data.ts`

These are **public test credentials** for the SwagLabs demo site (https://www.saucedemo.com):

```typescript
VALID_USERNAME: "standard_user"
VALID_PASSWORD: "secret_sauce"
```

**Note:** These are demo credentials and safe to commit to the repository.

**Other test users:**
- `problem_user` - User with issues
- `performance_glitch_user` - User with performance issues
- `locked_out_user` - Locked out user (for negative testing)

---

### 2. GitHub Secrets (CI/CD Credentials)

**Location:** GitHub Repository Settings (NOT in code)

These secrets are stored securely in GitHub and used by workflows.

#### How to Access:

1. Go to your repository: https://github.com/thanisornsu/loginpage-allure
2. Click **Settings** (top menu)
3. Click **Secrets and variables** → **Actions**
4. View or add secrets here

#### Required Secrets for Deployment:

| Secret Name | Purpose | Where to Get It |
|------------|---------|----------------|
| `NETLIFY_AUTH_TOKEN` | Netlify authentication | [Netlify Personal Access Tokens](https://app.netlify.com/user/applications#personal-access-tokens) |
| `NETLIFY_SITE_ID` | Production site ID | Netlify Dashboard → Site Settings → General → Site details |
| `NETLIFY_STAGING_SITE_ID` | Staging site ID (optional) | Netlify Dashboard → Create staging site → Site Settings |

#### Optional Secrets for Notifications:

| Secret Name | Purpose | Where to Get It |
|------------|---------|----------------|
| `SLACK_WEBHOOK_URL` | Slack notifications | Slack → Apps → Incoming Webhooks |
| `DISCORD_WEBHOOK_URL` | Discord notifications | Discord → Server Settings → Integrations → Webhooks |

---

### 3. Netlify Credentials

**Location:** Netlify Dashboard

#### Get Netlify Access Token:

1. Go to: https://app.netlify.com/user/applications#personal-access-tokens
2. Click **New access token**
3. Name it (e.g., "GitHub Actions Deploy")
4. Copy the token (shown only once!)
5. Add to GitHub Secrets as `NETLIFY_AUTH_TOKEN`

#### Get Netlify Site ID:

1. Go to Netlify Dashboard: https://app.netlify.com
2. Select your site
3. Go to **Site settings** → **General** → **Site details**
4. Copy the **Site ID**
5. Add to GitHub Secrets as `NETLIFY_SITE_ID` (production) or `NETLIFY_STAGING_SITE_ID` (staging)

---

### 4. Environment Variables (Local Development)

**Location:** `.env` file (in project root, gitignored)

If you need local environment variables, create a `.env` file:

```bash
# .env (not committed to git)
NETLIFY_AUTH_TOKEN=your_token_here
NETLIFY_SITE_ID=your_site_id_here
```

**Note:** The `.env` file is already in `.gitignore`, so it won't be committed.

---

## 🔐 Security Best Practices

### ✅ DO:
- Store secrets in GitHub Secrets (not in code)
- Use `.env` files for local development (gitignored)
- Rotate secrets periodically
- Use different tokens for staging and production

### ❌ DON'T:
- Commit secrets to the repository
- Share secrets in chat/email
- Use production secrets in staging
- Hardcode credentials in code

---

## 📋 Quick Checklist

### For CI/CD to Work:

- [ ] `NETLIFY_AUTH_TOKEN` added to GitHub Secrets
- [ ] `NETLIFY_SITE_ID` added to GitHub Secrets (production)
- [ ] `NETLIFY_STAGING_SITE_ID` added to GitHub Secrets (optional, for staging)
- [ ] Secrets are correctly named (case-sensitive!)

### For Notifications (Optional):

- [ ] `SLACK_WEBHOOK_URL` added (if using Slack)
- [ ] `DISCORD_WEBHOOK_URL` added (if using Discord)

---

## 🔍 How to Check if Secrets Are Configured

### Method 1: GitHub UI

1. Go to: Repository → Settings → Secrets and variables → Actions
2. Check if secrets are listed

### Method 2: Workflow Logs

1. Go to: Repository → Actions
2. Open a workflow run
3. Check deployment job logs
4. If secrets are missing, you'll see: "⚠️ Netlify secrets not configured"

### Method 3: Test Deployment

1. Push to `develop` or `main` branch
2. Check workflow logs
3. If deployment runs → secrets are configured ✅
4. If deployment is skipped → secrets are missing ❌

---

## 🛠️ Setting Up Secrets (Step-by-Step)

### Step 1: Get Netlify Token

1. Visit: https://app.netlify.com/user/applications#personal-access-tokens
2. Click **New access token**
3. Name: "GitHub Actions Deploy"
4. Click **Generate token**
5. **Copy immediately** (shown only once!)

### Step 2: Get Site ID

1. Go to Netlify Dashboard
2. Select your site
3. **Site settings** → **General** → **Site details**
4. Copy **Site ID**

### Step 3: Add to GitHub

1. Go to: https://github.com/thanisornsu/loginpage-allure/settings/secrets/actions
2. Click **New repository secret**
3. Add each secret:
   - Name: `NETLIFY_AUTH_TOKEN` → Value: (paste token)
   - Name: `NETLIFY_SITE_ID` → Value: (paste site ID)
4. Click **Add secret**

### Step 4: Verify

1. Push a commit to `develop` or `main`
2. Check Actions tab
3. Deployment should run (not skip)

---

## 📝 Current Secret Status

To check what secrets you currently have configured:

1. **GitHub Secrets:**
   - Go to: https://github.com/thanisornsu/loginpage-allure/settings/secrets/actions
   - View list of configured secrets

2. **Workflow Status:**
   - Check recent workflow runs
   - If deployment is skipped → secrets missing
   - If deployment runs → secrets configured ✅

---

## 🆘 Troubleshooting

### "Secrets not configured" Error

**Problem:** Deployment is skipped with message about missing secrets

**Solution:**
1. Verify secrets are added in GitHub Settings
2. Check secret names are exact (case-sensitive)
3. Ensure secrets are not expired (Netlify tokens)
4. Re-add secrets if needed

### "Authentication failed" Error

**Problem:** Deployment fails with auth error

**Solution:**
1. Regenerate Netlify token
2. Update `NETLIFY_AUTH_TOKEN` in GitHub Secrets
3. Verify token has correct permissions

### "Site not found" Error

**Problem:** Deployment fails with site not found

**Solution:**
1. Verify `NETLIFY_SITE_ID` is correct
2. Check site exists in Netlify dashboard
3. Ensure site ID matches the environment

---

## 📚 Related Documentation

- [Deployment Guide](DEPLOYMENT_GUIDE.md) - How deployments work
- [Troubleshooting Guide](TROUBLESHOOTING.md) - Common issues
- [Testing Guide](TESTING_GUIDE.md) - How to test CI/CD

---

## 🔗 Quick Links

- **GitHub Secrets:** https://github.com/thanisornsu/loginpage-allure/settings/secrets/actions
- **Netlify Tokens:** https://app.netlify.com/user/applications#personal-access-tokens
- **Netlify Dashboard:** https://app.netlify.com

