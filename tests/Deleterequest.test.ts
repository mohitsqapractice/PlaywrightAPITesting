import { test,expect } from '@playwright/test';

test('Playwright Post->get->Token->Delete->Get request', async ({ request }) => {

    const postRequest = await request.post('https://restful-booker.herokuapp.com/booking', {
        data: {
            "firstname": "Jim",
            "lastname": "Brown",
            "totalprice": 111,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2018-01-01",
                "checkout": "2019-01-01"
            },
            "additionalneeds": "Breakfast"
        }
    })

    expect(postRequest.status()).toBe(200);
    const pJson = await postRequest.json();
    const bookingId = pJson.bookingid;
    console.log("getting the booking Id from Post Request", bookingId);

    //get request if the data created properly or not
    const getRequest = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingId}`)

    expect(getRequest.status()).toBe(200);
    const getJson = await getRequest.json();
    expect(getJson.firstname).toBe('Jim');
      expect(getJson.lastname).toBe('Brown');

    //getting the token of the request 
    const tokenRequest = await request.post('https://restful-booker.herokuapp.com/auth', {
        data:
        {
            "username": "admin",
            "password": "password123"
        }
    })

    expect(tokenRequest.status()).toBe(200);
    const token = await tokenRequest.json();
    console.log("Token is : ", token.token);
    const tokenId = token.token;

    // Delete the booking id created above 
    const deleteRequest = await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
        headers:
        {
            'Content-Type': 'application/json',
            Cookie: `token=${tokenId}`
        }
    })
    expect(deleteRequest.status()).toBe(201);
    expect(deleteRequest.statusText()).toBe('Created');

    //get request after delete 
    const getRequestAfter = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingId}`)
    expect(getRequestAfter.status()).toBe(404)
    expect(getRequestAfter.statusText()).toBe('Not Found');

})