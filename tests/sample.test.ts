import {test,expect} from '../Fixtures/baseTest'

test('UI and API test', async({token,authPage,request})=>{

   const response =  await request.get('https://dummyjson.com/auth/me',{
        headers : 
        {
            Authorization : `Bearer ${token}`
        }
    })

    await authPage.goto('https://dummyjson.com')

    const accesstoekn = await authPage.evaluate(()=>
    localStorage.getItem('accessToken'))
    expect(accesstoekn).toBe(token);
})