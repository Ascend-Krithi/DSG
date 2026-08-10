const locators = {
  // Comparison Section
  comparisonSection: (page) => page.locator('[data-testid="comparison-section"]').first(),
  sectionHeading: (page) => page.locator('h2:has-text("Score the Right Membership for You")').first(),
  
  // Scorecard Tile (Left)
  scorecardTile: (page) => page.locator('[data-testid="scorecard-tile"]').first(),
  scorecardLogo: (page) => page.locator('[data-testid="scorecard-logo"]').first(),
  pointsEarningText: (page) => page.locator('text=1 Point Per Every $1 Spent').first(),
  rewardsRedemptionText: (page) => page.locator('text=300 Points = $10 Reward').first(),
  signInJoinNowButton: (page) => page.locator('[data-testid="scorecard-cta"]:has-text("Sign In / Join Now")').first(),
  scorecardViewAccountButton: (page) => page.locator('[data-testid="scorecard-cta"]:has-text("View Account")').first(),
  
  // Scorecard+ Tile (Right)
  scorecardPlusTile: (page) => page.locator('[data-testid="scorecard-plus-tile"]').first(),
  scorecardPlusDarkLogo: (page) => page.locator('[data-testid="scorecard-plus-logo"]').first(),
  annualMembershipText: (page) => page.locator('text=$99 Annual Membership').first(),
  benefitsValueText: (page) => page.locator('[data-testid="benefits-value"]').first(),
  joinNowButton: (page) => page.locator('[data-testid="scorecard-plus-cta"]:has-text("Join Now")').first(),
  scorecardPlusViewAccountButton: (page) => page.locator('[data-testid="scorecard-plus-cta"]:has-text("View Account")').first(),
  
  // Authentication
  usernameField: (page) => page.locator('[data-testid="username-input"]').first(),
  passwordField: (page) => page.locator('[data-testid="password-input"]').first(),
  signInButton: (page) => page.locator('[data-testid="signin-button"]').first(),
  signOutButton: (page) => page.locator('[data-testid="signout-button"]').first(),
  errorMessage: (page) => page.locator('[data-testid="error-message"]').first(),
  sessionExpiredMessage: (page) => page.locator('text=Your session has expired. Please sign in again.').first()
};

module.exports = locators;