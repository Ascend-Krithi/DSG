const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../pages/ScorecardPage');

test.describe('[QE-1][AC7] Verify logos remain unchanged across guest and authenticated states', () => {
  let scorecardPage;
  let guestScorecardLogoAttrs;
  let guestScorecardPlusLogoAttrs;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
  });

  test('QE-291: Verify Scorecard and Scorecard+ logos remain unchanged across guest and authenticated states', async ({ page }) => {
    // Step 1: Navigate to Scorecard marketing page as guest user
    await scorecardPage.navigate();
    await expect(page).toHaveURL(/.*ScoreCard.*/);
    console.log('Scorecard marketing page loaded in guest state');

    // Step 2: Capture Scorecard logo in guest state
    const guestScorecardLogo = await scorecardPage.getScorecardLogo();
    await expect(guestScorecardLogo).toBeVisible();
    guestScorecardLogoAttrs = {
      src: await guestScorecardLogo.getAttribute('src'),
      alt: await guestScorecardLogo.getAttribute('alt'),
      width: await guestScorecardLogo.boundingBox().then(box => box?.width),
      height: await guestScorecardLogo.boundingBox().then(box => box?.height)
    };
    console.log('Scorecard logo attributes captured in guest state:', guestScorecardLogoAttrs);

    // Step 3: Capture Scorecard+ logo in guest state
    const guestScorecardPlusLogo = await scorecardPage.getScorecardPlusLogo();
    await expect(guestScorecardPlusLogo).toBeVisible();
    guestScorecardPlusLogoAttrs = {
      src: await guestScorecardPlusLogo.getAttribute('src'),
      alt: await guestScorecardPlusLogo.getAttribute('alt'),
      width: await guestScorecardPlusLogo.boundingBox().then(box => box?.width),
      height: await guestScorecardPlusLogo.boundingBox().then(box => box?.height)
    };
    console.log('Scorecard+ logo attributes captured in guest state:', guestScorecardPlusLogoAttrs);

    // Step 4: Authenticate user with valid credentials
    await scorecardPage.authenticateUser('testuser@dickssportinggoods.com', 'ValidPass123!');
    console.log('User successfully authenticated');

    // Step 5: Navigate to Scorecard marketing page as authenticated user
    await scorecardPage.navigate();
    await expect(page).toHaveURL(/.*ScoreCard.*/);
    console.log('Scorecard marketing page loaded in authenticated state');

    // Step 6: Verify Scorecard logo remains unchanged in authenticated state
    const authScorecardLogo = await scorecardPage.getScorecardLogo();
    await expect(authScorecardLogo).toBeVisible();
    const authScorecardLogoAttrs = {
      src: await authScorecardLogo.getAttribute('src'),
      alt: await authScorecardLogo.getAttribute('alt'),
      width: await authScorecardLogo.boundingBox().then(box => box?.width),
      height: await authScorecardLogo.boundingBox().then(box => box?.height)
    };
    expect(authScorecardLogoAttrs.src).toBe(guestScorecardLogoAttrs.src);
    expect(authScorecardLogoAttrs.alt).toBe(guestScorecardLogoAttrs.alt);
    expect(authScorecardLogoAttrs.width).toBe(guestScorecardLogoAttrs.width);
    expect(authScorecardLogoAttrs.height).toBe(guestScorecardLogoAttrs.height);
    console.log('Scorecard logo is identical to guest state');

    // Step 7: Verify Scorecard+ logo remains unchanged in authenticated state
    const authScorecardPlusLogo = await scorecardPage.getScorecardPlusLogo();
    await expect(authScorecardPlusLogo).toBeVisible();
    const authScorecardPlusLogoAttrs = {
      src: await authScorecardPlusLogo.getAttribute('src'),
      alt: await authScorecardPlusLogo.getAttribute('alt'),
      width: await authScorecardPlusLogo.boundingBox().then(box => box?.width),
      height: await authScorecardPlusLogo.boundingBox().then(box => box?.height)
    };
    expect(authScorecardPlusLogoAttrs.src).toBe(guestScorecardPlusLogoAttrs.src);
    expect(authScorecardPlusLogoAttrs.alt).toBe(guestScorecardPlusLogoAttrs.alt);
    expect(authScorecardPlusLogoAttrs.width).toBe(guestScorecardPlusLogoAttrs.width);
    expect(authScorecardPlusLogoAttrs.height).toBe(guestScorecardPlusLogoAttrs.height);
    console.log('Scorecard+ logo is identical to guest state');
  });
});