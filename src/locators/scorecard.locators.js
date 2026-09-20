const locators = {
  comparisonSection: (page) => page.locator("my-account-templates-page-header")
    .filter({ has: page.getByRole("heading", { name: /score the right membership for you/i, level: 2 }) })
    .first()
    .or(
      page.locator("main")
        .filter({ has: page.getByRole("heading", { name: /score the right membership for you/i, level: 2 }) })
        .first()
    ),

  comparisonHeading: (page) => page.getByRole("heading", { name: /score the right membership for you/i, level: 2 }),

  scorecardTile: (page) => locators.comparisonSection(page)
    .locator("div, section, article, li")
    .filter({ has: page.getByAltText("ScoreCard Logo Light None") })
    .filter({ hasText: /1 Point For Every \$1 Spent\./i })
    .filter({ hasText: /300 Points = \$10 Reward\./i })
    .first(),

  scorecardPlusTile: (page) => locators.comparisonSection(page)
    .locator("div, section, article, li")
    .filter({ has: page.getByAltText(/ScoreCard Plus New Logo/i) })
    .filter({ hasText: /\$99 annual membership\./i })
    .first(),

  scorecardLogo: (page) => locators.comparisonSection(page)
    .getByAltText("ScoreCard Logo Light None")
    .first(),

  scorecardPoints: (page) => locators.comparisonSection(page)
    .getByText(/1 Point For Every \$1 Spent\./i)
    .first(),

  scorecardReward: (page) => locators.comparisonSection(page)
    .getByText(/300 Points = \$10 Reward\./i)
    .first(),

  scorecardPlusLogoSummary: (page) => locators.comparisonSection(page)
    .getByAltText(/ScoreCard Plus New Logo/i)
    .first(),

  scorecardPlusLogoCard: (page) => locators.comparisonSection(page)
    .getByAltText(/ScoreCard Logo \+ Light None/i)
    .first(),

  scorecardPlusPrice: (page) => locators.comparisonSection(page)
    .getByText(/\$99 annual membership\./i)
    .first(),

  scorecardPlusBenefits: (page) => locators.comparisonSection(page)
    .locator("p, div, span")
    .filter({ hasText: /that'?s \$350 in benefits!?/i })
    .first(),

  scorecardGuestCta: (page) => locators.scorecardTile(page)
    .getByRole("button", { name: /sign in\s*\/\s*join now/i })
    .or(locators.scorecardTile(page).getByRole("link", { name: /sign in\s*\/\s*join now/i })),

  scorecardPlusGuestCta: (page) => locators.scorecardPlusTile(page)
    .getByRole("button", { name: /^join now$/i })
    .or(locators.scorecardPlusTile(page).getByRole("link", { name: /^join now$/i }))
    .or(locators.scorecardPlusTile(page).getByRole("button", { name: /join scorecard\+\s*now/i })),

  viewAccountScorecardTile: (page) => locators.scorecardTile(page)
    .locator("button, a")
    .filter({ hasText: /view account/i })
    .first(),

  viewAccountScorecardPlusTile: (page) => locators.scorecardPlusTile(page)
    .locator("button, a")
    .filter({ hasText: /view account/i })
    .first(),

  signInHeading: (page) => page.getByRole("heading", { name: /sign in/i })
    .or(page.locator("form").filter({ hasText: /sign in/i })),

  accountSummaryHeading: (page) => page.getByRole("heading", { name: /account summary|my account/i })
    .or(page.locator("main").filter({ hasText: /account summary|my account/i }))
};

module.exports = locators;