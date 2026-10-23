const { test, expect } = require('@playwright/test');
const DSGScorecardPage = require('../../pages/DSGScorecardPage');
const SignInPage = require('../../pages/SignInPage');

test.describe('[QE-1][AC8] Verify Scorecard tile displays appropriate CTA based on authentication state', { tag: ['@regression', '@scorecard'] }, () => {
  let scorecardPage;
  let signInPage;

  test('[QE-320] Verify Scorecard tile CTA changes based on authentication state', async ({ page }) => {
    scorecardPage = new DSGScorecardPage(page);
    signInPage = new SignInPage(page);

    const email = process.env.TEST_USER_EMAIL || 'testuser@example.com';
    const password = process.env.TEST_USER_PASSWORD || 'TestPassword123';

    await test.step('Access Scorecard marketing page as guest user', async () => {
      await signInPage.clearSession();
      await scorecardPage.goto();
      const comparisonSection = page.locator('section').filter({ has: page.getByRole('heading', { name: 'Score the Right Membership for You', level: 2 }) }).first();
      await expect(comparisonSection).toBeVisible({ timeout: 20000 });
    });

    await test.step('Verify Sign In / Join Now CTA is displayed on Scorecard tile for guest user', async () => {
      const isGuestCtaVisible = await scorecardPage.isScorecardGuestCtaVisible();
      expect(isGuestCtaVisible).toBe(true);
    });

    await test.step('Sign in with valid user credentials', async () => {
      await page.goto('https://www.dickssportinggoods.com/sign-in');
      await signInPage.signIn(email, password);
    });

    await test.step('Navigate to Scorecard marketing page as authenticated user', async () => {
      await scorecardPage.goto();
      const comparisonSection = page.locator('section').filter({ has: page.getByRole('heading', { name: 'Score the Right Membership for You', level: 2 }) }).first();
      await expect(comparisonSection).toBeVisible({ timeout: 20000 });
    });

    await test.step('Verify View Account CTA is displayed on Scorecard tile for authenticated user', async () => {
      const isViewAccountVisible = await scorecardPage.isViewAccountScorecardTileVisible();
      expect(isViewAccountVisible).toBe(true);
    });

    await test.step('Verify CTA changes appropriately based on authentication state', async () => {
      const isViewAccountVisible = await scorecardPage.isViewAccountScorecardTileVisible();
      expect(isViewAccountVisible).toBe(true);
    });
  });
});