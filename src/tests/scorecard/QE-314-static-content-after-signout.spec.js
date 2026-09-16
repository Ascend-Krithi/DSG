const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../page-objects/ScorecardPage');

test.describe('[QE-314] Verify all static marketing content remains unchanged after user signs out', () => {
  test('[QE-314][AC6] Verify static content unchanged after sign out', async ({ page }) => {
    const scorecardPage = new ScorecardPage(page);
    let authenticatedContent;

    await test.step('Sign in with valid user credentials and navigate to Scorecard marketing page', async () => {
      await scorecardPage.goto();
      await scorecardPage.signInUser();
      await scorecardPage.goto();
      await scorecardPage.waitForComparisonSection();
    });

    await test.step('Capture all static content elements (logos, pricing, benefits)', async () => {
      authenticatedContent = await scorecardPage.captureStaticContent();
    });

    await test.step('Sign out from the application', async () => {
      await page.context().clearCookies();
    });

    await test.step('Navigate back to the Scorecard marketing page', async () => {
      await scorecardPage.goto();
      await scorecardPage.waitForComparisonSection();
    });

    await test.step('Verify Scorecard+ Dark Logo remains unchanged', async () => {
      const guestLogo = await scorecardPage.getScorecardPlusLogoAlt();
      expect(guestLogo).toContain('ScoreCard');
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