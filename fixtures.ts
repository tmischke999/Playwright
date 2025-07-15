import { test as base, expect, Page } from '@playwright/test';
import { TodoPage } from './pages/TodoPage';

// Extend Playwright base test with a custom 'todoPage' fixture
const test = base.extend<{
  todoPage: TodoPage;
}>({
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    await use(todoPage);
  }
});

export { test, expect };