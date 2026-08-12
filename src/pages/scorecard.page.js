const loc = require('./locators/scorecard.locators');
const URL = 'https://dickssportinggoods.dksxchange.com/scorecard';

class ScorecardPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(URL, {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
  }

  async setViewportSize(width, height) {
    await this.page.setViewportSize({ width, height });
    return true;
  }

  async isPageHeadingVisible() {
    await loc.pageHeading(this.page).waitFor({ state: 'visible', timeout: 10000 });
    return await loc.pageHeading(this.page).isVisible();
  }

  async getPageHeadingText() {
    await loc.pageHeading(this.page).waitFor({ state: 'visible', timeout: 10000 });
    return await loc.pageHeading(this.page).textContent();
  }

  async isScorecardTileVisible() {
    await loc.scorecardTile(this.page).waitFor({ state: 'visible', timeout: 10000 });
    return await loc.scorecardTile(this.page).isVisible();
  }

  async isScorecardPlusTileVisible() {
    await loc.scorecardPlusTile(this.page).waitFor({ state: 'visible', timeout: 10000 });
    return await loc.scorecardPlusTile(this.page).isVisible();
  }

  async areTilesAlignedSideBySide() {
    const scorecardBox = await loc.scorecardTile(this.page).boundingBox();
    const scorecardPlusBox = await loc.scorecardPlusTile(this.page).boundingBox();
    
    if (!scorecardBox || !scorecardPlusBox) {
      return false;
    }

    const verticallyAligned = Math.abs(scorecardBox.y - scorecardPlusBox.y) < 10;
    const horizontallyOrdered = scorecardBox.x < scorecardPlusBox.x;
    
    return verticallyAligned && horizontallyOrdered;
  }

  async getScorecardTileContent() {
    await loc.scorecardContent(this.page).waitFor({ state: 'visible', timeout: 10000 });
    return await loc.scorecardContent(this.page).textContent();
  }

  async getScorecardPlusTileContent() {
    await loc.scorecardPlusContent(this.page).waitFor({ state: 'visible', timeout: 10000 });
    return await loc.scorecardPlusContent(this.page).textContent();
  }
}

module.exports = ScorecardPage;