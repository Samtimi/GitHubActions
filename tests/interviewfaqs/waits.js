//Q. What are the different types of waits available in Playwright and how do you use them effectively in your tests?

// In Playwright, there are several types of waits that you can use to ensure that your tests are stable and reliable. Here are the different types of waits available in Playwright and how to use them effectively:

// 1. **Explicit Waits**: Explicit waits allow you to wait for a specific condition to be met before proceeding with the next step in your test. You can use methods like `waitForSelector`, `waitForFunction`, and `waitForResponse` to implement explicit waits.

  // Wait for an element to be visible
     await page.waitForSelector('#my-element', { state: 'visible' });

    // Wait for a specific function to return true
        await page.waitForFunction(() => {  
            return document.querySelector('#my-element') !== null;  
        });

    // Wait for a specific network response
        await page.waitForResponse('https://api.example.com/data');

// 2. **Implicit Waits**: Playwright does not have built-in support for implicit waits like some other testing frameworks. However, you can achieve similar functionality by using a combination of explicit waits and retry logic in your tests.

// 3. **Fluent Waits**: Fluent waits allow you to specify a maximum wait time and a polling interval to check for a condition. You can implement fluent waits using a loop and the `waitForFunction` method.

    const maxWaitTime = 5000; // Maximum wait time in milliseconds
    const pollingInterval = 500; // Polling interval in milliseconds
    const startTime = Date.now();

    while (Date.now() - startTime < maxWaitTime) {
        const conditionMet = await page.evaluate(() => {
            return document.querySelector('#my-element') !== null;
        });

        if (conditionMet) {
            break; // Condition met, exit the loop
        }

        await page.waitForTimeout(pollingInterval); // Wait for the polling interval before checking again
    }

// 4. **Auto-Waiting**: Playwright has built-in auto-waiting capabilities that automatically wait for elements to be ready before performing actions on them. For example, when you use `page.click()`, Playwright will automatically wait for the element to be visible and enabled before clicking it.

