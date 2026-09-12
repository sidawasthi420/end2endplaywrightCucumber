import { test, expect, Page } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

let page: Page;

test.beforeAll(async ({ browser }) => {
  // Create one page for all tests
  const context = await browser.newContext();
  page = await context.newPage();
});

test('has title', async () => {
  
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
  await page.waitForTimeout(10000);  //wait for 5 seconds
});

test('get started link', async () => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();
  await page.waitForTimeout(10000);  //wait for 5 seconds
  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('get amazon link', async () => {
  await page.goto('https://amazzon.com/');
  await page.waitForTimeout(10000);
});

test.afterAll(async () => {
  await page.close();
});