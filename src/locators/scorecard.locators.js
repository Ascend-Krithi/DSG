const locators = {
  comparisonSection: (page) =>
    page.locator('my-account-templates-page-header')
      .filter({ has: page.getByRole('heading', { name: /score the right membership for you/i, level: 2 }) })
      .first()
      .or(
        page.locator('main')
          .filter({ has: page.getByRole('heading', { name: /score the right membership for you/i, level: 2 }) })
          .first()
      ),

  sectionHeading: (page) =>
    locators.comparisonSection(page)
      .getByRole('heading', { name: /score the right membership for you/i, level: 2 }),

  scorecardTile: (page) =>
    locators.comparisonSection(page)
      .locator('div, section, article, li')
      .filter({ has: page.getByAltText('ScoreCard Logo Light None') })
      .filter({ hasText: /1 Point For Every \$1 Spent\.?/i })
      .filter({ hasText: /300 Points = \$10 Reward\.?/i })
      .first(),

  scorecardPlusTile: (page) =>
    locators.comparisonSection(page)
      .locator('div, section, article, li')
      .filter({ has: page.getByAltText(/ScoreCard Plus New Logo/i) })
      .filter({ hasText: /\$99 annual membership\.?/i })
      .filter({ hasText: /that'?s \$350 in benefits!?/i })
      .first(),

  scorecardLogoSummary: (page) =>
    locators.comparisonSection(page)
      .getByAltText(/ScoreCard Logo Light None/i)
      .first(),

  scorecardPoints: (page) =>
    locators.comparisonSection(page)
      .getByText(/1 Point For Every \$1 Spent\.?/i)
      .first(),

  scorecardRewards: (page) =>
    locators.comparisonSection(page)
      .getByText(/Earn \$10 in Rewards for every 300 Points|300 Points = \$10 Reward/i)
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
    locators.comparisonSection(page)
      .getByText(/\$99 annual membership\.?/i)
      .first(),

  scorecardPlusBenefits: (page) =>
    locators.comparisonSection(page)
      .locator('p, div, span')
      .filter({ hasText: /that'?s \$350 in benefits!?/i })
      .first(),

  scorecardGuestCta: (page) =>
    locators.scorecardTile(page)
      .locator('button, a')
      .filter({ hasText: /sign in\s*\/\s*join now|join now|join scorecard\+?\s*now/i })
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
      .first()
};

module.exports = locators;