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

//if you want to run tests in parallel, you can use test.describe.parallel() method. 
// //It will run all the tests inside the describe block in parallel.

test.describe.parallel('parallel tests', () => {
    test('test1', async({page})=>{
        await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
        console.log('test1');
    });

    test('test2', async({page})=>{
        await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
        console.log('test2');
    });

    test('test3', async({page})=>{
        await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
        console.log('test3');
    });

    //If you want to run tests sequentially, you can use test.describe.serial() method. 
    //It will run all the tests inside the describe block sequentially.

    test.describe.serial('serial tests', () => {
        test('test4', async({page})=>{
            await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
            console.log('test4');
        });

        test('test5', async({page})=>{
            await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
            console.log('test5');
        });

        test('test6', async({page})=>{
            await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
            console.log('test6');
        });
    });
});