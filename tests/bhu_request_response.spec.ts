import { test, expect } from '@playwright/test';

test('Login and save storage state sid', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://dev-cms.bhu.ac.in/admin/auth/login');
  await page.fill('input[name="email"]', 'chirag.parmar@successive.tech');
  await page.fill('input[name="password"]', 'Test@123');
  await page.click('button[type="submit"]');

  // page.on('request', request => {
  //   if (request.url().includes('/users/me')) {
  //       console.log(`API Request: ${request.url()}`);      // Gives 2 results [https://dev-cms.bhu.ac.in/admin/users/me  &&   https://dev-cms.bhu.ac.in/admin/users/me/permissions]
  //   }
  // });

  page.on('request', request => {
    const url = request.url();
    // if (url === 'https://dev-cms.bhu.ac.in/admin/users/me') {
    //   console.log(`API Request: ${url}`);
    // }

    //  if (request.postData()) {
    //    console.log(`Payload: ${request.postData()}`);
    //  }

  //   //or we can use 

    if (url.endsWith('/users/me')) {
     console.log(`API Request: ${url}`);
    }
  });

  // page.on('response', async response => {
  //   const url = response.url();
  //   if (url.endsWith('/users/me')) {
  //     console.log(`API Response URL: ${url}`);
  //     try {
  //       const data = await response.json(); // parse JSON body
  //       console.log('API Response Data:', data);                      //In this case response if having any object body is not getting displayed. ex:- roles: [ [Object] ]
  //     } catch (err) {
  //       console.log('Non‑JSON response or error:', await response.text());
  //     }
  //   }
  // });

  // page.on('response', async response => {
  //   const url = response.url();
  //   if (url.endsWith('/users/me')) {
  //     const data = await response.json();
  //     console.log('API Response Data:', JSON.stringify(data, null, 2));
  //   }
  // });

  // Verify login succeeded (adjust selector as needed)
  await expect(page).toHaveURL(/admin/);

  // Wait until redirected to admin dashboard
  await page.waitForURL('**/admin', { timeout: 15000 });

  // Save storage state to JSON file
  await context.storageState({ path: 'auth.json' });

  await context.close();
});