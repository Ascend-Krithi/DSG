const loc = require('../locators/scorecard.locators');
const TD = require('../data/scorecard-test-data');

class ScorecardPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(TD.urls.scorecardPage, {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
  }

  async clearSession() {
    await this.page.context().clearCookies();
    await this.page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
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

  async getScorecardLogoAltText() {
    return await loc.scorecardLogo(this.page).getAttribute('alt');
  }

  async getScorecardPointsText() {
    return await loc.scorecardPoints(this.page).textContent();
  }

  async getScorecardRewardText() {
    return await loc.scorecardReward(this.page).textContent();
  }

  async getScorecardPlusLogoAltText() {
    const logo = loc.scorecardPlusLogoSummary(this.page).or(loc.scorecardPlusLogoCard(this.page));
    return await logo.first().getAttribute('alt');
  }

  async getScorecardPlusPriceText() {
    return await loc.scorecardPlusPrice(this.page).textContent();
  }

  async getScorecardPlusBenefitsText() {
    return await loc.scorecardPlusBenefits(this.page).textContent();
  }

  async clickScorecardGuestCta() {
    await loc.scorecardGuestCta(this.page).click();
  }

  async clickScorecardPlusGuestCta() {
    await loc.scorecardPlusGuestCta(this.page).click();
  }

  async clickViewAccountScorecardTile() {
    await loc.viewAccountScorecardTile(this.page).click();
  }

  async clickViewAccountScorecardPlusTile() {
    await loc.viewAccountScorecardPlusTile(this.page).click();
  }

  async isScorecardGuestCtaVisible() {
    return await loc.scorecardGuestCta(this.page).isVisible();
  }

  async isScorecardPlusGuestCtaVisible() {
    return await loc.scorecardPlusGuestCta(this.page).isVisible();
  }

  async isViewAccountScorecardTileVisible() {
    return await loc.viewAccountScorecardTile(this.page).isVisible();
  }

  async isViewAccountScorecardPlusTileVisible() {
    return await loc.viewAccountScorecardPlusTile(this.page).isVisible();
  }

  async isScorecardGuestCtaClickable() {
    return await loc.scorecardGuestCta(this.page).isEnabled();
  }

  async isScorecardPlusGuestCtaClickable() {
    return await loc.scorecardPlusGuestCta(this.page).isEnabled();
  }

  async isViewAccountScorecardTileClickable() {
    return await loc.viewAccountScorecardTile(this.page).isEnabled();
  }

  async isViewAccountScorecardPlusTileClickable() {
    return await loc.viewAccountScorecardPlusTile(this.page).isEnabled();
  }

  getComparisonSection() {
    return loc.comparisonSection(this.page);
  }

  getComparisonHeading() {
    return loc.comparisonHeading(this.page);
  }

  getScorecardTile() {
    return loc.scorecardTile(this.page);
  }

  getScorecardPlusTile() {
    return loc.scorecardPlusTile(this.page);
  }

  getScorecardLogo() {
    return loc.scorecardLogo(this.page);
  }

  getScorecardPoints() {
    return loc.scorecardPoints(this.page);
  }

  getScorecardReward() {
    return loc.scorecardReward(this.page);
  }

  getScorecardPlusLogo() {
    return loc.scorecardPlusLogoSummary(this.page).or(loc.scorecardPlusLogoCard(this.page));
  }

  getScorecardPlusPrice() {
    return loc.scorecardPlusPrice(this.page);
  }

  getScorecardPlusBenefits() {
    return loc.scorecardPlusBenefits(this.page);
  }

  getScorecardGuestCta() {
    return loc.scorecardGuestCta(this.page);
  }

  getScorecardPlusGuestCta() {
    return loc.scorecardPlusGuestCta(this.page);
  }

  getViewAccountScorecardTile() {
    return loc.viewAccountScorecardTile(this.page);
  }

  getViewAccountScorecardPlusTile() {
    return loc.viewAccountScorecardPlusTile(this.page);
  }
}

module.exports = ScorecardPage;