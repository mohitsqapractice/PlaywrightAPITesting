import { APIRequestContext,expect } from "@playwright/test";

export class TokenManager{
    static async getToken(request: APIRequestContext)
    {
            const response = await request.post('https://dummyjson.com/auth/login',{
                headers : {
                    'Content-Type' : 'application/json'

                },data:
                {
                    username : 'kminchelle',
                    password : '0lelplR'
                }
            });

             if (! response.ok())
             {
                 throw new Error (`Loginfailed : ${await response.text()}`);
             }
          const body = await response.json();
          return  body.accessToekn;

    }
}