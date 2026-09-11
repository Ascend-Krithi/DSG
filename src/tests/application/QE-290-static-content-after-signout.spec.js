const { test, expect } = require('../../fixtures');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const AuthPage = require('../../pages/auth.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QE-1][AC6] Static Marketing Content After Sign Out', { tag: ['@regression', '@scorecard'] }, () => {
  let scorecardPage;
  let authPage;

  test('[QE-290] Verify static marketing content remains unchanged after user signs out', async ({ page }) => {
    scorecardPage = new ScorecardMarketingPage(page);
    authPage = new AuthPage(page);

    await test.step('Authenticate user with valid credentials', async () => {
      await authPage.authenticate(TD.TEST_USER_EMAIL, TD.TEST_USER_PASSWORD);
    });

    await test.step('Navigate to Scorecard marketing page', async () => {
      await scorecardPage.goto();
    });

    await test.step('Capture Scorecard+ tile content in authenticated state', async () => {
      const authenticatedContent = await scorecardPage.captureAllContent();
      expect(authenticatedContent.scorecardPlusLogoSummary.src).toBeTruthy();
      expect(authenticatedContent.pricingText).toContain(TD.SCORECARD_PLUS_PRICING);
      expect(authenticatedContent.benefitsText).toMatch(TD.BENEFITS_VALUE_PATTERN);
      expect(authenticatedContent.scorecardPlusCta).toMatch(TD.AUTHENTICATED_CTA);
    });

    await test.step('Sign out from the application', async () => {
      await scorecardPage.signOut();
    });

    await test.step('Return to Scorecard marketing page', async () => {
      await scorecardPage.goto();
    });

    await test.step('Verify Scorecard+ dark logo remains unchanged', async () => {
      const logoAttrs = await scorecardPage.getScorecardPlusLogoSummaryAttributes();
      expect(logoAttrs.src).toBeTruthy();
      expect(logoAttrs.alt).toContain('ScoreCard Plus');
    });

    await test.step('Verify membership pricing text remains unchanged', async () => {
      const pricingText = await scorecardPage.getPricingText();
      expect(pricingText).toContain(TD.SCORECARD_PLUS_PRICING);
    });

    await test.step('Verify benefits value text remains unchanged', async () => {
      const benefitsText = await scorecardPage.getBenefitsText();
      expect(benefitsText).toMatch(TD.BENEFITS_VALUE_PATTERN);
    });

    await test.step('Verify CTA has changed from View Account to Join Now', async () => {
      const ctaText = await scorecardPage.getScorecardPlusCtaText();
      expect(ctaText).toMatch(TD.GUEST_CTA_SCORECARD_PLUS);
    });
  });
});