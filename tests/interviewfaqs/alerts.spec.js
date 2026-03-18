//Q. How do you handle alerts, dailog boxes, and pop-ups in Playwright?

//Ans. Playwright provides methods to handle alerts, dialog boxes, and pop-ups using the page.on('dialog') event listener.

//Here's an example of how to handle an alert dialog:

import { expect } from 'allure-playwright';
import test from 'node:test';
import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Listen for the dialog event
  page.on('dialog', async dialog => {
    console.log(dialog.message()); // Get the message from the dialog
    await dialog.accept(); // Accept the dialog (click OK)
    // await dialog.dismiss(); // Dismiss the dialog (click Cancel)
  });

  // Navigate to a page that triggers an alert
  await page.goto('https://example.com');

  // Perform actions that trigger the alert
  await page.click('#alert-button');

  await browser.close();
})();

//In this example, we set up an event listener for the 'dialog' event. When a dialog appears, we log its message and then accept it. You can also choose to dismiss the dialog if needed. This approach allows you to handle alerts, dialog boxes, and pop-ups effectively in your Playwright tests.
    //  await dialog.accept('text'); // Accept the dialog with a text input (for prompt dialogs)            
    //  await dialog.dismiss(); // Dismiss the dialog (click Cancel)
    //  await dialog.accept(); // Accept the dialog (click OK)
    //  await dialog.dismiss(); // Dismiss the dialog (click Cancel)
    //  await dialog.accept('text'); // Accept the dialog with a text input (for prompt dialogs)
    //  await dialog.dismiss(); // Dismiss the dialog (click Cancel)
    //  await dialog.accept(); // Accept the dialog (click OK)  
    //  await dialog.dismiss(); // Dismiss the dialog (click Cancel)

    //Alert
    // await dialog.accept(); // Accept the alert (click OK)
    test('Handle Alert Dialog', async () => {
      const browser = await chromium.launch();
      const page = await browser.newPage();

         // Listen for the dialog event
        page.on('dialog', async dialog => { 
            console.log(dialog.message()); // Get the message from the dialog
            await dialog.accept(); // Accept the dialog (click OK)
        });

        // Navigate to a page that triggers an alert
        await page.goto('https://example.com');

        // Perform actions that trigger the alert
        await page.click('#alert-button');
        
        //Confirm dialog
        page.on('dialog',async dialog => {
            expect(dialog.type()).toBe('confirm'); // Check if the dialog is a confirm dialog
            console.log(dialog.message()); // Get the message from the dialog
            await dialog.dismiss(); // Dismiss the confirm dialog (click Cancel)
            //or
            await dialog.accept(); // Accept the confirm dialog (click OK)
        })

        // Prompt dialog
        page.on('dialog', async dialog => {
            expect(dialog.type()).toBe('prompt'); // Check if the dialog is a prompt dialog
            console.log(dialog.message()); // Get the message from the dialog
            await dialog.accept('Sample input'); // Accept the prompt dialog with input text
            //or
            await dialog.dismiss(); // Dismiss the prompt dialog (click Cancel)
        });
     // New window/tab popup
        page.on('popup', async popup => {   
            console.log('Popup URL:', popup.url()); // Log the URL of the popup
            await popup.waitForLoadState(); // Wait for the popup to load
            // Perform actions on the popup page
            await popup.click('#popup-button'); // Example action on the popup
        });

        // Navigate to a page that triggers a popup
        await page.goto('https://example.com');
        await page.click('#popup-trigger'); // Click an element that triggers the popup 
                
     
        await browser.close();
    }

      // Listen for the dialog event
