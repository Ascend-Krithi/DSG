class AuthPage {
  constructor(page) {
    this.page = page;
  }

  async authenticate(username, password) {
    await this.page.goto('https://www.dickssportinggoods.com/LogonForm', { waitUntil: 'domcontentloaded', timeout: 60000 });
    const emailInput = this.page.locator('input[type="email"], input[name="email"], input[id*="email"], input[placeholder*="email" i]').first();
    await emailInput.waitFor({ state: 'visible', timeout: 15000 });
    await emailInput.fill(username);
    const continueBtn = this.page.getByRole('button', { name: /continue/i }).first();
    await continueBtn.click();
    await this.page.waitForLoadState('domcontentloaded', { timeout: 30000 });
    const passwordInput = this.page.locator('input[type="password"], input[name="password"], input[id*="password"]').first();
    await passwordInput.waitFor({ state: 'visible', timeout: 15000 });
    await passwordInput.fill(password);
    const signInBtn = this.page.getByRole('button', { name: /sign in|log in|continue/i }).first();
    await signInBtn.click();
    await this.page.waitForLoadState('domcontentloaded', { timeout: 30000 });
  }
}

module.exports = AuthPage;