class AuthenticationPage {
  constructor(page) {
    this.page = page;
  }

  async signIn(email, password) {
    await this.page.getByLabel(/email/i).fill(email);
    await this.page.getByLabel(/password/i).fill(password);
    await this.page.getByRole('button', { name: /sign in/i }).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async isSignedIn() {
    const accountLink = this.page.getByRole('link', { name: /account|my account/i });
    return await accountLink.isVisible();
  }

  async signOut() {
    await this.page.getByRole('link', { name: /sign out|log out/i }).click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}

module.exports = AuthenticationPage;