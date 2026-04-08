import { test, expect } from '@playwright/test';

test('First Put request', async ({ request }) => {
//Post Request
    const postBody = await request.post('https://restful-booker.herokuapp.com/booking', {
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
    });

    const postJson = await postBody.json();
    const bookingId = postJson.bookingid;
    console.log("Booking" + bookingId);

//Getting the token
    const tokenResponse = await request.post('https://restful-booker.herokuapp.com/auth', {
        data: {
            username: "admin",
            password: "password123"
        }
    });

    const tokenbody = await tokenResponse.json();
    const token = tokenbody.token;
    console.log("Token : " + token);

    //Put request
    const putbody = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
        headers : {
               cookie : `token=${token}`
        },
        data: {
            firstname: "UpdatedName",
            lastname: "Brown",
            totalprice: 999,
            depositpaid: false,
            bookingdates: {
                checkin: "2024-02-01",
                checkout: "2024-02-05"
            },
            additionalneeds: "Lunch"
        }});

    console.log(putbody.status());
        expect(putbody.status()).toBe(200);
            const putjsonbody = await putbody.json();
        expect(putjsonbody.firstname).toBe('UpdatedName');
        console.log("Put body is " + JSON.stringify(putjsonbody));
})