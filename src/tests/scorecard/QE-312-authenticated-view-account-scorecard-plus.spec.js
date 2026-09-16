const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const AuthPage = require('../../pages/auth.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QE-1][AC5] Verify View Account button is displayed and clickable on Scorecard+ tile for authenticated user', { tag: ['@regression', '@scorecard'] }, () => {
  let scorecardPage;
  let authPage;

  test('[QE-312] Verify View Account button on Scorecard+ tile for authenticated user', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    authPage = new AuthPage(page);

    await test.step('Sign in with valid user credentials', async () => {
      const username = process.env.TEST_USERNAME || 'test@example.com';
      const password = process.env.TEST_PASSWORD || 'testpassword';
      await authPage.signIn(username, password);
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('Navigate to the Scorecard marketing page', async () => {
      await scorecardPage.goto();
      await expect(page).toHaveURL(TD.urlPatterns.scorecard, { timeout: 20000 });
    });

    await test.step('Locate the Scorecard+ tile in the comparison section', async () => {
      await expect(scorecardPage.getComparisonSection()).toBeVisible({ timeout: 20000 });
      await expect(scorecardPage.getScorecardPlusTile()).toBeVisible({ timeout: 20000 });
    });

    await test.step('Verify View Account button is displayed on the Scorecard+ tile', async () => {
      const viewAccountCta = scorecardPage.getViewAccountScorecardPlusTile();
      await expect(viewAccountCta).toBeVisible({ timeout: 20000 });
      const ctaText = await viewAccountCta.textContent();
      expect(ctaText).toMatch(TD.ctas.viewAccount);
    });

    await test.step('Verify button is clickable', async () => {
      const viewAccountCta = scorecardPage.getViewAccountScorecardPlusTile();
      await expect(viewAccountCta).toBeEnabled({ timeout: 20000 });
      const isClickable = await scorecardPage.isViewAccountScorecardPlusTileClickable();
      expect(isClickable).toBeTruthy();
    });

    await test.step('Click the View Account button', async () => {
      await scorecardPage.clickViewAccountScorecardPlusTile();
      await page.waitForLoadState('domcontentloaded');
    });
  });
});