const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../pages/ScorecardPage');

test.describe('[QE-1][AC7] Verify benefits messaging remains unchanged across guest and authenticated states', () => {
  let scorecardPage;
  let guestBenefitsText;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
  });

  test('QE-293: Verify benefits messaging text remains unchanged across guest and authenticated states', async ({ page }) => {
    // Step 1: Navigate to Scorecard marketing page as guest user
    await scorecardPage.navigate();
    await expect(page).toHaveURL(/.*ScoreCard.*/);
    console.log('Scorecard marketing page loaded in guest state');

    // Step 2: Capture benefits messaging text in guest state
    const guestBenefitsElement = await scorecardPage.getScorecardPlusBenefits();
    await expect(guestBenefitsElement).toBeVisible();
    guestBenefitsText = await guestBenefitsElement.textContent();
    expect(guestBenefitsText).toMatch(/\$350 in Benefits!?/i);
    console.log('Benefits text captured in guest state:', guestBenefitsText);

    // Step 3: Authenticate user with valid credentials
    await scorecardPage.authenticateUser('testuser@dickssportinggoods.com', 'ValidPass123!');
    console.log('User successfully authenticated');

    // Step 4: Navigate to Scorecard marketing page as authenticated user
    await scorecardPage.navigate();
    await expect(page).toHaveURL(/.*ScoreCard.*/);
    console.log('Scorecard marketing page loaded in authenticated state');

    // Step 5: Verify benefits messaging text remains unchanged in authenticated state
    const authBenefitsElement = await scorecardPage.getScorecardPlusBenefits();
    await expect(authBenefitsElement).toBeVisible();
    const authBenefitsText = await authBenefitsElement.textContent();
    expect(authBenefitsText).toMatch(/\$350 in Benefits!?/i);
    expect(authBenefitsText).toBe(guestBenefitsText);
    console.log('Benefits text still displays $350 in Benefits and is identical to guest state');
  });
});