const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../page-objects/ScorecardPage');

test.describe('[QE-1][AC7] Verify benefits messaging remains unchanged regardless of authentication state', () => {
  let scorecardPage;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
  });

  test('QE-317: Verify benefits messaging remains unchanged in both authentication states', async ({ page, context }) => {
    let guestBenefits;

    await test.step('Access Scorecard marketing page as guest user', async () => {
      await context.clearCookies();
      await context.clearPermissions();
      await scorecardPage.goto();
      const unavailable = await scorecardPage.isUnavailablePageVisible();
      if (unavailable) {
        test.skip('Site is currently unavailable');
      }
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
      const authenticatedBenefits = await scorecardPage.getScorecardPlusBenefitsText();
      expect(authenticatedBenefits).toMatch(/that'?s \$350 in benefits!?/i);
    });

    await test.step('Compare benefits messaging between guest and authenticated states', async () => {
      const authenticatedBenefits = await scorecardPage.getScorecardPlusBenefitsText();
      expect(authenticatedBenefits).toBe(guestBenefits);
    });
  });
});