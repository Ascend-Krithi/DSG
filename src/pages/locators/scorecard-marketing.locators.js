const locators = {
  // Section heading
  sectionHeading: (page) => page.locator('h1, h2, h3').filter({ hasText: 'Score the Right Membership for You' }).first(),

  // Scorecard tile elements
  scorecardTile: (page) => page.locator('[data-testid="scorecard-tile"]').first(),
  scorecardLogo: (page) => page.locator('[data-testid="scorecard-logo"], img[alt*="Scorecard"]').first(),
  scorecardPointsText: (page) => page.locator('text=1 Point Per Every $1 Spent').first(),
  scorecardRewardText: (page) => page.locator('text=300 Points = $10 Reward').first(),
  scorecardSignInButton: (page) => page.locator('[data-testid="scorecard-signin-btn"], button:has-text("Sign In / Join Now")').first(),
  scorecardViewAccountButton: (page) => page.locator('[data-testid="scorecard-view-account-btn"], button:has-text("View Account")').first(),

  // Scorecard+ tile elements
  scorecardPlusTile: (page) => page.locator('[data-testid="scorecard-plus-tile"]').first(),
  scorecardPlusDarkLogo: (page) => page.locator('[data-testid="scorecard-plus-logo"], img[alt*="Scorecard Plus"], img[alt*="Scorecard+"]').first(),
  scorecardPlusPricing: (page) => page.locator('text=$99 Annual Membership').first(),
  scorecardPlusBenefits: (page) => page.locator('text=/That\'s \$\d+ in Benefits!/').first(),
  scorecardPlusJoinButton: (page) => page.locator('[data-testid="scorecard-plus-join-btn"], button:has-text("Join Now")').first(),
  scorecardPlusViewAccountButton: (page) => page.locator('[data-testid="scorecard-plus-view-account-btn"], button:has-text("View Account")').first(),

  // Sign In page elements
  signInUsernameField: (page) => page.locator('[data-testid="username-input"], input[type="email"], input[name="username"]').first(),
  signInPasswordField: (page) => page.locator('[data-testid="password-input"], input[type="password"], input[name="password"]').first(),
  signInSubmitButton: (page) => page.locator('[data-testid="signin-submit"], button[type="submit"]:has-text("Sign In")').first(),
  signInErrorMessage: (page) => page.locator('[data-testid="error-message"], .error-message, [role="alert"]').first(),

  // MAUI Account Summary page elements
  accountSummaryContainer: (page) => page.locator('[data-testid="account-summary"], .account-summary').first(),
  accountSummaryHeading: (page) => page.locator('h1:has-text("Account Summary"), h2:has-text("Account Summary")').first(),

  // Sign out
  signOutButton: (page) => page.locator('[data-testid="signout-btn"], button:has-text("Sign Out")').first()
};

module.exports = locators;