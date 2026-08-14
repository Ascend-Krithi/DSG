const loc = require('./locators/scorecard.locators');
const URL = 'https://dickssportinggoods.dksxchange.com/scorecard';

class ScorecardPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async setViewportSize(width, height) {
    await this.page.setViewportSize({ width, height });
  }

  async clearCookies() {
    await this.page.context().clearCookies();
  }

  // Section Heading Methods
  async isSectionHeadingVisible() {
    return await loc.sectionHeading(this.page).isVisible();
  }

  async getSectionHeadingText() {
    return await loc.sectionHeading(this.page).textContent();
  }

  // Scorecard Tile Methods
  async isScorecardLogoVisible() {
    return await loc.scorecardLogo(this.page).isVisible();
  }

  async isScorecardPointsTextVisible() {
    return await loc.scorecardPointsText(this.page).isVisible();
  }

  async isScorecardRewardTextVisible() {
    return await loc.scorecardRewardText(this.page).isVisible();
  }

  async getScorecardPointsText() {
    return await loc.scorecardPointsText(this.page).textContent();
  }

  async getScorecardRewardText() {
    return await loc.scorecardRewardText(this.page).textContent();
  }

  // Scorecard+ Tile Methods
  async isScorecardPlusLogoVisible() {
    const summaryLogo = await loc.scorecardPlusSummaryLogo(this.page).isVisible().catch(() => false);
    const cardLogo = await loc.scorecardPlusCardLogo(this.page).isVisible().catch(() => false);
    return summaryLogo || cardLogo;
  }

  async isScorecardPlusPriceVisible() {
    return await loc.scorecardPlusPrice(this.page).isVisible();
  }

  async isScorecardPlusBenefitsVisible() {
    return await loc.scorecardPlusBenefits(this.page).isVisible();
  }

  async getScorecardPlusPriceText() {
    return await loc.scorecardPlusPrice(this.page).textContent();
  }

  async getScorecardPlusBenefitsText() {
    return await loc.scorecardPlusBenefits(this.page).textContent();
  }

  // Comparison Section Methods
  async isComparisonSectionVisible() {
    return await loc.comparisonSection(this.page).isVisible();
  }

  async areTilesDisplayedSideBySide() {
    const section = loc.comparisonSection(this.page);
    const boundingBox = await section.boundingBox();
    return boundingBox !== null && boundingBox.width > 0;
  }

  // Guest CTA Methods
  async isSignInJoinNowButtonVisible() {
    return await loc.signInJoinNowButton(this.page).isVisible().catch(() => false);
  }

  async isJoinNowButtonVisible() {
    return await loc.joinNowButton(this.page).isVisible().catch(() => false);
  }

  async clickSignInJoinNowButton() {
    await loc.signInJoinNowButton(this.page).click();
  }

  async clickJoinNowButton() {
    await loc.joinNowButton(this.page).click();
  }

  // Authenticated CTA Methods
  async isViewAccountButtonVisible() {
    return await loc.viewAccountButton(this.page).isVisible().catch(() => false);
  }

  async clickViewAccountButton() {
    await loc.viewAccountButton(this.page).click();
  }

  async getViewAccountButtonCount() {
    return await loc.viewAccountButton(this.page).count();
  }

  // AEM Benefits Value Methods
  async getAemBenefitsValue() {
    return await loc.aemBenefitsValue(this.page).textContent();
  }

  // Authentication Methods
  async signIn(email, password) {
    await loc.auth0EmailInput(this.page).fill(email);
    await loc.auth0ContinueButton(this.page).click();
    await this.page.waitForTimeout(1000);
    await loc.auth0PasswordInput(this.page).fill(password);
    await loc.auth0SignInButton(this.page).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async isAuth0SignInPageVisible() {
    return await loc.auth0EmailInput(this.page).isVisible({ timeout: 5000 }).catch(() => false);
  }

  async isAuthErrorMessageVisible() {
    return await loc.auth0ErrorMessage(this.page).isVisible().catch(() => false);
  }

  async getAuthErrorMessage() {
    return await loc.auth0ErrorMessage(this.page).textContent();
  }

  async signOut() {
    await loc.myAccountButton(this.page).click();
    await this.page.waitForTimeout(500);
    await loc.signOutLink(this.page).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  // Utility Methods
  async getCurrentUrl() {
    return this.page.url();
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }
}

module.exports = ScorecardPage;