import{test, expect} from '@playwright/test'

test('Page screenshot', async({page})=>{
    await page.goto("https://www.opencart.com/");
    await page.screenshot({path:'tests/screenshots/'+Date.now()+'HomePage.png'})

})

test('Full page screenshot', async({page})=>{
    await page.goto("https://www.opencart.com/");
    await page.screenshot({path:'tests/screenshots/'+Date.now()+'FullPage.png', fullPage:true})

})

test('particular element screenshot', async({page})=>{
    await page.goto("https://www.opencart.com/");
    await page.locator("//a[normalize-space()='Start now']").screenshot({path:'tests/screenshots/'+Date.now()+'FullPage.png'})

})

