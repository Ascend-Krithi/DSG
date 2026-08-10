const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');

test.describe('[QS-107][TS-009] Comparison Section Heading Display Tests', () => {
  let scorecardPage;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    await page.setViewportSize({ width: 1920, height: 1080 });
    await scorecardPage.goto();
  });

  test('[QS-225][TC-025] Verify section heading Score the Right Membership for You is displayed centered above tiles', async ({ page }) => {
    // Locate comparison section
    const comparisonSection = page.locator('div, section').filter({ 
      has: page.getByRole('heading', { name: 'Score the Right Membership for You', level: 2 }) 
    }).first();
    
    await expect(comparisonSection).toBeVisible();

    // Verify section heading is displayed
    const sectionHeading = page.getByRole('heading', { name: 'Score the Right Membership for You', level: 2 });
    await expect(sectionHeading).toBeVisible();

    // Verify heading is positioned above tiles
    const headingBox = await sectionHeading.boundingBox();
    const scorecardLogo = page.getByAltText('ScoreCard Logo Light None').nth(1);
    const logoBox = await scorecardLogo.boundingBox();
    
    expect(headingBox).not.toBeNull();
    expect(logoBox).not.toBeNull();
    expect(headingBox.y).toBeLessThan(logoBox.y);

    // Verify heading is horizontally centered
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    const headingCenter = headingBox.x + headingBox.width / 2;
    const viewportCenter = viewportWidth / 2;
    const centerTolerance = 100;
    
    expect(Math.abs(headingCenter - viewportCenter)).toBeLessThan(centerTolerance);

    // Verify heading text is fully readable
    const headingText = await sectionHeading.textContent();
    expect(headingText).toBe('Score the Right Membership for You');

    // Verify heading font size and styling
    const headingStyle = await sectionHeading.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return {
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        color: style.color
      };
    });
    
    expect(headingStyle.fontSize).toBeTruthy();
    expect(parseFloat(headingStyle.fontSize)).toBeGreaterThan(16);

    // Verify heading on different screen sizes
    await page.setViewportSize({ width: 1024, height: 768 });
    await expect(sectionHeading).toBeVisible();
    
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(sectionHeading).toBeVisible();
    
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(sectionHeading).toBeVisible();
  });
});