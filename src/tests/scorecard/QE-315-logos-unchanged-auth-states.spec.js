const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const AuthPage = require('../../pages/auth.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QE-1][AC7] Verify logos remain unchanged regardless of authentication state', { tag: ['@regression', '@scorecard'] }, () => {
  let scorecardPage;
  let authPage;
  let guestLogos = {};

  test('[QE-315] Verify logos identical in guest and authenticated states', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    authPage = new AuthPage(page);

    await test.step('Access Scorecard marketing page as guest user', async () => {
      await scorecardPage.clearSession();
      await scorecardPage.goto();
      await expect(page).toHaveURL(TD.urlPatterns.scorecard, { timeout: 20000 });
    });

    await test.step('Capture/note Scorecard logo and Scorecard+ Dark Logo in guest state', async () => {
      await expect(scorecardPage.getScorecardLogo()).toBeVisible({ timeout: 20000 });
      await expect(scorecardPage.getScorecardPlusLogo()).toBeVisible({ timeout: 20000 });
      guestLogos.scorecard = await scorecardPage.getScorecardLogoAltText();
      guestLogos.scorecardPlus = await scorecardPage.getScorecardPlusLogoAltText();
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

    await test.step('Verify Scorecard logo is identical to guest state', async () => {
      await expect(scorecardPage.getScorecardLogo()).toBeVisible({ timeout: 20000 });
      const authLogo = await scorecardPage.getScorecardLogoAltText();
      expect(authLogo).toBe(TD.logos.scorecardLight);
      expect(authLogo).toBe(guestLogos.scorecard);
    });

    await test.step('Verify Scorecard+ Dark Logo is identical to guest state', async () => {
      await expect(scorecardPage.getScorecardPlusLogo()).toBeVisible({ timeout: 20000 });
      const authPlusLogo = await scorecardPage.getScorecardPlusLogoAltText();
      expect(authPlusLogo).toMatch(TD.logos.scorecardPlusNew);
      expect(authPlusLogo).toBe(guestLogos.scorecardPlus);
    });
  });
});