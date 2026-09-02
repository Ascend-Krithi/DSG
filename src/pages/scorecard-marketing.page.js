const loc = require('./locators/scorecard-marketing.locators');
const TD = require('../data/scorecard-test-data');

class ScorecardMarketingPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(TD.urls.scorecardMarketing, { waitUntil: 'networkidle', timeout: 60000 });
    // Wait for page to be fully loaded by checking for actual marketing page content
    await this.page.waitForSelector('[data-testid="scorecard-tile"], [data-testid="scorecard-plus-tile"], h1:has-text("Score the Right Membership for You"), h2:has-text("Score the Right Membership for You")', { state: 'visible', timeout: 30000 });
  }

  async setViewportSize(width, height) {
    await this.page.setViewportSize({ width, height });
  }

  // Section heading methods
  async isSectionHeadingVisible() {
    return await loc.sectionHeading(this.page).isVisible();
  }

  async getSectionHeadingText() {
    return await loc.sectionHeading(this.page).textContent();
  }

  // Scorecard tile methods
  async isScorecardTileVisible() {
    return await loc.scorecardTile(this.page).isVisible();
  }

  async isScorecardLogoVisible() {
    return await loc.scorecardLogo(this.page).isVisible();
  }

  async isScorecardPointsTextVisible() {
    return await loc.scorecardPointsText(this.page).isVisible();
  }

  async isScorecardRewardTextVisible() {
    return await loc.scorecardRewardText(this.page).isVisible();
  }

  async isScorecardSignInButtonVisible() {
    return await loc.scorecardSignInButton(this.page).isVisible();
  }

  async isScorecardViewAccountButtonVisible() {
    return await loc.scorecardViewAccountButton(this.page).isVisible();
  }

  async clickScorecardSignInButton() {
    await loc.scorecardSignInButton(this.page).click();
  }

  async clickScorecardViewAccountButton() {
    await loc.scorecardViewAccountButton(this.page).click();
  }

  async getScorecardLogoAltText() {
    return await loc.scorecardLogo(this.page).getAttribute('alt');
  }

  // Scorecard+ tile methods
  async isScorecardPlusTileVisible() {
    return await loc.scorecardPlusTile(this.page).isVisible();
  }

  async isScorecardPlusDarkLogoVisible() {
    return await loc.scorecardPlusDarkLogo(this.page).isVisible();
  }

  async isScorecardPlusPricingVisible() {
    return await loc.scorecardPlusPricing(this.page).isVisible();
  }

  async isScorecardPlusBenefitsVisible() {
    return await loc.scorecardPlusBenefits(this.page).isVisible();
  }

  async getScorecardPlusBenefitsText() {
    return await loc.scorecardPlusBenefits(this.page).textContent();
  }

  async isScorecardPlusJoinButtonVisible() {
    return await loc.scorecardPlusJoinButton(this.page).isVisible();
  }

  async isScorecardPlusViewAccountButtonVisible() {
    return await loc.scorecardPlusViewAccountButton(this.page).isVisible();
  }

  async clickScorecardPlusJoinButton() {
    await loc.scorecardPlusJoinButton(this.page).click();
  }

  async clickScorecardPlusViewAccountButton() {
    await loc.scorecardPlusViewAccountButton(this.page).click();
  }

  async getScorecardPlusLogoAltText() {
    return await loc.scorecardPlusDarkLogo(this.page).getAttribute('alt');
  }

  // Tile positioning methods
  async getTilesHorizontalAlignment() {
    const scorecardBox = await loc.scorecardTile(this.page).boundingBox();
    const scorecardPlusBox = await loc.scorecardPlusTile(this.page).boundingBox();
    return { scorecard: scorecardBox, scorecardPlus: scorecardPlusBox };
  }

  async areTilesSideBySide() {
    const boxes = await this.getTilesHorizontalAlignment();
    if (!boxes.scorecard || !boxes.scorecardPlus) return false;
    return boxes.scorecard.x < boxes.scorecardPlus.x;
  }

  // Sign in methods
  async fillSignInCredentials(username, password) {
    await loc.signInUsernameField(this.page).fill(username);
    await loc.signInPasswordField(this.page).fill(password);
  }

  async clickSignInSubmit() {
    await loc.signInSubmitButton(this.page).click();
  }

  async isSignInErrorVisible() {
    return await loc.signInErrorMessage(this.page).isVisible();
  }

  // Account summary methods
  async isAccountSummaryVisible() {
    return await loc.accountSummaryContainer(this.page).isVisible();
  }

  // Sign out methods
  async clickSignOut() {
    await loc.signOutButton(this.page).click();
  }

  // Accessibility methods
  async hoverOverElement(elementLocator) {
    await elementLocator.hover();
  }

  async focusElement(elementLocator) {
    await elementLocator.focus();
  }

  async pressKey(key) {
    await this.page.keyboard.press(key);
  }

  // Responsive methods
  async checkHorizontalScroll() {
    const scrollWidth = await this.page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await this.page.evaluate(() => document.documentElement.clientWidth);
    return scrollWidth > clientWidth;
  }

  async getTabCount() {
    return this.page.context().pages().length;
  }
}

module.exports = ScorecardMarketingPage;