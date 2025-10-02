const { test, expect } = require('@playwright/test');   

test('login test', async ({ page }) => {
    // Navigate to the login page
    await page.goto('https://demoblaze.com/');
    
    // Click on the 'Log in' link
    await page.getByRole('link', { name: 'Log in' }).click();
    
    // Fill in the username and password fields
    await page.fill('#loginusername', 'pavanol');
    await page.fill('#loginpassword', 'test@123');
    
    // Click the 'Log in' button
    await page.click('button[onclick=\'logIn()\']');

    // Wait for the login to complete and check if the user is logged in by checking for a logout link
    //const loginSuccess = await page.waitForSelector('#logout2', { timeout: 5000 });
    const loginSuccess = await page.locator('#logout2');
    await page.waitForSelector('#logout2', { state: 'visible' });
    // Assert that the login was successful
    await expect(loginSuccess).toBeVisible();
    if (loginSuccess) {
        console.log('Login successful, user is logged in.');
    } else {
        console.log('Login failed, user is not logged in.');
    }
});