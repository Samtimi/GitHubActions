
//Q) How do you implement custom fixtures in Playwright and what are the benefits of using them?


//A) Custom fixtures in Playwright are reusable pieces of code that can be used to set up and tear down test environments. 
// They are defined using the `test.extend` method and can be used to share common test logic across multiple tests.

//Benefits of using custom fixtures in Playwright include:

//1. **Reusability**: Custom fixtures can be reused across multiple tests, reducing code duplication.
//2. **Maintainability**: By encapsulating common test logic in fixtures, tests become more maintainable and easier to understand.
//3. **Isolation**: Fixtures can be used to isolate test dependencies, making tests more reliable and easier to debug.
//4. **Flexibility**: Custom fixtures can be used to customize test behavior based on specific requirements.

//Here's an example of how to implement a custom fixture in Playwright:

const { test, expect } = require('@playwright/test');

// Define a custom fixture
const myFixture = test.extend({
  // Define a fixture that creates a new page
  page: async ({ browser }, use) => {
    const page = await browser.newPage();
    await use(page);
    await page.close();
  },

  // Define a fixture that logs in a user
  loggedInUser: async ({ page }, use) => {
    await page.goto('https://example.com/login');
    await page.fill('#username', 'testuser');
    await page.fill('#password', 'password123');
    await page.click('#login');
    await use(page);
  },
});

// Use the custom fixture in a test
myFixture('should perform an action as a logged-in user', async ({ loggedInUser }) => {
  const page = loggedInUser;
  // Perform actions as a logged-in user
  await page.goto('https://example.com/dashboard');
  const welcomeMessage = await page.textContent('#welcome-message');
  expect(welcomeMessage).toContain('Welcome, testuser!');
});

//In this example, we defined two custom fixtures: `page`, which creates a new page for each test, and `loggedInUser`, which logs in a user before running the test. We then used the `loggedInUser` fixture in our test to perform actions as a logged-in user. This approach allows us to reuse the login logic across multiple tests and keeps our test code clean and maintainable.     
