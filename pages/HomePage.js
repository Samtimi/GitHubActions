exports.HomePage = 
class HomePage{
    constructor(page){
        this.page=page;
        this.productList='//*[@id="tbodyid"]/div/div/div/h4/a';
        this.addToCartbtn='//a[normalize-space()="Add to cart"]';
        this.cart="//a[@id='cartur']";
    }

    async addProductToCart(productName) {
        const productList = await this.page.$$(this.productList);
        for (const product of productList) {
            const name = await product.textContent();
            if (name.trim() === productName) {
                await product.click();
                break;
            }
        }
        await this.page.on('dialog', async dialog=>{
            if(dialog.message().includes('added')){
                await dialog.accept();
            }
        })
        await this.page.waitForSelector(this.addToCartbtn);
                await this.page.click(this.addToCartbtn);

    }
    async gotoCart(){
        await this.page.locator(this.cart).click();
    }
}