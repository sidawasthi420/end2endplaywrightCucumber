import { test, expect } from '@playwright/test';

test.only('Open admin with saved storage state', async ({ page }) => {
  // Reuse the saved storage state
  //const context = await browser.newContext({ storageState: 'auth.json' });
  //const page = await context.newPage();

  await page.goto('https://dev-cms.bhu.ac.in/admin');

  // Verify you are already logged in
  await page.locator('//h1[contains(text(),"Hello Chirag")]').waitFor({ state: 'visible' });

  await page.waitForTimeout(8000); // Wait for 8 seconds to observe the logged-in state
  //await context.close();
});
