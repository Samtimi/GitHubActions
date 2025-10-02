const {test, expect } = require('@playwright/test')

test('Auto Suggest Dropdown', async({page}) => {
    await page.goto("https://www.redbus.com/");
    const source = page.locator('#src');
   // await source.click();
    await source.fill('Bang');


   await page.waitForTimeout(10000);

});