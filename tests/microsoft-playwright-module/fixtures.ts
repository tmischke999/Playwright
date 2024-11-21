// fixtures.ts
import { test as base, expect, Page } from '@playwright/test';

// Extend the base test with a custom fixture
const test = base.extend<{
  todoPage: Page;
}>({
  todoPage: async ({ page }, use) => {
    // Navigate to the Todo Application before the test
    await page.goto('https://demo.playwright.dev/todomvc/#/');
    // Pass the page object as the "todoPage" fixture
    await use(page);
  },
});

export { test, expect };
