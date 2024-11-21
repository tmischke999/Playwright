import { test, expect } from './fixtures'; // Import the custom fixture

// Test: Navigate to the Codegen Demo Application and validate title
test.describe('Codegen Demo with Custom Fixtures', () => {
  test('should have title', async ({ todoPage }) => {
    await expect(todoPage).toHaveTitle('React • TodoMVC'); // Assert: Correct page title
  });
});

// Validate Header text exists
// Assert: Header text matches "Todos"

// Validate input text field exists
// Assert: Placeholder text is "What needs to be done?"

// Test: Add a new todo item "water the plants"
// Assert: Todo item "water the plants" appears in the list

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
