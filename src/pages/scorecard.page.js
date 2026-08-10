const URL = 'https://dickssportinggoods.dksxchange.com/ScoreCard';

class ScorecardPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async getSectionHeading() {
    return this.page.getByRole('heading', { name: 'Score the Right Membership for You', level: 2 });
  }

  async getScorecardLogo() {
    return this.page.getByAltText('ScoreCard Logo Light None').nth(1);
  }

  async getScorecardPlusLogo() {
    return this.page.getByAltText('ScoreCard Plus New Logo');
  }

  async getScorecardPointsText() {
    return this.page.getByText('Earn 1 Point for every $1 spent', { exact: false });
  }

  async getScorecardRewardText() {
    return this.page.getByText('300 Points = $10 Reward', { exact: false });
  }

  async getScorecardPlusPrice() {
    return this.page.getByText('$99 Annual Membership', { exact: false });
  }

  async getScorecardPlusBenefits() {
    return this.page.getByText("That's $350 in Benefits", { exact: false });
  }

  async getSignInJoinNowButton() {
    return this.page.getByRole('link', { name: /sign in \/ join now/i })
      .or(this.page.getByRole('button', { name: /sign in \/ join now/i }))
      .or(this.page.getByText('Sign in to earn', { exact: false }));
  }

  async getJoinNowButton() {
    return this.page.getByRole('button', { name: /join now/i })
      .or(this.page.getByRole('link', { name: /join now/i }));
  }

  async getViewAccountButton() {
    return this.page.getByRole('link', { name: /view account/i })
      .or(this.page.getByRole('button', { name: /view account/i }));
  }

  async getComparisonSection() {
    return this.page.locator('div, section').filter({ 
      has: this.page.getByRole('heading', { name: 'Score the Right Membership for You', level: 2 }) 
    }).first();
  }

  async isScorecardTileVisible() {
    const logo = await this.getScorecardLogo();
    return await logo.isVisible().catch(() => false);
  }

  async isScorecardPlusTileVisible() {
    const logo = await this.getScorecardPlusLogo();
    return await logo.isVisible().catch(() => false);
  }

  async areTilesSideBySide() {
    const scorecardLogo = await this.getScorecardLogo();
    const scorecardPlusLogo = await this.getScorecardPlusLogo();
    
    const scorecardBox = await scorecardLogo.boundingBox();
    const scorecardPlusBox = await scorecardPlusLogo.boundingBox();
    
    if (!scorecardBox || !scorecardPlusBox) return false;
    
    return scorecardBox.x < scorecardPlusBox.x;
  }
}

module.exports = ScorecardPage;