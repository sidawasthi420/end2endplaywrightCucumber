import {test, expect, Locator} from '@playwright/test';
import { MainClass } from '../config/shivohamGifts.main';
import { navigateToProducts } from '../pages/homePageFunctions';

test.describe('Playwright homepage', () => {

  let mainClass: MainClass;

  test.beforeEach(async ({ page }) => {
    mainClass = new MainClass(page);
  });

test('validate the title of the page', async function({page}){              //normal function  //browser fixture (It comes by default by playwright module and its globally available to each and every test throughout project)

        //const context = await browser.newContext();               //create a new incognito browser context (no cookies or cache)
        //const page = await context.newPage();                     // create a page instance
        
        await mainClass.goTo("https://automationexercise.com/");
        await navigateToProducts(mainClass);
});

test('validate the title of the page 1', async ({browser}) => {                //arrow function
        const context = await browser.newContext();               //create a new incognito browser context (no cookies or cache)
        const page = await context.newPage(); 
        await mainClass.goTo("https://nutrienagsolutions.com/");
        await page.waitForLoadState('domcontentloaded');
        await expect(page).toHaveTitle("Nutrien Ag Solutions");
        const [newPage] = await Promise.all(
          [
              context.waitForEvent('page'),  //listen for any new page pending, rejected, fulfilled
              await page.locator('//a[contains(text(),"Nutrien Solutions")]').first().click()
          ]);
        await newPage.waitForLoadState();
});
});
