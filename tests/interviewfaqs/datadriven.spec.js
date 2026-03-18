//Q. How do you implement Data Driven Testing in Playwright and what are the advantages of using it?

//A. Data Driven Testing in Playwright can be implemented using the `test.each` method, which allows you to run the same test with different sets of data. 
// This approach helps to ensure that your tests are comprehensive and can handle various input scenarios.


// Advantages of using Data Driven Testing in Playwright include:

// 1. **Increased Test Coverage**: By running the same test with multiple data sets, you can cover a wider range of scenarios and edge cases.
// 2. **Reduced Code Duplication**: Data Driven Testing allows you to write a single test that can be reused with different inputs, reducing code duplication and improving maintainability.
// 3. **Improved Test Readability**: Using descriptive data sets can make your tests more readable and easier to understand.
// 4. **Easier Maintenance**: When test data changes, you only need to update the data set rather than modifying the test logic, making maintenance easier.

//Here's an example of how to implement Data Driven Testing in Playwright:

const { test, expect } = require('@playwright/test');
//using test.describe with loop to iterate through test data
const testData = [
  { username: 'user1', password: 'pass1', expectedResult: 'Login successful' },
  { username: 'user2', password: 'pass2', expectedResult: 'Invalid credentials' },
  // Add more test data as needed
];

test.describe('Data Driven Testing Example', () => {
  testData.forEach((data) => {
    test(`Login test with username: ${data.username}`, async ({ page }) => {
      await page.goto('https://demo.applitools.com');
      await page.getByPlaceholder('Enter your username').fill(data.username);
      await page.getByPlaceholder('Enter your password').fill(data.password);
      await page.click('text=Sign in');
      //await page.getByRole('button', { name: 'Sign in' }).click();
  
      // Perform login action
    //   await page.fill('#username', data.username);
    //   await page.fill('#password', data.password);
    //   await page.click('#login-button');

      // Assert the expected result
      const result = await page.textContent('#login-result');
      expect(result).toBe(data.expectedResult);
    });
  });
});


//In this example, the same login test is run with different sets of data, ensuring that the test covers various scenarios.

// method2 : using fixtures from external file
import testCases from './testCases.json';

test.describe('Data Driven Testing Example', () => {
  testCases.forEach((data) => {
    test(`Login test with username: ${data.username}`, async ({ page }) => {
      await page.goto('https://demo.applitools.com');
      await page.getByPlaceholder('Enter your username').fill(data.username);
      await page.getByPlaceholder('Enter your password').fill(data.password);
      await page.click('text=Sign in');
  
      // Assert the expected result
      const result = await page.textContent('#login-result');
      expect(result).toBe(data.expectedResult);
    });
  });
});

// method3 : using csv/excel data source
// You can use libraries like `csv-parser` or `xlsx` to read data from CSV or Excel files and then use that data in your tests similarly to the above examples. 
import fs from 'fs';
import csv from 'csv-parser';

const users = [];

fs.createReadStream('testData.csv')
  .pipe(csv())
  .on('data', (row) => {
    users.push(row);
  })
  .on('end', () => {
    test.describe('Data Driven Testing Example', () => {
      users.forEach((data) => {
        test(`Login test with username: ${data.username}`, async ({ page }) => {
          await page.goto('https://demo.applitools.com');
          await page.getByPlaceholder('Enter your username').fill(data.username);
          await page.getByPlaceholder('Enter your password').fill(data.password);
          await page.click('text=Sign in');

          // Assert the expected result
          const result = await page.textContent('#login-result');
          expect(result).toBe(data.expectedResult);
        });
      });
    });
  });

  // method4 : using API data source
   // You can use the `axios` library to fetch data from an API and then use that data in your tests. 

   import axios from 'axios';

test.describe('Data Driven Testing Example', () => {
  let users;

  test.beforeAll(async () => {
    const response = await axios.get('https://api.example.com/users');
    users = response.data;
  });

  users.forEach((data) => {
    test(`Login test with username: ${data.username}`, async ({ page }) => {
      await page.goto('https://demo.applitools.com');
      await page.getByPlaceholder('Enter your username').fill(data.username);
      await page.getByPlaceholder('Enter your password').fill(data.password);
      await page.click('text=Sign in');

      // Assert the expected result
      const result = await page.textContent('#login-result');
      expect(result).toBe(data.expectedResult);
    });
  });
});

