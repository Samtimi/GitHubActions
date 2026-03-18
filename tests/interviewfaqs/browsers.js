//Q. How do you manage browser installation and updates in Playwright?

//A. Playwright provides a built-in command-line tool called `playwright` that allows you to manage browser installations and updates. You can use the following commands:

//Check current version of Playwright and installed browsers
//npx playwright --version

//Install specific browsers (Chromium, Firefox, WebKit)
//npx playwright install chromium
//npx playwright install firefox
//npx playwright install webkit

//Update Playwright and browsers to the latest version
//npx playwright install --force

//Uninstall specific browsers
//npx playwright uninstall chromium
//npx playwright uninstall firefox
//npx playwright uninstall webkit

//You can also specify the browser version if needed, for example:
//npx playwright install chromium@latest
//npx playwright install firefox@latest
// npx playwright install webkit@latest

//install with system dependencies
//npx playwright install --with-deps
//npx playwright install --with-deps chromium
//npx playwright install --with-deps firefox
//npx playwright install --with-deps webkit

//By using these commands, you can easily manage browser installations and updates in Playwright, ensuring that you have the necessary browsers for your testing needs. 

