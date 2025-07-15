## 📘 Playwright Repository

This project contains automated end-to-end tests for the TodoMVC app using Playwright, custom fixtures, and the Page Object Model.

### 📁 Key Folders

- `pages/`: Page object models  
  ▸ `TodoPage.ts`: Encapsulates locators and actions for the TodoMVC interface

- `tests/`: Test suites  
  - `tests_example/`: Sample Playwright tests  
  - `tests_ms_playwright/microsoft-playwright-module/`: Microsoft module tests  
    ▸ `codegen-test-customfixtures.spec.ts`: All TodoMVC tests are written here

- `fixtures.ts`: Shared fixture setup that injects `TodoPage` into test context  
- `playwright.config.ts`: Playwright configuration  
- `README.md`: This file  

---

````markdown
### ▶️ How to Run All Tests

```bash
npx playwright test
````

### ▶️ How to Run Specific Test Folders

```bash
npx playwright test tests/tests_example/
```

```bash
npx playwright test tests/tests_ms_playwright/microsoft-playwright-module/
```
