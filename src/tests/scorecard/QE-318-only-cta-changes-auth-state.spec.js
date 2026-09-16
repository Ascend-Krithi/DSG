const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../page-objects/ScorecardPage');
const loc = require('../../locators/scorecard.locators');

test.describe('[QE-318] Verify only CTA changes based on user authentication status while all other content remains static', () => {
  let scorecardPage;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
  });

  test('[QE-1][AC7] Verify only CTA changes while all other content remains static', async ({ page }) => {
    let guestContent;

    await test.step('Access Scorecard marketing page as guest user', async () => {
      await scorecardPage.goto();
      const unavailable = await scorecardPage.isUnavailablePageVisible();
      if (unavailable) {
        test.skip('Site is currently unavailable');
      }
      await scorecardPage.waitForComparisonSection();
    });

    await test.step('Document all content elements in guest state (logos, pricing, benefits, CTAs)', async () => {
      guestContent = await scorecardPage.captureStaticContent();
      const guestCta = await loc.scorecardGuestCta(page).textContent();
      guestContent.guestCta = guestCta;
      expect(guestContent.scorecardLogo).toBeTruthy();
      expect(guestContent.scorecardPlusLogo).toBeTruthy();
      expect(guestContent.scorecardPlusPrice).toMatch(/\$99 annual membership/i);
      expect(guestContent.scorecardPlusBenefits).toMatch(/that'?s \$350 in benefits/i);
      expect(guestCta).toMatch(/join now|sign in\s*\/\s*join now/i);
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
      const authPricing = await scorecardPage.getScorecardPlusPriceText();
      expect(authPricing).toBe(guestContent.scorecardPlusPrice);
    });

    await test.step('Verify benefits messaging remains unchanged', async () => {
      const authBenefits = await scorecardPage.getScorecardPlusBenefitsText();
      expect(authBenefits).toBe(guestContent.scorecardPlusBenefits);
    });

    await test.step('Verify CTA buttons have changed to View Account', async () => {
      const viewAccountScorecardCta = loc.viewAccountScorecardTile(page);
      const viewAccountScorecardPlusCta = loc.viewAccountScorecardPlusTile(page);
      await expect(viewAccountScorecardCta).toBeVisible();
      await expect(viewAccountScorecardPlusCta).toBeVisible();
      const scorecardCtaText = await viewAccountScorecardCta.textContent();
      const scorecardPlusCtaText = await viewAccountScorecardPlusCta.textContent();
      expect(scorecardCtaText).toMatch(/view account/i);
      expect(scorecardPlusCtaText).toMatch(/view account/i);
    });

    await test.step('Confirm only CTAs changed while all other content remained static', async () => {
      const authContent = await scorecardPage.captureStaticContent();
      expect(authContent.scorecardLogo).toBe(guestContent.scorecardLogo);
      expect(authContent.scorecardPlusLogo).toBe(guestContent.scorecardPlusLogo);
      expect(authContent.scorecardPlusPrice).toBe(guestContent.scorecardPlusPrice);
      expect(authContent.scorecardPlusBenefits).toBe(guestContent.scorecardPlusBenefits);
      expect(authContent.scorecardPoints).toBe(guestContent.scorecardPoints);
      expect(authContent.scorecardRewards).toBe(guestContent.scorecardRewards);
      expect(authContent.sectionHeading).toBe(guestContent.sectionHeading);
    });
  });
});