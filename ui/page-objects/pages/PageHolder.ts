import {AuthPage} from "./AuthPage";
import {Page} from "@playwright/test";
import {PanelHeader} from "../sections/PanelHeader";

export class PageHolder {
    auth: AuthPage
    panelHeader: PanelHeader;

    constructor(page: Page) {
        this.auth  = new AuthPage(page);


        this.panelHeader = new PanelHeader(page);
    }
}