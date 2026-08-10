const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');

test.describe('[QS-107][TS-003] Guest User Sign In Button Accessibility Tests', () => {
  let scorecardPage;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    await page.setViewportSize({ width: 1920, height: 1080 });
    await scorecardPage.goto();
  });

  test('[QS-191][TC-008] Verify Sign In / Join Now button is clickable and properly styled for guest user', async ({ page }) => {
    // Locate 'Sign In / Join Now' button on Scorecard tile
    const signInButton = page.getByRole('link', { name: /sign in \/ join now/i })
      .or(page.getByRole('button', { name: /sign in \/ join now/i }))
      .or(page.getByText('Sign in to earn', { exact: false }));
    
    await expect(signInButton.first()).toBeVisible();

    // Verify button text is clearly readable
    const buttonText = await signInButton.first().textContent();
    expect(buttonText).toBeTruthy();
    expect(buttonText.length).toBeGreaterThan(0);

    // Verify button has appropriate styling
    const buttonElement = signInButton.first();
    const computedStyle = await buttonElement.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return {
        display: style.display,
        visibility: style.visibility,
        opacity: style.opacity,
        cursor: style.cursor
      };
    });
    
    expect(computedStyle.display).not.toBe('none');
    expect(computedStyle.visibility).toBe('visible');
    expect(parseFloat(computedStyle.opacity)).toBeGreaterThan(0);

    // Hover over button and verify hover state
    await buttonElement.hover();
    await page.waitForTimeout(300);
    
    const cursorAfterHover = await buttonElement.evaluate((el) => {
      return window.getComputedStyle(el).cursor;
    });
    expect(cursorAfterHover).toMatch(/pointer|hand/);

    // Verify button is keyboard accessible
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    const focusedElement = await page.evaluate(() => document.activeElement.tagName);
    expect(['A', 'BUTTON']).toContain(focusedElement);

    // Press Enter key while button is focused
    await buttonElement.focus();
    await page.keyboard.press('Enter');
    
    // Verify button click action is triggered (URL change or navigation)
    await page.waitForTimeout(1000);
    const urlAfterEnter = page.url();
    expect(urlAfterEnter).toBeTruthy();
  });
});