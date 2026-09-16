const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QE-312: Verify View Account button is displayed and clickable on Scorecard+ tile for authenticated user', { tag: ['@regression'] }, () => {
  let scorecardPage;

  test('[QE-312] Verify View Account button on Scorecard+ tile for authenticated user', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);

    // Step 1: Sign in with valid user credentials
    // NOTE: Authentication implementation depends on your auth flow
    // This is a placeholder - implement actual sign-in logic based on your framework
    // Example: await authPage.signIn(process.env.TEST_USERNAME, process.env.TEST_PASSWORD);
    
    // Step 2: Navigate to the Scorecard marketing page
    await scorecardPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.scorecardPage, { timeout: 20000 });

    // Step 3: Locate the Scorecard+ tile in the comparison section
    await expect(page.locator('section, main, div').filter({ has: page.getByRole('heading', { name: TD.textPatterns.sectionHeading, level: 2 }) }).first()).toBeVisible({ timeout: 20000 });
    const isScorecardPlusTileVisible = await scorecardPage.isScorecardPlusTileVisible();
    expect(isScorecardPlusTileVisible).toBeTruthy();

    // Step 4: Verify 'View Account' button is displayed on the Scorecard+ tile
    const isViewAccountVisible = await scorecardPage.isViewAccountScorecardPlusTileVisible();
    expect(isViewAccountVisible).toBeTruthy();
    const viewAccountText = await scorecardPage.getViewAccountScorecardPlusTileText();
    expect(viewAccountText).toMatch(TD.textPatterns.authCta);

    // Step 5: Verify button is clickable
    const viewAccountBtn = page.locator('section, main, div').filter({ has: page.getByRole('heading', { name: TD.textPatterns.sectionHeading, level: 2 }) }).first()
      .locator('div, section, article, li').filter({ has: page.getByAltText(TD.altText.scorecardPlusLogoSummary) }).first()
      .locator('button, a').filter({ hasText: TD.textPatterns.authCta }).first();
    await expect(viewAccountBtn).toBeEnabled({ timeout: 20000 });

    // Step 6: Click the 'View Account' button
    await scorecardPage.clickViewAccountScorecardPlusTile();
    await page.waitForLoadState('domcontentloaded');
  });
});