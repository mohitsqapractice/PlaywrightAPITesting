import {test as base, Page} from '@playwright/test';
import { TokenManager } from '../utils/tokenManager';

type Myfixture = {
    token : string;
    authPage : Page;
}

export const test = base.extend<Myfixture>({
    token : async ({request},use) => {
      const token = await TokenManager.getToken(request)
      await use(token)
    },
    authPage : async({page,token},use)=>{
        await page.addInitScript((token) =>
        {
            window.localStorage.setItem('accessToken',token)
        },token)
        await use(page);
    }
});
export { expect } from '@playwright/test';
