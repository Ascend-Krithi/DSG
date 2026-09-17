const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../page-objects/ScorecardPage');

test.describe('[QE-1][AC4] Verify Scorecard+ tile displays appropriate CTA based on guest user authentication state', () => {
  test('QE-311: Verify appropriate CTA button is displayed for guest user on Scorecard+ tile', async ({ page, context }) => {
    await test.step('Ensure user is not authenticated (clear all cookies and session data)', async () => {
      await context.clearCookies();
      await context.clearPermissions();
    });

    const scorecardPage = new ScorecardPage(page);

    await test.step('Launch the Scorecard marketing page URL on desktop', async () => {
      await scorecardPage.goto();
      await expect(page).toHaveURL(/scorecard/i);
    });

    await test.step('Navigate to the Scorecard+ tile in the comparison section', async () => {
      const comparisonSection = await scorecardPage.getComparisonSection();
      await expect(comparisonSection).toBeVisible();
      const scorecardPlusTile = await scorecardPage.getScorecardPlusTile();
      await expect(scorecardPlusTile).toBeVisible();
    });

    await test.step('Verify appropriate CTA button is displayed for guest user', async () => {
      const guestCta = await scorecardPage.getScorecardPlusGuestCta();
      await expect(guestCta).toBeVisible();
      await expect(guestCta).toHaveText(/join now/i);
    });

    await test.step('Verify button is clickable and properly styled', async () => {
      const guestCta = await scorecardPage.getScorecardPlusGuestCta();
      await expect(guestCta).toBeEnabled();
      await expect(guestCta).toHaveAttribute('class', /.+/);
    });
  });
});