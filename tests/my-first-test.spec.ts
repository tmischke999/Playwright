export {};

import { test, expect, Page } from '@playwright/test';

test('My first test', async ({ page }: { page: Page }) => {
  await page.goto('https://linkedin.com');
  await expect(page).toHaveTitle('LinkedIn: Log In or Sign Up'); // Updated for LinkedIn
});
