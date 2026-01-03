# Rollback Guide

This guide explains how to rollback deployments when issues occur.

## Overview

The rollback workflow allows you to revert to a previous deployment version in case of issues.

## When to Rollback

Rollback should be used when:
- A deployment introduces bugs or errors
- Reports are not displaying correctly
- Performance issues occur after deployment
- Critical issues are discovered in production

## Rollback Process

### Method 1: Rollback to Previous Deployment (Recommended)

This rolls back to the immediately previous deployment:

1. Go to **Actions** tab in GitHub
2. Select **CD - Rollback Deployment** workflow
3. Click **Run workflow**
4. Select environment (staging or production)
5. Leave **Deployment ID** empty (to rollback to previous)
6. Click **Run workflow**

### Method 2: Rollback to Specific Deployment

This rolls back to a specific deployment ID:

1. Get the deployment ID:
   - Check Netlify dashboard → Deploys
   - Or check previous workflow runs
2. Go to **Actions** tab in GitHub
3. Select **CD - Rollback Deployment** workflow
4. Click **Run workflow**
5. Select environment
6. Enter the **Deployment ID**
7. Click **Run workflow**

## Finding Deployment IDs

### From Netlify Dashboard

1. Go to Netlify dashboard
2. Select your site
3. Go to **Deploys** tab
4. Find the deployment you want to rollback to
5. Copy the deployment ID from the URL or deployment details

### From GitHub Actions

1. Go to **Actions** tab
2. Find the deployment workflow run
3. Check the workflow logs for deployment ID
4. Or check the job summary for deployment information

## Rollback Workflow

The rollback workflow (`.github/workflows/rollback.yml`) performs:

1. **Authentication**: Uses Netlify credentials
2. **Get Deployment History**: Fetches list of deployments
3. **Rollback**: Restores the specified deployment
4. **Notification**: Sends rollback status notification

## Rollback for Staging

**When to use:**
- Testing rollback process
- Issues in staging environment
- Before rolling back production

**Steps:**
1. Use rollback workflow
2. Select **staging** environment
3. Choose deployment to rollback to
4. Monitor the rollback process

## Rollback for Production

**When to use:**
- Critical issues in production
- After confirming issue is deployment-related
- Emergency situations

**Steps:**
1. Use rollback workflow
2. Select **production** environment
3. May require approval (if configured)
4. Choose deployment to rollback to
5. Monitor the rollback process

## Approval for Production Rollback

If production environment has required reviewers:
1. Rollback workflow will wait for approval
2. Reviewers will receive notification
3. After approval, rollback proceeds
4. Monitor the process

## Rollback Notifications

Rollback sends notifications to:
- GitHub Actions summary
- Slack (if configured)
- Discord (if configured)

## Verifying Rollback

After rollback:

1. **Check Netlify Dashboard**:
   - Verify deployment is active
   - Check deployment history

2. **Check Site URL**:
   - Visit staging/production URL
   - Verify reports are displaying correctly

3. **Check Workflow Logs**:
   - Review rollback workflow logs
   - Confirm successful rollback

## Best Practices

1. **Test Rollback Process**:
   - Practice rollback in staging first
   - Understand the process before production issues

2. **Document Issues**:
   - Note what went wrong
   - Document the deployment that caused issues

3. **Monitor After Rollback**:
   - Verify site is working
   - Check for any remaining issues

4. **Investigate Root Cause**:
   - After rollback, investigate what went wrong
   - Fix issues before next deployment

## Limitations

- **Netlify API**: Rollback uses Netlify API, requires valid credentials
- **Deployment History**: Only recent deployments are available
- **No Automatic Rollback**: Manual trigger required (by design for safety)

## Troubleshooting Rollback

### Rollback Fails

**Possible causes:**
- Invalid deployment ID
- Netlify credentials not configured
- No previous deployment available
- Netlify API issues

**Solutions:**
- Check deployment ID is correct
- Verify Netlify secrets are set
- Check Netlify dashboard for available deployments
- Retry after a few minutes

### Can't Find Deployment ID

**Solutions:**
- Check Netlify dashboard directly
- Review previous workflow runs
- Use "previous deployment" option (leave ID empty)

## Related Documentation

- [Deployment Guide](DEPLOYMENT_GUIDE.md)
- [Troubleshooting Guide](TROUBLESHOOTING.md)
- [Architecture Overview](ARCHITECTURE.md)

