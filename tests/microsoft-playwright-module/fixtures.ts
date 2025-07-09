import { test as base, expect, Page, Locator } from '@playwright/test';

// Extend the Page type 
type TodoPage = Page & {
  getInputField: () => Promise<Locator>;
};

// Extend the base test with your custom fixture
const test = base.extend<{
  todoPage: TodoPage;
}>({
  todoPage: async ({ page }, use) => {
    // Cast the page to your extended type
    const todoPage = page as TodoPage;

    // Define the helper method
    todoPage.getInputField = async function () {
      const input = this.getByPlaceholder('What needs to be done?');
      await expect(input).toBeVisible();
      return input;
    };

    // Navigate after defining helper
    await todoPage.goto('https://demo.playwright.dev/todomvc/#/');

    // Pass the extended page object to the test
    await use(todoPage);
  }
});

export { test, expect };
