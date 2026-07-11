import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly product: Locator;
    
    constructor(page: Page)
    {
        this.page = page;
        this.product = page.locator('//a[contains(text(),"Products")]');
    }
}