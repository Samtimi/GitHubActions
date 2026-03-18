const {test, expect} = require('@playwright/test');

test('Web Table Actions', async({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const table = page.locator('#productTable');


    //Count number of rows and columns
    const columns = await table.locator('thead tr th');
    console.log("Total number of columns : ", await columns.count())
    expect(await columns.count()).toBe(4);

    const rows = await table.locator('tbody tr');
    console.log("Total number of rows : ", await rows.count());
    expect(await rows.count()).toBe(5);
   
    // select multiple products by re-usable function
   // await selectProduct(rows,page, 'Product 1');

   /**   // Select check box for project 4
    const matchedRow= rows.filter({
        has: page.locator('td'),
        hasText: 'Product 4'
    })
    await matchedRow.locator('input').check();
    */

    //Print all product details using loop
    for(let i=0; i< await rows.count(); i++){
        const row = rows.nth(i);
        const tds = row.locator('td');

        for(let j=0; j< await tds.count()-1; j++ )
        {
            console.log(await tds.nth(j).textContent());
        }
    }
    await page.waitForTimeout(5000);
    //Read data from all the pages in hte table

    const pages = await page.locator('.pagination li a');
    console.log('Number of pages in the table: ', await pages.count())

    for(let p=0; p< await pages.count(); p++){
        if(p>0)
        {
            await pages.nth(p).click();
        }
        for(let i=0; i< await rows.count(); i++){
        const row = rows.nth(i);
        const tds = row.locator('td');

        for(let j=0; j< await tds.count()-1; j++ )
        {
            console.log(await tds.nth(j).textContent());
        }
        }

    }


    async function selectProduct(rows, page, name) {
        const matchedRow= rows.filter({
        has: page.locator('td'),
        hasText: name
    })
    await matchedRow.locator('input').check();
    }
});
