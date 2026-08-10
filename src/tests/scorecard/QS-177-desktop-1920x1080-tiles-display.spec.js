const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');

test.describe('[QS-107][TS-001] Scorecard Desktop Display Tests', () => {
  let scorecardPage;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    await page.setViewportSize({ width: 1920, height: 1080 });
    await scorecardPage.goto();
  });

  test('[QS-177][TC-001] Verify Scorecard and Scorecard+ tiles display side by side on desktop with 1920x1080 resolution', async ({ page }) => {
    // Verify Scorecard tile is displayed on the left
    const scorecardLogo = page.getByAltText('ScoreCard Logo Light None').nth(1);
    await expect(scorecardLogo).toBeVisible();
    
    const scorecardPointsText = page.getByText('Earn 1 Point for every $1 spent', { exact: false });
    await expect(scorecardPointsText).toBeVisible();
    
    const scorecardRewardText = page.getByText('300 Points = $10 Reward', { exact: false });
    await expect(scorecardRewardText).toBeVisible();

    // Verify Scorecard+ tile is displayed on the right
    const scorecardPlusLogo = page.getByAltText('ScoreCard Plus New Logo');
    await expect(scorecardPlusLogo).toBeVisible();
    
    const scorecardPlusPrice = page.getByText('$99 Annual Membership', { exact: false });
    await expect(scorecardPlusPrice).toBeVisible();
    
    const scorecardPlusBenefits = page.getByText("That's $350 in Benefits", { exact: false });
    await expect(scorecardPlusBenefits).toBeVisible();

    // Verify both tiles are horizontally aligned side by side
    const scorecardLogoBox = await scorecardLogo.boundingBox();
    const scorecardPlusLogoBox = await scorecardPlusLogo.boundingBox();
    
    expect(scorecardLogoBox).not.toBeNull();
    expect(scorecardPlusLogoBox).not.toBeNull();
    expect(scorecardLogoBox.x).toBeLessThan(scorecardPlusLogoBox.x);

    // Verify section heading is displayed above tiles
    const sectionHeading = page.getByRole('heading', { name: 'Score the Right Membership for You', level: 2 });
    await expect(sectionHeading).toBeVisible();
    
    // Verify heading is centered and fully readable
    const headingBox = await sectionHeading.boundingBox();
    expect(headingBox).not.toBeNull();
    expect(headingBox.y).toBeLessThan(scorecardLogoBox.y);
  });
});