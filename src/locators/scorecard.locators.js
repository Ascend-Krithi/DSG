const locators = {
  comparisonSection: (page) => page.locator('my-account-templates-page-header')
    .filter({ has: page.getByRole('heading', { name: /Score the Right Membership for You/i, level: 2 }) })
    .first()
    .or(
      page.locator('main')
        .filter({ has: page.getByRole('heading', { name: /Score the Right Membership for You/i, level: 2 }) })
        .first()
    ),
  
  sectionHeading: (page) => locators.comparisonSection(page)
    .getByRole('heading', { name: /Score the Right Membership for You/i, level: 2 })
    .first(),
  
  scorecardTile: (page) => locators.comparisonSection(page)
    .locator('div, section, article, li')
    .filter({ has: page.getByAltText('ScoreCard Logo Light None') })
    .filter({ hasText: /1 Point For Every \$1 Spent/i })
    .filter({ hasText: /300 Points = \$10 Reward/i })
    .first(),
  
  scorecardPlusTile: (page) => locators.comparisonSection(page)
    .locator('div, section, article, li')
    .filter({ has: page.getByAltText(/ScoreCard Plus New Logo/i) })
    .filter({ hasText: /\$99 annual membership/i })
    .filter({ hasText: /That's \$350 in benefits/i })
    .first(),
  
  scorecardGuestCta: (page) => locators.scorecardTile(page)
    .getByRole('button', { name: /sign in\s*\/\s*join now/i })
    .or(locators.scorecardTile(page).getByRole('link', { name: /sign in\s*\/\s*join now/i })),
  
  scorecardPlusGuestCta: (page) => locators.scorecardPlusTile(page)
    .getByRole('button', { name: /^join now$/i })
    .or(locators.scorecardPlusTile(page).getByRole('link', { name: /^join now$/i }))
    .or(locators.scorecardPlusTile(page).getByRole('button', { name: /join scorecard\+.*now/i })),
  
  viewAccountScorecardTile: (page) => locators.scorecardTile(page)
    .getByRole('button', { name: /view account/i })
    .or(locators.scorecardTile(page).getByRole('link', { name: /view account/i })),
  
  viewAccountScorecardPlusTile: (page) => locators.scorecardPlusTile(page)
    .getByRole('button', { name: /view account/i })
    .or(locators.scorecardPlusTile(page).getByRole('link', { name: /view account/i })),
  
  scorecardLogo: (page) => locators.scorecardTile(page)
    .getByAltText('ScoreCard Logo Light None'),
  
  scorecardPlusLogo: (page) => locators.scorecardPlusTile(page)
    .getByAltText('ScoreCard Plus New Logo'),
  
  pricingText: (page) => locators.scorecardPlusTile(page)
    .getByText(/\$99 annual membership/i),
  
  benefitsText: (page) => locators.scorecardPlusTile(page)
    .getByText(/That's \$350 in benefits/i),
  
  pointsEarningText: (page) => locators.scorecardTile(page)
    .getByText(/1 Point For Every \$1 Spent/i),
  
  rewardRedemptionText: (page) => locators.scorecardTile(page)
    .getByText(/300 Points = \$10 Reward/i)
};

module.exports = locators;