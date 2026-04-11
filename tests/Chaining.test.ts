import { test, expect } from '../Fixtures/fixtures'
import bookingPayload from '../TestData/booking.json';

test('Chaining exercise', async ({ api ,token}) => {
    const postResponse = await api.post('/booking', bookingPayload)

    expect(postResponse.status()).toBe(200);
    const postJson = await postResponse.json()
    const bookingId = postJson.bookingid;


    const getResponse = await api.get(bookingId);
    expect(getResponse.status()).toBe(200);

    const getJson = await getResponse.json();

    expect(getJson.firstname).toBe(bookingPayload.firstname);
    expect(getJson.lastname).toBe(bookingPayload.lastname);

    const updatePayload = {
          ...bookingPayload,
          firstname : "UpdatedName"
    }

    const putResponse = await api.put(bookingId,updatePayload, token);

    expect(putResponse.status()).toBe(200);
    const putResponseJson = await putResponse.json();

    expect(putResponseJson.firstname).toBe('UpdatedName');
    expect(putResponseJson.lastname).toBe('Brown');


    //Get Request after put request
    const getUpdatedResponse = await api.get(bookingId);
    expect(getUpdatedResponse.status()).toBe(200);

    const getUpdatedJson = await getUpdatedResponse.json();

    expect(getUpdatedJson.firstname).toBe('UpdatedName');
    expect(getUpdatedJson.lastname).toBe(bookingPayload.lastname);
    
    const deleteRespose = await api.delete(bookingId,token);
    expect(deleteRespose.status()).toBe(201);

    
    //Get Request after put request
    const getDeleteResponse = await api.get(bookingId);
    expect(getDeleteResponse.status()).toBe(404);
})