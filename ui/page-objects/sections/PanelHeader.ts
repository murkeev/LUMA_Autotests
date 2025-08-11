import {Page} from "@playwright/test";

export class PanelHeader {
    constructor(private page: Page) {}

    async openCustomerMenu() {
        await this.page.locator(
            '//button[@data-action="customer-menu-toggle"]')
            .nth(0)
            .click();
    }

    async clickNavigation(nav: "My Account" | "My Wish List" | "Sign Out") {
        await this.page.locator(
            '//ul[contains(@class, "header") and contains(@class, "links")]' +
            `//a[normalize-space(text())="${nav}"]`).nth(0).click();
    }
}