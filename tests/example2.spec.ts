import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { TopMenuPage } from '../pages/top-menu-page';

const URL = 'https://playwright.dev/';
let homePage: HomePage;
let topMenuPage: TopMenuPage;
const pageUrl = /.*intro/;

test.beforeEach(async ({page}) => {
    await page.goto(URL);
    homePage = new HomePage(page);
});

async function clickGetStarted(page:Page) {
    await homePage.clickGetStarted();
    topMenuPage = new TopMenuPage(page);
};

test.describe('Playwright Website', () => {
    test('has title', async ({ page }) => {
        await homePage.assertPageTitle();
    });
    
    test('get started link', async ({ page }) => {
        await clickGetStarted(page);
        await topMenuPage.assertPageUrl(pageUrl);
    });

    test('check Java page', async ({ page }) => {
        await clickGetStarted(page);
        await topMenuPage.hoverNode();
        await topMenuPage.clickJava();
        await topMenuPage.assertPageUrl(pageUrl);
        await topMenuPage.assertNodeDescriptionNotVisible();
        await topMenuPage.assertJavaDescriptionVisible();
      });
})
