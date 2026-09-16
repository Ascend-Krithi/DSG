const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../page-objects/ScorecardPage');

test.describe('[QE-319] Verify Scorecard tile displays all required content elements', () => {
  test('[QE-319][AC8] Verify Scorecard tile displays logo, points earning rate, and reward redemption formula', async ({ page }) => {
    const scorecardPage = new ScorecardPage(page);

    await test.step('Launch the Scorecard marketing page URL on desktop', async () => {
      await scorecardPage.goto();
      await expect(page).toHaveURL(/ScoreCard/i);
    });

    await test.step('Navigate to the comparison section with Scorecard tile', async () => {
      await scorecardPage.waitForComparisonSection();
      await expect(page.locator('.header-tile--scorecard').first()).toBeVisible();
    });

    await test.step('Verify Scorecard Logo is displayed', async () => {
      const logoAlt = await scorecardPage.getScorecardLogoAlt();
      expect(logoAlt).toContain('ScoreCard');
    });

    await test.step('Verify points earning rate is displayed', async () => {
      const pointsText = await scorecardPage.getScorecardPointsText();
      expect(pointsText).toMatch(/1 Point (Per|For) Every \$1 Spent\./i);
    });

    await test.step('Verify reward redemption formula is displayed', async () => {
      const rewardsText = await scorecardPage.getScorecardRewardsText();
      expect(rewardsText).toMatch(/300 Points = \$10 Reward\./i);
    });

    await test.step('Verify all content elements are properly aligned and styled', async () => {
      const scorecardTile = page.locator('.header-tile--scorecard').first();
      await expect(scorecardTile).toBeVisible();
      const logoLocator = page.locator('.header-tile--scorecard').getByAltText(/ScoreCard Logo Light None/i).first();
      const pointsLocator = page.locator('.header-tile--scorecard').getByText(/1 Point (Per|For) Every \$1 Spent\./i).first();
      const rewardsLocator = page.locator('.header-tile--scorecard').getByText(/300 Points = \$10 Reward\./i).first();
      await expect(logoLocator).toBeVisible();
      await expect(pointsLocator).toBeVisible();
      await expect(rewardsLocator).toBeVisible();
    });
  });
});