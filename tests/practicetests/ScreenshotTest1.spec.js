//Taking screnshot by default with help of playwright.config.js in this file under 'use' section add parameter as screenshot:on 
import{test,expect} from '@playwright/test'

test('page screenshot', async({page}) =>{
    
    await page.goto("https://www.opencart.com/");
    // await page.screenshot({path:'tests/screenshots/'+Date.now()+'HomePage.png'})
    await page.locator(".btn.btn-success.btn-xl").click();


})