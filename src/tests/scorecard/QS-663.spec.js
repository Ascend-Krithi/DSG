const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][AC9] Section Heading Display', { tag: ['@smoke', '@regression'] }, () => {
  let scorecardPage;

  test('[QS-663][TS-022] Verify section heading is displayed above comparison tiles', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);

    // Step 1: Navigate to Scorecard marketing page on desktop
    await scorecardPage.setViewport(TD.viewport.desktop.width, TD.viewport.desktop.height);
    await scorecardPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.scorecardPage);

    // Step 2: Scroll to the comparison tiles section
    const isTileVisible = await scorecardPage.isScorecardTileVisible();
    expect(isTileVisible).toBe(true);

    // Step 3: Locate the section heading above the comparison tiles
    const isHeadingVisible = await scorecardPage.isSectionHeadingVisible();
    expect(isHeadingVisible).toBe(true);

    // Step 4: Verify exact heading text matches 'Score the Right Membership for You'
    const headingText = await scorecardPage.getSectionHeadingText();
    expect(headingText.trim()).toBe(TD.headings.comparisonSection);

    // Step 5: Verify heading is positioned directly above the comparison tiles
    const { headingBox, tilesBox } = await scorecardPage.getSectionHeadingPosition();
    expect(headingBox).not.toBeNull();
    expect(tilesBox).not.toBeNull();
    
    if (headingBox && tilesBox) {
      const spacing = tilesBox.y - (headingBox.y + headingBox.height);
      expect(spacing).toBeGreaterThanOrEqual(TD.styling.spacing.headingMargin.min);
      expect(spacing).toBeLessThanOrEqual(TD.styling.spacing.headingMargin.max);
    }

    // Step 6: Verify heading formatting and styling
    const styles = await scorecardPage.getSectionHeadingStyles();
    expect(styles.fontSize).toBeGreaterThanOrEqual(TD.styling.heading.fontSize.min);
    expect(styles.fontSize).toBeLessThanOrEqual(TD.styling.heading.fontSize.max);
    expect(styles.fontWeight).toBeGreaterThanOrEqual(TD.styling.heading.fontWeight.min);
    expect(styles.fontWeight).toBeLessThanOrEqual(TD.styling.heading.fontWeight.max);

    // Step 7: Verify heading is fully visible and not truncated
    expect(headingText.trim().length).toBeGreaterThan(0);
    expect(headingText).not.toContain('...');
  });
});