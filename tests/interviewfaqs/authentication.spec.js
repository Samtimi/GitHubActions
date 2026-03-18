//Q. How do you handle authentication and session storage in Playwright?

// In Playwright, you can handle authentication and session storage using the `page` object. Here are some common approaches:

// 1. **Using Cookies**: You can set cookies to maintain session state across different pages or tests. This is useful for simulating logged-in users.

  const { test, expect } = require('@playwright/test');

  test('should set authentication cookie', async ({ page }) => {
    // Set a cookie to simulate a logged-in user
    await page.context().addCookies([{
      name: 'authToken',
      value: 'your-auth-token',
      domain: 'example.com',        
      path: '/',
      httpOnly: true,
      secure: true,
    }]);

    // Navigate to the page that requires authentication
    await page.goto('https://example.com/dashboard');

    // Verify that the user is logged in
    await expect(page).toHaveURL('https://example.com/dashboard');
  });

// 2. **Using Local Storage**: You can set local storage items to maintain session state.

  test('should set local storage for session', async ({ page }) => {
    // Set a local storage item to simulate a logged-in user
    await page.goto('https://example.com/login');
    await page.evaluate(() => {
      localStorage.setItem('authToken', 'your-auth-token');
    });

    // Navigate to the page that requires authentication
    await page.goto('https://example.com/dashboard');

    // Verify that the user is logged in
    await expect(page).toHaveURL('https://example.com/dashboard');
  });

// 3. **Using Session Storage**: You can set session storage items to maintain session state.

  test('should set session storage for session', async ({ page }) => {
    // Set a session storage item to simulate a logged-in user
    await page.goto('https://example.com/login');
    await page.evaluate(() => {
      sessionStorage.setItem('authToken', 'your-auth-token');
    });

    // Navigate to the page that requires authentication
    await page.goto('https://example.com/dashboard');

    // Verify that the user is logged in
    await expect(page).toHaveURL('https://example.com/dashboard');
  });

// 4. **Using API Requests**: You can also authenticate by sending API requests to log in and then using the returned token for subsequent requests.

  test('should authenticate using API request', async ({ page, request }) => {
    // Send a POST request to the login endpoint
    const response = await request.post('https://api.example.com/login', {
      data: {
        username: 'testuser',
        password: 'password123',
      },
    });

    // Extract the authentication token from the response
    const { authToken } = await response.json();

    // Set the authentication token as a cookie or in local storage
    await page.context().addCookies([{
      name: 'authToken',
      value: authToken,
      domain: 'example.com',        
      path: '/',
      httpOnly: true,
      secure: true,
    }]);

    // Navigate to the page that requires authentication
    await page.goto('https://example.com/dashboard');

    // Verify that the user is logged in
    await expect(page).toHaveURL('https://example.com/dashboard');
  });

// Best practices for handling authentication and session storage in Playwright include:

// 1. **Use Environment Variables**: Store sensitive information like authentication tokens in environment variables to keep them secure and avoid hardcoding them in your tests.

// 2. **Reuse Authentication Logic**: If you have multiple tests that require authentication, consider creating a helper function or a custom fixture to handle the authentication process, making your tests more maintainable.

// 3. **Clean Up After Tests**: Ensure that you clear cookies, local storage, or session storage after each test to prevent state leakage between tests and ensure test isolation.

// 4. **Handle Token Expiration**: If your authentication tokens have an expiration time, make sure to handle token refresh logic in your tests to maintain a valid session.

// 5. **Use API Requests for Authentication**: When possible, use API requests to authenticate and obtain tokens, as this can be faster and more reliable than interacting with the UI for login purposes.  

// By following these best practices, you can effectively handle authentication and session storage in Playwright tests, ensuring that your tests are reliable, maintainable, and secure.                   

//Save nad reuse authentication state
test('should save and reuse authentication state', async ({ page }) => {
    // Authenticate and save the state
    await page.goto('https://example.com/login');
    await page.fill('#username', 'testuser');
    await page.fill('#password', 'password123');
    await page.click('#login-button');

    // Save the authentication state
    await page.context().storageState({ path: 'authState.json' });

    // Reuse the authentication state in subsequent tests
    const context = await browser.newContext({ storageState: 'authState.json' });
    const newPage = await context.newPage();
    await newPage.goto('https://example.com/dashboard');

    // Verify that the user is logged in
    await expect(newPage).toHaveURL('https://example.com/dashboard');
  });

  //playwright.config.js
  module.exports = {
    use: {
      storageState: 'authState.json',
    },
  };

  //run tests with authentication
 // Run tests with the authentication state
 // npx playwright test --config=playwright.config.js

