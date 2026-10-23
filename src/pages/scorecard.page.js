const loc = require('./locators/scorecard.locators');
const TD = require('../data/scorecard-test-data');

class ScorecardPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(TD.urls.scorecardMarketing, {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
  }

  async clearSessionData() {
    await this.page.context().clearCookies();
  }

  async isSectionHeadingVisible() {
    return await loc.sectionHeading(this.page).isVisible();
  }

  async getSectionHeadingText() {
    return await loc.sectionHeading(this.page).textContent();
  }

  async isComparisonSectionVisible() {
    return await loc.comparisonSection(this.page).isVisible();
  }

  async isScorecardTileVisible() {
    return await loc.scorecardTile(this.page).isVisible();
  }

  async isScorecardPlusTileVisible() {
    return await loc.scorecardPlusTile(this.page).isVisible();
  }

  async isScorecardLogoVisible() {
    return await loc.scorecardLogo(this.page).isVisible();
  }

  async getScorecardPointsText() {
    return await loc.scorecardPoints(this.page).textContent();
  }

  async getScorecardRewardText() {
    return await loc.scorecardReward(this.page).textContent();
  }

  async isScorecardPlusLogoSummaryVisible() {
    return await loc.scorecardPlusLogoSummary(this.page).isVisible();
  }

  async isScorecardPlusLogoCardVisible() {
    return await loc.scorecardPlusLogoCard(this.page).isVisible();
  }

  async getScorecardPlusPriceText() {
    return await loc.scorecardPlusPrice(this.page).textContent();
  }

  async getScorecardPlusBenefitsText() {
    return await loc.scorecardPlusBenefits(this.page).textContent();
  }

  async isScorecardGuestCtaVisible() {
    return await loc.scorecardGuestCta(this.page).isVisible();
  }

  async isScorecardPlusGuestCtaVisible() {
    return await loc.scorecardPlusGuestCta(this.page).isVisible();
  }

  async getScorecardGuestCtaText() {
    return await loc.scorecardGuestCta(this.page).textContent();
  }

  async getScorecardPlusGuestCtaText() {
    return await loc.scorecardPlusGuestCta(this.page).textContent();
  }

  async clickScorecardGuestCta() {
    await loc.scorecardGuestCta(this.page).click();
  }

  async clickScorecardPlusGuestCta() {
    await loc.scorecardPlusGuestCta(this.page).click();
  }

  async isViewAccountScorecardTileVisible() {
    return await loc.viewAccountScorecardTile(this.page).isVisible();
  }

  async isViewAccountScorecardPlusTileVisible() {
    return await loc.viewAccountScorecardPlusTile(this.page).isVisible();
  }

  async getViewAccountScorecardTileText() {
    return await loc.viewAccountScorecardTile(this.page).textContent();
  }

  async getViewAccountScorecardPlusTileText() {
    return await loc.viewAccountScorecardPlusTile(this.page).textContent();
  }

  async clickViewAccountScorecardTile() {
    await loc.viewAccountScorecardTile(this.page).click();
  }

  async clickViewAccountScorecardPlusTile() {
    await loc.viewAccountScorecardPlusTile(this.page).click();
  }

  async isViewAccountCtaEnabled() {
    return await loc.viewAccountScorecardTile(this.page).isEnabled();
  }
}

module.exports = ScorecardPage;