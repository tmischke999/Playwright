// pages/TodoPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class TodoPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.goto('https://demo.playwright.dev/todomvc/#/');
  }

  // Input helpers
  async getInputField(): Promise<Locator> {
    const input = this.page.getByPlaceholder('What needs to be done?');
    await expect(input).toBeVisible();
    return input;
  }

  async addTodo(text: string): Promise<void> {
    const input = await this.getInputField();
    await input.fill(text);
    await input.press('Enter');
  }

  async setupDefaultTodos(): Promise<void> {
    await this.addTodo('water the plants');
    await this.addTodo('feed the dog');
    await this.addTodo('sweep the floor');
  }

  // Element selectors
  getPlaceholderInput(): Locator {
    return this.page.getByPlaceholder('What needs to be done?');
  }

  getHeader(): Locator {
    return this.page.getByRole('heading', { name: 'todos' });
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  getTodoItem(text: string): Locator {
    return this.page.locator('li', { hasText: text });
  }

  getToggleAll(): Locator {
    return this.page.locator('#toggle-all');
  }

  getAllToggles(): Locator {
    return this.page.getByRole('checkbox', { name: 'Toggle Todo' });
  }

  getToggleFor(text: string): Locator {
    return this.getTodoItem(text).locator('.toggle');
  }

  getDeleteButtonFor(text: string): Locator {
    return this.getTodoItem(text).locator('button[aria-label="Delete"]');
  }

  getFilter(name: string): Locator {
    return this.page.getByRole('link', { name });
  }

  // Actions
  async toggleTodo(text: string): Promise<void> {
    await this.getToggleFor(text).check();
  }

  async deleteTodo(text: string): Promise<void> {
    await this.getTodoItem(text).hover();
    await this.getDeleteButtonFor(text).click();
  }
}
