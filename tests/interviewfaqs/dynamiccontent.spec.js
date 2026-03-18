//Q. How do you handle dynamic content and shadow DOM in Playwright?

// In Playwright, you can handle dynamic content and shadow DOM using the `page` object. Here are some techniques to manage these scenarios:

// 1. **Waiting for Dynamic Content**: You can use `page.waitForSelector()` to wait for specific elements to appear in the DOM before interacting with them.

  const { test, expect } = require('@playwright/test');

  test('should wait for dynamic content', async ({ page }) => {
    await page.goto('https://example.com');
    
    // Wait for a specific element to be visible
    await page.waitForSelector('#dynamic-content', { state: 'visible' });
    
    // Interact with the dynamic content
    await page.click('#dynamic-content');
  });

// 2. **Handling Shadow DOM**: Playwright provides support for interacting with elements inside the shadow DOM using the `page.locator()` method.

  test('should interact with shadow DOM', async ({ page }) => {
    await page.goto('https://example.com');
    
    // Locate an element inside the shadow DOM
    const shadowElement = page.locator('my-component >>> #shadow-element');
    
    // Interact with the shadow element
    await shadowElement.click();
  });

// In this example, we first wait for the dynamic content to appear using `page.waitForSelector()`. Then, we interact with the dynamic content by clicking on it. For the shadow DOM example, we use `page.locator()` to locate an element inside the shadow DOM and interact with it. These techniques allow you to handle dynamic content and shadow DOM effectively in your Playwright tests.    


