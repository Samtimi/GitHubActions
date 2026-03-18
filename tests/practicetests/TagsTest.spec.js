const {test, expect} = require('@playwright/test')

test('Test1 @sanity', {tag:'@fast'}, async({page})=>{
    console.log("This is our First Sanity Test")
})

test('Test2 @sanity', async({page})=>{
    console.log("This is our Second Sanity Test")
})

test('Test3 @reg', async({page})=>{
    console.log("This is our First Regression Test")
})

test('Test4 @reg', async({page})=>{
    console.log("This is our Second Regression Test")
})

test('Test5 @sanity@reg', async({page})=>{
    console.log("This is our First Sanity and Regression Test")
})
