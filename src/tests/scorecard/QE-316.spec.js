const { test, expect } = require('@playwright/test');
const DSGScorecardPage = require('../../pages/DSGScorecardPage');
const SignInPage = require('../../pages/SignInPage');

test.describe('[QE-1][AC7] Verify membership pricing remains unchanged regardless of authentication state', { tag: ['@regression', '@scorecard'] }, () => {
  let scorecardPage;
  let signInPage;
  let guestPrice;

  test('[QE-316] Verify pricing unchanged across authentication states', async ({ page }) => {
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

    await test.step('Verify pricing information on Scorecard+ tile in guest state', async () => {
      guestPrice = await scorecardPage.getScorecardPlusPriceText();
      expect(guestPrice).toMatch(/\$99 Annual Membership\./i);
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

    await test.step('Verify pricing information on Scorecard+ tile in authenticated state', async () => {
      const authenticatedPrice = await scorecardPage.getScorecardPlusPriceText();
      expect(authenticatedPrice).toMatch(/\$99 Annual Membership\./i);
    });

    await test.step('Compare pricing information between guest and authenticated states', async () => {
      const authenticatedPrice = await scorecardPage.getScorecardPlusPriceText();
      expect(authenticatedPrice).toBe(guestPrice);
    });
  });
});