const { test, expect } = require('../../fixtures');
const DSGScorecardPage = require('../../pages/DSGScorecardPage');
const SignInPage = require('../../pages/SignInPage');

test.describe('[QE-1][AC5] Verify View Account button is displayed and clickable on Scorecard+ tile for authenticated user', { tag: ['@regression', '@scorecard'] }, () => {
  let scorecardPage;
  let signInPage;

  test('[QE-312] Verify View Account button for authenticated user on Scorecard+ tile', async ({ page }) => {
    scorecardPage = new DSGScorecardPage(page);
    signInPage = new SignInPage(page);

    const email = process.env.TEST_USER_EMAIL || 'testuser@example.com';
    const password = process.env.TEST_USER_PASSWORD || 'TestPassword123';

    await test.step('Sign in with valid user credentials', async () => {
      await page.goto('https://www.dickssportinggoods.com/sign-in');
      await signInPage.signIn(email, password);
    });

    await test.step('Navigate to the Scorecard marketing page', async () => {
      await scorecardPage.goto();
      await expect(page).toHaveURL(/.*ScoreCard/i);
    });

    await test.step('Locate the Scorecard+ tile in the comparison section', async () => {
      const comparisonSection = page.locator('section').filter({ has: page.getByRole('heading', { name: 'Score the Right Membership for You', level: 2 }) }).first();
      await expect(comparisonSection).toBeVisible({ timeout: 20000 });
      const isScorecardPlusTileVisible = await scorecardPage.isScorecardPlusTileVisible();
      expect(isScorecardPlusTileVisible).toBe(true);
    });

    await test.step('Verify View Account button is displayed on the Scorecard+ tile', async () => {
      const isViewAccountVisible = await scorecardPage.isViewAccountScorecardPlusTileVisible();
      expect(isViewAccountVisible).toBe(true);
    });

    await test.step('Verify button is clickable', async () => {
      const isViewAccountEnabled = await scorecardPage.isViewAccountScorecardPlusTileEnabled();
      expect(isViewAccountEnabled).toBe(true);
    });

    await test.step('Click the View Account button', async () => {
      const clickResult = await scorecardPage.clickViewAccountScorecardPlusTile();
      expect(clickResult).toBe(true);
    });
  });
});