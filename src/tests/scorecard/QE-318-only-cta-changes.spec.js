const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../page-objects/ScorecardPage');

test.describe('[QE-1][AC7] Verify only CTA changes based on user authentication status while all other content remains static', () => {
  test('QE-318: Verify only CTA changes between guest and authenticated states', async ({ page }) => {
    const scorecardPage = new ScorecardPage(page);
    let guestContent = {};

    await test.step('Access Scorecard marketing page as guest user', async () => {
      await scorecardPage.goto();
      await expect(page).toHaveURL(/scorecard/i);
    });

    await test.step('Document all content elements in guest state (logos, pricing, benefits, CTAs)', async () => {
      const scorecardLogo = await scorecardPage.getScorecardLogo();
      await expect(scorecardLogo).toBeVisible();
      const scorecardPlusLogo = await scorecardPage.getScorecardPlusLogo();
      await expect(scorecardPlusLogo).toBeVisible();
      const pricingText = await scorecardPage.getPricingText();
      await expect(pricingText).toBeVisible();
      const benefitsText = await scorecardPage.getBenefitsText();
      await expect(benefitsText).toBeVisible();
      const guestCta = await scorecardPage.getScorecardGuestCta();
      await expect(guestCta).toBeVisible();
      guestContent.pricing = await pricingText.textContent();
      guestContent.benefits = await benefitsText.textContent();
    });

    await test.step('Sign in with valid user credentials', async () => {
      await scorecardPage.signIn();
    });

    await test.step('Navigate to Scorecard marketing page as authenticated user', async () => {
      await scorecardPage.goto();
      await expect(page).toHaveURL(/scorecard/i);
    });

    await test.step('Verify logos remain unchanged', async () => {
      const scorecardLogo = await scorecardPage.getScorecardLogo();
      await expect(scorecardLogo).toBeVisible();
      const scorecardPlusLogo = await scorecardPage.getScorecardPlusLogo();
      await expect(scorecardPlusLogo).toBeVisible();
    });

    await test.step('Verify pricing remains unchanged', async () => {
      const pricingText = await scorecardPage.getPricingText();
      await expect(pricingText).toBeVisible();
      const currentPricing = await pricingText.textContent();
      expect(currentPricing).toBe(guestContent.pricing);
    });

    await test.step('Verify benefits messaging remains unchanged', async () => {
      const benefitsText = await scorecardPage.getBenefitsText();
      await expect(benefitsText).toBeVisible();
      const currentBenefits = await benefitsText.textContent();
      expect(currentBenefits).toBe(guestContent.benefits);
    });

    await test.step('Verify CTA buttons have changed to View Account', async () => {
      const viewAccountScorecard = await scorecardPage.getViewAccountScorecardTile();
      await expect(viewAccountScorecard).toBeVisible();
      await expect(viewAccountScorecard).toHaveText(/view account/i);
      const viewAccountScorecardPlus = await scorecardPage.getViewAccountScorecardPlusTile();
      await expect(viewAccountScorecardPlus).toBeVisible();
      await expect(viewAccountScorecardPlus).toHaveText(/view account/i);
    });

    await test.step('Confirm only CTAs changed while all other content remained static', async () => {
      const pricingText = await scorecardPage.getPricingText();
      const benefitsText = await scorecardPage.getBenefitsText();
      expect(await pricingText.textContent()).toBe(guestContent.pricing);
      expect(await benefitsText.textContent()).toBe(guestContent.benefits);
    });
  });
});