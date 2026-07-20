import { defineConfig, devices } from "@playwright/test";

/**
 * E2E smoke tests. Local: `pnpm e2e` (expects a prior `pnpm build`).
 * The remote dev environment pre-installs Chromium at /opt/pw-browsers.
 */
export default defineConfig({
  testDir: "tests/e2e",
  timeout: 30_000,
  use: {
    baseURL: "http://localhost:3000",
    ...devices["Pixel 7"],
    // The remote dev env pre-installs Chromium outside Playwright's registry;
    // point at it rather than downloading (see CLAUDE.md → Run).
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH }
      : undefined,
  },
  webServer: {
    command: "pnpm start",
    url: "http://localhost:3000/api/health",
    reuseExistingServer: false,
    env: { DEMO_MODE: "true" },
  },
});
