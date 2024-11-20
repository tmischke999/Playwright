// @ts-check
export {};
import { test, expect, Page } from '@playwright/test'; // Ensure Page is imported only once

const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment',
];

test.beforeEach(async ({ page }: { page: Page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
});

async function createDefaultTodos(page: Page): Promise<void> {
  const newTodo = page.getByPlaceholder('What needs to be done?');
  for (const item of TODO_ITEMS) {
    await newTodo.fill(item);
    await newTodo.press('Enter');
  }
}

/**
 * Checks the number of todos in localStorage.
 * @param page - The Playwright `Page` object.
 * @param expected - The expected number of todos.
 */
async function checkNumberOfTodosInLocalStorage(page: Page, expected: number): Promise<void> {
  await page.waitForFunction((expectedLength: number) => {
    const todos = JSON.parse(localStorage.getItem('react-todos') || '[]');
    return todos.length === expectedLength;
  }, expected);
}

/**
 * Checks the number of completed todos in localStorage.
 * @param page - The Playwright `Page` object.
 * @param expected - The expected number of completed todos.
 */
async function checkNumberOfCompletedTodosInLocalStorage(page: Page, expected: number): Promise<void> {
  await page.waitForFunction((expectedLength: number) => {
    const todos = JSON.parse(localStorage.getItem('react-todos') || '[]');
    return todos.filter((todo: any) => todo.completed).length === expectedLength;
  }, expected);
}

/**
 * Checks if a specific todo title exists in localStorage.
 * @param page - The Playwright `Page` object.
 * @param title - The title of the todo to check.
 */
async function checkTodosInLocalStorage(page: Page, title: string): Promise<void> {
  await page.waitForFunction((expectedTitle: string) => {
    const todos = JSON.parse(localStorage.getItem('react-todos') || '[]');
    return todos.some((todo: any) => todo.title === expectedTitle);
  }, title);
}

// Tests start here
test.describe('New Todo', () => {
  test('should allow me to add todo items', async ({ page }: { page: Page }) => {
    const newTodo = page.getByPlaceholder('What needs to be done?');

    // Create first todo
    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press('Enter');

    // Verify only one todo item exists
    await expect(page.getByTestId('todo-title')).toHaveText([TODO_ITEMS[0]]);

    // Create second todo
    await newTodo.fill(TODO_ITEMS[1]);
    await newTodo.press('Enter');

    // Verify both todo items exist
    await expect(page.getByTestId('todo-title')).toHaveText([
      TODO_ITEMS[0],
      TODO_ITEMS[1],
    ]);

    // Verify localStorage
    await checkNumberOfTodosInLocalStorage(page, 2);
  });

  test('should clear text input field when an item is added', async ({ page }: { page: Page }) => {
    const newTodo = page.getByPlaceholder('What needs to be done?');

    // Create a todo item
    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press('Enter');

    // Verify input field is empty
    await expect(newTodo).toBeEmpty();
    await checkNumberOfTodosInLocalStorage(page, 1);
  });

  test('should append new items to the bottom of the list', async ({ page }: { page: Page }) => {
    await createDefaultTodos(page);

    // Verify todo list order
    await expect(page.getByTestId('todo-title')).toHaveText(TODO_ITEMS);

    // Verify todo count
    const todoCount = page.getByTestId('todo-count');
    await expect(todoCount).toHaveText('3 items left');
  });
});

test.describe('Mark all as completed', () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    await createDefaultTodos(page);
    await checkNumberOfTodosInLocalStorage(page, 3);
  });

  test('should allow me to mark all items as completed', async ({ page }: { page: Page }) => {
    // Mark all as completed
    await page.getByLabel('Mark all as complete').check();

    // Verify all items are completed
    await expect(page.getByTestId('todo-item')).toHaveClass(['completed', 'completed', 'completed']);
    await checkNumberOfCompletedTodosInLocalStorage(page, 3);
  });

  test('should allow me to clear the complete state of all items', async ({ page }: { page: Page }) => {
    const toggleAll = page.getByLabel('Mark all as complete');

    // Mark and unmark all items
    await toggleAll.check();
    await toggleAll.uncheck();

    // Verify none are completed
    await expect(page.getByTestId('todo-item')).toHaveClass(['', '', '']);
  });
});

test.describe('Persistence', () => {
  test('should persist its data', async ({ page }: { page: Page }) => {
    const newTodo = page.getByPlaceholder('What needs to be done?');

    for (const item of TODO_ITEMS.slice(0, 2)) {
      await newTodo.fill(item);
      await newTodo.press('Enter');
    }

    const todoItems = page.getByTestId('todo-item');
    const firstTodoCheck = todoItems.nth(0).getByRole('checkbox');
    await firstTodoCheck.check();

    // Verify localStorage data before reload
    await checkNumberOfCompletedTodosInLocalStorage(page, 1);

    // Reload page and verify data persists
    await page.reload();
    await expect(todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[1]]);
    await expect(firstTodoCheck).toBeChecked();
  });
});