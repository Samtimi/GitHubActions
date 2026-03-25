 const {test, expect} = require('@playwright/test');
 const { customtest } = require('../../utils/test-base1');
 const {POManager} = require('../../pageobjects/POManager');
 const testdata = JSON.parse(JSON.stringify(require('../../utils/ClientAppPOTestData.json')));

 for(const data of testdata){

 test(`Client App login for ${data.productname}`, async ({page})=>
 {
   const poManager = new POManager(page);
    //js file- Login js, DashboardPage
     //const products = page.locator(".card-body");
     const loginPage = poManager.getLoginPage();
     await loginPage.goTo();
     await loginPage.validLogin(data.username,data.password);
     const dashboardPage = poManager.getDashboardPage();
     await dashboardPage.searchProductAddCart(data.productname);
     await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productname);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);
   await dashboardPage.navigateToOrders();
   const ordersHistoryPage = poManager.getOrdersHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

 }); //test method
  } //for loop

 customtest.only(`Client App login with test-base data`, async ({page, testOrderData })=>
 {
   const poManager = new POManager(page);
    //js file- Login js, DashboardPage
     //const products = page.locator(".card-body");
     const loginPage = poManager.getLoginPage();
     await loginPage.goTo();
     await loginPage.validLogin(testOrderData.username, testOrderData.password);
     const dashboardPage = poManager.getDashboardPage();
     await dashboardPage.searchProductAddCart(testOrderData.productname);
     await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(testOrderData.productname);
    await cartPage.Checkout();
 }); //custom test method
 





 

