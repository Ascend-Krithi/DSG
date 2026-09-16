# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: scorecard\QE-342-verify-static-content-unchanged-across-auth-states.spec.js >> [QE-342][AC7] Verify static marketing content remains unchanged regardless of authentication state >> [QE-342] Validate static content stability across authentication states
- Location: src\tests\scorecard\QE-342-verify-static-content-unchanged-across-auth-states.spec.js:12:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('my-account-templates-page-header').filter({ has: getByRole('heading', { name: /score the right membership for you/i, level: 2 }) }).first().getByRole('heading', { name: /score the right membership for you/i, level: 2 }).first()
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('my-account-templates-page-header').filter({ has: getByRole('heading', { name: /score the right membership for you/i, level: 2 }) }).first().getByRole('heading', { name: /score the right membership for you/i, level: 2 }).first() with timeout 30000ms
  - waiting for locator('my-account-templates-page-header').filter({ has: getByRole('heading', { name: /score the right membership for you/i, level: 2 }) }).first().getByRole('heading', { name: /score the right membership for you/i, level: 2 }).first()

```

```yaml
- img "Company Logo"
- heading "We're sorry! The site is currently unavailable." [level=1]
- paragraph: Our team is working to resolve the issue. Please try again after 12 hours.
- paragraph: Thank you for your patience and understanding.
- 'heading "Error: 0.1643c717.1789552505.2ee58104 IP: 136.226.244.191" [level=3]'
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | const ScorecardPage = require('../../page-objects/ScorecardPage');
  3  | const loc = require('../../locators/scorecard.locators');
  4  | 
  5  | test.describe('[QE-342][AC7] Verify static marketing content remains unchanged regardless of authentication state', {
  6  |   tag: ['@functional', '@regression', '@scorecard']
  7  | }, () => {
  8  |   let scorecardPage;
  9  |   let guestStaticContent = {};
  10 |   let authenticatedStaticContent = {};
  11 | 
  12 |   test('[QE-342] Validate static content stability across authentication states', async ({ page, context }) => {
  13 |     scorecardPage = new ScorecardPage(page);
  14 | 
  15 |     // Step 1: Ensure user is in guest state
  16 |     await context.clearCookies();
  17 |     await page.goto('about:blank');
  18 |     console.log('User session cleared - guest state confirmed');
  19 | 
  20 |     // Step 2: Navigate to Scorecard Marketing Page
  21 |     await scorecardPage.goto();
  22 |     await expect(page).toHaveURL(/\/scorecard/i, { timeout: 60000 });
> 23 |     await expect(loc.sectionHeading(page)).toBeVisible({ timeout: 30000 });
     |                                            ^ Error: expect(locator).toBeVisible() failed
  24 |     console.log('Scorecard Marketing Page loaded successfully in guest state');
  25 | 
  26 |     // Step 3: Capture static content on Scorecard tile (logo, messaging)
  27 |     await expect(loc.scorecardTile(page)).toBeVisible({ timeout: 30000 });
  28 |     await expect(loc.scorecardLogoSummary(page)).toBeVisible();
  29 |     guestStaticContent.scorecardLogo = await loc.scorecardLogoSummary(page).getAttribute('alt');
  30 |     guestStaticContent.scorecardPoints = await loc.scorecardPoints(page).textContent();
  31 |     guestStaticContent.scorecardRewards = await loc.scorecardRewards(page).textContent();
  32 |     console.log('Guest state - Scorecard tile static content captured');
  33 | 
  34 |     // Step 4: Capture static content on Scorecard+ tile (Dark Logo, pricing, benefits)
  35 |     await expect(loc.scorecardPlusTile(page)).toBeVisible({ timeout: 30000 });
  36 |     await expect(loc.scorecardPlusLogoSummary(page)).toBeVisible();
  37 |     guestStaticContent.scorecardPlusLogo = await loc.scorecardPlusLogoSummary(page).getAttribute('alt');
  38 |     guestStaticContent.scorecardPlusPrice = await loc.scorecardPlusPrice(page).textContent();
  39 |     guestStaticContent.scorecardPlusBenefits = await loc.scorecardPlusBenefits(page).textContent();
  40 |     console.log('Guest state - Scorecard+ tile static content captured');
  41 | 
  42 |     // Step 5: Sign in with valid credentials
  43 |     await scorecardPage.signInUser('testuser@example.com', 'ValidPass123!');
  44 |     console.log('User authenticated successfully');
  45 | 
  46 |     // Step 6: Navigate to Scorecard Marketing Page
  47 |     await scorecardPage.goto();
  48 |     await expect(page).toHaveURL(/\/scorecard/i, { timeout: 60000 });
  49 |     await expect(loc.sectionHeading(page)).toBeVisible({ timeout: 30000 });
  50 |     console.log('Scorecard Marketing Page loaded successfully in authenticated state');
  51 | 
  52 |     // Step 7: Compare Scorecard tile static content with guest state
  53 |     await expect(loc.scorecardTile(page)).toBeVisible({ timeout: 30000 });
  54 |     authenticatedStaticContent.scorecardLogo = await loc.scorecardLogoSummary(page).getAttribute('alt');
  55 |     authenticatedStaticContent.scorecardPoints = await loc.scorecardPoints(page).textContent();
  56 |     authenticatedStaticContent.scorecardRewards = await loc.scorecardRewards(page).textContent();
  57 |     
  58 |     expect(authenticatedStaticContent.scorecardLogo).toBe(guestStaticContent.scorecardLogo);
  59 |     expect(authenticatedStaticContent.scorecardPoints).toBe(guestStaticContent.scorecardPoints);
  60 |     expect(authenticatedStaticContent.scorecardRewards).toBe(guestStaticContent.scorecardRewards);
  61 |     console.log('Scorecard tile static content is identical to guest state');
  62 | 
  63 |     // Step 8: Compare Scorecard+ tile static content with guest state
  64 |     authenticatedStaticContent.scorecardPlusLogo = await loc.scorecardPlusLogoSummary(page).getAttribute('alt');
  65 |     authenticatedStaticContent.scorecardPlusPrice = await loc.scorecardPlusPrice(page).textContent();
  66 |     authenticatedStaticContent.scorecardPlusBenefits = await loc.scorecardPlusBenefits(page).textContent();
  67 |     
  68 |     expect(authenticatedStaticContent.scorecardPlusLogo).toBe(guestStaticContent.scorecardPlusLogo);
  69 |     expect(authenticatedStaticContent.scorecardPlusPrice).toBe(guestStaticContent.scorecardPlusPrice);
  70 |     expect(authenticatedStaticContent.scorecardPlusBenefits).toBe(guestStaticContent.scorecardPlusBenefits);
  71 |     console.log('Scorecard+ tile static content is identical to guest state');
  72 | 
  73 |     // Step 9: Verify only CTAs differ between authentication states
  74 |     const guestCtaVisible = await loc.scorecardGuestCta(page).isVisible().catch(() => false);
  75 |     const authCtaVisible = await loc.viewAccountScorecardTile(page).isVisible().catch(() => false);
  76 |     
  77 |     expect(guestCtaVisible).toBe(false);
  78 |     expect(authCtaVisible).toBe(true);
  79 |     console.log('CTAs change based on authentication state while all other content remains static');
  80 |   });
  81 | });
```