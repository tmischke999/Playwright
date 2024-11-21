"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
(0, test_1.test)('My first test', async ({ page }) => {
    await page.goto('https://linkedin.com');
    await (0, test_1.expect)(page).toHaveTitle('LinkedIn: Log In or Sign Up'); // Updated for LinkedIn
});
