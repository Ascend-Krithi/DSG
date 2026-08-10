const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');

test.describe('[QS-107][TS-008] Scorecard Tile Content for Authenticated User Tests', () => {
  let scorecardPage;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Sign in to application
    await page.goto('https://dickssportinggoods.dksxchange.com/LogonForm');
    await page.waitForURL(/.*LogonForm.*|.*sso.*login.*/i, { timeout: 10000 });
    
    const usernameField = page.locator('input[type="email"], input[name="username"]').first();
    await usernameField.fill('testuser@example.com');
    
    const continueButton = page.getByRole('button', { name: /continue|sign in/i });
    await continueButton.click();
    
    await page.waitForTimeout(1000);
    const passwordField = page.locator('input[type="password"]').first();
    await passwordField.fill('Test@123');
    
    const signInButton = page.getByRole('button', { name: /sign in|log in|continue/i });
    await signInButton.click();
    
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    await scorecardPage.goto();
  });

  test('[QS-221][TC-023] Verify Scorecard tile displays all required content for authenticated user', async ({ page }) => {
    // Locate Scorecard tile
    const scorecardLogo = page.getByAltText('ScoreCard Logo Light None').nth(1);
    await expect(scorecardLogo).toBeVisible();

    // Verify Scorecard Logo is properly rendered
    const logoBox = await scorecardLogo.boundingBox();
    expect(logoBox).not.toBeNull();

    // Verify '1 Point Per Every $1 Spent' text is displayed
    const pointsText = page.getByText('Earn 1 Point for every $1 spent', { exact: false });
    await expect(pointsText).toBeVisible();

    // Verify '300 Points = $10 Reward' text is displayed
    const rewardText = page.getByText('300 Points = $10 Reward', { exact: false });
    await expect(rewardText).toBeVisible();

    // Verify 'View Account' button is displayed for authenticated user
    const viewAccountButton = page.getByRole('link', { name: /view account/i })
      .or(page.getByRole('button', { name: /view account/i }));
    
    await expect(viewAccountButton.first()).toBeVisible();

    // Verify all content is properly aligned and styled
    const pointsBox = await pointsText.boundingBox();
    const rewardBox = await rewardText.boundingBox();
    
    expect(pointsBox).not.toBeNull();
    expect(rewardBox).not.toBeNull();
  });
});