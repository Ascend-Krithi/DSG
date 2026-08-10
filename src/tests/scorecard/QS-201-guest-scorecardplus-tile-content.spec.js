const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');

test.describe('[QS-107][TS-005] Scorecard+ Tile Content for Guest User Tests', () => {
  let scorecardPage;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    await page.setViewportSize({ width: 1920, height: 1080 });
    await scorecardPage.goto();
  });

  test('[QS-201][TC-013] Verify Scorecard+ tile displays all required content for guest user', async ({ page }) => {
    // Locate Scorecard+ tile
    const scorecardPlusLogo = page.getByAltText('ScoreCard Plus New Logo');
    await expect(scorecardPlusLogo).toBeVisible();

    // Verify Scorecard+ Dark Logo is displayed and properly rendered
    const logoBox = await scorecardPlusLogo.boundingBox();
    expect(logoBox).not.toBeNull();
    expect(logoBox.width).toBeGreaterThan(0);
    expect(logoBox.height).toBeGreaterThan(0);

    // Verify '$99 Annual Membership' text is displayed
    const priceText = page.getByText('$99 Annual Membership', { exact: false });
    await expect(priceText).toBeVisible();

    // Verify 'That's $350 in Benefits!' text is displayed
    const benefitsText = page.getByText("That's $350 in Benefits", { exact: false });
    await expect(benefitsText).toBeVisible();

    // Verify benefits value matches AEM configuration
    const benefitsContent = await benefitsText.textContent();
    expect(benefitsContent).toContain('$350');

    // Verify 'Join Now' button is displayed for guest user
    const joinNowButton = page.getByRole('button', { name: /join now/i })
      .or(page.getByRole('link', { name: /join now/i }));
    
    await expect(joinNowButton.first()).toBeVisible();

    // Verify all content is properly aligned and styled
    const priceBox = await priceText.boundingBox();
    const benefitsBox = await benefitsText.boundingBox();
    
    expect(priceBox).not.toBeNull();
    expect(benefitsBox).not.toBeNull();
    expect(priceBox.y).toBeLessThan(benefitsBox.y);
  });
});