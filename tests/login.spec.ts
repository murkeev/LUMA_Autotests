import {expect, test} from "@playwright/test";
import {randomInt} from "node:crypto";
import {LoginPage} from "../ui/page-objects/pages/LoginPage";
import {Ad} from "../ui/page-objects/iframes/Ad";
import {PanelHeader} from "../ui/page-objects/sections/PanelHeader";

test.describe('Login and Registration', async () => {
    const email = `JohnDoe+${randomInt(1, 100000)}@gmail.com`

    test('Should create an account', async ({page}) => {
        const ad = new Ad(page);
        const register = new LoginPage(page);
        await register.goto();

        await register.clickCreateAccount();
        await ad.closeAd()
        await register.fillRegisterForm(
            'John',
            'Doe',
            email, 'JohnDoe123!',
            'JohnDoe123!'
        )
        await register.submitRegistration();

        await expect(page.locator('[data-ui-id="message-success"]'))
            .toHaveText('Thank you for registering with Main Website Store.');
        await expect(page).toHaveURL('https://magento.softwaretestingboard.com/customer/account/');
        await expect(page.locator('.box-information .box-content'))
            .toContainText(email)
    })

    test('Should login into account', async ({page}) => {
        const login = new LoginPage(page);
        const panelHeader = new PanelHeader(page);
        const ad = new Ad(page);

        await login.goto();
        await login.clickSignIn();
        await login.fillLoginForm('zixumyduzy@mailinator.com', 'JohnDoe123!');
        await login.submitSignIn();

        await page.waitForLoadState('domcontentloaded')
        await page.waitForLoadState('load')


        await panelHeader.openCustomerMenu()
        await panelHeader.clickNavigation("My Account");


        await ad.closeAd();

        await expect(page).toHaveURL('https://magento.softwaretestingboard.com/customer/account/');
        await expect(page.locator('.box-information .box-content'))
            .toContainText('zixumyduzy@mailinator.com')
    });
})
