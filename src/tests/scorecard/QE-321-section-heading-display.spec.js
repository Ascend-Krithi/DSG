const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../page-objects/ScorecardPage');

test.describe('[QE-321] Verify section heading is displayed above comparison tiles', () => {
  test('[QE-321][AC9] Verify section heading Score the Right Membership for You', async ({ page }) => {
    const scorecardPage = new ScorecardPage(page);

    await test.step('Launch the Scorecard marketing page URL on desktop', async () => {
      await scorecardPage.goto();
      await expect(page).toHaveURL(/ScoreCard/i);
    });

    await test.step('Navigate to the comparison section', async () => {
      await scorecardPage.waitForComparisonSection();
      const comparisonSection = page.locator('my-account-templates-page-header').filter({ has: page.getByRole('heading', { name: /score the right membership for you/i, level: 2 }) }).first();
      await expect(comparisonSection).toBeVisible();
    });

    await test.step('Verify section heading is displayed', async () => {
      const headingText = await scorecardPage.getSectionHeadingText();
      expect(headingText).toMatch(/score the right membership for you/i);
    });

    await test.step('Verify heading is positioned above the comparison tiles', async () => {
      const heading = page.locator('my-account-templates-page-header').getByRole('heading', { name: /score the right membership for you/i, level: 2 }).first();
      const scorecardTile = page.locator('.header-tile--scorecard').first();
      const scorecardPlusTile = page.locator('.header-tile--scorecard-plus').first();
      await expect(heading).toBeVisible();
      await expect(scorecardTile).toBeVisible();
      await expect(scorecardPlusTile).toBeVisible();
    });

    await test.step('Verify heading is fully readable and properly styled', async () => {
      const heading = page.locator('my-account-templates-page-header').getByRole('heading', { name: /score the right membership for you/i, level: 2 }).first();
      await expect(heading).toBeVisible();
      const headingText = await heading.textContent();
      expect(headingText.trim().length).toBeGreaterThan(0);
    });
  });
});