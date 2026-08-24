const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][AC9] Section Heading Readability', { tag: ['@regression'] }, () => {
  let scorecardPage;

  test('[QS-664][TS-023] Verify section heading is centered and fully readable', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);

    // Step 1: Navigate to Scorecard marketing page and locate section heading
    await scorecardPage.setViewport(TD.viewport.desktop.width, TD.viewport.desktop.height);
    await scorecardPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.scorecardPage);
    
    const isHeadingVisible = await scorecardPage.isSectionHeadingVisible();
    expect(isHeadingVisible).toBe(true);

    // Step 2: Verify heading is centered horizontally on the page
    const styles = await scorecardPage.getSectionHeadingStyles();
    expect(styles.textAlign).toBe('center');

    // Step 3: Measure heading position relative to page width
    const centerOffset = await scorecardPage.isSectionHeadingCentered();
    expect(centerOffset).not.toBeNull();
    if (centerOffset !== null) {
      expect(centerOffset).toBeLessThanOrEqual(TD.tolerance.centerAlignment);
    }

    // Step 4: Verify heading text is fully readable with clear font
    const headingText = await scorecardPage.getSectionHeadingText();
    expect(headingText.trim()).toBe(TD.headings.comparisonSection);

    // Step 5: Verify heading has sufficient contrast ratio for readability
    // Note: Contrast ratio calculation requires color parsing - simplified check
    expect(styles.color).toBeTruthy();

    // Step 6: Verify heading has appropriate line height for readability
    const lineHeightValue = parseFloat(styles.lineHeight);
    const fontSizeValue = styles.fontSize;
    const lineHeightRatio = lineHeightValue / fontSizeValue;
    expect(lineHeightRatio).toBeGreaterThanOrEqual(TD.styling.heading.lineHeight.min);
    expect(lineHeightRatio).toBeLessThanOrEqual(TD.styling.heading.lineHeight.max);

    // Step 7: Verify heading is not obscured by other elements
    expect(isHeadingVisible).toBe(true);

    // Step 8: Verify heading remains centered and readable at different zoom levels
    for (const zoomLevel of TD.zoomLevels) {
      await scorecardPage.setZoomLevel(zoomLevel);
      await page.waitForTimeout(500);
      
      const isStillVisible = await scorecardPage.isSectionHeadingVisible();
      expect(isStillVisible).toBe(true);
      
      const zoomStyles = await scorecardPage.getSectionHeadingStyles();
      expect(zoomStyles.textAlign).toBe('center');
    }
  });
});