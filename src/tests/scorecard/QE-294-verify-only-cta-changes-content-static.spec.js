const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const AuthenticationPage = require('../../pages/authentication.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QE-294][AC7] Verify only CTA changes based on authentication status while all other content remains static', { tag: ['@regression', '@dsg-scorecard'] }, () => {
  let scorecardPage;
  let authPage;
  let guestContent;

  test('[QE-294] Verify only CTA changes while logos, pricing, benefits, and points text remain unchanged', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    authPage = new AuthenticationPage(page);

    // Step 1: Navigate to Scorecard marketing page as guest user
    await scorecardPage.goto();
    await expect(scorecardPage.isComparisonSectionVisible()).resolves.toBe(true);

    // Step 2: Capture all content elements in guest state
    guestContent = {
      scorecardLogo: await scorecardPage.getScorecardLogoAttributes(),
      scorecardPlusLogo: await scorecardPage.getScorecardPlusLogoAttributes(),
      pricing: await scorecardPage.getScorecardPlusPriceText(),
      benefits: await scorecardPage.getScorecardPlusBenefitsText(),
      pointsText: await scorecardPage.getScorecardPointsText(),
      rewardText: await scorecardPage.getScorecardRewardText()
    };

    // Step 3: Verify guest CTAs are displayed
    await expect(scorecardPage.isScorecardGuestCtaVisible()).resolves.toBe(true);
    await expect(scorecardPage.isScorecardPlusGuestCtaVisible()).resolves.toBe(true);
    const guestScorecardCta = await scorecardPage.getScorecardGuestCtaText();
    const guestScorecardPlusCta = await scorecardPage.getScorecardPlusGuestCtaText();
    expect(guestScorecardCta).toMatch(TD.cta.guest.scorecard);
    expect(guestScorecardPlusCta).toMatch(TD.cta.guest.scorecardPlus);

    // Step 4: Authenticate user with valid credentials
    await scorecardPage.clickScorecardGuestCta();
    await expect(scorecardPage.isOnSignInPage()).resolves.toBe(true);
    await authPage.signIn(TD.testUsers.validEmail, TD.testUsers.validPassword);
    await page.waitForLoadState('domcontentloaded');

    // Step 5: Navigate to Scorecard marketing page as authenticated user
    await scorecardPage.goto();
    await expect(scorecardPage.isComparisonSectionVisible()).resolves.toBe(true);

    // Step 6: Verify CTAs have changed to authenticated state
    await expect(scorecardPage.isViewAccountCtaVisible()).resolves.toBe(true);
    const ctaCount = await scorecardPage.getViewAccountCtaCount();
    expect(ctaCount).toBe(2);

    // Step 7: Verify all other content remains unchanged
    const authContent = {
      scorecardLogo: await scorecardPage.getScorecardLogoAttributes(),
      scorecardPlusLogo: await scorecardPage.getScorecardPlusLogoAttributes(),
      pricing: await scorecardPage.getScorecardPlusPriceText(),
      benefits: await scorecardPage.getScorecardPlusBenefitsText(),
      pointsText: await scorecardPage.getScorecardPointsText(),
      rewardText: await scorecardPage.getScorecardRewardText()
    };

    expect(authContent.scorecardLogo.src).toBe(guestContent.scorecardLogo.src);
    expect(authContent.scorecardPlusLogo.src).toBe(guestContent.scorecardPlusLogo.src);
    expect(authContent.pricing).toBe(guestContent.pricing);
    expect(authContent.benefits).toBe(guestContent.benefits);
    expect(authContent.pointsText).toBe(guestContent.pointsText);
    expect(authContent.rewardText).toBe(guestContent.rewardText);
  });
});