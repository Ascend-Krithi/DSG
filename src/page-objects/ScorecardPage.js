const locators = require('../locators/scorecard.locators');

class ScorecardPage {
  constructor(page) {
    this.page = page;
    this.url = 'https://www.dickssportinggoods.com/ScoreCard';
  }

  async goto() {
    await this.page.goto(this.url, {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
  }

  async getComparisonSection() {
    return locators.comparisonSection(this.page);
  }

  async getSectionHeading() {
    return locators.sectionHeading(this.page);
  }

  async getScorecardTile() {
    return locators.scorecardTile(this.page);
  }

  async getScorecardPlusTile() {
    return locators.scorecardPlusTile(this.page);
  }

  async getScorecardGuestCta() {
    return locators.scorecardGuestCta(this.page);
  }

  async getScorecardPlusGuestCta() {
    return locators.scorecardPlusGuestCta(this.page);
  }

  async getViewAccountScorecardTile() {
    return locators.viewAccountScorecardTile(this.page);
  }

  async getViewAccountScorecardPlusTile() {
    return locators.viewAccountScorecardPlusTile(this.page);
  }

  async getScorecardLogo() {
    return locators.scorecardLogo(this.page);
  }

  async getScorecardPlusLogo() {
    return locators.scorecardPlusLogo(this.page);
  }

  async getPricingText() {
    return locators.pricingText(this.page);
  }

  async getBenefitsText() {
    return locators.benefitsText(this.page);
  }

  async getPointsEarningText() {
    return locators.pointsEarningText(this.page);
  }

  async getRewardRedemptionText() {
    return locators.rewardRedemptionText(this.page);
  }

  async clickScorecardGuestCta() {
    const cta = await this.getScorecardGuestCta();
    await cta.click();
  }

  async clickScorecardPlusGuestCta() {
    const cta = await this.getScorecardPlusGuestCta();
    await cta.click();
  }

  async clickViewAccountScorecard() {
    const cta = await this.getViewAccountScorecardTile();
    await cta.click();
  }

  async clickViewAccountScorecardPlus() {
    const cta = await this.getViewAccountScorecardPlusTile();
    await cta.click();
  }

  async signIn() {
    const username = process.env.TEST_USERNAME;
    const password = process.env.TEST_PASSWORD;
    
    if (!username || !password) {
      throw new Error('TEST_USERNAME and TEST_PASSWORD environment variables must be set');
    }

    await this.page.goto('https://www.dickssportinggoods.com/signin', {
      waitUntil: 'domcontentloaded'
    });

    await this.page.fill('input[name="email"], input[type="email"]', username);
    await this.page.fill('input[name="password"], input[type="password"]', password);
    await this.page.click('button[type="submit"], button:has-text("Sign In")');
    await this.page.waitForURL(/scorecard|account/i, { timeout: 30000 });
  }

  async signOut() {
    await this.page.click('a[href*="signout"], button:has-text("Sign Out")');
    await this.page.waitForLoadState('domcontentloaded');
  }
}

module.exports = ScorecardPage;