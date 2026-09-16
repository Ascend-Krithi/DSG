const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../page-objects/ScorecardPage');

test.describe('[QE-317] Verify benefits messaging remains unchanged regardless of authentication state', () => {
  test('[QE-317][AC7] Verify benefits unchanged in guest and authenticated states', async ({ page }) => {
    const scorecardPage = new ScorecardPage(page);
    let guestBenefits;

    await test.step('Access Scorecard marketing page as guest user', async () => {
      await page.context().clearCookies();
      await scorecardPage.goto();
      await scorecardPage.waitForComparisonSection();
    });

    await test.step('Verify benefits messaging on Scorecard+ tile in guest state', async () => {
      guestBenefits = await scorecardPage.getScorecardPlusBenefitsText();
      expect(guestBenefits).toMatch(/that'?s \$350 in benefits!?/i);
    });

    await test.step('Sign in with valid user credentials', async () => {
      await scorecardPage.signInUser();
    });

    await test.step('Navigate to Scorecard marketing page as authenticated user', async () => {
      await scorecardPage.goto();
      await scorecardPage.waitForComparisonSection();
    });

    await test.step('Verify benefits messaging on Scorecard+ tile in authenticated state', async () => {
      const authBenefits = await scorecardPage.getScorecardPlusBenefitsText();
      expect(authBenefits).toMatch(/that'?s \$350 in benefits!?/i);
    });

    await test.step('Compare benefits messaging between guest and authenticated states', async () => {
      const authBenefits = await scorecardPage.getScorecardPlusBenefitsText();
      expect(authBenefits).toBe(guestBenefits);
    });
  });
});