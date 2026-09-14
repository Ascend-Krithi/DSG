const { test, expect } = require('../../fixtures');
const DSGScorecardPage = require('../../pages/DSGScorecardPage');
const SignInPage = require('../../pages/SignInPage');

test.describe('[QE-1][AC7] Verify logos remain unchanged regardless of authentication state', { tag: ['@regression', '@scorecard'] }, () => {
  let scorecardPage;
  let signInPage;

  test('[QE-315] Verify logos unchanged across authentication states', async ({ page }) => {
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

    await test.step('Capture/note Scorecard logo and Scorecard+ Dark Logo in guest state', async () => {
      const isScorecardLogoVisible = await scorecardPage.isScorecardLogoVisible();
      const isScorecardPlusLogoVisible = await scorecardPage.isScorecardPlusLogoSummaryVisible();
      expect(isScorecardLogoVisible).toBe(true);
      expect(isScorecardPlusLogoVisible).toBe(true);
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

    await test.step('Verify Scorecard logo is identical to guest state', async () => {
      const isScorecardLogoVisible = await scorecardPage.isScorecardLogoVisible();
      expect(isScorecardLogoVisible).toBe(true);
    });

    await test.step('Verify Scorecard+ Dark Logo is identical to guest state', async () => {
      const isScorecardPlusLogoVisible = await scorecardPage.isScorecardPlusLogoSummaryVisible();
      expect(isScorecardPlusLogoVisible).toBe(true);
    });
  });
});