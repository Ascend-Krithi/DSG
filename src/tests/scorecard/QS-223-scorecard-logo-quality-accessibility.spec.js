const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');

test.describe('[QS-107][TS-008] Scorecard Logo Quality and Accessibility Tests', () => {
  let scorecardPage;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    await page.setViewportSize({ width: 1920, height: 1080 });
    await scorecardPage.goto();
  });

  test('[QS-223][TC-024] Verify Scorecard Logo renders correctly with proper quality and accessibility', async ({ page }) => {
    // Locate Scorecard Logo on tile
    const scorecardLogo = page.getByAltText('ScoreCard Logo Light None').nth(1);
    await expect(scorecardLogo).toBeVisible();

    // Verify logo image quality
    const logoBox = await scorecardLogo.boundingBox();
    expect(logoBox).not.toBeNull();
    expect(logoBox.width).toBeGreaterThan(50);
    expect(logoBox.height).toBeGreaterThan(20);

    // Verify logo has alt text attribute
    const altText = await scorecardLogo.getAttribute('alt');
    expect(altText).toBeTruthy();
    expect(altText).toContain('ScoreCard');

    // Zoom page to 125%
    await page.evaluate(() => {
      document.body.style.zoom = '125%';
    });
    await page.waitForTimeout(500);
    
    await expect(scorecardLogo).toBeVisible();
    const logoBox125 = await scorecardLogo.boundingBox();
    expect(logoBox125).not.toBeNull();

    // Zoom page to 150%
    await page.evaluate(() => {
      document.body.style.zoom = '150%';
    });
    await page.waitForTimeout(500);
    
    await expect(scorecardLogo).toBeVisible();
    const logoBox150 = await scorecardLogo.boundingBox();
    expect(logoBox150).not.toBeNull();

    // Reset zoom
    await page.evaluate(() => {
      document.body.style.zoom = '100%';
    });
  });
});