const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const AuthPage = require('../../pages/auth.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QE-1][AC8] Verify Scorecard tile displays appropriate CTA based on authentication state', { tag: ['@regression', '@scorecard'] }, () => {
  let scorecardPage;
  let authPage;

  test('[QE-320] Verify Scorecard tile CTA changes based on authentication state', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    authPage = new AuthPage(page);

    await test.step('Access Scorecard marketing page as guest user', async () => {
      await scorecardPage.clearSession();
      await scorecardPage.goto();
      await expect(page).toHaveURL(TD.urlPatterns.scorecard, { timeout: 20000 });
    });

    await test.step('Verify Sign In / Join Now CTA is displayed on Scorecard tile for guest user', async () => {
      const guestCta = scorecardPage.getScorecardGuestCta();
      await expect(guestCta).toBeVisible({ timeout: 20000 });
      const ctaText = await guestCta.textContent();
      expect(ctaText).toMatch(TD.ctas.guestScorecard);
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

    await test.step('Verify View Account CTA is displayed on Scorecard tile for authenticated user', async () => {
      const viewAccountCta = scorecardPage.getViewAccountScorecardTile();
      await expect(viewAccountCta).toBeVisible({ timeout: 20000 });
      const ctaText = await viewAccountCta.textContent();
      expect(ctaText).toMatch(TD.ctas.viewAccount);
    });

    await test.step('Verify CTA changes appropriately based on authentication state', async () => {
      const viewAccountCta = scorecardPage.getViewAccountScorecardTile();
      await expect(viewAccountCta).toBeVisible({ timeout: 20000 });
      await expect(viewAccountCta).toBeEnabled({ timeout: 20000 });
    });
  });
});