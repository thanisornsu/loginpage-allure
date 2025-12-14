import { Page, Locator } from "@playwright/test";
import { TestData } from "../utils/test-data";

/**
 * Page Object Model for SwagLabs Login Page
 * Encapsulates all login page interactions
 */
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("#user-name");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator("#login-button");
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Navigate to the login page
   */
  async goto(): Promise<void> {
    await this.page.goto(TestData.URLS.LOGIN);
  }

  /**
   * Perform login with provided credentials
   * @param username - Username to login with
   * @param password - Password to login with
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Get the error message text if present
   * @returns Error message text or empty string
   */
  async getErrorMessage(): Promise<string> {
    return (await this.errorMessage.textContent()) || "";
  }

  /**
   * Check if error message is visible
   * @returns True if error message is visible, false otherwise
   */
  async isErrorMessageVisible(): Promise<boolean> {
    try {
      await this.errorMessage.waitFor({ state: "visible", timeout: 2000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if user is successfully logged in
   * @returns True if logged in (on inventory page), false otherwise
   */
  async isLoggedIn(): Promise<boolean> {
    try {
      await this.page.waitForURL(TestData.URLS.INVENTORY, { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Clear all input fields
   */
  async clearFields(): Promise<void> {
    await this.usernameInput.clear();
    await this.passwordInput.clear();
  }
}
