import { test, expect } from '../../../fixtures'; // Import the custom fixture
import { TodoPage } from '../../../pages/TodoPage';

// Test suite: Codegen Demo with Custom Fixtures
test.describe('Codegen Demo with Custom Fixtures', () => {

// Test: Validate page title
test('should have title', async ({ todoPage }) => {
  const title = await todoPage.getTitle();
  expect(title).toBe('React • TodoMVC') // Assert: Correct page title
});

// Test: Validate Header text exists and matches "Todos"
test('should have header', async ({ todoPage }) => {
  const header = todoPage.getHeader(); // Get header element
  await expect(header).toBeVisible(); // Validate: Header is visible
  await expect(header).toHaveText('todos'); // Assert: Header text matches "Todos"
  });

// Validate input text field exists
// Assert: Placeholder text is "What needs to be done?"
test('should have input field with correct placeholder', async ({ todoPage }) => {
  const inputField = todoPage.getPlaceholderInput(); // Get input field
  await expect(inputField).toBeVisible(); // Validate: Input field is visible
  await expect(inputField).toHaveAttribute('placeholder', 'What needs to be done?'); // Assert: Placeholder text matches
  });

// Test: Add a new todo item "water the plants"
// Assert: Todo item "water the plants" appears in the list
test('can type input and hit enter', async({ todoPage }) => {
   const input = await todoPage.getInputField(); // Get input field    
   await input.fill('water the plant'); 
   await input.press('Enter'); 
});

// Stage todos
// Validate toggle all icon exists
test('toggle all exists', async({ todoPage }) => {
   const input = await todoPage.getInputField(); // Get input field    
   await todoPage.stageTodoList(['water the plants', 'feed the dog', 'sweep the floor']) 
   const toggleAll = todoPage.getToggleAll(); 
   await expect(toggleAll).toBeVisible(); 
});

//Stage todos
// Validate toggle all functions
test('toggle all icon exists and individual toggles render', async ({ todoPage }) => {
  await todoPage.setupDefaultTodos();
  const toggleAll = todoPage.getToggleAll();
  await expect(toggleAll).toBeVisible(); // Check toggle-all input exists

  const toggles = todoPage.getAllToggles();
  await expect(toggles).toHaveCount(3); // Check all items have toggle inputs
});

//Stage todos
// Validate all toggles are checked
test('toggle all checks all todos', async ({ todoPage }) => {
  await todoPage.setupDefaultTodos();
  const toggleAll = todoPage.getToggleAll();
  await toggleAll.check();

  const toggles = todoPage.getAllToggles();
  for (let i = 0; i < await toggles.count(); i++) {
    await expect(toggles.nth(i)).toBeChecked();
  }
});

//Stage todos
// Validate delete icon exists
test('delete icon exists for each todo item', async ({ todoPage }) => {
  await todoPage.setupDefaultTodos();
  const todos = ['water the plants', 'feed the dog', 'sweep the floor'];

  for (const item of todos) {
    await todoPage.getTodoItem(item).hover();
    const deleteButton = todoPage.getDeleteButtonFor(item);
    await expect(deleteButton).toBeVisible();
  }
});

//Stage todos
// Validate delete functions
test('delete icon removes selected todo', async ({ todoPage }) => {
  await todoPage.setupDefaultTodos();

  await todoPage.getTodoItem('feed the dog').hover();
  const deleteButton = todoPage.getDeleteButtonFor('feed the dog');
  await deleteButton.click();

  const removedItem = todoPage.getTodoItem('feed the dog');
  await expect(removedItem).toHaveCount(0);
});

//stage todos
// Validate All, Active, and Completed filters exist
test('filters All, Active, Completed exist', async ({ todoPage }) => {
  await todoPage.setupDefaultTodos();
  const filters = ['All', 'Active', 'Completed'];

  for (const name of filters) {
    const filter = todoPage.getFilter(name);
    await expect(filter).toBeVisible();
  }
});

// Test: Default filter is "All"
test('default filter is All', async ({ todoPage }) => {
  await todoPage.setupDefaultTodos();

  const allFilter = todoPage.page.locator('ul.filters >> a', { hasText: 'All' });
  await expect(allFilter).toHaveClass(/selected/);
});

// Assert: Todo count updates correctly after adding each item
test('todo count updates correctly after each added item', async ({ todoPage }) => {
  const count = todoPage.page.getByTestId('todo-count');

  await todoPage.addTodo('water the plants');
  await expect(count).toHaveText('1 item left');

  await todoPage.addTodo('feed the dog');
  await expect(count).toHaveText('2 items left');

  await todoPage.addTodo('sweep the floor');
  await expect(count).toHaveText('3 items left');
});

// Toggle "water the plants" as done
// Test: Select the "Completed" filter
// Assert: "water the plants" moves to Completed section
test('completed filter shows only completed item', async ({ todoPage }) => {
  await todoPage.setupDefaultTodos();
  await todoPage.toggleTodo('water the plants');

  await todoPage.page.getByRole('link', { name: 'Completed' }).click();

  await expect(todoPage.getTodoItem('water the plants')).toBeVisible();
  await expect(todoPage.getTodoItem('feed the dog')).toHaveCount(0);
});

// Toggle "water the plants" as done
// Test: Select the "Active" filter
// Assert: "feed the dog" is displayed
test('active filter hides completed item', async ({ todoPage }) => {
  await todoPage.setupDefaultTodos();
  await todoPage.toggleTodo('water the plants');

  await todoPage.page.getByRole('link', { name: 'Active' }).click();

  await expect(todoPage.getTodoItem('feed the dog')).toBeVisible();
  await expect(todoPage.getTodoItem('water the plants')).toHaveCount(0);
});

// Toggle "water the plants" as done
// Test: Select "Clear Completed" button
// Assert: "water the plants" is removed from the list
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






