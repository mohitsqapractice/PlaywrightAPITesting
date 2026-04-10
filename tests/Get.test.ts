import { test, expect } from '@playwright/test';
import { SchemaValidator } from '../utils/schemaValidator';
import { bookingSchema } from '../schemas/bookingSchema';
import { ApiClient } from '../utils/ApiClient';

test('get request as per framework', async ({ request }) => {
    console.log(ApiClient);
    console.log(typeof ApiClient);
    const api = new ApiClient(request);

    const response = await api.get('1');
    expect(response.status()).toBe(200);
})