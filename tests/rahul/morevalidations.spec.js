const {test, expect} = require('@playwright/test');

test('more validations', async({page})=>{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

   /* //browser navigation methods
    await page.goto('https://google.com');
    await page.goBack();
    await page.goForward();
    await page.reload(); */

    //Hidden element handling
    await expect(page.getByRole('textbox', { name: 'Hide/Show Example' })).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.getByPlaceholder('Hide/Show Example')).toBeHidden();
    await page.locator('#show-textbox').click();
    await expect(page.getByPlaceholder('Hide/Show Example')).toBeVisible();

    //handling dialog boxes
    page.on('dialog', dialog => dialog.accept());
    await page.locator('#confirmbtn').click();

    //handling mouse hover
    await page.locator('#mousehover').hover();
    await page.locator('text=Top').click();
    
    //handling child windows
    const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        page.locator('#opentab').click()
    ]);
    await newPage.waitForLoadState();
    console.log(newPage.url());




});