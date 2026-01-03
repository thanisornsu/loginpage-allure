# CI/CD Testing & Verification Guide

This guide helps you verify that all CI/CD components are working correctly.

## Prerequisites

Before testing, ensure you have:

1. ✅ All required secrets configured in GitHub
2. ✅ Netlify sites created (staging and production)
3. ✅ GitHub Environments configured (optional for approval gates)

## Step-by-Step Testing

### 1. Test CI Workflow (Continuous Integration)

#### Test 1.1: Verify CI Runs on Push

**Steps:**
1. Make a small change to any file (e.g., add a comment)
2. Commit and push to `develop` branch:
   ```bash
   git checkout develop
   git add .
   git commit -m "test: verify CI workflow"
   git push origin develop
   ```

3. **Verify:**
   - Go to GitHub → **Actions** tab
   - You should see "CI - Playwright Tests with Allure" workflow running
   - Wait for it to complete (should show ✅ green checkmark)

**Expected Results:**
- ✅ Workflow runs automatically
- ✅ Tests execute
- ✅ Allure report is generated
- ✅ Artifacts are uploaded
- ✅ Screenshot is generated

#### Test 1.2: Verify CI on Pull Request

**Steps:**
1. Create a new branch:
   ```bash
   git checkout -b test/ci-verification
   ```

2. Make a change and commit:
   ```bash
   git add .
   git commit -m "test: verify CI on PR"
   git push origin test/ci-verification
   ```

3. Create a Pull Request to `main` or `develop`

4. **Verify:**
   - CI workflow runs automatically
   - PR comment is added with test report screenshot
   - Artifacts are available

**Expected Results:**
- ✅ CI runs on PR creation
- ✅ PR comment appears with screenshot
- ✅ Artifacts downloadable from workflow run

### 2. Test CD Workflow (Continuous Deployment)

#### Test 2.1: Verify Staging Deployment

**Steps:**
1. Ensure you're on `develop` branch:
   ```bash
   git checkout develop
   ```

2. Make a test change and push:
   ```bash
   git add .
   git commit -m "test: verify staging deployment"
   git push origin develop
   ```

3. **Verify:**
   - CI workflow completes successfully
   - CD workflow "CD - Deploy Allure Report" starts automatically
   - Check for "Deploy to Staging" job

4. **Check Deployment:**
   - Go to Netlify dashboard
   - Check staging site for new deployment
   - Visit staging URL to verify report is live

**Expected Results:**
- ✅ CD workflow triggers after CI success
- ✅ Staging deployment job runs
- ✅ Report appears on Netlify staging site
- ✅ Notification sent (if configured)

#### Test 2.2: Verify Production Deployment

**Steps:**
1. Switch to `main` branch:
   ```bash
   git checkout main
   git merge develop  # or create a proper PR
   ```

2. Push to main:
   ```bash
   git push origin main
   ```

3. **Verify:**
   - CI workflow runs
   - CD workflow triggers
   - "Deploy to Production" job runs
   - If approval gates configured, wait for approval

4. **Check Deployment:**
   - Go to Netlify dashboard
   - Check production site for new deployment
   - Visit production URL

**Expected Results:**
- ✅ Production deployment runs
- ✅ Report appears on Netlify production site
- ✅ Notification sent (if configured)

#### Test 2.3: Manual Deployment Trigger

**Steps:**
1. Go to GitHub → **Actions** tab
2. Select **CD - Deploy Allure Report** workflow
3. Click **Run workflow** button (top right)
4. Select environment (staging or production)
5. Click **Run workflow**

**Verify:**
- Workflow runs manually
- Deployment executes
- Report is deployed

**Expected Results:**
- ✅ Manual trigger works
- ✅ Deployment completes
- ✅ Report is accessible

### 3. Test Notifications

#### Test 3.1: GitHub Actions Summary

**Steps:**
1. Trigger any deployment
2. Go to workflow run
3. Check **Summary** section

**Expected Results:**
- ✅ Deployment notification appears in summary
- ✅ Shows deployment status
- ✅ Includes environment and commit info

#### Test 3.2: Slack Notifications (if configured)

**Steps:**
1. Ensure `SLACK_WEBHOOK_URL` secret is set
2. Trigger a deployment
3. Check your Slack channel

**Expected Results:**
- ✅ Message appears in Slack
- ✅ Shows deployment status
- ✅ Includes action buttons/links

#### Test 3.3: Discord Notifications (if configured)

**Steps:**
1. Ensure `DISCORD_WEBHOOK_URL` secret is set
2. Trigger a deployment
3. Check your Discord channel

**Expected Results:**
- ✅ Embed message appears
- ✅ Shows deployment details
- ✅ Includes timestamp

### 4. Test Rollback Mechanism

#### Test 4.1: Rollback Staging

**Steps:**
1. Go to GitHub → **Actions** tab
2. Select **CD - Rollback Deployment** workflow
3. Click **Run workflow**
4. Select **staging** environment
5. Leave Deployment ID empty (rollback to previous)
6. Click **Run workflow**

**Verify:**
- Rollback workflow runs
- Previous deployment is restored
- Staging site shows previous version

**Expected Results:**
- ✅ Rollback completes successfully
- ✅ Staging site reverts to previous deployment
- ✅ Notification sent

#### Test 4.2: Rollback Production

