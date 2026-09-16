const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../page-objects/ScorecardPage');

test.describe('[QE-318] Verify only CTA changes based on user authentication status while all other content remains static', () => {
  test('[QE-318][AC7] Verify only CTAs change between guest and authenticated states', async ({ page }) => {
    const scorecardPage = new ScorecardPage(page);
    let guestContent;

    await test.step('Access Scorecard marketing page as guest user', async () => {
      await page.context().clearCookies();
      await scorecardPage.goto();
      await scorecardPage.waitForComparisonSection();
    });

    await test.step('Document all content elements in guest state', async () => {
      guestContent = await scorecardPage.captureStaticContent();
      const guestCta = page.locator('.header-tile--scorecard-plus').locator('button, a').filter({ hasText: /join now|join scorecard\+\s*now|sign in\s*\/\s*join now/i }).first();
      await expect(guestCta).toBeVisible();
    });

    await test.step('Sign in with valid user credentials', async () => {
      await scorecardPage.signInUser();
    });

    await test.step('Navigate to Scorecard marketing page as authenticated user', async () => {
      await scorecardPage.goto();
      await scorecardPage.waitForComparisonSection();
    });

    await test.step('Verify logos remain unchanged', async () => {
      const authScorecardLogo = await scorecardPage.getScorecardLogoAlt();
      const authScorecardPlusLogo = await scorecardPage.getScorecardPlusLogoAlt();
      expect(authScorecardLogo).toBe(guestContent.scorecardLogo);
      expect(authScorecardPlusLogo).toBe(guestContent.scorecardPlusLogo);
    });

    await test.step('Verify pricing remains unchanged', async () => {
      const authPrice = await scorecardPage.getScorecardPlusPriceText();
      expect(authPrice).toBe(guestContent.scorecardPlusPrice);
    });

    await test.step('Verify benefits messaging remains unchanged', async () => {
      const authBenefits = await scorecardPage.getScorecardPlusBenefitsText();
      expect(authBenefits).toBe(guestContent.scorecardPlusBenefits);
    });

    await test.step('Verify CTA buttons have changed to View Account', async () => {
      const viewAccountBtnScorecard = page.locator('.header-tile--scorecard').locator('button, a').filter({ hasText: /view account/i }).first();
      const viewAccountBtnScorecardPlus = page.locator('.header-tile--scorecard-plus').locator('button, a').filter({ hasText: /view account/i }).first();
      await expect(viewAccountBtnScorecard).toBeVisible();
      await expect(viewAccountBtnScorecardPlus).toBeVisible();
    });

    await test.step('Confirm only CTAs changed while all other content remained static', async () => {
      const authPoints = await scorecardPage.getScorecardPointsText();
      const authRewards = await scorecardPage.getScorecardRewardsText();
      expect(authPoints).toBe(guestContent.scorecardPoints);
      expect(authRewards).toBe(guestContent.scorecardRewards);
    });
  });
});