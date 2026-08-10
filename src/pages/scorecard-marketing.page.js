const loc = require('./locators/scorecard-marketing.locators');
const TD = require('../data/scorecard-test-data');

class ScorecardMarketingPage {
  constructor(page) {
    this.page = page;
  }

  // Navigation
  async goto() {
    await this.page.goto(TD.urls.marketingPage, { 
      waitUntil: 'domcontentloaded', 
      timeout: 60000 
    });
  }

  async gotoSignInPage() {
    await this.page.goto(TD.urls.signInPage, { 
      waitUntil: 'domcontentloaded', 
      timeout: 60000 
    });
  }

  async gotoAccountSummary() {
    await this.page.goto(TD.urls.accountSummary, { 
      waitUntil: 'domcontentloaded', 
      timeout: 60000 
    });
  }

  // Viewport Management
  async setViewportSize(width, height) {
    await this.page.setViewportSize({ width, height });
  }

  // Comparison Section
  async scrollToComparisonSection() {
    await loc.comparisonSection(this.page).scrollIntoViewIfNeeded();
  }

  async isComparisonSectionVisible() {
    return await loc.comparisonSection(this.page).isVisible();
  }

  async isSectionHeadingVisible() {
    return await loc.sectionHeading(this.page).isVisible();
  }

  async getSectionHeadingText() {
    return await loc.sectionHeading(this.page).textContent();
  }

  // Scorecard Tile
  async isScorecardTileVisible() {
    return await loc.scorecardTile(this.page).isVisible();
  }

  async isScorecardLogoVisible() {
    return await loc.scorecardLogo(this.page).isVisible();
  }

  async getScorecardLogoAltText() {
    return await loc.scorecardLogo(this.page).getAttribute('alt');
  }

  async isPointsEarningTextVisible() {
    return await loc.pointsEarningText(this.page).isVisible();
  }

  async isRewardsRedemptionTextVisible() {
    return await loc.rewardsRedemptionText(this.page).isVisible();
  }

  async isSignInJoinNowButtonVisible() {
    return await loc.signInJoinNowButton(this.page).isVisible();
  }

  async isScorecardViewAccountButtonVisible() {
    return await loc.scorecardViewAccountButton(this.page).isVisible();
  }

  async clickSignInJoinNowButton() {
    await loc.signInJoinNowButton(this.page).click();
  }

  async clickScorecardViewAccountButton() {
    await loc.scorecardViewAccountButton(this.page).click();
  }

  async isScorecardViewAccountButtonEnabled() {
    return await loc.scorecardViewAccountButton(this.page).isEnabled();
  }

  async hoverScorecardViewAccountButton() {
    await loc.scorecardViewAccountButton(this.page).hover();
  }

  // Scorecard+ Tile
  async isScorecardPlusTileVisible() {
    return await loc.scorecardPlusTile(this.page).isVisible();
  }

  async isScorecardPlusDarkLogoVisible() {
    return await loc.scorecardPlusDarkLogo(this.page).isVisible();
  }

  async getScorecardPlusDarkLogoAltText() {
    return await loc.scorecardPlusDarkLogo(this.page).getAttribute('alt');
  }

  async isAnnualMembershipTextVisible() {
    return await loc.annualMembershipText(this.page).isVisible();
  }

  async getBenefitsValueText() {
    return await loc.benefitsValueText(this.page).textContent();
  }

  async isBenefitsValueTextVisible() {
    return await loc.benefitsValueText(this.page).isVisible();
  }

  async isJoinNowButtonVisible() {
    return await loc.joinNowButton(this.page).isVisible();
  }

  async isScorecardPlusViewAccountButtonVisible() {
    return await loc.scorecardPlusViewAccountButton(this.page).isVisible();
  }

  async clickJoinNowButton() {
    await loc.joinNowButton(this.page).click();
  }

  async clickScorecardPlusViewAccountButton() {
    await loc.scorecardPlusViewAccountButton(this.page).click();
  }

  async isScorecardPlusViewAccountButtonEnabled() {
    return await loc.scorecardPlusViewAccountButton(this.page).isEnabled();
  }

  async hoverScorecardPlusViewAccountButton() {
    await loc.scorecardPlusViewAccountButton(this.page).hover();
  }

  // Tile Alignment
  async areTilesSideBySide() {
    const scorecardBox = await loc.scorecardTile(this.page).boundingBox();
    const scorecardPlusBox = await loc.scorecardPlusTile(this.page).boundingBox();
    
    if (!scorecardBox || !scorecardPlusBox) return false;
    
    // Check if tiles are horizontally aligned (similar Y position)
    const yDifference = Math.abs(scorecardBox.y - scorecardPlusBox.y);
    // Check if Scorecard+ is to the right of Scorecard
    const isRightAligned = scorecardPlusBox.x > scorecardBox.x;
    
    return yDifference < 50 && isRightAligned;
  }

  async areTilesCentered() {
    const viewportSize = this.page.viewportSize();
    const scorecardBox = await loc.scorecardTile(this.page).boundingBox();
    const scorecardPlusBox = await loc.scorecardPlusTile(this.page).boundingBox();
    
    if (!scorecardBox || !scorecardPlusBox || !viewportSize) return false;
    
    const tilesWidth = (scorecardPlusBox.x + scorecardPlusBox.width) - scorecardBox.x;
    const viewportCenter = viewportSize.width / 2;
    const tilesCenter = scorecardBox.x + (tilesWidth / 2);
    
    // Allow 50px tolerance for centering
    return Math.abs(tilesCenter - viewportCenter) < 50;
  }

  // Authentication
  async signIn(username, password) {
    await loc.usernameField(this.page).fill(username);
    await loc.passwordField(this.page).fill(password);
    await loc.signInButton(this.page).click();
  }

  async signOut() {
    await loc.signOutButton(this.page).click();
  }

  async isErrorMessageVisible() {
    return await loc.errorMessage(this.page).isVisible();
  }

  async getErrorMessageText() {
    return await loc.errorMessage(this.page).textContent();
  }

  async isSessionExpiredMessageVisible() {
    return await loc.sessionExpiredMessage(this.page).isVisible();
  }

  // Browser Actions
  async clearCookiesAndCache() {
    await this.page.context().clearCookies();
  }

  async goBack() {
    await this.page.goBack();
  }

  async reload() {
    await this.page.reload();
  }

  async rotateToLandscape() {
    const currentSize = this.page.viewportSize();
    if (currentSize) {
      await this.page.setViewportSize({ 
        width: currentSize.height, 
        height: currentSize.width 
      });
    }
  }

  // Console Errors
  async hasConsoleErrors() {
    const errors = [];
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    return errors.length > 0;
  }

  // Image Quality
  async isImageLoaded(locator) {
    const element = locator(this.page);
    const naturalWidth = await element.evaluate(img => img.naturalWidth);
    return naturalWidth > 0;
  }

  async getImageDimensions(locator) {
    const element = locator(this.page);
    return await element.evaluate(img => ({
      width: img.naturalWidth,
      height: img.naturalHeight
    }));
  }
}

module.exports = ScorecardMarketingPage;