**Steps:**
1. Go to GitHub → **Actions** tab
2. Select **CD - Rollback Deployment** workflow
3. Click **Run workflow**
4. Select **production** environment
5. Leave Deployment ID empty
6. Click **Run workflow**

**Verify:**
- If approval gates configured, approval is required
- After approval, rollback executes
- Production site reverts

**Expected Results:**
- ✅ Approval requested (if configured)
- ✅ Rollback completes
- ✅ Production site reverts
- ✅ Notification sent

#### Test 4.3: Rollback to Specific Deployment

**Steps:**
1. Get a deployment ID from Netlify dashboard
2. Go to GitHub → **Actions** → **CD - Rollback Deployment**
3. Click **Run workflow**
4. Select environment
5. Enter the deployment ID
6. Click **Run workflow**

**Expected Results:**
- ✅ Rollback to specific deployment works
- ✅ Correct version is restored

### 5. Verify Environments

#### Test 5.1: Check GitHub Environments

**Steps:**
1. Go to Repository Settings → **Environments**
2. Verify environments exist:
   - `staging`
   - `production`

**Expected Results:**
- ✅ Both environments exist
- ✅ Production can have required reviewers (optional)

#### Test 5.2: Test Approval Gates (if configured)

**Steps:**
1. Configure production environment with required reviewers
2. Trigger production deployment
3. Check for approval request

**Expected Results:**
- ✅ Deployment waits for approval
- ✅ Reviewers receive notification
- ✅ Deployment proceeds after approval

### 6. Check Workflow Logs

#### How to View Logs

1. Go to **Actions** tab
2. Click on a workflow run
3. Click on a job to see steps
4. Expand steps to see detailed logs

#### What to Look For

**CI Workflow:**
- ✅ Tests execute
- ✅ Reports generate
- ✅ Artifacts upload
- ✅ No errors

**CD Workflow:**
- ✅ Artifacts download
- ✅ Netlify authentication works
- ✅ Deployment succeeds
- ✅ Notifications sent

**Rollback Workflow:**
- ✅ Deployment history retrieved
- ✅ Rollback executes
- ✅ Previous version restored

## Quick Verification Checklist

Use this checklist to verify everything is working:

### CI Workflow ✅
- [ ] Runs on push to `develop`
- [ ] Runs on push to `main`
- [ ] Runs on pull requests
- [ ] Tests execute successfully
- [ ] Reports are generated
- [ ] Artifacts are uploaded
- [ ] PR comments are posted

### CD Workflow ✅
- [ ] Triggers after CI success
- [ ] Staging deploys from `develop`
- [ ] Production deploys from `main`
- [ ] Manual trigger works
- [ ] Deployments appear on Netlify
- [ ] Reports are accessible via URL

### Notifications ✅
- [ ] GitHub summary shows notifications
- [ ] Slack notifications work (if configured)
- [ ] Discord notifications work (if configured)

### Rollback ✅
- [ ] Manual rollback works
- [ ] Rollback to previous works
- [ ] Rollback to specific ID works
- [ ] Works for both environments

### Environments ✅
- [ ] Staging environment exists
- [ ] Production environment exists
- [ ] Approval gates work (if configured)

## Troubleshooting Tests

### If CI Doesn't Run

1. Check workflow file syntax
2. Verify branch names match
3. Check GitHub Actions is enabled
4. Review repository settings

### If CD Doesn't Trigger

1. Verify CI completed successfully
2. Check workflow dependencies
3. Verify branch conditions
4. Check workflow file syntax

### If Deployment Fails

1. Check Netlify secrets are set
2. Verify site IDs are correct
3. Check Netlify dashboard for errors
4. Review deployment logs

### If Notifications Don't Work

1. Verify webhook URLs are correct
2. Test webhooks manually
3. Check secrets are set
4. Review notification logs

### If Rollback Fails

1. Verify Netlify credentials
2. Check deployment ID is valid
3. Ensure deployment exists
4. Review rollback logs

## Test Scenarios

### Scenario 1: Full Pipeline Test

1. Push to `develop` → CI runs → CD deploys to staging ✅
2. Merge to `main` → CI runs → CD deploys to production ✅
3. Rollback staging → Verify rollback works ✅
4. Rollback production → Verify rollback works ✅

### Scenario 2: Error Handling

1. Make tests fail → Verify CI handles failure ✅
2. Remove Netlify secrets → Verify graceful failure ✅
3. Invalid deployment ID → Verify error handling ✅

### Scenario 3: Manual Operations

1. Manual deployment → Works ✅
2. Manual rollback → Works ✅
3. Manual CI trigger → Works ✅

## Success Criteria

All tests pass if:

✅ CI runs automatically on push/PR
✅ CD deploys automatically after successful CI
✅ Manual triggers work
✅ Rollback mechanism works
✅ Notifications are sent
✅ Reports are accessible
✅ Environments are configured correctly

## Next Steps After Verification

Once everything is verified:

1. **Document any issues** found during testing
2. **Fix any problems** discovered
3. **Update documentation** if needed
4. **Share with team** how to use the pipeline

## Related Documentation

- [Deployment Guide](DEPLOYMENT_GUIDE.md)
- [Rollback Guide](ROLLBACK_GUIDE.md)
- [Troubleshooting Guide](TROUBLESHOOTING.md)
- [Quick Reference](QUICK_REFERENCE.md)

