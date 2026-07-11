import { MainClass } from "../config/shivohamGifts.main";

export const navigateToProducts = async (mainObject: MainClass): Promise<void> => {
  await mainObject.homepage.product.isVisible();
  //await mainObject.homepage.product.screenshot({path:'partialScreenshotProducts.png'});
  //await mainObject.homepage.product.click();
}

export const searchForProduct = async (mainObject: MainClass): Promise<void> => {
  //await page.locator("input#search_product").fill(product);
  //const submitButton: boolean = await page.locator("button#submit_search").isVisible();
  //expect(submitButton).toBeTruthy();
  //await page.locator("button#submit_search").click();
};

export const addToCart = async (mainObject: MainClass): Promise<void> => {
  //await page.locator('//a[contains(text(),"Add to cart")]').nth(4).click();
  //page.waitForLoadState();
};

export const downloadUploadFile = async (mainObject: MainClass): Promise<void> => {
  //Download and Upload File
  //const downloadPromise = page.waitForEvent('download');
  //await page.getByRole('button',{name: 'Download'}).click();
  //await downloadPromise;

  //await page.locator('#fileInput').click();
  //await page.locator('#fileInput').setInputFiles('C:\\Users\\Siddhant\\Downloads\\Siddhant_Resume_11_07_2026.pdf');
};