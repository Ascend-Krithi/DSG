const loc = require('./locators/scorecard-marketing.locators');
const TD = require('../data/scorecard-test-data');

class ScorecardMarketingPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(TD.SCORECARD_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async isSectionHeadingVisible() {
    return await loc.sectionHeading(this.page).isVisible();
  }

  async getSectionHeadingText() {
    return await loc.sectionHeading(this.page).textContent();
  }

  async isScorecardTileVisible() {
    return await loc.scorecardTile(this.page).isVisible();
  }

  async isScorecardPlusTileVisible() {
    return await loc.scorecardPlusTile(this.page).isVisible();
  }

  async areTilesDisplayedSideBySide() {
    const scorecardBox = await loc.scorecardTile(this.page).boundingBox();
    const scorecardPlusBox = await loc.scorecardPlusTile(this.page).boundingBox();
    
    if (!scorecardBox || !scorecardPlusBox) return false;
    
    const verticallyAligned = Math.abs(scorecardBox.y - scorecardPlusBox.y) < 50;
    const horizontallySpaced = scorecardBox.x < scorecardPlusBox.x;
    
    return verticallyAligned && horizontallySpaced;
  }

  async isScorecardLogoVisible() {
    return await loc.scorecardLogo(this.page).isVisible();
  }

  async isScorecardPlusDarkLogoVisible() {
    return await loc.scorecardPlusDarkLogo(this.page).isVisible();
  }

  async getScorecardPointsText() {
    return await loc.scorecardPointsText(this.page).textContent();
  }

  async getScorecardRedemptionText() {
    return await loc.scorecardRedemptionText(this.page).textContent();
  }

  async getScorecardPlusPricingText() {
    return await loc.scorecardPlusPricing(this.page).textContent();
  }

  async getScorecardPlusBenefitsText() {
    return await loc.scorecardPlusBenefits(this.page).textContent();
  }

  async isScorecardSignInButtonVisible() {
    return await loc.scorecardSignInButton(this.page).isVisible();
  }

  async isScorecardViewAccountButtonVisible() {
    return await loc.scorecardViewAccountButton(this.page).isVisible();
  }

  async isScorecardPlusJoinButtonVisible() {
    return await loc.scorecardPlusJoinButton(this.page).isVisible();
  }

  async isScorecardPlusViewAccountButtonVisible() {
    return await loc.scorecardPlusViewAccountButton(this.page).isVisible();
  }

  async clickScorecardSignInButton() {
    await loc.scorecardSignInButton(this.page).click();
  }

  async clickScorecardViewAccountButton() {
    await loc.scorecardViewAccountButton(this.page).click();
  }

  async clickScorecardPlusJoinButton() {
    await loc.scorecardPlusJoinButton(this.page).click();
  }

  async clickScorecardPlusViewAccountButton() {
    await loc.scorecardPlusViewAccountButton(this.page).click();
  }

  async getScorecardLogoAltText() {
    return await loc.scorecardLogo(this.page).getAttribute('alt');
  }

  async getScorecardPlusLogoAltText() {
    return await loc.scorecardPlusDarkLogo(this.page).getAttribute('alt');
  }

  async isScorecardSignInButtonEnabled() {
    return await loc.scorecardSignInButton(this.page).isEnabled();
  }

  async isScorecardPlusJoinButtonEnabled() {
    return await loc.scorecardPlusJoinButton(this.page).isEnabled();
  }

  async getScorecardSignInButtonRole() {
    return await loc.scorecardSignInButton(this.page).getAttribute('role');
  }

  async areComparisonTilesHidden() {
    const isContainerHidden = await loc.comparisonTilesContainer(this.page).isHidden();
    return isContainerHidden;
  }
}

module.exports = ScorecardMarketingPage;