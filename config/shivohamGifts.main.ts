import { Page } from "@playwright/test";
import { HomePageShivoham } from "../pageObjects/homePageShivoham";
import { HomePage } from "../pageObjects/homePage";

export class MainClass {
    readonly page: Page;
    readonly objectHomePage: HomePageShivoham;
    readonly homepage: HomePage;

    constructor(page: Page) {
        this.page = page;
        this.objectHomePage = new HomePageShivoham(page);
        this.homepage = new HomePage(page);
    }

    async goTo(url1: string){
        console.log(url1);
        await this.page.goto(url1);       //navigate to the url
        //await expect(page).toHaveTitle("Automation Exercise");          //Assertion for validating page title
        //await this.page.screenshot({path: 'homePage.png'});

        //visual testing
        //expect(this.page.screenshot()).toMatchSnapshot('landingPage.png');
        //page.locator()     //Method to identify element on webpage    [CSS or xpath]
    }
    };