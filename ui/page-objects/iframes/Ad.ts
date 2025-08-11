import {Page} from "@playwright/test";

export class Ad {
    constructor(protected page: Page) {
    }

    async closeAd(): Promise<void> {
        const outerFrames = this.page.frames();
        for (const outerFrame of outerFrames) {
            const nestedFrames = outerFrame.childFrames();

            for (const nestedFrame of nestedFrames) {
                const closeBtn = nestedFrame.locator('[aria-label="Close ad"]');

                if (await closeBtn.count()) {
                    try {
                        await closeBtn.waitFor({ state: "visible", timeout: 3000 });
                        await closeBtn.click();
                        return;
                    } catch (e) {

                    }
                }
            }
        }
    }
}