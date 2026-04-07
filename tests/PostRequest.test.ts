import { test ,expect} from '@playwright/test';

test('First Post request', async ({ request }) => {
    const response = await request.post('https://restful-booker.herokuapp.com/booking',{ data :{
        "firstname": "James",
        "lastname": "Brown",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2018-01-01",
            "checkout": "2019-01-01"
        },
        "additionalneeds": "Breakfast"
    }})
const body = await response.json()
    console.log( body);

    expect(response.status()).toBe(200);
    expect(body.booking.firstname).toBe('James');
    expect(body.booking.totalprice).toBe(111);
    expect(body.booking.depositpaid).toBe(true);
    const bookingId = body.bookingid
    console.log(bookingId);
    console.log(body.booking.bookingdates.checkin)

})

test('Post API with UI', async({request,page,context})=>{

      const userCookieValue = "2e6087c6-4422-d679-e211-af42be58b4dd";

  // 2. Add the cookie to the browser context before navigating
  await context.addCookies([{
    name: 'user',
    value: userCookieValue,
    url: 'https://demoblaze.com/'
  }]);
   const result = await request.post('https://api.demoblaze.com/addtocart',{data :{
    "id": "6e5799bd-8ee9-e4cc-5e0f-8f78e39743a6",
    "cookie": `user=${userCookieValue}`,
    "prod_id": 1,
    "flag": false
   }})

   expect(result.status()).toBe(200);
    const body = await result.text();
console.log("Raw Response:", JSON.stringify(body));
await page.goto('https://demoblaze.com/cart.html');
expect(await page.locator("//td[text()='Samsung galaxy s6']")).toBeVisible();
await page.pause();
})