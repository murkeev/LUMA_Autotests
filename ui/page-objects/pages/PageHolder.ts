import {LoginPage} from "./LoginPage";
import {Page} from "@playwright/test";
import {PanelHeader} from "../sections/PanelHeader";

export class PageHolder {
    login: LoginPage
    panelHeader: PanelHeader;

    constructor(page: Page) {
        this.login  = new LoginPage(page);


        this.panelHeader = new PanelHeader(page);
    }
}