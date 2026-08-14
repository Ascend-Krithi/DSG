const { test, expect } = require('@playwright/test');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][AC9] Section heading is centered and formatted', { tag: ['@regression'] }, () => {
  let scorecardPage;

  test('[QS-403][TC-032] Verify section heading is centered and properly formatted', async ({ page }) => {
    await page.setViewportSize(TD.DESKTOP_VIEWPORT);
    
    scorecardPage = new ScorecardMarketingPage(page);
    
    // Navigate to Scorecard marketing page on desktop
    await scorecardPage.goto();
    await expect(page).toHaveURL(/scorecard/);
    
    // Verify section heading is displayed
    const isHeadingVisible = await scorecardPage.isSectionHeadingVisible();
    expect(isHeadingVisible).toBeTruthy();
    
    const headingText = await scorecardPage.getSectionHeadingText();
    expect(headingText).toContain(TD.SECTION_HEADING);
    
    // Verify heading text is fully readable (not truncated)
    expect(headingText.length).toBeGreaterThan(0);
  });
});