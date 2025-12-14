# SwagLabs Test Automation with Playwright + Allure

A modern, clean test automation framework for SwagLabs login page using Playwright, TypeScript, and Allure reporting with GitHub Actions CI/CD integration.

## 🚀 Features

- **Playwright + TypeScript**: Modern, fast, and reliable end-to-end testing
- **Page Object Model (POM)**: Clean, maintainable code structure
- **Allure Reporting**: Rich test reports with screenshots, steps, and attachments
- **GitHub Actions CI/CD**: Automated testing with visual report screenshots
- **Multiple Test Scenarios**: Comprehensive login test coverage

## 📋 Prerequisites

- Node.js 18+ and npm
- Git

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd swaglabs-allure-cicd
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install chromium
```

## 🧪 Running Tests

### Run all tests:
```bash
npm test
```

### Run tests in headed mode (see browser):
```bash
npm run test:headed
```

### Run tests with UI mode:
```bash
npm run test:ui
```

### Run tests in debug mode:
```bash
npm run test:debug
```

## 📊 Allure Reports

### Generate and view Allure report locally:
```bash
npm run report
```

This command will:
1. Generate the Allure report from test results
2. Open it in your default browser

### Generate report only (without opening):
```bash
npm run report:generate
```

## 📁 Project Structure

```
swaglabs-allure-cicd/
├── src/
│   ├── pages/
│   │   └── LoginPage.ts          # Page Object Model for login page
│   ├── tests/
│   │   └── login.spec.ts          # Test cases for login scenarios
│   └── utils/
│       └── test-data.ts           # Test data and credentials
├── scripts/
│   └── screenshot-report.js       # Script to generate report screenshot
├── .github/
│   └── workflows/
│       └── ci.yml                 # GitHub Actions workflow
├── playwright.config.ts           # Playwright configuration
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # Project documentation
```

## 🧩 Test Scenarios

The following login test scenarios are covered:

1. ✅ **Valid Login** - Successful login with valid credentials
2. ❌ **Invalid Username** - Error message for invalid username
3. ❌ **Invalid Password** - Error message for invalid password
4. 🔒 **Locked User** - Error message for locked out user
5. ⚠️ **Empty Username** - Validation error for empty username
6. ⚠️ **Empty Password** - Validation error for empty password
7. ⚠️ **Empty Credentials** - Validation error for both empty fields

## 🔄 CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/ci.yml`) automatically:

1. Runs tests on push/PR to `main` or `develop` branches
2. Generates Allure report
3. Uploads Allure report as downloadable artifact
4. Generates screenshot of Allure report summary
5. Uploads screenshot as artifact (visible in GitHub Actions UI)
6. Comments on PRs with the report screenshot
7. **Deploys report to GitHub Pages** (for main branch) - View online at: `https://<username>.github.io/loginpage-allure/`

### Viewing Reports in CI/CD

- **🌐 Online Report (GitHub Pages)**: After pushing to `main` branch, the report is automatically deployed and accessible at:
  - `https://<your-username>.github.io/loginpage-allure/`
  - Check the workflow run for the exact URL
- **📥 Artifacts**: Download the `allure-report` artifact from the workflow run
- **📸 Screenshot**: View the `allure-report-screenshot` artifact to see a visual summary
- **💬 PR Comments**: For pull requests, the screenshot is automatically posted as a comment

### 📦 Alternative: Deploy to Netlify

To deploy to Netlify instead of (or in addition to) GitHub Pages:

1. **Option A: Automatic via Netlify CLI in GitHub Actions**
   - Add `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` as GitHub Secrets
   - The workflow will automatically deploy to Netlify

2. **Option B: Manual Netlify Setup**
   - Go to [Netlify](https://www.netlify.com/)
   - Connect your GitHub repository
   - Set build command: `echo "Report already generated"`
   - Set publish directory: `allure-report`
   - Netlify will auto-deploy on every push

## 🏗️ Page Object Model

The project uses the Page Object Model pattern for better maintainability:

- **LoginPage.ts**: Encapsulates all login page interactions
- Methods: `goto()`, `login()`, `getErrorMessage()`, `isLoggedIn()`, `verifyErrorMessage()`
- Clean separation of page logic from test logic

## 📝 Test Data

Test credentials and data are centralized in `src/utils/test-data.ts`:

- Valid users: `standard_user`, `problem_user`, `performance_glitch_user`
- Invalid credentials for negative testing
- Error messages for assertions
- URLs for navigation

## 🎯 Allure Integration

Each test includes:

- **Descriptions**: Clear test descriptions
- **Labels**: Severity, feature, and story labels
- **Steps**: Detailed step-by-step execution
- **Attachments**: Screenshots on failures and key actions
- **Metadata**: Test metadata for better reporting

## 🔧 Configuration

### Playwright Config (`playwright.config.ts`)

- Base URL: `https://www.saucedemo.com`
- Reporter: HTML and Allure
- Browser: Chromium
- Screenshots: On failure
- Videos: Retained on failure

### TypeScript Config (`tsconfig.json`)

- Strict mode enabled
- ES2020 target
- CommonJS modules

## 📦 Dependencies

- `@playwright/test`: Playwright testing framework
- `allure-playwright`: Allure reporter integration
- `allure-commandline`: Allure report generation
- `typescript`: Type safety
- `@types/node`: Node.js type definitions

## 🤝 Contributing

1. Create a feature branch
2. Write tests following the POM pattern
3. Ensure all tests pass
4. Generate and review Allure reports
5. Submit a pull request

## 📄 License

ISC

## 🙏 Acknowledgments

- [Playwright](https://playwright.dev/) - Modern web testing framework
- [Allure Framework](https://allure.qatools.ru/) - Test reporting framework
- [SwagLabs](https://www.saucedemo.com/) - Demo application for testing

