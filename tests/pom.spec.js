const {test, expect} = require('@playwright/test')
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage'; 

test('test', async ({page})=>{

    //Login
    const loginpage=new LoginPage(page);
    await loginpage.gotoLoginPage();
    await loginpage.login('pavanol', 'test@123');
    await page.waitForTimeout(3000);

    //Home
    const homepage=new HomePage(page);
    await homepage.addProductToCart("Nexus 6");
    await page.waitForTimeout(5000);
    await homepage.gotoCart();

    //Cart
    const cart=new CartPage(page);
    await page.waitForTimeout(3000);
    const status=await cart.checkProductInCart('Nexus 6');
    expect(await status).toBe(true);

})

