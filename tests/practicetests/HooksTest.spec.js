const {test, expect} = require('@playwright/test')

test('Count total products', async ({page}) => {
    await page.goto('https://demoblaze.com/index.html');
    
    //Login
    await page.locator('#login2').click();
    await page.locator('#loginusername').clear();
    await page.locator('#loginusername').fill('pavanol');
    await page.locator('#loginpassword').clear();
    await page.locator('#loginpassword').fill('test@123');
    await page.click("button[onclick='logIn()']")
    
//Home Page
const products = await page.$$('.hrefch');
expect (products).toHaveLength(9);

//Logout

    await page.locator('#logout2').click();
})

test('Product add to cart', async ({ page }) =>{
    await page.goto('https://demoblaze.com/index.html');
    
    //Login
    await page.locator('#login2').click();
    await page.locator('#loginusername').clear();
    await page.locator('#loginusername').fill('pavanol');
    await page.locator('#loginpassword').clear();
    await page.locator('#loginpassword').fill('test@123');
    await page.click("button[onclick='logIn()']")

    //Add product to cart
    await page.locator("//a[normalize-space()='Nokia lumia 1520']").click();
    await page.locator("//a[normalize-space()='Add to cart']").click();

    page.on('dialog', async dialog =>{
    expect(dialog.message).toContain('Product added.')
    })

    //Logout
    await page.locator('#logout2').click();


})