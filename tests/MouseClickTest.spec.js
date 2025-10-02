const {test, expect} = require('@playwright/test')

// Different types of mouse click options
test('Mouse clcik', async({page}) => {
    page.goto('https://testautomationpractice.blogspot.com/');

    //Generic click
    const startbutton=page.locator("//button[normalize-space()='START']");
     await startbutton.click();
   

    // Double click
    const double= page.locator("//button[@ondblclick='myFunction1()']");
    await double.dblclick();

    const field2text = await page.locator('#field2').inputValue();
    console.log("Field2 text is : " + field2text);
    
    // Right click
    await page.getByText('STOP').click({ button: 'right' });

    // Mouse hover
    await page.getByText('Point Me').hover();

    // Forcing the click
    // await page.getByRole('button').click({ force: true})

    // Press keys one by one
   const text= await page.locator('#textarea');
    await text.pressSequentially('Hello World!');  
    await page.waitForTimeout(5000);
    await text.clear();

    // Hit Enter
    // await page.getByText('Submit').press('Enter')
    // expect('Please select both start and end dates.').toBeTruthy();
    
    await page.locator('#textarea').press('$');
    await page.waitForTimeout(5000);
    // Drag and Drop
    //await page.locator("div[id='draggable'] p").dragTo(page.locator("div[id='droppable'] p"))

    //Dragging manually
    await page.locator("div[id='draggable'] p").hover();
    await page.mouse.down();
    await page.locator("div[id='droppable'] p").hover()
    await page.mouse.up();
   
    //Scrolling 
    // Scrolls automatically so that button is visible
    await page.locator("//select[@id='colors']//option[7]").click();
    await page.waitForTimeout(5000);
    // Scroll the footer into view, forcing an "infinite list" to load more content
    await page.locator("//select[@id='animals']//option[7]").scrollIntoViewIfNeeded();

    // Position the mouse and scroll with the mouse wheel
    await page.locator("//select[@id='animals']//option[9]").hover();
    await page.mouse.wheel(0, 9);
    await page.locator("//select[@id='animals']//option[10]").click();

    await page.locator("//select[@id='animals']//option[2]").evaluate(e =>e.scrollTop +=5);

    await page.waitForTimeout(5000);

 


});