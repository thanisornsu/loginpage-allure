/**
 * Test data constants for SwagLabs login tests
 */
export const TestData = {
  // Valid credentials
  VALID_USERNAME: "standard_user",
  VALID_PASSWORD: "secret_sauce",

  // Alternative valid users
  PROBLEM_USER: "problem_user",
  PERFORMANCE_USER: "performance_glitch_user",

  // Invalid credentials
  INVALID_USERNAME: "invalid_user",
  INVALID_PASSWORD: "wrong_password",

  // Locked out user
  LOCKED_USER: "locked_out_user",

  // Error messages
  ERROR_MESSAGES: {
    INVALID_CREDENTIALS:
      "Epic sadface: Username and password do not match any user in this service",
    LOCKED_USER: "Epic sadface: Sorry, this user has been locked out.",
    REQUIRED_USERNAME: "Epic sadface: Username is required",
    REQUIRED_PASSWORD: "Epic sadface: Password is required",
  },

  // Expected URLs
  URLS: {
    LOGIN: "https://www.saucedemo.com/",
    INVENTORY: "https://www.saucedemo.com/inventory.html",
  },
} as const;
