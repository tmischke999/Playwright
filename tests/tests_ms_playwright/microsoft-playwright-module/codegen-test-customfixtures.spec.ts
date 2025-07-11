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
test('toggle all functions', async({ todoPage }) => {
  await todoPage.setupDefaultTodos();
  const toggleAll = todoPage.getToggleAll(); 
  await toggleAll.check();
  const toggles = todoPage.getAllToggles();
  await expect(toggles).toHaveCount(3); //Check that 3 toggles are present

  for (let i = 0; i < await toggles.count(); i++) {
  await expect(toggles.nth(i)).toBeChecked();}
});

});









// Validate toggle all icon exists
// Validate delete icon exists

// Assert: Todo count updates correctly after adding items

// Validate All, Active, and Completed filters exist
// Assert: Default filter is "All"

// Test: Add another todo item "feed the dog"
// Assert: Both "water the plants" and "feed the dog" are visible under "All"

// Test: Select the "Active" filter
// Assert: Only "feed the dog" is displayed

// Test: Toggle "water the plants" as done
// Assert: "water the plants" moves to Completed section

// Validate "Clear Completed" button exists
// Test: Select "Clear Completed" button
// Assert: "water the plants" is removed from the list

// Test: Select the "Completed" filter
// Assert: Only completed items (e.g., "water the plants") are displayed

// Test: Select the "All" filter
// Assert: Remaining items appear (e.g., "feed the dog")
