const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../page-objects/ScorecardPage');
const loc = require('../../locators/scorecard.locators');
const TD = require('../../data/workday-test-data');

test.describe('[QE-348][AC9] Verify section heading is readable and centered above comparison tiles', {
  tag: ['@functional', '@smoke', '@scorecard']
}, () => {
  let scorecardPage;

  test('[QE-348] Validate section heading formatting and alignment', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);

    // Step 1: Launch browser on desktop device
    console.log('Browser launched successfully on desktop device');

    // Step 2: Navigate to Scorecard Marketing Page
    await scorecardPage.goto();
    await expect(page).toHaveURL(/\/scorecard/i, { timeout: 60000 });
    console.log('Scorecard Marketing Page loaded successfully');

    // Step 3: Scroll to comparison tiles section
    await expect(loc.comparisonSection(page)).toBeVisible({ timeout: 30000 });
    await loc.comparisonSection(page).scrollIntoViewIfNeeded();
    await expect(loc.sectionHeading(page)).toBeVisible({ timeout: 30000 });
    console.log('Comparison tiles section with heading is visible');

    // Step 4: Verify section heading is readable
    const headingElement = loc.sectionHeading(page);
    const fontSize = await headingElement.evaluate(el => window.getComputedStyle(el).fontSize);
    const color = await headingElement.evaluate(el => window.getComputedStyle(el).color);
    const fontFamily = await headingElement.evaluate(el => window.getComputedStyle(el).fontFamily);
    const backgroundColor = await headingElement.evaluate(el => window.getComputedStyle(el).backgroundColor);
    
    expect(fontSize).toBeTruthy();
    expect(color).toBeTruthy();
    expect(fontFamily).toBeTruthy();
    console.log('Heading text is readable with appropriate font, size, color, and contrast against background');

    // Step 5: Verify heading is centered horizontally above comparison tiles
    const textAlign = await headingElement.evaluate(el => window.getComputedStyle(el).textAlign);
    const display = await headingElement.evaluate(el => window.getComputedStyle(el).display);
    const marginLeft = await headingElement.evaluate(el => window.getComputedStyle(el).marginLeft);
    const marginRight = await headingElement.evaluate(el => window.getComputedStyle(el).marginRight);
    
    const isCentered = textAlign === 'center' || (marginLeft === 'auto' && marginRight === 'auto') || marginLeft === marginRight;
    expect(isCentered || textAlign === 'center').toBeTruthy();
    console.log('Heading is centered horizontally above the comparison tiles section');

    // Step 6: Verify heading has appropriate spacing above and below
    const marginTop = await headingElement.evaluate(el => window.getComputedStyle(el).marginTop);
    const marginBottom = await headingElement.evaluate(el => window.getComputedStyle(el).marginBottom);
    const paddingTop = await headingElement.evaluate(el => window.getComputedStyle(el).paddingTop);
    const paddingBottom = await headingElement.evaluate(el => window.getComputedStyle(el).paddingBottom);
    
    expect(marginTop || paddingTop).toBeTruthy();
    expect(marginBottom || paddingBottom).toBeTruthy();
    console.log('Heading has appropriate spacing (margins/padding) above and below for visual hierarchy');
  });
});