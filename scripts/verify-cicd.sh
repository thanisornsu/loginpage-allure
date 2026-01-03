#!/bin/bash

# CI/CD Verification Script
# This script helps verify that CI/CD is configured correctly

echo "🔍 CI/CD Verification Script"
echo "============================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${RED}❌ Not a git repository${NC}"
    exit 1
fi

echo "📋 Checking Workflow Files..."
echo ""

# Check CI workflow
if [ -f ".github/workflows/ci.yml" ]; then
    echo -e "${GREEN}✅ CI workflow exists${NC}"
else
    echo -e "${RED}❌ CI workflow missing${NC}"
fi

# Check CD workflow
if [ -f ".github/workflows/deploy-report.yml" ]; then
    echo -e "${GREEN}✅ CD workflow exists${NC}"
else
    echo -e "${RED}❌ CD workflow missing${NC}"
fi

# Check Rollback workflow
if [ -f ".github/workflows/rollback.yml" ]; then
    echo -e "${GREEN}✅ Rollback workflow exists${NC}"
else
    echo -e "${RED}❌ Rollback workflow missing${NC}"
fi

echo ""
echo "📚 Checking Documentation..."
echo ""

# Check documentation files
docs=(
    "docs/TESTING_GUIDE.md"
    "docs/DEPLOYMENT_GUIDE.md"
    "docs/ROLLBACK_GUIDE.md"
    "docs/TROUBLESHOOTING.md"
    "docs/ARCHITECTURE.md"
)

for doc in "${docs[@]}"; do
    if [ -f "$doc" ]; then
        echo -e "${GREEN}✅ $(basename $doc)${NC}"
    else
        echo -e "${YELLOW}⚠️  $(basename $doc) missing${NC}"
    fi
done

echo ""
echo "🔧 Configuration Check..."
echo ""

# Check if package.json exists
if [ -f "package.json" ]; then
    echo -e "${GREEN}✅ package.json exists${NC}"
    
    # Check for required scripts
    if grep -q '"test"' package.json; then
        echo -e "${GREEN}✅ Test script configured${NC}"
    else
        echo -e "${YELLOW}⚠️  Test script not found${NC}"
    fi
    
    if grep -q '"report:generate"' package.json; then
        echo -e "${GREEN}✅ Report generation script configured${NC}"
    else
        echo -e "${YELLOW}⚠️  Report generation script not found${NC}"
    fi
else
    echo -e "${RED}❌ package.json missing${NC}"
fi

echo ""
echo "🌐 GitHub Actions Status..."
echo ""

# Check if GitHub CLI is available
if command -v gh &> /dev/null; then
    echo "Checking recent workflow runs..."
    gh run list --limit 3 2>/dev/null || echo -e "${YELLOW}⚠️  Could not fetch workflow runs (may need to authenticate)${NC}"
else
    echo -e "${YELLOW}⚠️  GitHub CLI not installed. Install with: brew install gh${NC}"
    echo "   Or check manually at: https://github.com/$(git remote get-url origin | sed 's/.*github.com[:/]\(.*\)\.git/\1/')/actions"
fi

echo ""
echo "📝 Next Steps:"
echo ""
echo "1. Verify secrets are configured in GitHub:"
echo "   - NETLIFY_AUTH_TOKEN"
echo "   - NETLIFY_SITE_ID"
echo "   - NETLIFY_STAGING_SITE_ID (optional)"
echo ""
echo "2. Test CI workflow:"
echo "   git push origin develop"
echo ""
echo "3. Test CD workflow:"
echo "   - After CI succeeds, CD should trigger automatically"
echo "   - Or manually trigger from GitHub Actions"
echo ""
echo "4. Check workflow runs:"
echo "   - Go to GitHub → Actions tab"
echo "   - Review workflow execution logs"
echo ""
echo "5. Read the Testing Guide:"
echo "   docs/TESTING_GUIDE.md"
echo ""
echo "✅ Verification complete!"

