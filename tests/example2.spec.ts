import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../pages/home-page';

const URL = 'https://playwright.dev/';
let homePage: HomePage;

test.beforeEach(async ({page}) => {
    await page.goto(URL);
    homePage = new HomePage(page);
});

async function clickGetStarted(page:Page) {
    await homePage.clickGetStarted();
};

test.describe('Playwright Website', () => {
    test('has title', async ({ page }) => {
        await expect(page).toHaveTitle(/Playwright/);
    });
    
    test('get started link', async ({ page }) => {
        await clickGetStarted(page);
        await expect(page).toHaveURL(/.*intro/);
    });
})
