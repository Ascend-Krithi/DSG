const { test, expect } = require('../../fixtures');
const DSGScorecardPage = require('../../pages/DSGScorecardPage');
const SignInPage = require('../../pages/SignInPage');

test.describe('[QE-1][AC7] Verify benefits messaging remains unchanged regardless of authentication state', { tag: ['@regression', '@scorecard'] }, () => {
  let scorecardPage;
  let signInPage;
  let guestBenefits;

  test('[QE-317] Verify benefits messaging unchanged across authentication states', async ({ page }) => {
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

    await test.step('Verify benefits messaging on Scorecard+ tile in guest state', async () => {
      guestBenefits = await scorecardPage.getScorecardPlusBenefitsText();
      expect(guestBenefits).toMatch(/\$350\s+in\s+Benefits!?/i);
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

    await test.step('Verify benefits messaging on Scorecard+ tile in authenticated state', async () => {
      const authenticatedBenefits = await scorecardPage.getScorecardPlusBenefitsText();
      expect(authenticatedBenefits).toMatch(/\$350\s+in\s+Benefits!?/i);
    });

    await test.step('Compare benefits messaging between guest and authenticated states', async () => {
      const authenticatedBenefits = await scorecardPage.getScorecardPlusBenefitsText();
      expect(authenticatedBenefits).toBe(guestBenefits);
    });
  });
});