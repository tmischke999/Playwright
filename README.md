## 📘 Playwright Repository

### 📁 Folder Structure
- `pages/`  
  Contains page object files.  
  ▸ `TodoPage.ts`: Encapsulates reusable locators and actions for the TodoMVC page.

- `tests/`  
  Contains all test suites.
  - `tests example/`: Sample tests for learning or scaffolding.
  - `tests_ms_playwright/microsoft-playwright-module/`:  
    Tests created for the Microsoft Playwright training module.  
    ▸ `codegen-test-customfixtures.spec.ts`: Custom fixture-based test suite for TodoMVC.

- `fixtures.ts`  
  Custom Playwright test fixture for injecting the `TodoPage` into test contexts.

- `playwright.config.ts`  
  Playwright configuration file for defining timeouts, test directories, and reporter options.

- `README.md`  
  Repository documentation (this file).

- `tsconfig.json`  
  TypeScript configuration.

- `.github/`, `dist/`, `node_modules/`, `test-results/`, `playwright-report/`  
  Output, dependency, and configuration directories generated or used during test runs.

---

### ▶️ How to Run All Tests

````bash
npx playwright test

### ▶️ How to Run Specific Test Folders

````bash
npx playwright test tests/tests_example/

npx playwright test tests/tests_ms_playwright/microsoft-playwright-module/

