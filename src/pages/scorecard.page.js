const loc = require('./locators/scorecard.locators');
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

  async isComparisonSectionVisible() {
    return await loc.comparisonSection(this.page).isVisible();
  }

  async getSectionHeadingText() {
    return await loc.sectionHeading(this.page).textContent();
  }

  async isSectionHeadingVisible() {
    return await loc.sectionHeading(this.page).isVisible();
  }

  async getScorecardLogoAttributes() {
    const logo = loc.scorecardLogo(this.page);
    return {
      src: await logo.getAttribute('src'),
      alt: await logo.getAttribute('alt'),
      width: await logo.evaluate(el => el.width),
      height: await logo.evaluate(el => el.height)
    };
  }

  async getScorecardPlusLogoAttributes() {
    const logo = loc.scorecardPlusLogoSummary(this.page);
    return {
      src: await logo.getAttribute('src'),
      alt: await logo.getAttribute('alt'),
      width: await logo.evaluate(el => el.width),
      height: await logo.evaluate(el => el.height)
    };
  }

  async getScorecardPointsText() {
    return await loc.scorecardPointsText(this.page).textContent();
  }

  async getScorecardRewardText() {
    return await loc.scorecardRewardText(this.page).textContent();
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

  async isViewAccountCtaVisible() {
    return await loc.viewAccountAny(this.page).first().isVisible();
  }

  async getViewAccountCtaCount() {
    return await loc.viewAccountAny(this.page).count();
  }

  async clickViewAccountScorecardTile() {
    await loc.viewAccountScorecardTile(this.page).click();
  }

  async clickViewAccountScorecardPlusTile() {
    await loc.viewAccountScorecardPlusTile(this.page).click();
  }

  async isOnSignInPage() {
    return await loc.signInPageCheck(this.page).isVisible();
  }

  async isOnAccountSummary() {
    return await loc.accountSummaryCheck(this.page).isVisible();
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }
}

module.exports = ScorecardPage;