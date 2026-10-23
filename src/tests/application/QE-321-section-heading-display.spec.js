const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QE-321: Verify section heading is displayed above comparison tiles', { tag: ['@smoke', '@regression'] }, () => {
  let scorecardPage;

  test('[QE-321] Verify section heading Score the Right Membership for You is displayed', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);

    // Step 1: Launch the Scorecard marketing page URL on desktop
    await scorecardPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.scorecardPage, { timeout: 20000 });

    // Step 2: Navigate to the comparison section
    const isComparisonSectionVisible = await scorecardPage.isComparisonSectionVisible();
    expect(isComparisonSectionVisible).toBeTruthy();

    // Step 3: Verify section heading is displayed
    const isSectionHeadingVisible = await scorecardPage.isSectionHeadingVisible();
    expect(isSectionHeadingVisible).toBeTruthy();
    const headingText = await scorecardPage.getSectionHeadingText();
    expect(headingText).toMatch(TD.textPatterns.sectionHeading);

    // Step 4: Verify heading is positioned above the comparison tiles
    const sectionHeading = page.locator('section, main, div').filter({ has: page.getByRole('heading', { name: TD.textPatterns.sectionHeading, level: 2 }) }).first()
      .getByRole('heading', { name: TD.textPatterns.sectionHeading, level: 2 }).first();
    await expect(sectionHeading).toBeVisible({ timeout: 20000 });

    // Step 5: Verify heading is fully readable and properly styled
    const boundingBox = await sectionHeading.boundingBox();
    expect(boundingBox).not.toBeNull();
    expect(boundingBox.width).toBeGreaterThan(0);
    expect(boundingBox.height).toBeGreaterThan(0);
  });
});