const {test, expect} = require('@playwright/test');

test('test checkboxes', async({page}) =>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    const name= page.locator('#name');
    const email= page.locator('#email');
    const phone= page.locator('#phone');
    const textarea= page.locator('#textarea');

    // Check if the name field is editable and fill it
    await expect(name).toBeEditable();
    console.log('Name field is editable: ' + await name.isEditable());
    if(await name.isEditable()){
        console.log('Name field is editable');
        await name.clear();
        await name.fill('playwright');
    }
    
    // Check if the email field is editable and fill it
    await expect(email).toBeEditable();
    console.log('Email field is editable: ' + await email.isEditable());
     if(await email.isEditable()){
        console.log('Email field is enabled and editable');
        await email.clear();
        await email.fill('playwright@test.com');
     }
   
    // Check if the phone field is editable and fill it
    await expect(phone).toBeEditable();
    console.log('Phone field is editable: ' + await phone.isEditable());
    if(await phone.isEditable()){
        console.log('Phone field is enabled and editable');
        await phone.clear();
        await phone.fill('9786786786');
    }
    
    // Check if the textarea is editable and fill it
    await expect(textarea).toBeEditable();
    console.log('Textarea is editable: ' + await textarea.isEditable());
    if(await textarea.isEditable()){
        console.log('Textarea is enabled and editable');
        await textarea.clear();
        await textarea.fill('# 2-82, Tirupati');
        await textarea.press('$');
    }
    // Wait for a moment to see the filled values 
    await page.waitForTimeout(5000);

   //check radio buttons is checked or not
   const genderRadio = {'input[type="radio"][value="male"]': 'male',
                        'input[type="radio"][value="female"]': 'female'
                       };
    for(const [selector, value] of Object.entries(genderRadio)) {
        const radio =  page.locator(selector);
        await expect(radio).toBeEnabled();
        if(await radio.isEnabled()) {
            console.log(`${value} radio button is enabled`);
            await radio.check();
            break; // Exit loop after checking the first enabled radio button
        } else {
            console.log(`${value} radio button is not enabled`);
        }
    }
//check check box is checked or not
    const days={
                  '//input[@id="sunday" and @type="checkbox"]': 'sunday', 
                  '//input[@id="monday" and @type="checkbox"]': 'monday',
                  '//input[@id="tuesday" and @type="checkbox"]': 'tuesday',
                  '//input[@id="wednesday" and @type="checkbox"]': 'wednesday',
                  '//input[@id="thursday" and @type="checkbox"]': 'thursday',
                  '//input[@id="friday" and @type="checkbox"]': 'friday',
                  '//input[@id="saturday" and @type="checkbox"]': 'saturday'
    };
    for(const [selector, value] of Object.entries(days)) {
        const checkbox = page.locator(selector);
        await expect(checkbox).toBeEnabled();
        if(await checkbox.isEnabled()) {
            console.log(`${value} checkbox is enabled`);
            if(value === 'sunday' || value === 'friday') {
                await checkbox.check();
            }
        
        } else {
            console.log(`${value} checkbox is not enabled`);
        }
    }

// select list of value form country drop down list
const country=await page.locator('//select[@id="country"]');
await country.click();
expect(country).toBeVisible();

const options=await page.$$('#country option')
console.log("Number of options:" + options.length)
expect(options.length).toBe(10);

await page.selectOption("#country", 'India');
await country.click();

/** await content=await page.locator('#country').textContent()
expect(content.includes('India')).toBeTruthy(); */


/** const countrydropdown = {'option[value="canada"]':'canada',
    'option[value="usa"]':'United States',
    'option[value="uk"]':'United Kingdom',
    'option[value="germany"]':'Germany',
    'option[val ue="china"]':'China',
    'option[value="india"]':'India',
    'option[value="canada"]':'canada',

}; */
 
// Multi select dropdown
await page.locator("#colors").selectOption(['Red', 'Green']);
const option=page.$$('#colors option');
//await expect(option.length).toBe(7);

console.log("Number of colors in the multi select dropdown:   "  +option.length);


//

    await page.waitForTimeout(5000);
});




