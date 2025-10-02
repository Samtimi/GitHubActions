const {test, expect} = require('@playwright/test');

test('Date picker actions', async({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    //click on data picker text field
    const year = "2025";
    const month = "March";
    const date = "15";
    const datepicker1 = await page.locator('#datepicker');
    await datepicker1.click();
    //await datepicker1.fill('12/06/2025');

    while(true)
    {
       const currentYear = page.locator('.ui-datepicker-year').textContent();
       console.log("Current year  "+currentYear)
       const currentMonth = page.locator('.ui-datepicker-month').textContent();
       console.log("Current month  "+currentMonth);
       if(currentYear == year && currentMonth == month)
       {
           break;
       }
       
       await page.locator('[title="Prev"]').click();
    }

   // await page.locator("//a[@class='ui-datepicker-prev ui-corner-all']").click();
    const dates=await page.$$("//a[@class='ui-state-default']");
    
    //date selection using loop
    for (const dt of dates) {
        const dateText = await dt.textContent();
        if (dateText === date) {
            await dt.click();
            break;
        }
    }

    // date selection without loop
    //await page.locator("//a[@class='ui-state-default'][text()='${date}']")

    await page.waitForTimeout(5000);
 

});