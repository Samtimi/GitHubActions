const {test, expect} = require('@playwright/test');
const { beforeEach } = require('node:test');
let page;

test.beforeEach(async({browser}) =>{
    page=await browser.newPage();
    await page.goto('https://demoblaze.com/index.html');
    
    //Login
    await page.locator('#login2').click();
    await page.locator('#loginusername').clear();
    await page.locator('#loginusername').fill('pavanol');
    await page.locator('#loginpassword').clear();
    await page.locator('#loginpassword').fill('test@123');
    await page.click("button[onclick='logIn()']")

})

test.afterEach(async() =>{
    //Logout
    await page.locator('#logout2').click();
})

test('Count total products in a page', async () => {    
    //Home Page
    const products = await page.$$('.hrefch');
    await page.waitForTimeout(5000);
    expect (products).toHaveLength(9);
})

test('Product add to cart', async () =>{
    //Add product to cart
    await page.locator("//a[normalize-space()='Nokia lumia 1520']").click();
    await page.locator("//a[normalize-space()='Add to cart']").click();

    page.on('dialog', async dialog =>{
    expect(dialog.message).toContain('Product added.')
    })

})