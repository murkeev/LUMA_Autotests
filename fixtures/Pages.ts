import {test as base} from "@playwright/test";
import {PageHolder} from "../ui/page-objects/pages/PageHolder";

type Pages = {
    app: PageHolder;
};

export const test = base.extend<Pages>({
    app: async ({page}, use) => {
        await use(new PageHolder(page));
    }
});
