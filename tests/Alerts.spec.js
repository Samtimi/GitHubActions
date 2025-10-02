
const {test, expect } = require ('@playwright/test');

//Handling normal alert
test.skip('Handling Alerts', async({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    page.on('dialog', async dialog =>{
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('I am an alert box!');
        await dialog.accept();
    })
    await page.click('#alertBtn');
    await page.waitForTimeout(5000);
});

//Handling confirmation alerts
test.skip('confirm alerts', async({page}) =>{
    await page.goto('https://testautomationpractice.blogspot.com/');

    page.on('dialog', async dialog =>{
        expect(dialog.type()).toContain('confirm');
        expect(dialog.message()).toContain('Press a button!');
        await dialog.accept();
        //await expect.dismiss();

    })
    await page.click('#confirmBtn');
    const confirmmessage = page.locator('#demo');
    await page.waitForTimeout(5000);
    console.log("Get alert message : " + confirmmessage.textContent());
    expect(confirmmessage).toHaveText('You pressed OK!');
    await page.waitForTimeout(5000);
    

});

test('Prompt alert', async({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('prompt')
        expect(dialog.message()).toContain('Please enter your name:')
        expect(dialog.defaultValue()).toContain('Harry Potter');
        expect
        await dialog.accept('John');
       // await dialog.accept();

        //await dialog.cancel();

    })
    await page.click('#promptBtn');
    await expect(page.locator('#demo')).toHaveText('Hello John! How are you today?');
    await page.waitForTimeout(5000);

});


