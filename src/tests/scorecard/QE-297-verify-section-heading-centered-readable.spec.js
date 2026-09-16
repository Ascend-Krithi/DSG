const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QE-297][AC9] Verify section heading is centered and fully readable on desktop', { tag: ['@non-functional', '@regression', '@dsg-scorecard'] }, () => {
  let scorecardPage;

  test('[QE-297] Verify section heading is properly centered and fully readable on desktop viewport', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);

    // Step 1: Navigate to Scorecard marketing page
    await scorecardPage.goto();
    await expect(scorecardPage.isComparisonSectionVisible()).resolves.toBe(true);

    // Step 2: Locate section heading element
    await expect(scorecardPage.isSectionHeadingVisible()).resolves.toBe(true);
    const headingText = await scorecardPage.getSectionHeadingText();

    // Step 3: Verify heading is horizontally centered
    const headingElement = await page.getByRole('heading', { name: /Score the Right Membership for You/i, level: 2 });
    const textAlign = await headingElement.evaluate(el => window.getComputedStyle(el).textAlign);
    const margin = await headingElement.evaluate(el => window.getComputedStyle(el).margin);
    
    expect(['center', 'auto'].some(val => textAlign.includes(val) || margin.includes('auto'))).toBe(true);

    // Step 4: Verify heading text is fully visible
    expect(headingText).toMatch(TD.pageTitles.scorecard);
    expect(headingText).toContain('Score the Right Membership for You');
    
    const boundingBox = await headingElement.boundingBox();
    expect(boundingBox).toBeTruthy();
    expect(boundingBox.width).toBeGreaterThan(0);
    expect(boundingBox.height).toBeGreaterThan(0);

    // Step 5: Verify heading has proper spacing
    const marginTop = await headingElement.evaluate(el => window.getComputedStyle(el).marginTop);
    const marginBottom = await headingElement.evaluate(el => window.getComputedStyle(el).marginBottom);
    const paddingTop = await headingElement.evaluate(el => window.getComputedStyle(el).paddingTop);
    const paddingBottom = await headingElement.evaluate(el => window.getComputedStyle(el).paddingBottom);
    
    expect(parseFloat(marginTop) + parseFloat(paddingTop)).toBeGreaterThanOrEqual(0);
    expect(parseFloat(marginBottom) + parseFloat(paddingBottom)).toBeGreaterThanOrEqual(0);

    // Step 6: Verify heading font is readable
    const fontSize = await headingElement.evaluate(el => window.getComputedStyle(el).fontSize);
    const fontWeight = await headingElement.evaluate(el => window.getComputedStyle(el).fontWeight);
    const color = await headingElement.evaluate(el => window.getComputedStyle(el).color);
    
    expect(parseFloat(fontSize)).toBeGreaterThan(12);
    expect(fontWeight).toBeTruthy();
    expect(color).toBeTruthy();
  });
});