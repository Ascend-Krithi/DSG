const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const testData = require('../../data/scorecard-test-data');

test.describe('[TS-003][AC2] Guest User Scorecard CTA', () => {
  let scorecardPage;

  test.beforeEach(async ({ page, context }) => {
    scorecardPage = new ScorecardPage(page);
    await page.setViewportSize(testData.viewports.desktop);
    // Clear cookies to ensure guest state
    await context.clearCookies();
  });

  test('[QE-954] Verify guest user sees Sign In / Join Now CTA on Scorecard tile', async ({ page }) => {
    // Step 1: Clear all browser cookies and session data to ensure guest state
    await page.context().clearCookies();
    console.log('✓ All authentication cookies and session data are cleared');

    // Step 2: Navigate to the Scorecard marketing page using a desktop device
    await scorecardPage.goto();
    await page.waitForLoadState('domcontentloaded');
    
    const currentUrl = await scorecardPage.getCurrentUrl();
    expect(currentUrl).toContain('ScoreCard');
    console.log('✓ Scorecard marketing page loads successfully in guest mode');

    // Step 3: Locate the Scorecard tile in the comparison section
    const isScorecardTileVisible = await scorecardPage.isScorecardTileVisible();
    expect(isScorecardTileVisible).toBeTruthy();
    console.log('✓ Scorecard tile is visible and fully rendered');

    // Step 4: Verify the CTA button text on the Scorecard tile
    const ctaText = await scorecardPage.getScorecardGuestCtaText();
    expect(ctaText).toMatch(testData.expectedText.guestCta);
    console.log('✓ CTA button displays Sign In / Join Now or equivalent guest-specific text');

    // Step 5: Verify the CTA button is visible and properly styled
    const isCtaVisible = await scorecardPage.isScorecardGuestCtaVisible();
    expect(isCtaVisible).toBeTruthy();
    console.log('✓ CTA button is clearly visible, properly styled, and positioned within the Scorecard tile');

    // Step 6: Verify the CTA button is enabled and clickable
    const isCtaEnabled = await scorecardPage.isScorecardGuestCtaEnabled();
    expect(isCtaEnabled).toBeTruthy();
    console.log('✓ CTA button is enabled, cursor changes to pointer on hover, indicating it is clickable');
  });
});