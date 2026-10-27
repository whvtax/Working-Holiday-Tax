import { defineConfig, devices } from '@playwright/test'

/**
 * End-to-end tests (docs/engineering/TESTING_STRATEGY.md).
 *
 * Runs against a PRODUCTION build (`next start`), because the brand routing
 * is in the build's routes manifest and dev mode is not what ships:
 *   bash scripts/build-offline.sh && npx playwright test
 *
 * Both brands are served by the one server. WHT is reached as localhost,
 * SVT as svt.localhost (browsers resolve *.localhost to the loopback
 * address, and svt.localhost is in config/brand-routing.js).
 *
 * No test here touches production data or production secrets: the server
 * runs with whatever local .env exists, and the specs only read pages.
 */
const PORT = Number(process.env.E2E_PORT ?? 3100)

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list']],
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'mobile', use: { ...devices['Desktop Chrome'], viewport: { width: 390, height: 844 } } },
    { name: 'tablet', use: { ...devices['Desktop Chrome'], viewport: { width: 768, height: 1024 } } },
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
  ],
  webServer: {
    command: `npx next start -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
})
