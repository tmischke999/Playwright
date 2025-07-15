import { test, expect } from '../../../fixtures';

test.describe('Codegen Demo with Custom Fixtures', () => {
  // Basic UI checks
  test('should have title', async ({ todoPage }) => {
    const title = await todoPage.getTitle();
    expect(title).toBe('React • TodoMVC');
  });

  test('should have header', async ({ todoPage }) => {
    const header = todoPage.getHeader();
    await expect(header).toBeVisible();
    await expect(header).toHaveText('todos');
  });

  test('should have input field with correct placeholder', async ({ todoPage }) => {
    const inputField = todoPage.getPlaceholderInput();
    await expect(inputField).toBeVisible();
    await expect(inputField).toHaveAttribute('placeholder', 'What needs to be done?');
  });

  test('can type input and hit enter', async ({ todoPage }) => {
    const input = await todoPage.getInputField();
    await input.fill('water the plant');
    await input.press('Enter');
  });

  // Toggle tests
  test('toggle all icon exists and individual toggles render', async ({ todoPage }) => {
    await todoPage.setupDefaultTodos();
    const toggleAll = todoPage.getToggleAll();
    await expect(toggleAll).toBeVisible();

    const toggles = todoPage.getAllToggles();
    await expect(toggles).toHaveCount(3);
  });

  test('toggle all checks all todos', async ({ todoPage }) => {
    await todoPage.setupDefaultTodos();
    const toggleAll = todoPage.getToggleAll();
    await toggleAll.check();

    const toggles = todoPage.getAllToggles();
    for (let i = 0; i < await toggles.count(); i++) {
      await expect(toggles.nth(i)).toBeChecked();
    }
  });

  // Delete tests
  test('delete icon exists for each todo item', async ({ todoPage }) => {
    await todoPage.setupDefaultTodos();
    const todos = ['water the plants', 'feed the dog', 'sweep the floor'];

    for (const item of todos) {
      await todoPage.getTodoItem(item).hover();
      const deleteButton = todoPage.getDeleteButtonFor(item);
      await expect(deleteButton).toBeVisible();
    }
  });

  test('delete icon removes selected todo', async ({ todoPage }) => {
    await todoPage.setupDefaultTodos();
    await todoPage.getTodoItem('feed the dog').hover();
    const deleteButton = todoPage.getDeleteButtonFor('feed the dog');
    await deleteButton.click();
    await expect(todoPage.getTodoItem('feed the dog')).toHaveCount(0);
  });

  // Filter and state tests
  test('filters All, Active, Completed exist', async ({ todoPage }) => {
    await todoPage.setupDefaultTodos();
    const filters = ['All', 'Active', 'Completed'];
    for (const name of filters) {
      const filter = todoPage.getFilter(name);
      await expect(filter).toBeVisible();
    }
  });

  test('default filter is All', async ({ todoPage }) => {
    await todoPage.setupDefaultTodos();
    const allFilter = todoPage.page.locator('ul.filters >> a', { hasText: 'All' });
    await expect(allFilter).toHaveClass(/selected/);
  });

  // Todo counter tests
  test('todo count updates correctly after each added item', async ({ todoPage }) => {
    const count = todoPage.page.getByTestId('todo-count');

    await todoPage.addTodo('water the plants');
    await expect(count).toHaveText('1 item left');

    await todoPage.addTodo('feed the dog');
    await expect(count).toHaveText('2 items left');

    await todoPage.addTodo('sweep the floor');
    await expect(count).toHaveText('3 items left');
  });

  // Filter logic tests
  test('completed filter shows only completed item', async ({ todoPage }) => {
    await todoPage.setupDefaultTodos();
    await todoPage.toggleTodo('water the plants');
    await todoPage.getFilter('Completed').click();

    await expect(todoPage.getTodoItem('water the plants')).toBeVisible();
    await expect(todoPage.getTodoItem('feed the dog')).toHaveCount(0);
  });

  test('active filter hides completed item', async ({ todoPage }) => {
    await todoPage.setupDefaultTodos();
    await todoPage.toggleTodo('water the plants');
    await todoPage.getFilter('Active').click();

    await expect(todoPage.getTodoItem('feed the dog')).toBeVisible();
    await expect(todoPage.getTodoItem('water the plants')).toHaveCount(0);
  });

  test('clear completed removes completed item', async ({ todoPage }) => {
    await todoPage.setupDefaultTodos();
    await todoPage.toggleTodo('water the plants');

    const clearCompleted = todoPage.page.getByRole('button', { name: 'Clear completed' });
    await expect(clearCompleted).toBeVisible();
    await clearCompleted.click();

    await expect(todoPage.getTodoItem('water the plants')).toHaveCount(0);
    await expect(todoPage.getTodoItem('feed the dog')).toBeVisible();
  });
});
