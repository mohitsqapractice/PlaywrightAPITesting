import { test, expect } from '@playwright/test';
import { ApiClient } from '../utils/ApiClient';

test('Chaining exercise', async ({ request }) => {
    const api = new ApiClient(request);
    const postResponse = await api.post('/booking', {
        "firstname": "Jim",
        "lastname": "Brown",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2018-01-01",
            "checkout": "2019-01-01"
        },
        "additionalneeds": "Breakfast"
    })

    expect(postResponse.status()).toBe(200);
    const postJson = await postResponse.json()
    const bookingId = postJson.bookingid;
    console.log(bookingId);

    const getResponse = await api.get(bookingId);
    expect(getResponse.status()).toBe(200);

    const getJson = await getResponse.json();

    expect(getJson.firstname).toBe('Jim');
    expect(getJson.lastname).toBe('Brown');

    const token = await api.getToken()
    console.log(token);

    const putResponse = await api.put(bookingId, {
        "firstname": "UpdatedName",
        "lastname": "Brown",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2018-01-01",
            "checkout": "2019-01-01"
        },
        "additionalneeds": "Breakfast"
    }, token);

    expect(putResponse.status()).toBe(200);
    const putResponseJson = await putResponse.json();

    expect(putResponseJson.firstname).toBe('UpdatedName');
    expect(putResponseJson.lastname).toBe('Brown');


    //Get Request after put request
    const getUpdatedResponse = await api.get(bookingId);
    expect(getUpdatedResponse.status()).toBe(200);

    const getUpdatedJson = await getUpdatedResponse.json();

    expect(getUpdatedJson.firstname).toBe('UpdatedName');
    expect(getUpdatedJson.lastname).toBe('Brown');
    
    const deleteRespose = await api.delete(bookingId,token);
    expect(deleteRespose.status()).toBe(201);

    
    //Get Request after put request
    const getDeleteResponse = await api.get(bookingId);
    expect(getDeleteResponse.status()).toBe(404);
})