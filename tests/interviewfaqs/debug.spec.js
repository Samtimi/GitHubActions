//Q. How do you debug playwright tests and what tools do you use for debugging?

// In Playwright, you can debug tests using several tools and techniques:

// 1. **Playwright Inspector**: You can use the Playwright Inspector to step through your tests interactively. To enable it, set the `PWDEBUG` environment variable to `1` before running your tests. This will open a browser window where you can inspect elements, view console logs, and step through your test code.

// 2. **Console Logs**: You can add `console.log()` statements in your test code to output values and debug information. This is a simple way to understand the flow of your tests and identify issues.

// 3. **Browser Developer Tools**: When running tests in headed mode (with a visible browser), you can use the browser's developer tools to inspect elements, view network requests, and debug JavaScript code.

// 4. **Playwright Trace Viewer**: Playwright provides a trace viewer that allows you to record and analyze test runs. You can generate a trace file by running your tests with the `--trace` option, and then open the trace file in the Playwright Trace Viewer to see a detailed timeline of your test execution, including screenshots, network requests, and console logs.

// 5. **Debugging with Breakpoints**: You can set breakpoints in your test code using your IDE's debugging tools. This allows you to pause test execution at specific points and inspect variables and the call stack.

// 6. **Using `debugger` Statement**: You can insert the `debugger` statement in your test code to trigger a breakpoint when running in debug mode. This will allow you to inspect the state of your application at that point in time.

// By using these tools and techniques, you can effectively debug your Playwright tests and identify issues in your test code or application under test.    


// Example of using Playwright Inspector:
// ```bash
// PWDEBUG=1 npx playwright test
// ```

// Example of using console logs in a test:

const { test, expect } = require('@playwright/test');

   test('example test', async ({ page }) => {
   await page.goto('https://example.com');
   console.log('Page title:', await page.title());
  // Rest of the test code
 });

 //Debug mode with inspector
 // npx playwright test --debug

 //Debug mode with trace viewer
 // npx playwright test --trace on

 //Debug mode with headed mode
 // npx playwright test --headed


 //Debug mode with browser developer tools
 // npx playwright test --debug --headed
 //Then open the browser developer tools and set breakpoints in the test code.
 //You can also use the console to inspect variables and the call stack.
 //You can also use the network tab to inspect network requests and responses.
 //You can also use the elements tab to inspect the DOM and styles.
 //You can also use the sources tab to inspect the JavaScript code and set breakpoints.
    //Debug mode with `debugger` statement
    // npx playwright test --debug --headed
    //Then open the browser developer tools and set breakpoints in the test code.
    //You can also use the console to inspect variables and the call stack.
//Pause execution
test('example test', async ({ page }) => {
  await page.goto('https://example.com');
  debugger; // This will pause execution and allow you to inspect the state of the page
  //another way to pause is
  await page.pause(); // This will open the Playwright Inspector and pause execution
  // Rest of the test code
});

// Slow motion
test.use({ 
    launchOptions: { slowMo: 1000 } 
}); // This will slow down the execution of the tests by 1 second, allowing you to see what's happening in the browser more clearly.


//Trace viewer
// npx playwright show-trace trace.zip
