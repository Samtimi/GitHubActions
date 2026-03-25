const {test,expect} = require("@playwright/test");

test('screentshot test', async({page})=>{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const emailField = page.locator("#userEmail");
    await expect(emailField).toBeVisible();
    await page.getByRole('link', { name: 'Register' }).screenshot({path:'logo.png'});
    await page.screenshot({path:'screenshot.png', fullPage:true});

});

test.only('@Visual Testing', async({page})=>{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const emailField = page.locator("#userEmail");
    await expect(emailField).toBeVisible();
    expect(await page.screenshot()).toMatchSnapshot('loginPage.png');
   
});
  