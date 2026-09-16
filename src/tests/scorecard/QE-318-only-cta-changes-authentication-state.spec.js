const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../page-objects/ScorecardPage');

test.describe('[QE-1][AC7] Verify only CTA changes based on user authentication status while all other content remains static', () => {
  let scorecardPage;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
  });

  test('QE-318: Verify only CTA changes while all other content remains static', async ({ page, context }) => {
    let guestContent;

    await test.step('Access Scorecard marketing page as guest user', async () => {
      await context.clearCookies();
      await context.clearPermissions();
      await scorecardPage.goto();
      const unavailable = await scorecardPage.isUnavailablePageVisible();
      if (unavailable) {
        test.skip('Site is currently unavailable');
      }
      await scorecardPage.waitForComparisonSection();
    });

    await test.step('Document all content elements in guest state', async () => {
      guestContent = await scorecardPage.captureStaticContent();
      const loc = require('../../locators/scorecard.locators');
      const guestCta = loc.scorecardGuestCta(page);
      await expect(guestCta).toBeVisible({ timeout: 30000 });
      expect(guestContent.scorecardLogo).toBeTruthy();
      expect(guestContent.scorecardPlusLogo).toBeTruthy();
      expect(guestContent.scorecardPlusPrice).toMatch(/\$99 annual membership\./i);
      expect(guestContent.scorecardPlusBenefits).toMatch(/that'?s \$350 in benefits!?/i);
    });

    await test.step('Sign in with valid user credentials', async () => {
      await scorecardPage.signInUser();
    });

    await test.step('Navigate to Scorecard marketing page as authenticated user', async () => {
      await scorecardPage.goto();
      await scorecardPage.waitForComparisonSection();
    });

    await test.step('Verify logos remain unchanged', async () => {
      const authenticatedScorecardLogo = await scorecardPage.getScorecardLogoAlt();
      const authenticatedScorecardPlusLogo = await scorecardPage.getScorecardPlusLogoAlt();
      expect(authenticatedScorecardLogo).toBe(guestContent.scorecardLogo);
      expect(authenticatedScorecardPlusLogo).toBe(guestContent.scorecardPlusLogo);
    });

    await test.step('Verify pricing remains unchanged', async () => {
      const authenticatedPrice = await scorecardPage.getScorecardPlusPriceText();
      expect(authenticatedPrice).toMatch(/\$99 annual membership\./i);
      expect(authenticatedPrice).toBe(guestContent.scorecardPlusPrice);
    });

    await test.step('Verify benefits messaging remains unchanged', async () => {
      const authenticatedBenefits = await scorecardPage.getScorecardPlusBenefitsText();
      expect(authenticatedBenefits).toMatch(/that'?s \$350 in benefits!?/i);
      expect(authenticatedBenefits).toBe(guestContent.scorecardPlusBenefits);
    });

    await test.step('Verify CTA buttons have changed to View Account', async () => {
      const loc = require('../../locators/scorecard.locators');
      const viewAccountBtnScorecard = loc.viewAccountScorecardTile(page);
      const viewAccountBtnScorecardPlus = loc.viewAccountScorecardPlusTile(page);
      await expect(viewAccountBtnScorecard).toBeVisible({ timeout: 30000 });
      await expect(viewAccountBtnScorecardPlus).toBeVisible({ timeout: 30000 });
    });

    await test.step('Confirm only CTAs changed while all other content remained static', async () => {
      const loc = require('../../locators/scorecard.locators');
      const viewAccountBtn = loc.viewAccountScorecardTile(page);
      const btnText = await viewAccountBtn.textContent();
      expect(btnText).toMatch(/view account/i);
    });
  });
});