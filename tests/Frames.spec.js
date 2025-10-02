const {test,expect} = require('@playwright/test')

test('Frames Test', async({page}) => {
    await page.goto("https://ui.vision/demo/webtest/frames/");

    const allFrames = await page.frames();
    console.log("Total number of frames: "+allFrames.length);

    //Approach 1: by using name or url
    //const var1 = await page.frame('name'); // if name is present
    const frame1 = await page.frame({url: 'https://ui.vision/demo/webtest/frames/frame_1.html'});
    await frame1.fill('input[name="mytext1"]', "Hello");
    
    //Approach 2: Locate element inside frame
    const frame2 = await page.frameLocator('frame[src="frame_2.html"]').locator('input[name="mytext2"]');
    frame2.fill("Hello Frame2");
    await  page.waitForTimeout(5000);

    // Frame3
    const frame3 = await page.frameLocator("frame[src='frame_3.html']").locator("input[name='mytext3']");
    frame3.fill("Hello Frame3");
    
    //inner frame
    const childFrames = await frame3.childFrames();
    console.log("Total inner frames : "+childFrames().length());
    childFrames(0).locator("//div[@id='i9']//div[@class='AB7Lab Id5V1']").check();
    

    await  page.waitForTimeout(5000);
   /**     
    const parentFrameLocator = page.frameLocator("frame[src='frame_3.html']");
    const childframes = parentFrameLocator.childframes();
    childframes(0).locator("//div[@id='i9']//div[@class='AB7Lab Id5V1']").check();
    */
    
   
})