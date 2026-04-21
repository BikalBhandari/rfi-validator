const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './Test/e2e',
  outputDir: 'Test/results',
  fullyParallel: false,
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  use: {
    baseURL: 'http://127.0.0.1:4173',
    headless: true
  },
  webServer: {
    command: 'HOST=127.0.0.1 node scripts/static-server.mjs',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 30000
  },
  reporter: [
    ['html', { outputFolder: 'Test/reports' }],
    ['list']
  ],
  globalSetup: require.resolve('./playwright-global-setup.js')
});
