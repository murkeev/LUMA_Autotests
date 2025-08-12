import {test} from "../fixtures/Pages";
import {randomInt} from "node:crypto";
import {expect} from "@playwright/test";
import {Ad} from "../ui/page-objects/iframes/Ad";

test.describe('Login and Registration', async () => {
    const email = `JohnDoe+${randomInt(1, 100000)}@gmail.com`

    test('Should create an account', async ({app, page}) => {
        const ad = new Ad(page);

        await app.login.goto();

        await app.login.clickCreateAccount();
        await ad.closeAd();
        await app.login.fillRegisterForm(
            'John',
            'Doe',
            email,
            'JohnDoe123!',
            'JohnDoe123!'
        );
        await app.login.submitRegistration();

        await expect(page.locator('[data-ui-id="message-success"]'))
            .toHaveText('Thank you for registering with Main Website Store.');
        await expect(page).toHaveURL('https://magento.softwaretestingboard.com/customer/account/');
        await expect(page.locator('.box-information .box-content'))
            .toContainText(email)
    })

    test('Should login into account', async ({app, page}) => {
        const ad = new Ad(page);

        await app.login.goto();

        await app.login.clickSignIn();
        await app.login.fillLoginForm('zixumyduzy@mailinator.com', 'JohnDoe123!');
        await app.login.submitSignIn();
        // await page.waitForLoadState('domcontentloaded')
        await page.waitForLoadState('load')
        await app.panelHeader.openCustomerMenu()
        await app.panelHeader.clickNavigation("My Account");
        await ad.closeAd();

        await expect(page).toHaveURL('https://magento.softwaretestingboard.com/customer/account/');
        await expect(page.locator('.box-information .box-content'))
            .toContainText('zixumyduzy@mailinator.com')
    });
})
