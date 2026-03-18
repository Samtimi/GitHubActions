//How do you handle API testing in Playwright and what are the best practices for it?

//import test = require("node:test")

// In Playwright, you can handle API testing using the `request` object, which allows you to send HTTP requests and validate responses. Here are some best practices for API testing in Playwright:

// 1. **Use the `request` object**: Playwright provides a `request` object that you can use to send HTTP requests. You can use methods like `get`, `post`, `put`, `delete`, etc., to interact with your API endpoints.

//    ```javascript
//    const response = await page.request.get('https://api.example.com/data');
//    ```

// 2. **Validate responses**: After sending a request, you should validate the response status code, headers, and body to ensure that the API is functioning as expected.

//    ```javascript
//    expect(response.status()).toBe(200);
//    const responseBody = await response.json();
//    expect(responseBody).toHaveProperty('data');
//    ```          

// 3. **Use fixtures and helpers**: Create fixtures and helper functions to reuse common API testing logic. This can help you keep your tests clean and maintainable.

//    ```javascript
//    // apiHelper.js
//    export async function getData(page) {
//      const response = await page.request.get('https://api.example.com/data');
//      return response.json();
//    }

//    // test.spec.js
//    const data = await getData(page);
//    ```

// 4. **Test different scenarios**: Test different scenarios like success, error, and edge cases to ensure that your API is robust and handles all types of requests correctly.

//    ```javascript
//    // Test success scenario
//    const successResponse = await page.request.get('https://api.example.com/data');
//    expect(successResponse.status()).toBe(200);

//    // Test error scenario
//    const errorResponse = await page.request.get('https://api.example.com/invalid-endpoint');
//    expect(errorResponse.status()).toBe(404);
//    ```

// 5. **Mock API responses**: Use Playwright's mocking capabilities to mock API responses and test your application's behavior under different conditions.

//    ```javascript
//    await page.route('https://api.example.com/data', route => {
//      route.fulfill({
//        status: 200,
//        contentType: 'application/json',
//        body: JSON.stringify({ data: 'mocked data' }),
//      });
//    });
//    ```

// 6. **Use environment variables**: Store API endpoints and other configuration in environment variables to make your tests more flexible and reusable.

//    ```javascript
//    const API_BASE_URL = process.env.API_BASE_URL || 'https://api.example.com';
//    ```

// 7. **Run tests in parallel**: Playwright supports running tests in parallel, which can help you save time when testing multiple API endpoints.

//    ```javascript
//    // playwright.config.js
//    module.exports = {
//      workers: 4, // Run tests in parallel with 4 workers
//    };
//    ```

//By following these best practices, you can ensure that your API tests are reliable, maintainable, and effective in catching issues in your application. Playwright provides powerful tools for API testing, and by leveraging them effectively, you can enhance the quality of your tests and the overall robustness of your application.       

const {test, expect} = require('@playwright/test');

test('API testing example', async ({ page, request}) => {
  // Send a GET request to the API endpoint
  const response = await page.request.get('https://api.example.com/data');
  
  // Validate the response status code
  expect(response.status()).toBe(200);
  
  // Validate the response body
  const responseBody = await response.json();
  expect(responseBody).toHaveProperty('data');

  //GET request
    const getResponse = await page.request.get('https://api.example.com/users');
    expect(getResponse.status()).toBe(200);
    const users = await getResponse.json();
    expect(users).toBeInstanceOf(Array);

  //POST request
    const postResponse = await page.request.post('https://api.example.com/users', {
      data: { name: 'John Doe', email: 'john.doe@example.com' },
      headers: {
        'Content-Type': 'application/json',
      },    
    });
    expect(postResponse.status()).toBe(201); 
    const newUser = await postResponse.json();
    expect(newUser).toHaveProperty('id');
    expect(newUser.name).toBe('John Doe');
    expect(newUser.email).toBe('john.doe@example.com');

  //PUT request
    const putResponse = await page.request.put(`https://api.example.com/users/${newUser.id}`, {
      data: { name: 'Jane Doe', email: 'jane.doe@example.com' },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    expect(putResponse.status()).toBe(200);
    const updatedUser = await putResponse.json();
    expect(updatedUser.name).toBe('Jane Doe');
    expect(updatedUser.email).toBe('jane.doe@example.com');

  //DELETE request
    const deleteResponse = await page.request.delete(`https://api.example.com/users/${newUser.id}`);
    expect(deleteResponse.status()).toBe(204);

  //Error handling
    const errorResponse = await page.request.get('https://api.example.com/nonexistent');
    expect(errorResponse.status()).toBe(404);

  //Mock API responses
    await page.route('https://api.example.com/data', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: 'mocked data' }),
      });
    });
    const mockedResponse = await page.request.get('https://api.example.com/data');
    const mockedData = await mockedResponse.json();
    expect(mockedData.data).toBe('mocked data');



});