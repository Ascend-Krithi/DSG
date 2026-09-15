const loc = require('../locators/scorecard.locators');
const URL = 'https://www.dickssportinggoods.com/ScoreCard';

class ScorecardPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async waitForComparisonSection() {
    await this.page.waitForSelector(loc.comparisonSection(this.page), { state: 'visible', timeout: 30000 });
    return true;
  }

  async getSectionHeadingText() {
    await loc.sectionHeading(this.page).waitFor({ state: 'visible', timeout: 30000 });
    return await loc.sectionHeading(this.page).textContent();
  }

  async isScorecardTileVisible() {
    return await loc.scorecardTile(this.page).isVisible().catch(() => false);
  }

  async isScorecardPlusTileVisible() {
    return await loc.scorecardPlusTile(this.page).isVisible().catch(() => false);
  }

  async getScorecardLogoAlt() {
    await loc.scorecardLogoSummary(this.page).waitFor({ state: 'visible', timeout: 30000 });
    return await loc.scorecardLogoSummary(this.page).getAttribute('alt');
  }

  async getScorecardPointsText() {
    await loc.scorecardPoints(this.page).waitFor({ state: 'visible', timeout: 30000 });
    return await loc.scorecardPoints(this.page).textContent();
  }

  async getScorecardRewardsText() {
    await loc.scorecardRewards(this.page).waitFor({ state: 'visible', timeout: 30000 });
    return await loc.scorecardRewards(this.page).textContent();
  }

  async getScorecardPlusLogoAlt() {
    await loc.scorecardPlusLogoSummary(this.page).waitFor({ state: 'visible', timeout: 30000 });
    return await loc.scorecardPlusLogoSummary(this.page).getAttribute('alt');
  }

  async getScorecardPlusPriceText() {
    await loc.scorecardPlusPrice(this.page).waitFor({ state: 'visible', timeout: 30000 });
    return await loc.scorecardPlusPrice(this.page).textContent();
  }

  async getScorecardPlusBenefitsText() {
    await loc.scorecardPlusBenefits(this.page).waitFor({ state: 'visible', timeout: 30000 });
    return await loc.scorecardPlusBenefits(this.page).textContent();
  }

  async isGuestCtaVisible() {
    return await loc.scorecardGuestCta(this.page).isVisible().catch(() => false);
  }

  async isAuthenticatedCtaVisible() {
    return await loc.viewAccountScorecardTile(this.page).isVisible().catch(() => false);
  }

  async clickGuestCta() {
    await loc.scorecardGuestCta(this.page).waitFor({ state: 'visible', timeout: 30000 });
    await loc.scorecardGuestCta(this.page).click();
  }

  async clickAuthenticatedCta() {
    await loc.viewAccountScorecardTile(this.page).waitFor({ state: 'visible', timeout: 30000 });
    await loc.viewAccountScorecardTile(this.page).click();
  }

  async signInUser(email, password) {
    // Navigate to sign-in page if not already there
    const currentUrl = this.page.url();
    if (!currentUrl.includes('sign-in') && !currentUrl.includes('login')) {
      // Click sign-in link if available
      const signInLink = this.page.locator('a[href*="sign-in"], a[href*="login"]').first();
      if (await signInLink.isVisible().catch(() => false)) {
        await signInLink.click();
        await this.page.waitForLoadState('domcontentloaded', { timeout: 30000 });
      }
    }

    // Fill in credentials
    const emailInput = this.page.locator('input[type="email"], input[name*="email"], input[id*="email"]').first();
    const passwordInput = this.page.locator('input[type="password"], input[name*="password"], input[id*="password"]').first();
    const submitButton = this.page.locator('button[type="submit"], button:has-text("Sign In"), button:has-text("Log In")').first();

    if (await emailInput.isVisible().catch(() => false)) {
      await emailInput.fill(email);
      await passwordInput.fill(password);
      await submitButton.click();
      await this.page.waitForLoadState('domcontentloaded', { timeout: 30000 });
    }

    return true;
  }

  async captureStaticContent() {
    const content = {
      scorecardLogo: await this.getScorecardLogoAlt(),
      scorecardPoints: await this.getScorecardPointsText(),
      scorecardRewards: await this.getScorecardRewardsText(),
      scorecardPlusLogo: await this.getScorecardPlusLogoAlt(),
      scorecardPlusPrice: await this.getScorecardPlusPriceText(),
      scorecardPlusBenefits: await this.getScorecardPlusBenefitsText(),
      sectionHeading: await this.getSectionHeadingText()
    };
    return content;
  }
}

module.exports = ScorecardPage;