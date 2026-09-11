const { test, expect } = require('../../fixtures');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const AuthPage = require('../../pages/auth.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QE-1][AC7] Only CTA Changes While Content Remains Static', { tag: ['@regression', '@scorecard'] }, () => {
  let scorecardPage;
  let authPage;
  let guestContent;

  test('[QE-294] Verify only CTA changes based on authentication status while all other content remains static', async ({ page }) => {
    scorecardPage = new ScorecardMarketingPage(page);
    authPage = new AuthPage(page);

    await test.step('Navigate to Scorecard marketing page as guest user', async () => {
      await scorecardPage.goto();
    });

    await test.step('Capture all content elements in guest state', async () => {
      guestContent = await scorecardPage.captureAllContent();
    });

    await test.step('Verify guest CTAs are displayed', async () => {
      expect(guestContent.scorecardCta).toMatch(TD.GUEST_CTA_SCORECARD);
      expect(guestContent.scorecardPlusCta).toMatch(TD.GUEST_CTA_SCORECARD_PLUS);
    });

    await test.step('Authenticate user with valid credentials', async () => {
      await authPage.authenticate(TD.TEST_USER_EMAIL, TD.TEST_USER_PASSWORD);
    });

    await test.step('Navigate to Scorecard marketing page as authenticated user', async () => {
      await scorecardPage.goto();
    });

    await test.step('Verify CTAs have changed to authenticated state', async () => {
      const authScorecardCta = await scorecardPage.getScorecardCtaText();
      const authScorecardPlusCta = await scorecardPage.getScorecardPlusCtaText();
      expect(authScorecardCta).toMatch(TD.AUTHENTICATED_CTA);
      expect(authScorecardPlusCta).toMatch(TD.AUTHENTICATED_CTA);
    });

    await test.step('Verify all other content remains unchanged', async () => {
      const authContent = await scorecardPage.captureAllContent();
      expect(authContent.scorecardLogo.src).toBe(guestContent.scorecardLogo.src);
      expect(authContent.scorecardPlusLogoSummary.src).toBe(guestContent.scorecardPlusLogoSummary.src);
      expect(authContent.pricingText).toBe(guestContent.pricingText);
      expect(authContent.benefitsText).toBe(guestContent.benefitsText);
      expect(authContent.pointsText).toBe(guestContent.pointsText);
      expect(authContent.rewardText).toBe(guestContent.rewardText);
    });
  });
});