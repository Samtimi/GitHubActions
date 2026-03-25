class DashboardPage {
  constructor(page) {
    this.page = page;
    this.products = page.locator(".card-body");
    this.productText = page.locator(".card-body b");
    this.cartLink = page.locator("[routerlink*='cart']");
    this.navigateToOrderslink = page.locator("button[routerlink*='myorders']");
  }

  async searchProductAddCart(productName) {
   
    const titles = await this.productText.allTextContents();
    console.log(titles);
    const count = await this.products.count();
    for (let i = 0; i < count; ++i) {
      if ((await this.products.nth(i).locator("b").textContent()) === productName) {
        //add to cart
        await this.products.nth(i).locator("text= Add To Cart").click();
        break;
      }

    }
  }
  async navigateToCart() {
    await this.cartLink.click();
  }

  async navigateToOrders() {
    await this.navigateToOrderslink.click();
  }
}

module.exports = { DashboardPage };