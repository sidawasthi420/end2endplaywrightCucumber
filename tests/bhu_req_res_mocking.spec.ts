import { test, expect } from '@playwright/test';

test('Login and validate mocking the response from api', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://dev-cms.bhu.ac.in/admin/auth/login');
  await page.fill('input[name="email"]', 'chirag.parmar@successive.tech');
  await page.fill('input[name="password"]', 'Test@123');
  await page.click('button[type="submit"]');

  //🔑 Key points
  //page.route('**/users/me', handler) intercepts matching requests.
  //route.fulfill() lets you send back your own JSON, status, headers, etc.
  //You can also use route.continue() if you want to let the request go through but modify headers or payload.
  //Wildcards (**) make the pattern flexible.

  // Intercept the request
  await page.route('**/users/me', async route => {
    // Provide a mocked response
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        data: {
          id: 1,
          firstname: 'Mocked',
          lastname: 'User',
          email: 'mocked.user@example.com',
          isActive: true,
          roles: [{ name: 'Admin', permissions: ['read', 'write'] }]
        }
      })
    });
  });

  // Validate mocked response
  const response1 = await page.waitForResponse(res =>
    res.url().endsWith('/users/me')
  );

  // Verify login succeeded (adjust selector as needed)
  await expect(page).toHaveURL(/admin/);

  
  // Wait until redirected to admin dashboard
  await page.waitForURL('**/admin', { timeout: 15000 });

  // Save storage state to JSON file
  await context.storageState({ path: 'auth.json' });

  
  const data = await response1.json();

  expect(data.data.firstname).toBe('Mocked');
  expect(data.data.roles[0].name).toBe('Admin');

  // Verify you are already logged in
  await page.locator('//h1[contains(text(),"Hello Mocked")]').waitFor({ state: 'visible' });

  await context.close();
});