import { test, expect } from '@playwright/test';

test('mTLS authentication test', async ({ page }) => {

  // Navigate to your secure local server
  await page.goto('/');

  // Get page content
  const content = await page.textContent('body');

  console.log(content);

  // Validate response from server
  expect(content).toContain('Authenticated');
});