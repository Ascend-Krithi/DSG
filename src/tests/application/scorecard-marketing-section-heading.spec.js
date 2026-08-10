const { test, expect } = require('../../fixtures');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-107: Scorecard Marketing Page Section Heading', { tag: ['@smoke', '@regression'] }, () => {
  let marketingPage;

  test.beforeEach(async ({ page }) => {
    marketingPage = new ScorecardMarketingPage(page);
  });

  test('[QS-225] Verify section heading Score the Right Membership for You is displayed centered above tiles', async ({ page }) => {
    // Set viewport to desktop resolution
    await marketingPage.setViewportSize(TD.viewportSizes.desktop1920.width, TD.viewportSizes.desktop1920.height);
    
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    
    // Verify section heading is displayed
    await expect(page.locator('text=Score the Right Membership for You')).toBeVisible();
    const isHeadingVisible = await marketingPage.isSectionHeadingVisible();
    expect(isHeadingVisible).toBe(true);
    
    // Verify heading text
    const headingText = await marketingPage.getSectionHeadingText();
    expect(headingText).toContain(TD.sectionHeading.text);
    
    // Verify heading is positioned above tiles
    const heading = page.locator('text=Score the Right Membership for You');
    const headingBox = await heading.boundingBox();
    const tileBoxes = await marketingPage.getTilesHorizontalAlignment();
    
    expect(headingBox.y).toBeLessThan(tileBoxes.scorecard.y);
    expect(headingBox.y).toBeLessThan(tileBoxes.scorecardPlus.y);
  });

  test('[QS-227] Verify section heading accessibility and semantic HTML structure', async ({ page }) => {
    // Set viewport to desktop resolution
    await marketingPage.setViewportSize(TD.viewportSizes.desktop1920.width, TD.viewportSizes.desktop1920.height);
    
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    
    // Verify heading uses semantic HTML tag
    const heading = page.locator('h1, h2, h3').filter({ hasText: 'Score the Right Membership for You' });
    await expect(heading).toBeVisible();
    
    // Verify heading is not hidden from assistive technology
    const ariaHidden = await heading.getAttribute('aria-hidden');
    expect(ariaHidden).not.toBe('true');
  });

  test('[QS-229] Verify section heading displays correctly at minimum desktop resolution (1024px)', async ({ page }) => {
    // Set viewport to minimum desktop resolution
    await marketingPage.setViewportSize(TD.viewportSizes.desktopMin.width, TD.viewportSizes.desktopMin.height);
    
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    
    // Verify heading is fully visible
    await expect(page.locator('text=Score the Right Membership for You')).toBeVisible();
    const headingText = await marketingPage.getSectionHeadingText();
    expect(headingText).toContain(TD.sectionHeading.text);
    
    // Verify no horizontal scrolling required
    const hasHorizontalScroll = await marketingPage.checkHorizontalScroll();
    expect(hasHorizontalScroll).toBe(false);
  });
});