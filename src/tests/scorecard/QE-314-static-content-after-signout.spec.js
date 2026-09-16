const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../page-objects/ScorecardPage');

test.describe('[QE-1][AC6] Verify all static marketing content remains unchanged after user signs out', () => {
  test('QE-314: Verify static content unchanged after sign out', async ({ page }) => {
    const scorecardPage = new ScorecardPage(page);
    let authenticatedContent = {};

    await test.step('Sign in with valid user credentials and navigate to Scorecard marketing page', async () => {
      await scorecardPage.signIn();
      await scorecardPage.goto();
      await expect(page).toHaveURL(/scorecard/i);
    });

    await test.step('Capture/note all static content elements (logos, pricing, benefits)', async () => {
      const scorecardPlusLogo = await scorecardPage.getScorecardPlusLogo();
      await expect(scorecardPlusLogo).toBeVisible();
      const pricingText = await scorecardPage.getPricingText();
      await expect(pricingText).toBeVisible();
      const benefitsText = await scorecardPage.getBenefitsText();
      await expect(benefitsText).toBeVisible();
      authenticatedContent.pricing = await pricingText.textContent();
      authenticatedContent.benefits = await benefitsText.textContent();
    });

    await test.step('Sign out from the application', async () => {
      await scorecardPage.signOut();
    });

    await test.step('Navigate back to the Scorecard marketing page', async () => {
      await scorecardPage.goto();
      await expect(page).toHaveURL(/scorecard/i);
    });

    await test.step('Verify Scorecard+ Dark Logo remains unchanged', async () => {
      const scorecardPlusLogo = await scorecardPage.getScorecardPlusLogo();
      await expect(scorecardPlusLogo).toBeVisible();
    });

    await test.step('Verify pricing information remains unchanged', async () => {
      const pricingText = await scorecardPage.getPricingText();
      await expect(pricingText).toBeVisible();
      await expect(pricingText).toHaveText(/\$99 Annual Membership/i);
      const currentPricing = await pricingText.textContent();
      expect(currentPricing).toBe(authenticatedContent.pricing);
    });

    await test.step('Verify benefits messaging remains unchanged', async () => {
      const benefitsText = await scorecardPage.getBenefitsText();
      await expect(benefitsText).toBeVisible();
      await expect(benefitsText).toHaveText(/That's \$350 in Benefits/i);
      const currentBenefits = await benefitsText.textContent();
      expect(currentBenefits).toBe(authenticatedContent.benefits);
    });
  });
});