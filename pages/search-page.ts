import { expect, Locator, Page } from '@playwright/test';

export class SearchPage {
    readonly page: Page;
    readonly searchButton: Locator;
    readonly searchInput: Locator;
    readonly searchResults: Locator;
    readonly clearSearchTerm: Locator;

    constructor (page: Page) {
        this.page = page;
        this.searchButton = page.getByRole('button', {name: 'Search (Ctrl+k)'});
        this.searchInput = page.locator('.DocSearch-Input');
        this.searchResults = page.locator('.DocSearch-Hits');
        this.clearSearchTerm = page.getByRole('button', {name: 'Clear the query'});
    }

    async clickSearch () {
        await this.searchButton.click();
    }
  
    async assertSearchFormVisible () {
        await expect(this.searchInput).toBeFocused();
    }

    async performSearch (searchTerm: string) {
        await this.searchInput.fill(searchTerm);
        await expect(this.searchResults.getByText(searchTerm, { exact: false }).first()).toBeVisible();
    }

    async clearSearch () {
        await this.clearSearchTerm.click();
        await expect(this.searchInput).toHaveValue('');
    }
}

export default SearchPage;