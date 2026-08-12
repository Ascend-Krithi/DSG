const locators = {
  pageHeading: (page) => page.locator('h1:has-text("Score the Right Membership for You")').first(),
  scorecardTile: (page) => page.locator('[data-testid="scorecard-tile"]').first(),
  scorecardPlusTile: (page) => page.locator('[data-testid="scorecard-plus-tile"]').first(),
  scorecardTitle: (page) => page.locator('[data-testid="scorecard-tile"] h2').first(),
  scorecardPlusTitle: (page) => page.locator('[data-testid="scorecard-plus-tile"] h2').first(),
  scorecardContent: (page) => page.locator('[data-testid="scorecard-tile"] .content').first(),
  scorecardPlusContent: (page) => page.locator('[data-testid="scorecard-plus-tile"] .content').first(),
  comparisonContainer: (page) => page.locator('[data-testid="comparison-container"]').first()
};

module.exports = locators;