# Troubleshooting Guide

Common issues and solutions for CI/CD workflows.

## CI Workflow Issues

### Tests Fail

**Symptoms:**
- CI workflow shows failed tests
- Artifacts may not be generated

**Solutions:**
1. Check test logs in GitHub Actions
2. Review test failures
3. Fix test issues locally first
4. Re-run tests after fixes

### Reports Not Generated

**Symptoms:**
- No Allure report artifacts
- Missing report screenshots

**Solutions:**
1. Check if tests ran successfully
2. Verify `npm run report:generate` step
3. Check for errors in report generation step
4. Ensure Allure is properly installed

### Artifacts Not Uploading

**Symptoms:**
- Artifacts section is empty
- Can't download reports

**Solutions:**
1. Check artifact upload step logs
2. Verify artifact paths are correct
3. Check artifact size limits (GitHub has limits)
4. Ensure workflow has proper permissions

## CD Workflow Issues

### Deployment Fails

**Symptoms:**
- CD workflow fails
- Reports not deployed to Netlify

**Common Causes & Solutions:**

#### 1. Netlify Secrets Not Configured

**Error:** "Netlify secrets not configured"

**Solution:**
1. Add `NETLIFY_AUTH_TOKEN` secret
2. Add `NETLIFY_SITE_ID` secret
3. For staging, add `NETLIFY_STAGING_SITE_ID`

#### 2. Invalid Netlify Credentials

**Error:** Authentication failed

**Solution:**
1. Verify `NETLIFY_AUTH_TOKEN` is valid
2. Regenerate token if expired
3. Check token has proper permissions

#### 3. Site ID Mismatch

**Error:** Site not found

**Solution:**
1. Verify `NETLIFY_SITE_ID` is correct
2. Check site exists in Netlify
3. Ensure site ID matches environment

### Artifact Download Fails

**Symptoms:**
- "Artifact not found" error
- Can't download report from CI

**Solutions:**
1. Ensure CI workflow completed successfully
2. Check artifact name matches (`allure-report`)
3. Verify workflow run ID is correct
4. Wait a few minutes and retry (artifact propagation delay)

### Staging Deployment Not Triggering

**Symptoms:**
- Only production deploys
- Staging doesn't deploy

**Solutions:**
1. Verify you're pushing to `develop` branch
2. Check CI workflow completed successfully
3. Verify `NETLIFY_STAGING_SITE_ID` is set
4. Check workflow conditions in `deploy-report.yml`

### Production Deployment Requires Approval

**Symptoms:**
- Deployment stuck waiting
- "Waiting for approval" status

**Solutions:**
1. This is expected if approval gates are configured
2. Go to Environments → production
3. Approve the deployment
4. Or disable approval gates if not needed

## Rollback Issues

### Rollback Fails

**Symptoms:**
- Rollback workflow fails
- Can't restore previous deployment

**Solutions:**
1. Verify Netlify credentials
2. Check deployment ID is valid
3. Ensure deployment exists in Netlify
4. Check Netlify API status

### Can't Find Previous Deployment

**Symptoms:**
- "No previous deployment found"

**Solutions:**
1. Check Netlify dashboard for deployments
2. Use specific deployment ID instead
3. Verify site has deployment history

## Notification Issues

### Notifications Not Sending

**Symptoms:**
- No Slack/Discord notifications
- Missing deployment alerts

**Solutions:**
1. Verify webhook URLs are correct
2. Test webhook URLs manually
3. Check webhook is not expired
4. Verify secrets are set correctly

### Duplicate Notifications

**Symptoms:**
- Multiple notifications for same deployment

**Solutions:**
1. Check if multiple workflows are running
2. Verify notification steps aren't duplicated
3. Review workflow triggers

## Environment Issues

### Environment Not Found

**Symptoms:**
- "Environment not found" error

**Solutions:**
1. Create environment in GitHub Settings
2. Go to Settings → Environments
3. Create staging/production environments
4. Configure environment settings

### Environment Approval Not Working

**Symptoms:**
- Deployment proceeds without approval
- Approval not requested

**Solutions:**
1. Verify environment has required reviewers
2. Check environment is referenced correctly in workflow
3. Ensure you have permission to configure environments

## General Issues

### Workflow Not Triggering

**Symptoms:**
- Workflows don't run on push/PR

**Solutions:**
1. Check workflow file syntax
2. Verify branch names match
3. Check workflow file is in `.github/workflows/`
4. Ensure file has `.yml` or `.yaml` extension

### Permission Errors

**Symptoms:**
- "Permission denied" errors
- Can't access resources

**Solutions:**
1. Check workflow permissions
2. Verify secrets are accessible
3. Check repository settings
4. Ensure GitHub Actions is enabled

### Slow Workflows

**Symptoms:**
- Workflows take too long
- Timeout errors

**Solutions:**
1. Optimize test execution
2. Use parallel test execution
3. Cache dependencies
4. Review workflow steps for inefficiencies

## Getting Help

### Check Logs

1. Go to **Actions** tab
2. Select failed workflow run
3. Expand failed job
4. Review step logs
5. Look for error messages

### Common Error Messages

**"Resource not accessible by integration"**
- Permission issue
- Check workflow permissions

**"Secret not found"**
- Secret not configured
- Add missing secrets

**"Workflow not found"**
- Workflow file issue
- Check file path and syntax

**"Artifact not found"**
- CI didn't complete
- Artifact name mismatch

### Debug Steps

1. **Enable Debug Logging:**
   - Add `ACTIONS_STEP_DEBUG: true` secret
   - More verbose logs will appear

2. **Test Locally:**
   - Run tests locally first
   - Verify commands work

3. **Check Dependencies:**
   - Verify package.json
   - Check Node.js version

4. **Review Recent Changes:**
   - Check what changed
   - Revert if needed

## Related Documentation

- [Deployment Guide](DEPLOYMENT_GUIDE.md)
- [Rollback Guide](ROLLBACK_GUIDE.md)
- [Architecture Overview](ARCHITECTURE.md)

