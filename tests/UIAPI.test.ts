import { test, expect } from '@playwright/test';

test('UI and API test', async ({ request,page}) => {
    const response = await request.post('https://dummyjson.com/auth/login',
        {
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                username: 'emilys',
                password: 'emilyspass',
            }
        })
    expect(response.status()).toBe(200);

    const resJxon = await response.json();
    const token = await resJxon.accessToken;
    const getResponse = await request.get('https://dummyjson.com/auth/me', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    expect(getResponse.status()).toBe(200);
    await page.addInitScript((token) => {
     localStorage.setItem('accessToken', token);
},token);
    await page.goto('https://dummyjson.com/profile');
    await expect(page.locator('h1')).toHaveText('This page floated away');
})