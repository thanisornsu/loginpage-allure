/**
 * Script to generate screenshot of Allure report
 * Used in CI/CD pipeline to create visual report summary
 */
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

(async () => {
  try {
    const reportPath = path.join(
      __dirname,
      "..",
      "allure-report",
      "index.html"
    );

    if (!fs.existsSync(reportPath)) {
      console.error("Allure report not found at:", reportPath);
      process.exit(1);
    }

    const browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage({
      viewport: { width: 1920, height: 1080 },
    });

    const fileUrl = `file://${reportPath}`;
    console.log("Loading report from:", fileUrl);

    await page.goto(fileUrl, { waitUntil: "networkidle", timeout: 30000 });

    // Wait for Allure report to fully load - wait for "Loading..." text to disappear
    console.log("Waiting for Allure report to load...");
    try {
      // Wait for loading indicators to disappear
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
      console.log("Loading indicators disappeared");
    } catch (e) {
      console.log("Timeout waiting for loading indicators, continuing...");
    }

    // Wait for key elements to be visible (test cases count, charts, etc.)
    try {
      await page.waitForSelector(".widget", { timeout: 10000 });
      console.log("Widgets loaded");
    } catch (e) {
      console.log("Widgets not found, continuing...");
    }

    // Additional wait for charts and widgets to fully render
    await page.waitForTimeout(3000);

    // Scroll to top to capture the summary view
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);

    const screenshotPath = path.join(
      __dirname,
      "..",
      "allure-report-screenshot.png"
    );
    await page.screenshot({
      fullPage: true,
      path: screenshotPath,
    });

    await browser.close();
    console.log("Screenshot saved successfully at:", screenshotPath);
  } catch (error) {
    console.error("Error generating screenshot:", error);
    process.exit(1);
  }
})();
