// pages/TodoPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class TodoPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://demo.playwright.dev/todomvc/#/');
  }

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

  getTodoItem(text: string): Locator {
    return this.page.locator('.view >> text=' + text);
  }

  getToggleFor(text: string): Locator {
    return this.getTodoItem(text).locator('.toggle');
  }

  getDeleteButtonFor(text: string): Locator {
    return this.getTodoItem(text).locator('.destroy');
  }

  async toggleTodo(text: string): Promise<void> {
    await this.getToggleFor(text).check();
  }

  async deleteTodo(text: string): Promise<void> {
    await this.getTodoItem(text).hover();
    await this.getDeleteButtonFor(text).click();
  }
}
