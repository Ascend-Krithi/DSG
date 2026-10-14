const loc = require('../locators/scorecard.locators');
const URL = 'https://www.dickssportinggoods.com/ScoreCard';

class ScorecardPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
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

  async getTilesLayout() {
    const scorecardBox = await loc.scorecardTile(this.page).boundingBox();
    const scorecardPlusBox = await loc.scorecardPlusTile(this.page).boundingBox();
    return { scorecardBox, scorecardPlusBox };
  }

  async areTilesSideBySide() {
    const { scorecardBox, scorecardPlusBox } = await this.getTilesLayout();
    if (!scorecardBox || !scorecardPlusBox) return false;
    const sameRow = Math.abs(scorecardBox.y - scorecardPlusBox.y) < 50;
    const horizontallyArranged = scorecardBox.x < scorecardPlusBox.x || scorecardPlusBox.x < scorecardBox.x;
    return sameRow && horizontallyArranged;
  }

  async areTilesStacked() {
    const { scorecardBox, scorecardPlusBox } = await this.getTilesLayout();
    if (!scorecardBox || !scorecardPlusBox) return false;
    return Math.abs(scorecardBox.y - scorecardPlusBox.y) > 50;
  }

  async getScorecardGuestCtaText() {
    return await loc.scorecardGuestCta(this.page).textContent();
  }

  async isScorecardGuestCtaVisible() {
    return await loc.scorecardGuestCta(this.page).isVisible();
  }

  async isScorecardGuestCtaEnabled() {
    return await loc.scorecardGuestCta(this.page).isEnabled();
  }

  async clickScorecardGuestCta() {
    await loc.scorecardGuestCta(this.page).click();
  }

  async isViewAccountScorecardCtaVisible() {
    return await loc.viewAccountScorecardTile(this.page).isVisible();
  }

  async getViewAccountScorecardCtaText() {
    return await loc.viewAccountScorecardTile(this.page).textContent();
  }

  async isViewAccountScorecardCtaEnabled() {
    return await loc.viewAccountScorecardTile(this.page).isEnabled();
  }

  async clickViewAccountScorecardCta() {
    await loc.viewAccountScorecardTile(this.page).click();
  }

  async isViewAccountScorecardPlusCtaVisible() {
    return await loc.viewAccountScorecardPlusTile(this.page).isVisible();
  }

  async getViewAccountScorecardPlusCtaText() {
    return await loc.viewAccountScorecardPlusTile(this.page).textContent();
  }

  async isViewAccountScorecardPlusCtaEnabled() {
    return await loc.viewAccountScorecardPlusTile(this.page).isEnabled();
  }

  async clickViewAccountScorecardPlusCta() {
    await loc.viewAccountScorecardPlusTile(this.page).click();
  }

  async isScorecardPlusLogoVisible() {
    return await loc.scorecardPlusLogo(this.page).isVisible();
  }

  async isScorecardPlusPriceVisible() {
    return await loc.scorecardPlusPrice(this.page).isVisible();
  }

  async getScorecardPlusPriceText() {
    return await loc.scorecardPlusPrice(this.page).textContent();
  }

  async isScorecardPlusBenefitsVisible() {
    return await loc.scorecardPlusBenefits(this.page).isVisible();
  }

  async getScorecardPlusBenefitsText() {
    return await loc.scorecardPlusBenefits(this.page).textContent();
  }

  async getCurrentUrl() {
    return this.page.url();
  }
}

module.exports = ScorecardPage;