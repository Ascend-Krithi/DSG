const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const AuthPage = require('../../pages/auth.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QE-1][AC7] Verify benefits messaging remains unchanged regardless of authentication state', { tag: ['@regression', '@scorecard'] }, () => {
  let scorecardPage;
  let authPage;
  let guestBenefits;

  test('[QE-317] Verify benefits messaging identical in guest and authenticated states', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    authPage = new AuthPage(page);

    await test.step('Access Scorecard marketing page as guest user', async () => {
      await scorecardPage.clearSession();
      await scorecardPage.goto();
      await expect(page).toHaveURL(TD.urlPatterns.scorecard, { timeout: 20000 });
    });

    await test.step('Verify benefits messaging on Scorecard+ tile in guest state', async () => {
      await expect(scorecardPage.getScorecardPlusBenefits()).toBeVisible({ timeout: 20000 });
      guestBenefits = await scorecardPage.getScorecardPlusBenefitsText();
      expect(guestBenefits).toMatch(TD.marketing.scorecardPlusBenefits);
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

    await test.step('Verify benefits messaging on Scorecard+ tile in authenticated state', async () => {
      await expect(scorecardPage.getScorecardPlusBenefits()).toBeVisible({ timeout: 20000 });
      const authBenefits = await scorecardPage.getScorecardPlusBenefitsText();
      expect(authBenefits).toMatch(TD.marketing.scorecardPlusBenefits);
    });

    await test.step('Compare benefits messaging between guest and authenticated states', async () => {
      const authBenefits = await scorecardPage.getScorecardPlusBenefitsText();
      expect(authBenefits).toBe(guestBenefits);
    });
  });
});