/**
 * Script to generate screenshot of Allure report
 * Used in CI/CD pipeline to create visual report summary
 */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  try {
    const reportPath = path.join(__dirname, '..', 'allure-report', 'index.html');
    
    if (!fs.existsSync(reportPath)) {
      console.error('Allure report not found at:', reportPath);
      process.exit(1);
    }

    const browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage({
      viewport: { width: 1920, height: 1080 }
    });

    const fileUrl = `file://${reportPath}`;
    console.log('Loading report from:', fileUrl);
    
    await page.goto(fileUrl, { waitUntil: 'networkidle', timeout: 30000 });
    
    // Wait for Allure charts and widgets to render
    await page.waitForTimeout(5000);
    
    // Scroll to top to capture the summary view
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);

    const screenshotPath = path.join(__dirname, '..', 'allure-report-screenshot.png');
    await page.screenshot({
      fullPage: true,
      path: screenshotPath
    });

    await browser.close();
    console.log('Screenshot saved successfully at:', screenshotPath);
  } catch (error) {
    console.error('Error generating screenshot:', error);
    process.exit(1);
  }
})();

