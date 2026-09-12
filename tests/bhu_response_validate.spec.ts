import { test, expect } from '@playwright/test';

test('Login and validate the response from api', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://dev-cms.bhu.ac.in/admin/auth/login');
  await page.fill('input[name="email"]', 'chirag.parmar@successive.tech');
  await page.fill('input[name="password"]', 'Test@123');
  await page.click('button[type="submit"]');

  // Wait for the specific response
  const response = await page.waitForResponse(res =>
    res.url().endsWith('/users/me') && res.status() === 200
  );

  // Parse JSON body
  const data = await response.json();

  // ✅ Validate values
  expect(data.data.firstname).toBe('Chirag');
  expect(data.data.lastname).toBe('Parmar');
  expect(data.data.email).toContain('@successive.tech');
  expect(data.data.isActive).toBeTruthy();

  // Example: validate roles array is not empty
  expect(Array.isArray(data.data.roles)).toBe(true);
  expect(data.data.roles.length).toBeGreaterThan(0);

  // Verify login succeeded (adjust selector as needed)
  await expect(page).toHaveURL(/admin/);

  // Wait until redirected to admin dashboard
  await page.waitForURL('**/admin', { timeout: 15000 });

  // Save storage state to JSON file
  await context.storageState({ path: 'auth.json' });

  await context.close();
});