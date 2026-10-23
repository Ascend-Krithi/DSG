const loc = require('./locators/dsgScorecard.locators');
const URL = 'https://www.dickssportinggoods.com/ScoreCard';

class DSGScorecardPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(URL, {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
  }

  async isComparisonSectionVisible() {
    return await loc.comparisonSection(this.page).isVisible();
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

  async isScorecardLogoVisible() {
    return await loc.scorecardLogo(this.page).isVisible();
  }

  async getScorecardPointsText() {
    return await loc.scorecardPointsText(this.page).textContent();
  }

  async getScorecardRewardText() {
    return await loc.scorecardRewardText(this.page).textContent();
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

  async isViewAccountScorecardTileVisible() {
    return await loc.viewAccountScorecardTile(this.page).isVisible();
  }

  async isViewAccountScorecardPlusTileVisible() {
    return await loc.viewAccountScorecardPlusTile(this.page).isVisible();
  }

  async isScorecardGuestCtaEnabled() {
    return await loc.scorecardGuestCta(this.page).isEnabled();
  }

  async isScorecardPlusGuestCtaEnabled() {
    return await loc.scorecardPlusGuestCta(this.page).isEnabled();
  }

  async isViewAccountScorecardTileEnabled() {
    return await loc.viewAccountScorecardTile(this.page).isEnabled();
  }

  async isViewAccountScorecardPlusTileEnabled() {
    return await loc.viewAccountScorecardPlusTile(this.page).isEnabled();
  }

  async clickViewAccountScorecardPlusTile() {
    await loc.viewAccountScorecardPlusTile(this.page).click();
    return true;
  }

  async isSignInPageDisplayed() {
    return await loc.signInPageCheck(this.page).isVisible();
  }

  async isAccountSummaryDisplayed() {
    return await loc.accountSummaryCheck(this.page).isVisible();
  }
}

module.exports = DSGScorecardPage;