test('Count total products', async ({page}) => {
    await page.goto('https://demoblaze.com/index.html');
    
    //Login
    await page.locator('#login2').click();
    await page.locator('#loginusername').clear();
    await page.locator('#loginusername').fill('pavanol');
    await page.locator('#loginpassword').clear();
    await page.locator('#loginpassword').fill('test@123');
    await page.click("button[onclick='logIn()']")