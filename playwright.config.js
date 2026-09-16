const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './src/tests',
  timeout: 120000,
  use: {
    headless: true,
    launchOptions: {
      executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
    },
    trace: 'on-first-retry'
  },
  reporter: 'line'
});
