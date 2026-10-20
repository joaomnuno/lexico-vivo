import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  fullyParallel: false,
  use: { baseURL: 'http://127.0.0.1:3100', trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npx vinext start --port 3100',
    env: { AZURE_SPEECH_KEY: '', ACTIVITY_TRACKING: 'false' },
    url: 'http://127.0.0.1:3100/api/health',
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
