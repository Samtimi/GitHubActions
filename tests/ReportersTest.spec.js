import {test, expect} from '@playwright/test'

test('Test1 Report', async({page})=>{
    await page.goto("https://demoblaze.com/index.html");
    await expect(page).toHaveTitle("STORE");
})

test('Test2 Report', async({page}) =>{
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await expect(page).toHaveTitle("OrangeHRM");
})

test('Test3 Report', async({page})=>{
    await page.goto("https://demo.nopcommerce.com/");
    await expect(page).toHaveTitle("nopCommerce demo store. Home page title");
})

