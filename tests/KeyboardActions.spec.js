const {test, expect} = require('@playwright/test');

test('Keyboard Actions', async({page}) => {
    await page.goto("https://gotranscript.com/text-compare");

    await page.locator("[name='text1']").fill("Welcome to Playwright ")
    await page.keyboard.press('Meta+A');
    await page.keyboard.press('Meta+C');
    await page.keyboard.down('Tab');
    await page.keyboard.up('Tab');
    await page.keyboard.press('Meta+V');


    await page.waitForTimeout(5000);

});