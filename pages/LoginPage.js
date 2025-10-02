exports.LoginPage = 
class LoginPage {

    constructor(page) {
        this.page = page;
        this.loginLink="#login2";
        this.usernameInput = "#loginusername";
        this.passwordInput= "//input[@id='loginpassword']";
        this.loginButton="button[onclick='logIn()']";
    }

    async gotoLoginPage(){
        await this.page.goto('https://demoblaze.com/index.html');
    }

    async login(username,password){
        await this.page.locator(this.loginLink).click();
        await this.page.locator(this.usernameInput).clear();
        await this.page.locator(this.usernameInput).fill('pavanol');
        await this.page.locator(this.passwordInput).clear();
        await this.page.locator(this.passwordInput).fill('test@123');
        await this.page.locator(this.loginButton).click();
    }

}