// To use waits effectively in your tests, it's important to choose the right type of wait based on the specific scenario you're testing. Explicit waits are useful when you need to wait for a specific condition, while fluent waits can be helpful when you want to implement custom polling logic. Auto-waiting is convenient for most interactions, but you may need to use explicit waits in certain cases where auto-waiting may not be sufficient. Always aim to make your tests as reliable and efficient as possible by using the appropriate waits for your test scenarios.          
 // Wait for an element to be visible
        await page.waitForSelector('#my-element', { state: 'visible' });
    // Wait for a specific function to return true  
        await page.waitForFunction(() => {
            return document.querySelector('#my-element') !== null;
        }); 
        // Wait for a specific network response
        await page.waitForResponse('https://api.example.com/data');
        // Wait for a specific timeout
        await page.waitForTimeout(2000); // Wait for 2 seconds
        // Wait for a specific navigation event
        await page.waitForNavigation();


        // Wait for a specific event to be fired
        await page.waitForEvent('load'); // Wait for the page to load
        // Wait for a specific element to be enabled
        await page.waitForSelector('#my-button', { state: 'enabled' });
        // Wait for a specific element to be hidden
        await page.waitForSelector('#my-element', { state: 'hidden' });
        // Wait for a specific element to be detached from the DOM
        await page.waitForSelector('#my-element', { state: 'detached' });
        // Wait for a specific element to be attached to the DOM
        await page.waitForSelector('#my-element', { state: 'attached' });   
        // Wait for a specific element to be stable (not moving)
        await page.waitForSelector('#my-element', { state: 'stable' });
        // Wait for a specific element to be editable
        await page.waitForSelector('#my-input', { state: 'editable' });
        // Wait for a specific element to be selected
        await page.waitForSelector('#my-option', { state: 'selected' });
        // Wait for a specific element to be focused
        await page.waitForSelector('#my-input', { state: 'focused' });
        // Wait for a specific element to be visible and enabled
        await page.waitForSelector('#my-button', { state: 'visible' });
        await page.waitForSelector('#my-button', { state: 'enabled' });
        // Wait for a specific element to be visible and stable
        await page.waitForSelector('#my-element', { state: 'visible' });
        await page.waitForSelector('#my-element', { state: 'stable' });
        // Wait for a specific element to be visible and editable
        await page.waitForSelector('#my-input', { state: 'visible' });
        await page.waitForSelector('#my-input', { state: 'editable' });
        // Wait for a specific element to be visible and selected
        await page.waitForSelector('#my-option', { state: 'visible' });
        await page.waitForSelector('#my-option', { state: 'selected' });
        // Wait for a specific element to be visible and focused
        await page.waitForSelector('#my-input', { state: 'visible' });
        await page.waitForSelector('#my-input', { state: 'focused' });  
        // Wait for a specific element to be enabled and stable 
        await page.waitForSelector('#my-button', { state: 'enabled' });
        await page.waitForSelector('#my-button', { state: 'stable' });  
        // Wait for a specific element to be enabled and editable
        await page.waitForSelector('#my-input', { state: 'enabled' });
        await page.waitForSelector('#my-input', { state: 'editable' });
        // Wait for a specific element to be enabled and selected
        await page.waitForSelector('#my-option', { state: 'enabled' });
        await page.waitForSelector('#my-option', { state: 'selected' });
        // Wait for a specific element to be enabled and focused
        await page.waitForSelector('#my-input', { state: 'enabled' });
        await page.waitForSelector('#my-input', { state: 'focused' });  
        // Wait for a specific element to be stable and editable
        await page.waitForSelector('#my-element', { state: 'stable' });
        await page.waitForSelector('#my-input', { state: 'editable' });
        // Wait for a specific element to be stable and selected
        await page.waitForSelector('#my-element', { state: 'stable' });
        await page.waitForSelector('#my-option', { state: 'selected' });
        // Wait for a specific element to be stable and focused
        await page.waitForSelector('#my-element', { state: 'stable' });
        await page.waitForSelector('#my-input', { state: 'focused' });  
        // Wait for a specific element to be editable and selected
        await page.waitForSelector('#my-input', { state: 'editable' });
        await page.waitForSelector('#my-option', { state: 'selected' });
        // Wait for a specific element to be editable and focused
        await page.waitForSelector('#my-input', { state: 'editable' });
        await page.waitForSelector('#my-input', { state: 'focused' });  
        // Wait for a specific element to be selected and focused
        await page.waitForSelector('#my-option', { state: 'selected' });
        await page.waitForSelector('#my-input', { state: 'focused' });  
        // Wait for a specific element to be visible, enabled, and stable
        await page.waitForSelector('#my-button', { state: 'visible' });
        await page.waitForSelector('#my-button', { state: 'enabled' });
        await page.waitForSelector('#my-button', { state: 'stable' });  
        // Wait for a specific element to be visible, enabled, and editable
        await page.waitForSelector('#my-input', { state: 'visible' });
        await page.waitForSelector('#my-input', { state: 'enabled' });
        await page.waitForSelector('#my-input', { state: 'editable' });  
        // Wait for a specific element to be visible, enabled, and selected
        await page.waitForSelector('#my-option', { state: 'visible' });
        await page.waitForSelector('#my-option', { state: 'enabled' });
        await page.waitForSelector('#my-option', { state: 'selected' });  
        

        // wait for navigation to complete
        await page.waitForNavigation(); 
        // wait for a specific event to be fired
        await page.waitForEvent('load');

        //wait for load state to be networkidle
        await page.waitForLoadState('networkidle'); 
        //wait for load state to be domcontentloaded
        await page.waitForLoadState('domcontentloaded');
        //wait for load state to be load
        await page.waitForLoadState('load'); 
        //wait for load state to be commit
        await page.waitForLoadState('commit');
        //wait for load state to be ready
        await page.waitForLoadState('ready');
        //wait for load state to be interactive
        await page.waitForLoadState('interactive');
        //wait for load state to be complete
        await page.waitForLoadState('complete');
        //wait for load state to be idle
        await page.waitForLoadState('idle');
        //wait for load state to be networkidle
        await page.waitForLoadState('networkidle');
        //wait for load state to be domcontentloaded
        await page.waitForLoadState('domcontentloaded');

        
        