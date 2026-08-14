const locators = {
  // Auth0 SSO page elements
  logoLink: (page) => page.locator('a:has-text("Return to Homepage")').first(),
  heading: (page) => page.locator('h1:has-text("Sign in")').first(),
  subtext: (page) => page.locator('text=Use your email address to continue').first(),
  
  // Form inputs
  emailInput: (page) => page.locator('input[type="email"], input[name="username"]').first(),
  continueButton: (page) => page.locator('button:has-text("CONTINUE")').first(),
  passwordInput: (page) => page.locator('input[type="password"], input[name="password"]').first(),
  signInButton: (page) => page.locator('button:has-text("Sign In"), button[type="submit"]:has-text("Sign")').first(),
  
  // Social login
  googleButton: (page) => page.locator('button:has-text("Continue with Google")').first(),
  appleButton: (page) => page.locator('button:has-text("Continue with Apple")').first(),
  
  // Links
  joinNowLink: (page) => page.locator('a:has-text("Join Now")').first(),
  termsLink: (page) => page.locator('a:has-text("Terms of Use")').first(),
  privacyLink: (page) => page.locator('a:has-text("Privacy Policy")').first(),
  
  // Error message
  errorMessage: (page) => page.locator('[role="alert"], .error-message, [class*="error"]').first(),
};

module.exports = locators;