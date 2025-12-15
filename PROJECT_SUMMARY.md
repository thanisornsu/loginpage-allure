# 📋 Project Summary: Playwright + TypeScript + Allure Test Automation

## 🎯 Project Goals

Create a Test Automation system for SwagLabs login page using:

- **Playwright** + **TypeScript** for testing
- **Allure Report** for test reporting
- **GitHub Actions CI/CD** for automated execution
- **Netlify** for online report deployment

---

## 📁 Project Structure

```
swaglabs-allure-cicd/
├── src/
│   ├── pages/
│   │   └── LoginPage.ts          # Page Object Model (POM)
│   ├── tests/
│   │   └── login.spec.ts          # Test cases
│   └── utils/
│       └── test-data.ts           # Test data and credentials
├── scripts/
│   ├── screenshot-report.js       # Generate report screenshot
│   └── view-report.js             # View downloaded reports
├── .github/
│   └── workflows/
│       ├── ci.yml                 # Main workflow (Tests + Deploy)
│       └── deploy-netlify.yml     # Alternative Netlify workflow
├── playwright.config.ts           # Playwright configuration
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript configuration
├── netlify.toml                   # Netlify configuration
└── README.md                      # Documentation
```

---

## 🔧 What Was Built

### 1. Basic Project Setup

**What was done:**

- Created `package.json` with dependencies (Playwright, TypeScript, Allure)
- Configured `tsconfig.json` for TypeScript
- Configured `playwright.config.ts` with Allure reporter
- Created `.gitignore`

**Main Dependencies:**

```json
{
  "@playwright/test": "^1.40.0",
  "allure-playwright": "^2.10.0",
  "allure-commandline": "^2.24.1",
  "typescript": "^5.3.3"
}
```

### 2. Page Object Model (POM) Implementation

**File:** `src/pages/LoginPage.ts`

**Principles:**

- POM should contain only **interactions** (click, type, navigate)
- **No assertions** in POM
- Assertions should be in test files for proper Allure tracking

**Methods created:**

- `goto()` - Navigate to login page
- `login(username, password)` - Perform login
- `getErrorMessage()` - Get error message text
- `isErrorMessageVisible()` - Check if error is visible
- `isLoggedIn()` - Check if login was successful

### 3. Test Cases

**File:** `src/tests/login.spec.ts`

**Test Scenarios (7 tests):**

1. ✅ Valid login
2. ❌ Invalid username
3. ❌ Invalid password
4. 🔒 Locked out user
5. ⚠️ Empty username
6. ⚠️ Empty password
7. ⚠️ Empty credentials

**Key principles:**

- **Assertions in test file**, not in POM
- Use Allure steps, labels, and attachments
- Each test has screenshot attachment

### 4. GitHub Actions Workflow

**File:** `.github/workflows/ci.yml`

**Workflow steps:**

1. Checkout code
2. Setup Node.js
3. Install dependencies (`npm ci`)
4. Install Playwright browsers
5. Run tests (`npm test`)
6. Generate Allure report
7. Upload report as artifact
8. Generate report screenshot
9. Upload screenshot as artifact
10. Add screenshot to job summary
11. Comment PR with screenshot
12. **Deploy to Netlify** (if configured)

### 5. Report Scripts

**scripts/screenshot-report.js:**

- Uses Playwright to open Allure report
- Waits for report to fully load (waits for "Loading..." to disappear)
- Takes full-page screenshot
- Used in CI/CD to create report image

**scripts/view-report.js:**

- Creates local HTTP server
- View reports downloaded from Artifacts
- Usage: `npm run report:view`

### 6. Netlify Deployment Setup

**What needs to be done:**

1. Create Netlify account and site
2. Create Access Token
3. Get Site ID
4. Add Secrets to GitHub:
   - `NETLIFY_AUTH_TOKEN`
   - `NETLIFY_SITE_ID`

---

## 🐛 Problems Encountered and Solutions

### Problem 1: Assertions in POM Causing Empty Allure Reports

**Symptoms:**

- Allure report shows empty data
- Test results not displayed in report

**Cause:**

- Added `expect()` statements in POM class
- Allure cannot track assertions inside POM

