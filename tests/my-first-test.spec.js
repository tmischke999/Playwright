const { test, expect } = require('@playwright/test');

test('My first test', async ({ page }) => {
  await page.goto('https://linkedin.com');
  await expect(page).toHaveTitle('Example Domain');
});
