const locators = {
  comparisonSection: (page) =>
    page.locator('my-account-templates-page-header')
      .filter({ has: page.getByRole('heading', { name: /score the right membership for you/i, level: 2 }) })
      .first(),

  sectionHeading: (page) =>
    locators.comparisonSection(page)
      .getByRole('heading', { name: /score the right membership for you/i, level: 2 })
      .first(),

  scorecardTile: (page) =>
    locators.comparisonSection(page)
      .locator('.header-tile--scorecard')
      .first(),

  scorecardPlusTile: (page) =>
    locators.comparisonSection(page)
      .locator('.header-tile--scorecard-plus')
      .first(),

  scorecardLogoSummary: (page) =>
    locators.comparisonSection(page)
      .getByAltText(/ScoreCard Logo Light None/i)
      .first(),

  scorecardPoints: (page) =>
    locators.scorecardTile(page)
      .getByText(/1 Point For Every \$1 Spent\./i)
      .first(),

  scorecardRewards: (page) =>
    locators.scorecardTile(page)
      .getByText(/300 Points = \$10 Reward\./i)
      .first(),

  scorecardShipping: (page) =>
    locators.comparisonSection(page)
      .getByText(/Free Shipping on orders \$49\+/i)
      .first(),

  scorecardPlusLogoSummary: (page) =>
    locators.comparisonSection(page)
      .getByAltText(/ScoreCard Plus New Logo/i)
      .first(),

  scorecardPlusLogoCard: (page) =>
    locators.comparisonSection(page)
      .getByAltText(/ScoreCard Logo \+ Light None/i)
      .first(),

  scorecardPlusPrice: (page) =>
    locators.scorecardPlusTile(page)
      .getByText(/\$99 annual membership\./i)
      .first(),

  scorecardPlusBenefits: (page) =>
    locators.scorecardPlusTile(page)
      .locator('p, div, span')
      .filter({ hasText: /that'?s \$350 in benefits!?/i })
      .first(),

  scorecardGuestCta: (page) =>
    locators.scorecardTile(page)
      .locator('button, a')
      .filter({ hasText: /sign in\s*\/\s*join now|join now|join scorecard\+\s*now/i })
      .first(),

  scorecardPlusGuestCta: (page) =>
    locators.scorecardPlusTile(page)
      .locator('button, a')
      .filter({ hasText: /join now|join scorecard\+\s*now|sign in\s*\/\s*join now/i })
      .first(),

  viewAccountScorecardTile: (page) =>
    locators.scorecardTile(page)
      .locator('button, a')
      .filter({ hasText: /view account/i })
      .first(),

  viewAccountScorecardPlusTile: (page) =>
    locators.scorecardPlusTile(page)
      .locator('button, a')
      .filter({ hasText: /view account/i })
      .first(),

  signInEmailInput: (page) =>
    page.locator('input[type="email"], input[name*="email" i], input[id*="email" i]').first(),

  signInPasswordInput: (page) =>
    page.locator('input[type="password"], input[name*="password" i], input[id*="password" i]').first(),

  signInSubmitButton: (page) =>
    page.getByRole('button', { name: /sign in|log in/i })
      .or(page.locator('button[type="submit"]'))
      .first(),

  signInLink: (page) =>
    page.locator('a[href*="sign-in" i], a[href*="login" i]').first(),

  signInPageCheck: (page) =>
    page.getByRole('heading', { name: /sign in/i })
      .or(page.locator('form').filter({ hasText: /sign in/i }))
      .first(),

  accountSummaryCheck: (page) =>
    page.getByRole('heading', { name: /account summary|my account/i })
      .or(page.locator('main').filter({ hasText: /account summary|my account/i }))
      .first(),

  unavailablePage: (page) =>
    page.getByRole('heading', { name: /site is currently unavailable/i }).first()
};

module.exports = locators;