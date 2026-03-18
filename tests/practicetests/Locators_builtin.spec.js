const {test, expect} = require('@playwright/test')

test('Locators builtin methods', async({page}) =>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    const logoLocator = await page.getByAltText('company-branding');
    await expect(logoLocator).toBeVisible();
    console.log('Logo is visible: ' + await logoLocator.isVisible());

    const usernameLocator = await page.getByPlaceholder('Username');
    await expect(usernameLocator).toBeEditable();
    console.log('Username field is editable: ' + await usernameLocator.isEditable());
    if(await usernameLocator.isEditable()){
        await usernameLocator.fill('Admin');
    }

    const passwordLocator = await page.getByPlaceholder('Password');
    await expect(passwordLocator).toBeEditable();
    console.log('Password field is editable: ' + await passwordLocator.isEditable());
    if(await passwordLocator.isEditable()){
        await passwordLocator.fill('admin123');
    }

    const loginButton = await page.getByRole('button', {name: 'Login'});
    await expect(loginButton).toBeEnabled();
    console.log('Login button is enabled: ' + await loginButton.isEnabled());
    if(await loginButton.isEnabled()){ 
        await loginButton.click();
    }

    // Wait for a moment to see the result after login
    await page.waitForTimeout(5000);
  
    //When user name is changing after login, fetch the name dynamically
    const name=page.locator('//p[@class="oxd-userdropdown-name"]').textContent();

    const username=await page.getByText(name);
    await expect(username).toBeVisible();
    console.log('Logged in user is visible: ' + await username.isVisible());    

});

    