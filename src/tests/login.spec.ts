import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { LoginPage } from "../pages/LoginPage";
import { TestData } from "../utils/test-data";

test.describe("SwagLabs Login Tests", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await allure.step("Navigate to login page", async () => {
      await loginPage.goto();
    });
  });

  test("should login successfully with valid credentials", async ({ page }) => {
    await allure.description(
      "Test successful login with standard user credentials"
    );
    await allure.label("severity", "critical");
    await allure.label("feature", "Login");
    await allure.label("story", "Valid Login");

    await allure.step("Enter valid credentials", async () => {
      await loginPage.login(TestData.VALID_USERNAME, TestData.VALID_PASSWORD);
    });

    await allure.step("Verify successful login", async () => {
      const isLoggedIn = await loginPage.isLoggedIn();
      expect(isLoggedIn).toBe(true);
      await expect(page).toHaveURL(TestData.URLS.INVENTORY);
    });

    await allure.attachment(
      "Login Success Screenshot",
      await page.screenshot(),
      {
        contentType: "image/png",
      }
    );
  });

  test("should display error message for invalid username", async ({
    page,
  }) => {
    await allure.description("Test login failure with invalid username");
    await allure.label("severity", "high");
    await allure.label("feature", "Login");
    await allure.label("story", "Invalid Credentials");

    await allure.step("Enter invalid username", async () => {
      await loginPage.login(TestData.INVALID_USERNAME, TestData.VALID_PASSWORD);
    });

    await allure.step("Verify error message is displayed", async () => {
      const isErrorVisible = await loginPage.isErrorMessageVisible();
      expect(isErrorVisible).toBe(true);
      const errorText = await loginPage.getErrorMessage();
      expect(errorText).toContain(TestData.ERROR_MESSAGES.INVALID_CREDENTIALS);
    });

    await allure.attachment(
      "Error Message Screenshot",
      await page.screenshot(),
      {
        contentType: "image/png",
      }
    );
  });

  test("should display error message for invalid password", async ({
    page,
  }) => {
    await allure.description("Test login failure with invalid password");
    await allure.label("severity", "high");
    await allure.label("feature", "Login");
    await allure.label("story", "Invalid Credentials");

    await allure.step("Enter invalid password", async () => {
      await loginPage.login(TestData.VALID_USERNAME, TestData.INVALID_PASSWORD);
    });

    await allure.step("Verify error message is displayed", async () => {
      const isErrorVisible = await loginPage.isErrorMessageVisible();
      expect(isErrorVisible).toBe(true);
      const errorText = await loginPage.getErrorMessage();
      expect(errorText).toContain(TestData.ERROR_MESSAGES.INVALID_CREDENTIALS);
    });

    await allure.attachment(
      "Error Message Screenshot",
      await page.screenshot(),
      {
        contentType: "image/png",
      }
    );
  });

  test("should display error message for locked out user", async ({ page }) => {
    await allure.description("Test login failure for locked out user account");
    await allure.label("severity", "high");
    await allure.label("feature", "Login");
    await allure.label("story", "Locked User");

    await allure.step("Attempt login with locked user", async () => {
      await loginPage.login(TestData.LOCKED_USER, TestData.VALID_PASSWORD);
    });

    await allure.step("Verify locked user error message", async () => {
      const isErrorVisible = await loginPage.isErrorMessageVisible();
      expect(isErrorVisible).toBe(true);
      const errorText = await loginPage.getErrorMessage();
      expect(errorText).toContain(TestData.ERROR_MESSAGES.LOCKED_USER);
    });

    await allure.attachment(
      "Locked User Error Screenshot",
      await page.screenshot(),
      {
        contentType: "image/png",
      }
    );
  });

  test("should display error message when username is empty", async ({
    page,
  }) => {
    await allure.description(
      "Test login validation when username field is empty"
    );
    await allure.label("severity", "medium");
    await allure.label("feature", "Login");
    await allure.label("story", "Form Validation");

    await allure.step("Attempt login without username", async () => {
      await loginPage.login("", TestData.VALID_PASSWORD);
    });

    await allure.step("Verify username required error message", async () => {
      const isErrorVisible = await loginPage.isErrorMessageVisible();
      expect(isErrorVisible).toBe(true);
      const errorText = await loginPage.getErrorMessage();
      expect(errorText).toContain(TestData.ERROR_MESSAGES.REQUIRED_USERNAME);
    });

    await allure.attachment(
      "Empty Username Error Screenshot",
      await page.screenshot(),
      {
        contentType: "image/png",
      }
    );
  });

  test("should display error message when password is empty", async ({
    page,
  }) => {
    await allure.description(
      "Test login validation when password field is empty"
    );
    await allure.label("severity", "medium");
    await allure.label("feature", "Login");
    await allure.label("story", "Form Validation");

    await allure.step("Attempt login without password", async () => {
      await loginPage.login(TestData.VALID_USERNAME, "");
    });

    await allure.step("Verify password required error message", async () => {
      const isErrorVisible = await loginPage.isErrorMessageVisible();
      expect(isErrorVisible).toBe(true);
      const errorText = await loginPage.getErrorMessage();
      expect(errorText).toContain(TestData.ERROR_MESSAGES.REQUIRED_PASSWORD);
    });

    await allure.attachment(
      "Empty Password Error Screenshot",
      await page.screenshot(),
      {
        contentType: "image/png",
      }
    );
  });

  test("should display error message when both fields are empty", async ({
    page,
  }) => {
    await allure.description(
      "Test login validation when both username and password are empty"
    );
    await allure.label("severity", "medium");
    await allure.label("feature", "Login");
    await allure.label("story", "Form Validation");

    await allure.step("Attempt login with empty credentials", async () => {
      await loginPage.login("", "");
    });

    await allure.step("Verify username required error message", async () => {
      // When both fields are empty, username error takes precedence
      const isErrorVisible = await loginPage.isErrorMessageVisible();
      expect(isErrorVisible).toBe(true);
      const errorText = await loginPage.getErrorMessage();
      expect(errorText).toContain(TestData.ERROR_MESSAGES.REQUIRED_USERNAME);
    });

    await allure.attachment(
      "Empty Fields Error Screenshot",
      await page.screenshot(),
      {
        contentType: "image/png",
      }
    );
  });
});
