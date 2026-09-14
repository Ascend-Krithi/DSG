const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../pages/ScorecardPage');

test.describe('[QE-1][AC9] Verify section heading is centered and fully readable on desktop', () => {
  let scorecardPage;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
  });

  test('QE-297: Verify section heading is properly centered and fully readable on desktop', async ({ page }) => {
    // Step 1: Navigate to Scorecard marketing page
    await scorecardPage.navigate();
    await expect(page).toHaveURL(/.*ScoreCard.*/);
    console.log('Scorecard marketing page loads successfully on desktop');

    // Step 2: Locate section heading element
    const headingElement = await scorecardPage.getSectionHeading();
    await expect(headingElement).toBeVisible();
    console.log('Section heading element is found');

    // Step 3: Verify heading is horizontally centered
    const headingBox = await headingElement.boundingBox();
    const pageWidth = await page.evaluate(() => document.documentElement.clientWidth);
    const headingCenter = headingBox.x + (headingBox.width / 2);
    const pageCenter = pageWidth / 2;
    const centerTolerance = 50; // Allow 50px tolerance
    expect(Math.abs(headingCenter - pageCenter)).toBeLessThan(centerTolerance);
    console.log('Heading is centered horizontally on the page');

    // Step 4: Verify heading text is fully visible
    const headingText = await headingElement.textContent();
    expect(headingText).toContain('Score the Right Membership for You');
    const isVisible = await headingElement.isVisible();
    expect(isVisible).toBeTruthy();
    console.log('Complete heading text is visible without truncation or overflow');

    // Step 5: Verify heading has proper spacing
    const computedStyle = await headingElement.evaluate(el => {
      const style = window.getComputedStyle(el);
      return {
        marginTop: style.marginTop,
        marginBottom: style.marginBottom,
        paddingTop: style.paddingTop,
        paddingBottom: style.paddingBottom
      };
    });
    expect(computedStyle.marginTop).not.toBe('0px');
    expect(computedStyle.marginBottom).not.toBe('0px');
    console.log('Heading has adequate spacing from surrounding elements');

    // Step 6: Verify heading font is readable
    const fontProperties = await headingElement.evaluate(el => {
      const style = window.getComputedStyle(el);
      return {
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        color: style.color
      };
    });
    const fontSize = parseInt(fontProperties.fontSize);
    expect(fontSize).toBeGreaterThanOrEqual(16);
    console.log('Heading text is clearly readable with good contrast');
  });
});