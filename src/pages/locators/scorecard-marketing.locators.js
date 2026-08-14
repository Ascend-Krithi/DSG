const locators = {
  // Section heading
  sectionHeading: (page) => page.locator('h2:has-text("Score the Right Membership for You")').first(),

  // Scorecard tile elements
  scorecardTile: (page) => page.locator('[data-testid="scorecard-tile"]').first(),
  scorecardLogo: (page) => page.locator('[data-testid="scorecard-tile"] img[alt*="Scorecard"]').first(),
  scorecardPointsText: (page) => page.locator('[data-testid="scorecard-tile"]:has-text("1 Point Per Every $1 Spent.")').first(),
  scorecardRedemptionText: (page) => page.locator('[data-testid="scorecard-tile"]:has-text("300 Points = $10 Reward.")').first(),
  scorecardSignInButton: (page) => page.locator('[data-testid="scorecard-tile"] button:has-text("Sign In / Join Now")').first(),
  scorecardViewAccountButton: (page) => page.locator('[data-testid="scorecard-tile"] button:has-text("View Account")').first(),

  // Scorecard+ tile elements
  scorecardPlusTile: (page) => page.locator('[data-testid="scorecard-plus-tile"]').first(),
  scorecardPlusDarkLogo: (page) => page.locator('[data-testid="scorecard-plus-tile"] img[alt*="Scorecard+"]').first(),
  scorecardPlusPricing: (page) => page.locator('[data-testid="scorecard-plus-tile"]:has-text("$99 Annual Membership.")').first(),
  scorecardPlusBenefits: (page) => page.locator('[data-testid="scorecard-plus-tile"]:has-text("That\'s $350 in Benefits!")').first(),
  scorecardPlusJoinButton: (page) => page.locator('[data-testid="scorecard-plus-tile"] button:has-text("Join Now")').first(),
  scorecardPlusViewAccountButton: (page) => page.locator('[data-testid="scorecard-plus-tile"] button:has-text("View Account")').first(),

  // Comparison tiles container
  comparisonTilesContainer: (page) => page.locator('[data-testid="comparison-tiles-container"]').first(),
};

module.exports = locators;