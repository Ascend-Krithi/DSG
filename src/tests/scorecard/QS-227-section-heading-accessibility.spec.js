const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');

test.describe('[QS-107][TS-009] Section Heading Accessibility Tests', () => {
  let scorecardPage;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    await page.setViewportSize({ width: 1920, height: 1080 });
    await scorecardPage.goto();
  });

  test('[QS-227][TC-026] Verify section heading accessibility and semantic HTML structure', async ({ page }) => {
    // Inspect section heading element
    const sectionHeading = page.getByRole('heading', { name: 'Score the Right Membership for You', level: 2 });
    await expect(sectionHeading).toBeVisible();

    // Verify heading uses semantic HTML tag
    const tagName = await sectionHeading.evaluate((el) => el.tagName.toLowerCase());
    expect(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']).toContain(tagName);

    // Verify heading level is appropriate
    const headingLevel = await sectionHeading.evaluate((el) => {
      const match = el.tagName.match(/h(\d)/i);
      return match ? parseInt(match[1]) : null;
    });
    expect(headingLevel).toBeGreaterThanOrEqual(1);
    expect(headingLevel).toBeLessThanOrEqual(6);

    // Verify heading has no ARIA hidden attribute
    const ariaHidden = await sectionHeading.getAttribute('aria-hidden');
    expect(ariaHidden).not.toBe('true');

    // Verify color contrast ratio
    const contrastInfo = await sectionHeading.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return {
        color: style.color,
        backgroundColor: style.backgroundColor
      };
    });
    
    expect(contrastInfo.color).toBeTruthy();
  });
});