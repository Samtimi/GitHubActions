const {test,expect} = require ('@playwright/test');
const { PDFParse } = require('pdf-parse');

test('PDF content', async ({page}) => {
    const parser = new PDFParse({ url: 'https://bitcoin.org/bitcoin.pdf' });

	const result = await parser.getText();
	console.log(result.text);;

});