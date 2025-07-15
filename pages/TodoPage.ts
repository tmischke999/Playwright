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

  async stageTodoList(items: string[]): Promise<void> {
    for (const item of items) {
        await this.addTodo(item);
    }
  }

  async setupDefaultTodos(): Promise<void> {
    await this.stageTodoList([
    'water the plants',
    'feed the dog',
    'sweep the floor'
    ]);
  }

  getFilter(name: string): Locator {
  return this.page.getByRole('link', { name });
}

  getToggleAll(): Locator {
    return this.page.locator('#toggle-all');
  }

  getAllToggles(): Locator {
    return this.page.getByRole('checkbox', { name: 'Toggle Todo'});
  }


  getTodoItem(text: string): Locator {
    return this.page.locator('.view >> text=' + text);
  }

  getToggleFor(text: string): Locator {
    return this.getTodoItem(text).locator('.toggle');
  }

  getDeleteButtonFor(text: string): Locator {
  return this.getTodoItem(text).locator('button[aria-label="Delete"]');
}

  async toggleTodo(text: string): Promise<void> {
    await this.getToggleFor(text).check();
  }

  getHeader(): Locator {
    return this.page.getByRole('heading', {name:'todos'});
  }

  async getTitle(): Promise<string> {
    return this.page.title();
}

  getPlaceholderInput(): Locator {
    return this.page.getByPlaceholder('What needs to be done?');
  }



  async deleteTodo(text: string): Promise<void> {
    await this.getTodoItem(text).hover();
    await this.getDeleteButtonFor(text).click();
  }

}
