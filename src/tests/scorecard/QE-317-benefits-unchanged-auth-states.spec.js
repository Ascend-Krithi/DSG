const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../page-objects/ScorecardPage');

test.describe('[QE-1][AC7] Verify benefits messaging remains unchanged regardless of authentication state', () => {
  test('QE-317: Verify benefits identical in guest and authenticated states', async ({ page }) => {
    const scorecardPage = new ScorecardPage(page);
    let guestBenefits = '';

    await test.step('Access Scorecard marketing page as guest user', async () => {
      await scorecardPage.goto();
      await expect(page).toHaveURL(/scorecard/i);
    });

    await test.step('Verify benefits messaging on Scorecard+ tile in guest state', async () => {
      const benefitsText = await scorecardPage.getBenefitsText();
      await expect(benefitsText).toBeVisible();
      await expect(benefitsText).toHaveText(/That's \$350 in Benefits/i);
      guestBenefits = await benefitsText.textContent();
    });

    await test.step('Sign in with valid user credentials', async () => {
      await scorecardPage.signIn();
    });

    await test.step('Navigate to Scorecard marketing page as authenticated user', async () => {
      await scorecardPage.goto();
      await expect(page).toHaveURL(/scorecard/i);
    });

    await test.step('Verify benefits messaging on Scorecard+ tile in authenticated state', async () => {
      const benefitsText = await scorecardPage.getBenefitsText();
      await expect(benefitsText).toBeVisible();
      await expect(benefitsText).toHaveText(/That's \$350 in Benefits/i);
    });

    await test.step('Compare benefits messaging between guest and authenticated states', async () => {
      const benefitsText = await scorecardPage.getBenefitsText();
      const authenticatedBenefits = await benefitsText.textContent();
      expect(authenticatedBenefits).toBe(guestBenefits);
    });
  });
});