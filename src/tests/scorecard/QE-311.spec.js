const { test, expect } = require('@playwright/test');
const DSGScorecardPage = require('../../pages/DSGScorecardPage');
const SignInPage = require('../../pages/SignInPage');

test.describe('[QE-1][AC4] Verify Scorecard+ tile displays appropriate CTA based on guest user authentication state', { tag: ['@regression', '@scorecard'] }, () => {
  let scorecardPage;
  let signInPage;

  test('[QE-311] Verify Scorecard+ tile displays appropriate CTA for guest user', async ({ page }) => {
    scorecardPage = new DSGScorecardPage(page);
    signInPage = new SignInPage(page);

    await test.step('Ensure user is not authenticated (clear all cookies and session data)', async () => {
      await signInPage.clearSession();
    });

    await test.step('Launch the Scorecard marketing page URL on desktop', async () => {
      await scorecardPage.goto();
      await expect(page).toHaveURL(/.*ScoreCard/i);
    });

    await test.step('Navigate to the Scorecard+ tile in the comparison section', async () => {
      const comparisonSection = page.locator('section').filter({ has: page.getByRole('heading', { name: 'Score the Right Membership for You', level: 2 }) }).first();
      await expect(comparisonSection).toBeVisible({ timeout: 20000 });
      const isScorecardPlusTileVisible = await scorecardPage.isScorecardPlusTileVisible();
      expect(isScorecardPlusTileVisible).toBe(true);
    });

    await test.step('Verify appropriate CTA button is displayed for guest user', async () => {
      const isGuestCtaVisible = await scorecardPage.isScorecardPlusGuestCtaVisible();
      expect(isGuestCtaVisible).toBe(true);
    });

    await test.step('Verify button is clickable and properly styled', async () => {
      const isGuestCtaEnabled = await scorecardPage.isScorecardPlusGuestCtaEnabled();
      expect(isGuestCtaEnabled).toBe(true);
    });
  });
});