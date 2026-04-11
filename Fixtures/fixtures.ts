import {test as base} from '@playwright/test';
import { ApiClient } from '../utils/ApiClient'

type Myfixture = {
    api : ApiClient,
    token : string
}

  export const test = base.extend<Myfixture>(
    {
        api : async({request},use)=>{

            const apiclient = new ApiClient(request)
            await use(apiclient);
        },

        token : async({api},use) =>{
            const token = await api.getToken();
            await use(token)
        }
    });

    export {expect} from '@playwright/test';