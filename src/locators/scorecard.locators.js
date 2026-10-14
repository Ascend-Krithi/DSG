const locators = {
  comparisonSection: (page) => page.locator("my-account-templates-page-header")
    .filter({ has: page.getByRole("heading", { name: /score the right membership for you/i, level: 2 }) })
    .first()
    .or(
      page.locator("main")
        .filter({ has: page.getByRole("heading", { name: /score the right membership for you/i, level: 2 }) })
        .first()
    ),
  
  sectionHeading: (page) => locators.comparisonSection(page)
    .getByRole("heading", { name: /score the right membership for you/i, level: 2 })
    .first(),
  
  scorecardTile: (page) => locators.comparisonSection(page)
    .locator(".tile-body-copy")
    .filter({ hasText: /1 Point For Every \$1 Spent/i })
    .first(),
  
  scorecardPlusTile: (page) => locators.comparisonSection(page)
    .locator(".tile-body-copy")
    .filter({ has: page.getByAltText("ScoreCard Plus New Logo") })
    .first(),
  
  scorecardLogo: (page) => locators.scorecardTile(page)
    .getByAltText("ScoreCard Logo Light None")
    .first(),
  
  scorecardPlusLogo: (page) => locators.scorecardPlusTile(page)
    .getByAltText(/ScoreCard Plus New Logo/i)
    .first(),
  
  scorecardPlusPrice: (page) => locators.scorecardPlusTile(page)
    .locator("p, div, span")
    .filter({ hasText: /\$99 annual membership/i })
    .first(),
  
  scorecardPlusBenefits: (page) => locators.scorecardPlusTile(page)
    .locator("p, div, span")
    .filter({ hasText: /that'?s \$350 in benefits!?/i })
    .first(),
  
  scorecardGuestCta: (page) => locators.scorecardTile(page)
    .getByRole("button", { name: /sign in\s*\/\s*join now/i })
    .or(locators.scorecardTile(page).getByRole("link", { name: /sign in\s*\/\s*join now/i }))
    .first(),
  
  scorecardPlusGuestCta: (page) => locators.scorecardPlusTile(page)
    .getByRole("button", { name: /^join now$/i })
    .or(locators.scorecardPlusTile(page).getByRole("link", { name: /^join now$/i }))
    .or(locators.scorecardPlusTile(page).getByRole("button", { name: /join scorecard\+\s*now/i }))
    .first(),
  
  viewAccountScorecardTile: (page) => locators.scorecardTile(page)
    .locator("button, a")
    .filter({ hasText: /view account/i })
    .first(),
  
  viewAccountScorecardPlusTile: (page) => locators.scorecardPlusTile(page)
    .locator("button, a")
    .filter({ hasText: /view account/i })
    .first(),
  
  signInHeading: (page) => page.getByRole("heading", { name: /sign in/i })
    .or(page.locator("form").filter({ hasText: /sign in/i }))
    .first(),
  
  emailField: (page) => page.locator("input[type='email'], input[name*='email'], input[id*='email']").first(),
  
  passwordField: (page) => page.locator("input[type='password']").first(),
  
  signInButton: (page) => page.getByRole("button", { name: /sign in/i }).first(),
  
  accountSummaryHeading: (page) => page.getByRole("heading", { name: /account summary|my account/i })
    .or(page.locator("main").filter({ hasText: /account summary|my account/i }))
    .first()
};

module.exports = locators;