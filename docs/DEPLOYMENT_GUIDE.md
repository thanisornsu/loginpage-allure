# Deployment Guide

This guide explains how the CI/CD deployment process works for the SwagLabs Test Automation project.

## Overview

The project uses a two-stage CI/CD pipeline:
1. **CI (Continuous Integration)**: Runs tests and generates reports
2. **CD (Continuous Deployment)**: Deploys reports to staging/production environments

## Workflow Structure

### CI Workflow (`.github/workflows/ci.yml`)

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

**What it does:**
1. Checks out code
2. Installs dependencies
3. Runs Playwright tests
4. Generates Allure reports
5. Uploads reports as artifacts
6. Comments on PRs with test results

**Output:**
- Allure report artifacts
- Test result screenshots
- PR comments (for pull requests)

### CD Workflow (`.github/workflows/deploy-report.yml`)

**Triggers:**
- Automatically after CI workflow completes successfully
- Manual trigger via `workflow_dispatch`

**What it does:**
1. Downloads Allure report artifact from CI workflow
2. Deploys to staging (if on `develop` branch)
3. Deploys to production (if on `main` branch)
4. Sends deployment notifications

**Environments:**
- **Staging**: Deploys from `develop` branch
- **Production**: Deploys from `main` branch (requires approval if configured)

## Deployment Process

### Automatic Deployment

1. **Push to `develop` branch:**
   - CI runs tests
   - If tests pass, CD automatically deploys to staging

2. **Push to `main` branch:**
   - CI runs tests
   - If tests pass, CD deploys to production
   - May require manual approval (if configured in GitHub Environments)

### Manual Deployment

You can manually trigger deployments:

1. Go to **Actions** tab in GitHub
2. Select **CD - Deploy Allure Report** workflow
3. Click **Run workflow**
4. Choose environment (staging or production)
5. Click **Run workflow**

## Environment Configuration

### Staging Environment

**Configuration:**
- **Branch**: `develop`
- **Netlify Site ID**: Set `NETLIFY_STAGING_SITE_ID` secret
- **Auto-deploy**: Yes (after successful CI)

**Access:**
- URL: `https://<staging-site-id>.netlify.app`
- Configured in GitHub Environment: `staging`

### Production Environment

**Configuration:**
- **Branch**: `main`
- **Netlify Site ID**: Set `NETLIFY_SITE_ID` secret
- **Auto-deploy**: Yes (after successful CI)
- **Approval**: Optional (configure in GitHub Environments)

**Access:**
- URL: `https://<production-site-id>.netlify.app`
- Configured in GitHub Environment: `production`

## Required Secrets

Configure these secrets in GitHub (Settings → Secrets and variables → Actions):

### Required for All Deployments
- `NETLIFY_AUTH_TOKEN`: Netlify personal access token
- `NETLIFY_SITE_ID`: Production Netlify site ID

### Required for Staging
- `NETLIFY_STAGING_SITE_ID`: Staging Netlify site ID

### Optional (for notifications)
- `SLACK_WEBHOOK_URL`: Slack webhook URL for notifications
- `DISCORD_WEBHOOK_URL`: Discord webhook URL for notifications

## Setting Up Netlify

### 1. Create Netlify Account
- Go to [Netlify](https://www.netlify.com/)
- Sign up or log in

### 2. Create Sites
- Create a site for **production**
- Create a site for **staging** (optional)

### 3. Get Site IDs
- Go to Site settings → General → Site details
- Copy the **Site ID** for each site

### 4. Create Access Token
- Go to: https://app.netlify.com/user/applications#personal-access-tokens
- Click **New access token**
- Name it (e.g., "GitHub Actions Deploy")
- Copy the token (shown only once!)

### 5. Add Secrets to GitHub
- Repository Settings → Secrets and variables → Actions
- Add secrets:
  - `NETLIFY_AUTH_TOKEN`
  - `NETLIFY_SITE_ID` (production)
  - `NETLIFY_STAGING_SITE_ID` (staging, if using)

## Deployment Notifications

Deployments send notifications to:

1. **GitHub Actions Summary**: Always shown in workflow run
2. **Slack**: If `SLACK_WEBHOOK_URL` is configured
3. **Discord**: If `DISCORD_WEBHOOK_URL` is configured

### Setting Up Slack Notifications

1. Create a Slack webhook:
   - Go to your Slack workspace
   - Apps → Incoming Webhooks
   - Create webhook
   - Copy webhook URL

2. Add to GitHub secrets:
   - Name: `SLACK_WEBHOOK_URL`
   - Value: Your webhook URL

### Setting Up Discord Notifications

1. Create a Discord webhook:
   - Go to your Discord server
   - Server Settings → Integrations → Webhooks
   - Create webhook
   - Copy webhook URL

2. Add to GitHub secrets:
   - Name: `DISCORD_WEBHOOK_URL`
   - Value: Your webhook URL

## Manual Approval Gates

To require manual approval for production deployments:

1. Go to Repository Settings → Environments
2. Create or edit **production** environment
3. Add **Required reviewers**
4. Save

Now production deployments will wait for approval before deploying.

## Deployment Status

Check deployment status:

1. **GitHub Actions**: View workflow runs
2. **Netlify Dashboard**: See deployment history
3. **Notifications**: Receive alerts via configured channels

## Troubleshooting

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for common issues and solutions.

## Related Documentation

- [Rollback Guide](ROLLBACK_GUIDE.md)
- [Troubleshooting Guide](TROUBLESHOOTING.md)
- [Architecture Overview](ARCHITECTURE.md)

