import { chromium, expect } from '@playwright/test';

async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Go to login page
  await page.goto('https://dev-cms.bhu.ac.in/admin/auth/login');

  // Fill credentials
  await page.fill('input[name="email"]', 'chirag.parmar@successive.tech');
  await page.fill('input[name="password"]', 'Test@123');
  await page.click('button[type="submit"]');

// Verify login succeeded (adjust selector as needed)
  await expect(page).toHaveURL(/admin/);

  // Wait until redirected to admin dashboard
  await page.waitForURL('**/admin', { timeout: 15000 });

  // Save storage state (cookies + localStorage)
  await context.storageState({ path: 'auth.json' });

  await browser.close();
}

export default globalSetup;