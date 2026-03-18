//Explain Paje Object Model(POM) implementation and its advantages in test automation.

// The Page Object Model (POM) is a design pattern in test automation that promotes the separation of test code and page-specific code. It involves creating a class for each web page or component in the application under test, where the class contains methods to interact with the elements on that page.

// Advantages of POM in test automation include:

// 1. **Improved Test Maintenance**: By encapsulating the page-specific code in separate classes, any changes to the UI can be easily managed by updating the corresponding page class without affecting the test scripts.

// 2. **Reusability**: The methods defined in the page classes can be reused across multiple test cases, reducing code duplication and improving efficiency.

// 3. **Readability**: POM promotes a clear and organized structure for test scripts, making them easier to read and understand. Test cases can be written in a more natural language style, improving communication among team members.

// 4. **Scalability**: As the application grows, POM allows for better scalability by keeping the test code organized and modular. New pages can be added as new classes without impacting existing tests.

// 5. **Encapsulation**: POM encapsulates the details of how interactions with the web elements are performed, allowing testers to focus on writing test logic rather than dealing with the intricacies of the UI.

// Overall, the Page Object Model is a widely adopted design pattern in test automation that enhances maintainability, reusability, readability, and scalability of test scripts.

//Example of POM implementation in Playwright:

// loginPage.js
class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

module.exports = LoginPage;

// login.test.js
const { test } = require('@playwright/test');
const LoginPage = require('./loginPage');

test('should login successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('https://example.com/login');
  await loginPage.login('testuser', 'password123');
  // Add assertions to verify successful login
}); 