const { test, expect } = require('../../fixtures');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const AuthPage = require('../../pages/auth.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QE-1][AC7] Logos Unchanged Across States', { tag: ['@regression', '@scorecard'] }, () => {
  let scorecardPage;
  let authPage;
  let guestScorecardLogo;
  let guestScorecardPlusLogo;

  test('[QE-291] Verify logos remain unchanged across guest and authenticated states', async ({ page }) => {
    scorecardPage = new ScorecardMarketingPage(page);
    authPage = new AuthPage(page);

    await test.step('Navigate to Scorecard marketing page as guest user', async () => {
      await scorecardPage.goto();
    });

    await test.step('Capture Scorecard logo in guest state', async () => {
      guestScorecardLogo = await scorecardPage.getScorecardLogoAttributes();
      expect(guestScorecardLogo.src).toBeTruthy();
      expect(guestScorecardLogo.alt).toBeTruthy();
    });

    await test.step('Capture Scorecard+ logo in guest state', async () => {
      guestScorecardPlusLogo = await scorecardPage.getScorecardPlusLogoSummaryAttributes();
      expect(guestScorecardPlusLogo.src).toBeTruthy();
      expect(guestScorecardPlusLogo.alt).toBeTruthy();
    });

    await test.step('Authenticate user with valid credentials', async () => {
      await authPage.authenticate(TD.TEST_USER_EMAIL, TD.TEST_USER_PASSWORD);
    });

    await test.step('Navigate to Scorecard marketing page as authenticated user', async () => {
      await scorecardPage.goto();
    });

    await test.step('Verify Scorecard logo remains unchanged in authenticated state', async () => {
      const authScorecardLogo = await scorecardPage.getScorecardLogoAttributes();
      expect(authScorecardLogo.src).toBe(guestScorecardLogo.src);
      expect(authScorecardLogo.alt).toBe(guestScorecardLogo.alt);
      expect(authScorecardLogo.width).toBe(guestScorecardLogo.width);
      expect(authScorecardLogo.height).toBe(guestScorecardLogo.height);
    });

    await test.step('Verify Scorecard+ logo remains unchanged in authenticated state', async () => {
      const authScorecardPlusLogo = await scorecardPage.getScorecardPlusLogoSummaryAttributes();
      expect(authScorecardPlusLogo.src).toBe(guestScorecardPlusLogo.src);
      expect(authScorecardPlusLogo.alt).toBe(guestScorecardPlusLogo.alt);
      expect(authScorecardPlusLogo.width).toBe(guestScorecardPlusLogo.width);
      expect(authScorecardPlusLogo.height).toBe(guestScorecardPlusLogo.height);
    });
  });
});