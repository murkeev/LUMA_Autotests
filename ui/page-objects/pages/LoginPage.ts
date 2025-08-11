import {Page} from "@playwright/test";
import {AbstractPage} from './AbstractPage';

export class LoginPage extends AbstractPage {

    private firstName = '#firstname';
    private lastName = '#lastname';
    private registerEmail = '#email_address';
    private signInEmail = '#email';
    private password = '#password';
    private passwordConfirm = '#password-confirmation';
    private signInButton = {role: 'link' as const, name: 'Sign In'};
    private createAccountButton = {role: 'link' as const, name: 'Create an Account'};

    constructor(page: Page) {
        super(page);
    }

    async goto() {
        await this.page.goto("https://magento.softwaretestingboard.com");
    }

    async fillLoginForm(email: string, password: string) {
        await this.page.locator(this.signInEmail).fill(email);
        await this.page.getByLabel('Password').fill(password);
    }

    async fillRegisterForm(firstName: string, lastName: string, email: string, password: string, passwordConfirm: string) {
        await this.page.locator(this.firstName).fill(firstName);
        await this.page.locator(this.lastName).fill(lastName);
        await this.page.locator(this.registerEmail).fill(email);
        await this.page.locator(this.password).fill(password);
        await this.page.locator(this.passwordConfirm).fill(passwordConfirm);
    }

    async submitRegistration() {
        await this.page.getByRole('button', {name: 'Create an Account'}).click();
    }

    async submitSignIn() {
        await this.page.getByRole('button', {name: 'Sign In'}).click();
    }

    async clickSignIn() {
        await this.page.getByRole(this.signInButton.role, {name: this.signInButton.name}).click();
    }

    async clickCreateAccount() {
        await this.page.getByRole(this.createAccountButton.role, {name: this.createAccountButton.name}).click();
    }
}
