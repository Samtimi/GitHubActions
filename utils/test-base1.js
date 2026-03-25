const  base  = require("@playwright/test");

exports.customtest = base.test.extend({
  testOrderData: {
    username: "anshika@gmail.com",
    password: "Iamking@000",
    productname: "Zara Coat 4",
  }
});
