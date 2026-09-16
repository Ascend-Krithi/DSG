const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../page-objects/ScorecardPage');

test.describe('[QE-1][AC6] Verify all static marketing content remains unchanged after user signs out', () => {
  let scorecardPage;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
  });

  test('QE-314: Verify static content remains unchanged after sign out', async ({ page, context }) => {
    let authenticatedContent;

    await test.step('Sign in with valid user credentials and navigate to Scorecard marketing page', async () => {
      await scorecardPage.goto();
      const unavailable = await scorecardPage.isUnavailablePageVisible();
      if (unavailable) {
        test.skip('Site is currently unavailable');
      }
      await scorecardPage.signInUser();
      await scorecardPage.goto();
      await scorecardPage.waitForComparisonSection();
    });

    await test.step('Capture/note all static content elements', async () => {
      authenticatedContent = await scorecardPage.captureStaticContent();
      expect(authenticatedContent.scorecardPlusLogo).toBeTruthy();
      expect(authenticatedContent.scorecardPlusPrice).toMatch(/\$99 annual membership\./i);
      expect(authenticatedContent.scorecardPlusBenefits).toMatch(/that'?s \$350 in benefits!?/i);
    });

    await test.step('Sign out from the application', async () => {
      await context.clearCookies();
      await context.clearPermissions();
    });

    await test.step('Navigate back to the Scorecard marketing page', async () => {
      await scorecardPage.goto();
      await scorecardPage.waitForComparisonSection();
    });

    await test.step('Verify Scorecard+ Dark Logo remains unchanged', async () => {
      const guestLogo = await scorecardPage.getScorecardPlusLogoAlt();
      expect(guestLogo).toBe(authenticatedContent.scorecardPlusLogo);
    });

    await test.step('Verify pricing information remains unchanged', async () => {
      const guestPrice = await scorecardPage.getScorecardPlusPriceText();
      expect(guestPrice).toMatch(/\$99 annual membership\./i);
      expect(guestPrice).toBe(authenticatedContent.scorecardPlusPrice);
    });

    await test.step('Verify benefits messaging remains unchanged', async () => {
      const guestBenefits = await scorecardPage.getScorecardPlusBenefitsText();
      expect(guestBenefits).toMatch(/that'?s \$350 in benefits!?/i);
      expect(guestBenefits).toBe(authenticatedContent.scorecardPlusBenefits);
    });
  });
});