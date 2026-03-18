const {test, expect} = require('@playwright/test');

test('place order test', async({page}) =>{
    await page.goto('https://rahulshettyacademy.com/client/');
    const email= page.getByPlaceholder('email@example.com', { exact: true });
    const password= page.getByPlaceholder('enter your passsword', { exact: true });
    const loginButton= page.getByRole('button', { name: 'Login' });
    await email.clear();
    await email.fill('samtimi@gmail.com');
    await password.clear();
    await password.fill('Samtimi@123');
    await loginButton.click();
    await page.waitForLoadState('networkidle');
    const productName = 'ZARA COAT 3';
    const products = page.locator('.card-body');
    const count = await products.count();
    for(let i=0; i<count; ++i){
        if(await products.nth(i).locator('b').textContent() === productName){
            await products.nth(i).locator('text= Add To Cart').click();
            break;
        }
    }
    await page.locator('[routerlink="/dashboard/cart"]').click();
    await page.locator('div li').first().waitFor();
    const bool = await page.locator('h3:has-text("zara coat 3")').isVisible();
    expect(bool).toBeTruthy();

    await page.getByRole('button', { name: 'Buy Now' }).click();
    await page.getByPlaceholder('Select Country').click();
    await page.getByPlaceholder('Select Country').fill('ind');
    const dropdownOptions = page.locator('.ta-results');
    await dropdownOptions.waitFor();
    const optionCount = await dropdownOptions.locator('button').count();
    for(let i=0; i<optionCount; ++i){
        if(await dropdownOptions.locator('button').nth(i).textContent() === ' India'){
            await dropdownOptions.locator('button').nth(i).click();
            break;
        }
    page.pause();
    }

});