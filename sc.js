const puppeteer = require('puppeteer');
const urlscarp = 'http://e.mankopas.com/';
console.log('test');

try{
	(async () => {
		const browser = await puppeteer.launch({
			headless: false,
		});
		const page = await browser.newPage();
		await page
			.goto("http://e.mankopas.com/",{
				waitUntil: "networkidle2"
			})
			.then(async () => {
				await page.type("#username", "appa iya");
				await page.click("#submit");
			})
	})
} catch (error){
	console.log('error bang')
}