//Q. What is difference between soft assertion and hard assertion in Playwright?
// A. In Playwright, soft assertions and hard assertions are two different approaches to handling test assertions during test execution.
// Soft assertions allow the test to continue running even if an assertion fails, collecting all assertion errors and reporting them at the end of the test. This is useful for identifying multiple issues in a single test run.
// Hard assertions, on the other hand, stop the test execution immediately when an assertion fails, making it clear that the test has failed at that point. This can be useful for critical checks where subsequent actions depend on the success of earlier assertions.
// The choice between soft and hard assertions depends on the testing scenario and the desired behavior of the test suite. Soft assertions are often used in exploratory testing or when multiple checks are needed, while hard assertions are preferred for critical validations where immediate failure is required.
// Example of soft assertion in Playwright:
  /**   const { test, expect } = require('@playwright/test'); 

    test('soft assertion example', async ({ page }) => {
    await page.goto('https://example.com');
    
    // Soft assertion: the test continues even if this fails
    try {
        await expect(page).toHaveTitle('Non-existent Title');
    } catch (error) {
        console.error('Soft assertion failed:', error);
    }
    
    // The test continues to run other actions
    await page.click('button#submit');
    
    // Hard assertion: the test will stop if this fails
    await expect(page).toHaveURL('https://example.com/expected-url');
});   */


// In this example, the first assertion is a soft assertion that allows the test to continue even if it fails, while the second assertion is a hard assertion that will stop the test if it fails. This demonstrates how both types of assertions can be used effectively in Playwright tests.
// Soft assertions are useful for gathering multiple failures in a single test run, while hard assertions ensure that critical checks are met before proceeding with further actions in the test.
// This approach helps in identifying issues without prematurely terminating the test execution, allowing for a more comprehensive analysis of the test results.
// Soft assertions are particularly useful in scenarios where you want to gather as much information as possible about the state of the application under test, while hard assertions are more suitable for critical validations where immediate feedback is necessary.
// By using both types of assertions strategically, you can create robust and informative test suites that provide valuable insights into the behavior of your application during testing.    

const { test, expect } = require('@playwright/test'); 

test('assertion exampleas', async({page}) => {
    // Navigate to the login page
    await page.goto('https://demoblaze.com/');

    // Click on the 'Log in' link
    await page.getByRole('link', { name: 'Log in' }).click();

    // Fill in the username and password fields
    const Username = await page.fill('#loginusername', 'pavanol');
    await expect(page.locator('#loginusername')).toBeEditable();
    console.log('Username field is editable: ' + await page.$eval('#loginusername', el => el.value));
    const Password = await page.fill('#loginpassword', 'test@123');

    // Click the 'Log in' button
    await page.click('button[onclick=\'logIn()\']');

    // Wait for the login to complete and check if the user is logged in by checking for a logout link
    const loginSuccess = await page.locator('#logout2');


});

