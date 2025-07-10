import { test as base, expect, Page } from '@playwright/test';
import { TodoPage } from './pages/TodoPage';

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
