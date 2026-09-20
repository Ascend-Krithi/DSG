const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const AuthPage = require('../../pages/auth.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QE-1][AC7] Verify membership pricing remains unchanged regardless of authentication state', { tag: ['@regression', '@scorecard'] }, () => {
  let scorecardPage;
  let authPage;
  let guestPrice;

  test('[QE-316] Verify pricing identical in guest and authenticated states', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    authPage = new AuthPage(page);

    await test.step('Access Scorecard marketing page as guest user', async () => {
      await scorecardPage.clearSession();
      await scorecardPage.goto();
      await expect(page).toHaveURL(TD.urlPatterns.scorecard, { timeout: 20000 });
    });

    await test.step('Verify pricing information on Scorecard+ tile in guest state', async () => {
      await expect(scorecardPage.getScorecardPlusPrice()).toBeVisible({ timeout: 20000 });
      guestPrice = await scorecardPage.getScorecardPlusPriceText();
      expect(guestPrice).toMatch(TD.marketing.scorecardPlusPrice);
    });

    await test.step('Sign in with valid user credentials', async () => {
      const username = process.env.TEST_USERNAME || 'test@example.com';
      const password = process.env.TEST_PASSWORD || 'testpassword';
      await authPage.signIn(username, password);
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('Navigate to Scorecard marketing page as authenticated user', async () => {
      await scorecardPage.goto();
      await expect(page).toHaveURL(TD.urlPatterns.scorecard, { timeout: 20000 });
    });

    await test.step('Verify pricing information on Scorecard+ tile in authenticated state', async () => {
      await expect(scorecardPage.getScorecardPlusPrice()).toBeVisible({ timeout: 20000 });
      const authPrice = await scorecardPage.getScorecardPlusPriceText();
      expect(authPrice).toMatch(TD.marketing.scorecardPlusPrice);
    });

    await test.step('Compare pricing information between guest and authenticated states', async () => {
      const authPrice = await scorecardPage.getScorecardPlusPriceText();
      expect(authPrice).toBe(guestPrice);
    });
  });
});