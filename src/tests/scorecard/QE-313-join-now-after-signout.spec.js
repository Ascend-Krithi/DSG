const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const AuthPage = require('../../pages/auth.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QE-1][AC6] Verify Join Now button is displayed after user signs out and returns to Scorecard marketing page', { tag: ['@regression', '@scorecard'] }, () => {
  let scorecardPage;
  let authPage;

  test('[QE-313] Verify Join Now button after sign out', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    authPage = new AuthPage(page);

    await test.step('Sign in with valid user credentials', async () => {
      const username = process.env.TEST_USERNAME || 'test@example.com';
      const password = process.env.TEST_PASSWORD || 'testpassword';
      await authPage.signIn(username, password);
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('Navigate to the Scorecard marketing page while authenticated', async () => {
      await scorecardPage.goto();
      await expect(page).toHaveURL(TD.urlPatterns.scorecard, { timeout: 20000 });
      await expect(scorecardPage.getViewAccountScorecardTile()).toBeVisible({ timeout: 20000 });
    });

    await test.step('Sign out from the application', async () => {
      await authPage.signOut();
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('Navigate back to the Scorecard marketing page', async () => {
      await scorecardPage.goto();
      await expect(page).toHaveURL(TD.urlPatterns.scorecard, { timeout: 20000 });
    });

    await test.step('Verify Join Now button is displayed on Scorecard tile', async () => {
      const scorecardGuestCta = scorecardPage.getScorecardGuestCta();
      await expect(scorecardGuestCta).toBeVisible({ timeout: 20000 });
      const ctaText = await scorecardGuestCta.textContent();
      expect(ctaText).toMatch(TD.ctas.guestScorecard);
    });

    await test.step('Verify Join Now button is displayed on Scorecard+ tile', async () => {
      const scorecardPlusGuestCta = scorecardPage.getScorecardPlusGuestCta();
      await expect(scorecardPlusGuestCta).toBeVisible({ timeout: 20000 });
      const ctaText = await scorecardPlusGuestCta.textContent();
      expect(ctaText).toMatch(TD.ctas.guestScorecardPlus);
    });
  });
});