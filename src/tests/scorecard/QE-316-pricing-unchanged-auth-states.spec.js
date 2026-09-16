const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../page-objects/ScorecardPage');

test.describe('[QE-1][AC7] Verify membership pricing remains unchanged regardless of authentication state', () => {
  test('QE-316: Verify pricing identical in guest and authenticated states', async ({ page }) => {
    const scorecardPage = new ScorecardPage(page);
    let guestPricing = '';

    await test.step('Access Scorecard marketing page as guest user', async () => {
      await scorecardPage.goto();
      await expect(page).toHaveURL(/scorecard/i);
    });

    await test.step('Verify pricing information on Scorecard+ tile in guest state', async () => {
      const pricingText = await scorecardPage.getPricingText();
      await expect(pricingText).toBeVisible();
      await expect(pricingText).toHaveText(/\$99 Annual Membership/i);
      guestPricing = await pricingText.textContent();
    });

    await test.step('Sign in with valid user credentials', async () => {
      await scorecardPage.signIn();
    });

    await test.step('Navigate to Scorecard marketing page as authenticated user', async () => {
      await scorecardPage.goto();
      await expect(page).toHaveURL(/scorecard/i);
    });

    await test.step('Verify pricing information on Scorecard+ tile in authenticated state', async () => {
      const pricingText = await scorecardPage.getPricingText();
      await expect(pricingText).toBeVisible();
      await expect(pricingText).toHaveText(/\$99 Annual Membership/i);
    });

    await test.step('Compare pricing information between guest and authenticated states', async () => {
      const pricingText = await scorecardPage.getPricingText();
      const authenticatedPricing = await pricingText.textContent();
      expect(authenticatedPricing).toBe(guestPricing);
    });
  });
});