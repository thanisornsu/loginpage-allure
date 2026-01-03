# CI/CD Quick Reference

Quick reference guide for common CI/CD operations.

## 🚀 Quick Actions

### Deploy to Staging
```bash
# Push to develop branch
git push origin develop
```

### Deploy to Production
```bash
# Push to main branch
git push origin main
```

### Manual Deployment
1. GitHub → Actions → CD - Deploy Allure Report
2. Run workflow → Select environment → Run

### Rollback Deployment
1. GitHub → Actions → CD - Rollback Deployment
2. Run workflow → Select environment → Run

## 📋 Required Secrets

| Secret | Required For | Description |
|--------|--------------|-------------|
| `NETLIFY_AUTH_TOKEN` | All deployments | Netlify access token |
| `NETLIFY_SITE_ID` | Production | Production site ID |
| `NETLIFY_STAGING_SITE_ID` | Staging | Staging site ID |
| `SLACK_WEBHOOK_URL` | Notifications | Slack webhook (optional) |
| `DISCORD_WEBHOOK_URL` | Notifications | Discord webhook (optional) |

## 🔗 Workflow Files

| File | Purpose |
|------|---------|
| `.github/workflows/ci.yml` | CI - Tests and reports |
| `.github/workflows/deploy-report.yml` | CD - Deployments |
| `.github/workflows/rollback.yml` | Rollback operations |

## 🌍 Environments

| Environment | Branch | Auto-Deploy | Approval |
|-------------|--------|-------------|----------|
| Staging | `develop` | ✅ Yes | ❌ No |
| Production | `main` | ✅ Yes | ⚠️ Optional |

## 📚 Documentation

- [Deployment Guide](DEPLOYMENT_GUIDE.md) - Full deployment instructions
- [Rollback Guide](ROLLBACK_GUIDE.md) - Rollback procedures
- [Troubleshooting](TROUBLESHOOTING.md) - Common issues
- [Architecture](ARCHITECTURE.md) - System architecture

## ⚡ Common Commands

### Check Workflow Status
```bash
# View in GitHub Actions tab
# Or use GitHub CLI:
gh run list
```

### View Deployment Logs
```bash
# GitHub Actions → Select workflow run → View logs
```

### Get Deployment ID
```bash
# From Netlify dashboard → Deploys tab
# Or from workflow logs
```

## 🆘 Quick Troubleshooting

| Issue | Quick Fix |
|-------|-----------|
| Deployment fails | Check Netlify secrets |
| Notifications not working | Verify webhook URLs |
| Rollback fails | Check deployment ID |
| Workflow not triggering | Verify branch names |

For detailed troubleshooting, see [TROUBLESHOOTING.md](TROUBLESHOOTING.md).

