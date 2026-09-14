const { test, expect } = require('@playwright/test');
const DSGScorecardPage = require('../../pages/DSGScorecardPage');
const SignInPage = require('../../pages/SignInPage');

test.describe('[QE-1][AC6] Verify all static marketing content remains unchanged after user signs out', { tag: ['@regression', '@scorecard'] }, () => {
  let scorecardPage;
  let signInPage;
  let authenticatedLogo;
  let authenticatedPrice;
  let authenticatedBenefits;

  test('[QE-314] Verify static content unchanged after sign out', async ({ page }) => {
    scorecardPage = new DSGScorecardPage(page);
    signInPage = new SignInPage(page);

    const email = process.env.TEST_USER_EMAIL || 'testuser@example.com';
    const password = process.env.TEST_USER_PASSWORD || 'TestPassword123';

    await test.step('Sign in with valid user credentials and navigate to Scorecard marketing page', async () => {
      await page.goto('https://www.dickssportinggoods.com/sign-in');
      await signInPage.signIn(email, password);
      await scorecardPage.goto();
      const comparisonSection = page.locator('section').filter({ has: page.getByRole('heading', { name: 'Score the Right Membership for You', level: 2 }) }).first();
      await expect(comparisonSection).toBeVisible({ timeout: 20000 });
    });

    await test.step('Capture/note all static content elements (logos, pricing, benefits)', async () => {
      const isLogoVisible = await scorecardPage.isScorecardPlusLogoSummaryVisible();
      expect(isLogoVisible).toBe(true);
      authenticatedLogo = isLogoVisible;
      authenticatedPrice = await scorecardPage.getScorecardPlusPriceText();
      authenticatedBenefits = await scorecardPage.getScorecardPlusBenefitsText();
      expect(authenticatedPrice).toMatch(/\$99 Annual Membership\./i);
      expect(authenticatedBenefits).toMatch(/\$350\s+in\s+Benefits!?/i);
    });

    await test.step('Sign out from the application', async () => {
      await signInPage.signOut();
    });

    await test.step('Navigate back to the Scorecard marketing page', async () => {
      await scorecardPage.goto();
      const comparisonSection = page.locator('section').filter({ has: page.getByRole('heading', { name: 'Score the Right Membership for You', level: 2 }) }).first();
      await expect(comparisonSection).toBeVisible({ timeout: 20000 });
    });

    await test.step('Verify Scorecard+ Dark Logo remains unchanged', async () => {
      const isLogoVisible = await scorecardPage.isScorecardPlusLogoSummaryVisible();
      expect(isLogoVisible).toBe(authenticatedLogo);
    });

    await test.step('Verify pricing information remains unchanged', async () => {
      const guestPrice = await scorecardPage.getScorecardPlusPriceText();
      expect(guestPrice).toMatch(/\$99 Annual Membership\./i);
      expect(guestPrice).toBe(authenticatedPrice);
    });

    await test.step('Verify benefits messaging remains unchanged', async () => {
      const guestBenefits = await scorecardPage.getScorecardPlusBenefitsText();
      expect(guestBenefits).toMatch(/\$350\s+in\s+Benefits!?/i);
      expect(guestBenefits).toBe(authenticatedBenefits);
    });
  });
});