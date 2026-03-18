
/*
1. Installation of "Allure-playwright" module
   npm i -D @playwright/test allure-playwright
2. Installing Allure command line
   npm install -g allure-commandline --save-dev
               [or]
   sudo npm install -g allure-commandline --save-dev
3. playwright.config.js
   reporter = ['allure-playwright',{outputFolder: 'my-allure-results'}]
                 [or]
   npx playwright test --reporter=allure-playwright
   
4. Run the tests
   npx playwright test tests/AllureReportTest.spec.js

5. Generate Allure Report:
   allure generate my-allure-results -o allure-report --clean
   
6. Open allure report:
   allure open allure-report   
*/
import {test, expect} from '@playwright/test'

test('Test1 Report', async({page})=>{
    await page.goto("https://demoblaze.com/index.html");
    await expect(page).toHaveTitle("STORE");
})

test('Test2 Report', async({page}) =>{
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await expect(page).toHaveTitle("OrangeHRM");
})

test('Test3 Report', async({page})=>{
    await page.goto("https://demo.nopcommerce.com/");
    await expect(page).toHaveTitle("nopCommerce demo store. Home page titl");
})