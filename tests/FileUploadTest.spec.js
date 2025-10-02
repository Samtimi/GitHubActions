const {test, expect} = require('@playwright/test');

test('Singlefile Upload', async({page}) => {
    await page.goto("https://davidwalsh.name/demo/multiple-file-upload.php");

    await page.locator('#filesToUpload').setInputFiles('tests/uploadFiles/Test.pdf');
    await page.waitForTimeout(5000);
    expect(page.locator('#fileList')).toHaveText('Test.pdf');
    

});
//Multiple Files to upload
test.only('Multiplefiles  Upload', async({page}) => {
    await page.goto("https://davidwalsh.name/demo/multiple-file-upload.php");
    await page.locator('#filesToUpload').setInputFiles(['tests/uploadFiles/Test.pdf',
                                                        'tests/uploadFiles/Test1.pdf' 
                                                        ]);
    await page.waitForTimeout(5000);
    expect(page.locator('#fileList')).toHaveText('Test.pdf');
    expect(page.locator('#fileList')).toHaveText('Test1.pdf')
    await page.waitForTimeout(5000);

});