const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const AuthPage = require('../../pages/auth.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QE-1][AC6] Verify all static marketing content remains unchanged after user signs out', { tag: ['@regression', '@scorecard'] }, () => {
  let scorecardPage;
  let authPage;
  let authenticatedContent = {};

  test('[QE-314] Verify static content unchanged after sign out', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    authPage = new AuthPage(page);

    await test.step('Sign in with valid user credentials and navigate to Scorecard marketing page', async () => {
      const username = process.env.TEST_USERNAME || 'test@example.com';
      const password = process.env.TEST_PASSWORD || 'testpassword';
      await authPage.signIn(username, password);
      await scorecardPage.goto();
      await expect(page).toHaveURL(TD.urlPatterns.scorecard, { timeout: 20000 });
    });

    await test.step('Capture/note all static content elements (logos, pricing, benefits)', async () => {
      await expect(scorecardPage.getScorecardPlusLogo()).toBeVisible({ timeout: 20000 });
      authenticatedContent.logo = await scorecardPage.getScorecardPlusLogoAltText();
      authenticatedContent.price = await scorecardPage.getScorecardPlusPriceText();
      authenticatedContent.benefits = await scorecardPage.getScorecardPlusBenefitsText();
    });

    await test.step('Sign out from the application', async () => {
      await authPage.signOut();
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('Navigate back to the Scorecard marketing page', async () => {
      await scorecardPage.goto();
      await expect(page).toHaveURL(TD.urlPatterns.scorecard, { timeout: 20000 });
    });

    await test.step('Verify Scorecard+ Dark Logo remains unchanged', async () => {
      await expect(scorecardPage.getScorecardPlusLogo()).toBeVisible({ timeout: 20000 });
      const guestLogo = await scorecardPage.getScorecardPlusLogoAltText();
      expect(guestLogo).toMatch(TD.logos.scorecardPlusNew);
      expect(guestLogo).toBe(authenticatedContent.logo);
    });

    await test.step('Verify pricing information remains unchanged', async () => {
      const guestPrice = await scorecardPage.getScorecardPlusPriceText();
      expect(guestPrice).toMatch(TD.marketing.scorecardPlusPrice);
      expect(guestPrice).toBe(authenticatedContent.price);
    });

    await test.step('Verify benefits messaging remains unchanged', async () => {
      const guestBenefits = await scorecardPage.getScorecardPlusBenefitsText();
      expect(guestBenefits).toMatch(TD.marketing.scorecardPlusBenefits);
      expect(guestBenefits).toBe(authenticatedContent.benefits);
    });
  });
});