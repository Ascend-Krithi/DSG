const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './src/tests',
  timeout: 120000,
  use: {
    headless: true,
    trace: 'on-first-retry'
  },
  reporter: 'line'
});
