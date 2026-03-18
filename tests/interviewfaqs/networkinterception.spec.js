//Q. How do you handle network interception and mocking in playwright?

// In Playwright, you can handle network interception and mocking using the `page.route()` method. This allows you to intercept network requests and modify their responses or block them entirely. Here's how you can do it:

// ### Example: Mocking a Network Request

  const { chromium } = require('playwright');

  (async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Mock a network request
  await page.route('**/api/data', route => {
     route.fulfill({
       status: 200,
       contentType: 'application/json',
       body: JSON.stringify({ mockedData: 'This is a mocked response' }),
     });
   });

  // Navigate to the page that makes the request
  await page.goto('https://example.com');

 // Verify the mocked response
  const response = await page.waitForResponse('**/api/data');
  const responseBody = await response.json();
  console.log(responseBody); // Output: { mockedData: 'This is a mocked response' }

  await browser.close();
  })();


// ### Example: Blocking a Network Request
    const { chromium } = require('playwright'); 
    (async () => {
      const browser = await chromium.launch();
      const page = await browser.newPage();

      // Block a network request
      await page.route('**/api/ads', route => route.abort());

      // Navigate to the page that makes the request
      await page.goto('https://example.com');

      // Verify that the request was blocked
      const response = await page.waitForResponse('**/api/ads');
      console.log(response.status()); // Output: 0 (indicates the request was blocked)

      await browser.close();
    })();

// In this example, we first mock a network request to `**/api/data` by fulfilling it with a custom response. Then, we block a network request to `**/api/ads` by aborting it. You can use these techniques to control the behavior of network requests in your tests, allowing you to test different scenarios and edge cases effectively. 
