const locators = {
  comparisonSection: (page) => page.locator('my-account-templates-page-header').filter({ has: page.getByRole('heading', { name: 'Score the Right Membership for You', level: 2 }) }).first(),

  sectionHeading: (page) => locators.comparisonSection(page).getByRole('heading', { name: 'Score the Right Membership for You', level: 2 }),

  scorecardTile: (page) => locators.comparisonSection(page).locator('*').filter({ hasText: /1 Point For Every \$1 Spent\.\s*300 Points = \$10 Reward\./i }).first(),

  scorecardPlusTile: (page) => locators.comparisonSection(page).locator('*').filter({ has: page.getByAltText('ScoreCard Plus New Logo') }).filter({ hasText: /\$99 Annual Membership\./i }).filter({ hasText: /\$350 in Benefits!?/i }).first(),

  scorecardLogo: (page) => locators.comparisonSection(page).getByAltText('ScoreCard Logo Light None').first(),

  scorecardPointsText: (page) => locators.comparisonSection(page).getByText(/1 Point For Every \$1 Spent\./i).first(),

  scorecardRewardText: (page) => locators.comparisonSection(page).getByText(/300 Points = \$10 Reward\./i).first(),

  scorecardPlusLogoSummary: (page) => locators.comparisonSection(page).getByAltText('ScoreCard Plus New Logo').first(),

  scorecardPlusLogoCard: (page) => locators.comparisonSection(page).getByAltText('ScoreCard Logo \\+ Light None').first(),

  scorecardPlusPrice: (page) => locators.comparisonSection(page).getByText(/\$99 Annual Membership\./i).first(),

  scorecardPlusBenefits: (page) => locators.comparisonSection(page).locator('.benefits-value').filter({ hasText: /\$\d+\s+in\s+Benefits!?/i }).first(),

  scorecardGuestCta: (page) => locators.scorecardTile(page).getByRole('button', { name: /sign in\s*\/\s*join now/i }).or(locators.scorecardTile(page).getByRole('link', { name: /sign in\s*\/\s*join now/i })),

  scorecardPlusGuestCta: (page) => locators.scorecardPlusTile(page).getByRole('button', { name: /^join now$/i }).or(locators.scorecardPlusTile(page).getByRole('link', { name: /^join now$/i })).or(locators.scorecardPlusTile(page).getByRole('button', { name: /join scorecard\+\s*now/i })),

  viewAccountScorecardTile: (page) => locators.scorecardTile(page).getByRole('button', { name: /view account/i }).or(locators.scorecardTile(page).getByRole('link', { name: /view account/i })),

  viewAccountScorecardPlusTile: (page) => locators.scorecardPlusTile(page).getByRole('button', { name: /view account/i }).or(locators.scorecardPlusTile(page).getByRole('link', { name: /view account/i })),

  signInPageCheck: (page) => page.getByRole('heading', { name: /sign in/i }).or(page.locator('form').filter({ hasText: /sign in/i })),

  accountSummaryCheck: (page) => page.getByRole('heading', { name: /account summary|my account/i }).or(page.locator('main').filter({ hasText: /account summary|my account/i }))
};

module.exports = locators;