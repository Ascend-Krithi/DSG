const { test, expect } = require('../../fixtures');
const DSGScorecardPage = require('../../pages/DSGScorecardPage');
const SignInPage = require('../../pages/SignInPage');

test.describe('[QE-1][AC7] Verify only CTA changes based on user authentication status while all other content remains static', { tag: ['@regression', '@scorecard'] }, () => {
  let scorecardPage;
  let signInPage;
  let guestPrice;
  let guestBenefits;

  test('[QE-318] Verify only CTA changes with authentication state', async ({ page }) => {
    scorecardPage = new DSGScorecardPage(page);
    signInPage = new SignInPage(page);

    const email = process.env.TEST_USER_EMAIL || 'testuser@example.com';
    const password = process.env.TEST_USER_PASSWORD || 'TestPassword123';

    await test.step('Access Scorecard marketing page as guest user', async () => {
      await signInPage.clearSession();
      await scorecardPage.goto();
      const comparisonSection = page.locator('section').filter({ has: page.getByRole('heading', { name: 'Score the Right Membership for You', level: 2 }) }).first();
      await expect(comparisonSection).toBeVisible({ timeout: 20000 });
    });

    await test.step('Document all content elements in guest state (logos, pricing, benefits, CTAs)', async () => {
      const isScorecardLogoVisible = await scorecardPage.isScorecardLogoVisible();
      const isScorecardPlusLogoVisible = await scorecardPage.isScorecardPlusLogoSummaryVisible();
      expect(isScorecardLogoVisible).toBe(true);
      expect(isScorecardPlusLogoVisible).toBe(true);
      guestPrice = await scorecardPage.getScorecardPlusPriceText();
      guestBenefits = await scorecardPage.getScorecardPlusBenefitsText();
      expect(guestPrice).toMatch(/\$99 Annual Membership\./i);
      expect(guestBenefits).toMatch(/\$350\s+in\s+Benefits!?/i);
      const isGuestCtaVisible = await scorecardPage.isScorecardPlusGuestCtaVisible();
      expect(isGuestCtaVisible).toBe(true);
    });

    await test.step('Sign in with valid user credentials', async () => {
      await page.goto('https://www.dickssportinggoods.com/sign-in');
      await signInPage.signIn(email, password);
    });

    await test.step('Navigate to Scorecard marketing page as authenticated user', async () => {
      await scorecardPage.goto();
      const comparisonSection = page.locator('section').filter({ has: page.getByRole('heading', { name: 'Score the Right Membership for You', level: 2 }) }).first();
      await expect(comparisonSection).toBeVisible({ timeout: 20000 });
    });

    await test.step('Verify logos remain unchanged', async () => {
      const isScorecardLogoVisible = await scorecardPage.isScorecardLogoVisible();
      const isScorecardPlusLogoVisible = await scorecardPage.isScorecardPlusLogoSummaryVisible();
      expect(isScorecardLogoVisible).toBe(true);
      expect(isScorecardPlusLogoVisible).toBe(true);
    });

    await test.step('Verify pricing remains unchanged', async () => {
      const authenticatedPrice = await scorecardPage.getScorecardPlusPriceText();
      expect(authenticatedPrice).toBe(guestPrice);
    });

    await test.step('Verify benefits messaging remains unchanged', async () => {
      const authenticatedBenefits = await scorecardPage.getScorecardPlusBenefitsText();
      expect(authenticatedBenefits).toBe(guestBenefits);
    });

    await test.step('Verify CTA buttons have changed to View Account', async () => {
      const isViewAccountScorecardVisible = await scorecardPage.isViewAccountScorecardTileVisible();
      const isViewAccountScorecardPlusVisible = await scorecardPage.isViewAccountScorecardPlusTileVisible();
      expect(isViewAccountScorecardVisible).toBe(true);
      expect(isViewAccountScorecardPlusVisible).toBe(true);
    });

    await test.step('Confirm only CTAs changed while all other content remained static', async () => {
      const currentPrice = await scorecardPage.getScorecardPlusPriceText();
      const currentBenefits = await scorecardPage.getScorecardPlusBenefitsText();
      expect(currentPrice).toBe(guestPrice);
      expect(currentBenefits).toBe(guestBenefits);
      const isViewAccountVisible = await scorecardPage.isViewAccountScorecardPlusTileVisible();
      expect(isViewAccountVisible).toBe(true);
    });
  });
});