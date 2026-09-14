const { test, expect } = require('@playwright/test');
const DSGScorecardPage = require('../../pages/DSGScorecardPage');
const SignInPage = require('../../pages/SignInPage');

test.describe('[QE-1][AC6] Verify Join Now button is displayed after user signs out and returns to Scorecard marketing page', { tag: ['@regression', '@scorecard'] }, () => {
  let scorecardPage;
  let signInPage;

  test('[QE-313] Verify Join Now button after sign out', async ({ page }) => {
    scorecardPage = new DSGScorecardPage(page);
    signInPage = new SignInPage(page);

    const email = process.env.TEST_USER_EMAIL || 'testuser@example.com';
    const password = process.env.TEST_USER_PASSWORD || 'TestPassword123';

    await test.step('Sign in with valid user credentials', async () => {
      await page.goto('https://www.dickssportinggoods.com/sign-in');
      await signInPage.signIn(email, password);
    });

    await test.step('Navigate to the Scorecard marketing page while authenticated', async () => {
      await scorecardPage.goto();
      const comparisonSection = page.locator('section').filter({ has: page.getByRole('heading', { name: 'Score the Right Membership for You', level: 2 }) }).first();
      await expect(comparisonSection).toBeVisible({ timeout: 20000 });
      const isViewAccountVisible = await scorecardPage.isViewAccountScorecardPlusTileVisible();
      expect(isViewAccountVisible).toBe(true);
    });

    await test.step('Sign out from the application', async () => {
      await signInPage.signOut();
    });

    await test.step('Navigate back to the Scorecard marketing page', async () => {
      await scorecardPage.goto();
      await expect(page).toHaveURL(/.*ScoreCard/i);
    });

    await test.step('Verify Join Now button is displayed on Scorecard tile', async () => {
      const comparisonSection = page.locator('section').filter({ has: page.getByRole('heading', { name: 'Score the Right Membership for You', level: 2 }) }).first();
      await expect(comparisonSection).toBeVisible({ timeout: 20000 });
      const isScorecardGuestCtaVisible = await scorecardPage.isScorecardGuestCtaVisible();
      expect(isScorecardGuestCtaVisible).toBe(true);
    });

    await test.step('Verify Join Now button is displayed on Scorecard+ tile', async () => {
      const isScorecardPlusGuestCtaVisible = await scorecardPage.isScorecardPlusGuestCtaVisible();
      expect(isScorecardPlusGuestCtaVisible).toBe(true);
    });
  });
});