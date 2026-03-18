const {test, expect} = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('https://demoblaze.com/');
  const title = await page.title();
  console.log('Page title is: ' + title);
  await expect(page).toHaveTitle('STORE');
  console.log('Page title is correct: ' + await page.title());

  // Click the 'Laptops' link.
    await page.getByRole('link', { name: 'Laptops' }).click();
    
    // Expects page to have a heading with the name of 'Laptops'.
    await expect(page.getByRole('link', { name: 'Laptops' })).toBeVisible();
    console.log('Laptops section is visible on the page : ' + await page.getByRole('link', { name: 'Laptops' }).textContent());

});

