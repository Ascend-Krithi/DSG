const locators = {
  // Page sections
  comparisonSection: (page) => page.locator('[data-testid="comparison-section"], section:has-text("Score the Right Membership")').first(),
  scorecardTile: (page) => page.locator('[data-testid="scorecard-tile"], [class*="scorecard-tile"]:not([class*="plus"])').first(),
  scorecardPlusTile: (page) => page.locator('[data-testid="scorecard-plus-tile"], [class*="scorecard-plus-tile"]').first(),
  
  // Section heading
  sectionHeading: (page) => page.locator('h1:has-text("Score the Right Membership for You"), h2:has-text("Score the Right Membership for You"), h3:has-text("Score the Right Membership for You")').first(),
  
  // Scorecard tile elements
  scorecardLogo: (page) => page.locator('[data-testid="scorecard-logo"], img[alt*="ScoreCard"]:not([alt*="Plus"])').first(),
  scorecardPricingText1: (page) => page.locator('text="1 Point Per Every $1 Spent."').first(),
  scorecardPricingText2: (page) => page.locator('text="300 Points = $10 Reward."').first(),
  scorecardCtaButton: (page) => page.locator('[data-testid="scorecard-cta"], button:has-text("Sign In"), button:has-text("Join Now"), a:has-text("View Account")').first(),
  
  // Scorecard+ tile elements
  scorecardPlusLogo: (page) => page.locator('[data-testid="scorecard-plus-logo"], img[alt*="ScoreCard+"], img[alt*="ScoreCard Plus"]').first(),
  scorecardPlusBenefitsValue: (page) => page.locator('[data-testid="benefits-value"], [class*="benefits-value"], p:has-text("benefits")').first(),
  scorecardPlusCtaButton: (page) => page.locator('[data-testid="scorecard-plus-cta"], button:has-text("Join ScoreCard+"), button:has-text("Upgrade")').first(),
  
  // Generic elements for validation
  allTileElements: (page) => page.locator('[data-testid="scorecard-tile"] > *, [class*="scorecard-tile"] > *'),
  allPricingTexts: (page) => page.locator('[data-testid="scorecard-tile"] p, [class*="scorecard-tile"] p')
};

module.exports = locators;