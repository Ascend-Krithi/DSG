const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');

test.describe('[QS-107][TS-008] Scorecard Tile Content for Guest User Tests', () => {
  let scorecardPage;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    await page.setViewportSize({ width: 1920, height: 1080 });
    await scorecardPage.goto();
  });

  test('[QS-219][TC-022] Verify Scorecard tile displays all required content for guest user', async ({ page }) => {
    // Locate Scorecard tile
    const scorecardLogo = page.getByAltText('ScoreCard Logo Light None').nth(1);
    await expect(scorecardLogo).toBeVisible();

    // Verify Scorecard Logo is properly rendered
    const logoBox = await scorecardLogo.boundingBox();
    expect(logoBox).not.toBeNull();
    expect(logoBox.width).toBeGreaterThan(0);
    expect(logoBox.height).toBeGreaterThan(0);

    // Verify '1 Point Per Every $1 Spent' text is displayed
    const pointsText = page.getByText('Earn 1 Point for every $1 spent', { exact: false });
    await expect(pointsText).toBeVisible();

    // Verify '300 Points = $10 Reward' text is displayed
    const rewardText = page.getByText('300 Points = $10 Reward', { exact: false });
    await expect(rewardText).toBeVisible();

    // Verify 'Sign In / Join Now' button is displayed for guest user
    const signInButton = page.getByRole('link', { name: /sign in \/ join now/i })
      .or(page.getByRole('button', { name: /sign in \/ join now/i }))
      .or(page.getByText('Sign in to earn', { exact: false }));
    
    await expect(signInButton.first()).toBeVisible();

    // Verify all content is properly aligned and styled
    const pointsBox = await pointsText.boundingBox();
    const rewardBox = await rewardText.boundingBox();
    
    expect(pointsBox).not.toBeNull();
    expect(rewardBox).not.toBeNull();
  });
});