import { test, expect ,request} from '@playwright/test';

test('Get Request Test1',async({request}) =>
{
      const resp = await request.get('https://restful-booker.herokuapp.com/booking');
      const body = await resp.json()
      console.log(body);

      expect (resp.status()).toBe(200)

})

test('Get Request Test2',async({request}) =>
{
      const resp = await request.get('https://restful-booker.herokuapp.com/booking/4');
      const body = await resp.json()
      console.log(body);

      expect (resp.status()).toBe(200)
      expect(body.firstname).toEqual('Susan');
      expect (body.length).toBeGreaterThan(0);
})