**Solution:**

```typescript
// ❌ Wrong - Assertions in POM
async verifyErrorMessage(msg: string) {
  await expect(this.errorMessage).toContainText(msg);
}

// ✅ Correct - POM returns values, assertions in test
async getErrorMessage(): Promise<string> {
  return await this.errorMessage.textContent() || "";
}

// In test file:
const errorText = await loginPage.getErrorMessage();
expect(errorText).toContain(expectedMessage);
```

**Principle:**

- **POM = Interactions only** (click, type, get data)
- **Test file = Assertions** (verify results)

---

### Problem 2: Playwright webServer Configuration Error

**Symptoms:**

```
Error: Process from config.webServer exited early.
```

**Cause:**

- Had `webServer` config in `playwright.config.ts`
- But using external URL (https://www.saucedemo.com), no local server needed

**Solution:**

```typescript
// ❌ Wrong
export default defineConfig({
  // ...
  webServer: {
    command: 'echo "No local server needed"',
    port: 3000,
  },
});

// ✅ Correct - Remove webServer
export default defineConfig({
  // ... no webServer
});
```

---

### Problem 3: GitHub Actions YAML Syntax Error

**Symptoms:**

```
Invalid workflow file: .github/workflows/ci.yml#L75
You have an error in your yaml syntax on line 75
```

**Cause:**

- Used GitHub Actions expressions `${{ }}` in JavaScript template literal
- YAML parser tries to parse `${{ }}` before sending to JavaScript

**Solution:**

```yaml
# ❌ Wrong
script: |
  const summary = `URL: https://github.com/${{ github.repository }}/...`;

# ✅ Correct - Use env variables
env:
  REPOSITORY: ${{ github.repository }}
  RUN_ID: ${{ github.run_id }}
script: |
  const repository = process.env.REPOSITORY;
  const summary = `URL: https://github.com/${repository}/...`;
```

---

### Problem 4: GitHub Pages Deployment Error

**Symptoms:**

```
Error: Failed to create deployment (status: 404)
Ensure GitHub Pages has been enabled
```

**Cause:**

- GitHub Pages not enabled in repository settings
- Workflow tries to deploy but Pages not ready

**Solution:**

1. **Check before deploying:**

```yaml
- name: Check if Pages is enabled
  uses: actions/github-script@v7
  # Check before deploying

- name: Deploy to GitHub Pages
  if: steps.check-pages.outputs.enabled == 'true'
  # Deploy only when enabled
```

2. **Use `continue-on-error: true`:**

```yaml
deploy-report:
  continue-on-error: true # Don't fail workflow
```

3. **Or switch to Netlify instead** (what we did)

---

### Problem 5: Allure Report Screenshot Shows Loading State

**Symptoms:**

- Screenshot shows "Loading..." instead of fully loaded report

**Cause:**

- Screenshot taken before Allure report finishes loading
- Charts and widgets not yet rendered

**Solution:**

```javascript
// ✅ Wait for report to fully load
await page.goto(fileUrl, { waitUntil: "networkidle" });

// Wait for "Loading..." to disappear
await page.waitForFunction(
  () => {
    const loadingElements = document.querySelectorAll("*");
    let hasLoading = false;
    loadingElements.forEach((el) => {
      if (el.textContent && el.textContent.includes("Loading...")) {
        hasLoading = true;
      }
    });
    return !hasLoading;
  },
  { timeout: 30000 }
);

// Wait for widgets to load
await page.waitForSelector(".widget", { timeout: 10000 });

// Wait additional 3 seconds for charts to render
await page.waitForTimeout(3000);

// Then take screenshot
await page.screenshot({ fullPage: true });
```

---

### Problem 6: Netlify Workflow Cannot Download Artifact

**Symptoms:**

```
Unable to download artifact(s): Resource not accessible by integration
```

**Cause:**

- Workflow triggered by `workflow_run` doesn't have permissions
- Cannot access artifacts from other workflows

**Solution:**

```yaml
jobs:
  deploy:
    permissions:
      contents: read
      actions: read # ← Add this permission
```

**Or:**

- Use main workflow (`ci.yml`) which already has deploy job
- Don't need alternative workflow (`deploy-netlify.yml`)

---

## 📝 Best Practices Used

### 1. Page Object Model (POM)

**Principle:**

- POM = Interactions only (no assertions)
- Test file = Assertions only
- Enables proper Allure tracking

### 2. Test Structure

```typescript
test.describe("Feature Name", () => {
  test.beforeEach(async ({ page }) => {
    // Setup
  });

  test("should do something", async ({ page }) => {
    await allure.step("Action", async () => {
      // Action
    });

    await allure.step("Verify", async () => {
      // Assertion
      expect(...).toBe(...);
    });
  });
});
```

### 3. Allure Integration

- Use `allure.step()` for each action
- Use `allure.label()` for categorization
- Use `allure.attachment()` for screenshots
- Use `allure.description()` for test descriptions

### 4. CI/CD Workflow

**Principles:**

- Use `continue-on-error: true` for optional steps
- Check before deploying (e.g., check if Pages is enabled)
- Show helpful messages when setup incomplete
- Always upload artifacts (regardless of deployment success)

---

## 🚀 How to Use This in Other Projects

### Step 1: Setup Project

```bash
# 1. Create new project
npm init -y

# 2. Install dependencies
npm install -D @playwright/test allure-playwright allure-commandline typescript @types/node

# 3. Create tsconfig.json
# 4. Create playwright.config.ts
# 5. Create folder structure (src/pages, src/tests, src/utils)
```

### Step 2: Create POM

```typescript
// src/pages/YourPage.ts
export class YourPage {
  readonly page: Page;
  readonly someElement: Locator;

  constructor(page: Page) {
    this.page = page;
    this.someElement = page.locator("#some-id");
  }

  // ✅ Interactions only
  async doSomething(): Promise<void> {
    await this.someElement.click();
  }

  // ✅ Return values, no assertions
  async getText(): Promise<string> {
    return (await this.someElement.textContent()) || "";
  }
}
```

### Step 3: Create Tests

```typescript
// src/tests/your-test.spec.ts
import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { YourPage } from "../pages/YourPage";

test("should do something", async ({ page }) => {
  const yourPage = new YourPage(page);

  await allure.step("Action", async () => {
    await yourPage.doSomething();
  });

  await allure.step("Verify", async () => {
    const text = await yourPage.getText();
    expect(text).toBe("expected value");
  });
});
```

### Step 4: Setup CI/CD

1. Copy `.github/workflows/ci.yml` to use
2. Modify workflow name and test commands
3. Setup Netlify (if deploying reports)

### Step 5: Setup Netlify (Optional)

1. Create Netlify account
2. Create Access Token
3. Get Site ID
4. Add Secrets to GitHub

---

## 📊 Checklist for New Projects

- [ ] Setup dependencies (Playwright, TypeScript, Allure)
- [ ] Create tsconfig.json and playwright.config.ts
- [ ] Create POM classes (interactions only, no assertions)
- [ ] Create test files (assertions in test file)
- [ ] Add Allure steps and attachments
- [ ] Create GitHub Actions workflow
- [ ] Test running tests locally
- [ ] Push to GitHub and verify workflow
- [ ] Setup Netlify (optional)
- [ ] Add Secrets to GitHub
- [ ] Test deployment

---

## 🎓 Key Learnings

1. **POM Pattern**: Clearly separate interactions and assertions
2. **Allure Integration**: Assertions must be in test file to be tracked
3. **GitHub Actions**: Use env variables instead of direct template expressions in scripts
4. **Error Handling**: Use `continue-on-error` and check before deploying
5. **Screenshot Timing**: Wait for page to fully load before taking screenshot

---

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/)
- [Allure Framework](https://allure.qatools.ru/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Netlify Documentation](https://docs.netlify.com/)

---

## ✅ Summary

This project is a great example for:

- ✅ Test Automation with Playwright + TypeScript
- ✅ Proper Allure Reporting
- ✅ Complete CI/CD Pipeline
- ✅ Automated Deployment
- ✅ Best Practices for POM Pattern

Can be used as a template for other projects! 🚀
