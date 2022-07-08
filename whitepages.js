const puppeteer = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');
puppeteer.use(pluginStealth());
const fs = require('fs');
const BASE_URL = `https://www.whitepages.com.au/residential/`;
const instagram = {
	browser: null,
	page: null,
	context: null,
	cookie: require('./cookies.json'),
	initialize: async () => {
		instagram.browser = await puppeteer.launch({ headless: false });
		instagram.context = await instagram.browser.createIncognitoBrowserContext();
		instagram.page = await instagram.browser.newPage();
		await instagram.page.setUserAgent(
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36'
		);
	},
	login: async () => {
		await instagram.page.goto(BASE_URL, {
			waitUntil: 'networkidle2',
		});
		await instagram.page.type('input[id="residentialQueryField"]', 'Smith');
		const locationBtn = await instagram.page.$('#residentialLocationQueryField');
		await locationBtn.click();
		await instagram.page.type('input[id="residentialLocationQueryField"]', '4000');
		const searchBtn = await instagram.page.$('button[aria-label="search-button"]');
		await searchBtn.click();
	},
	getCookie: async () => {
		await instagram.page.waitForTimeout(1000);
		const cookie = await instagram.page.cookies('https://www.whitepages.com.au/');
		let cookieString = '';
		for (let i = 0; i < cookie.length; i++) {
			cookieString += `${cookie[i].name}=${cookie[i].value};`;
		}
		console.log(cookieString);
		instagram.cookie.push(cookieString);
		fs.writeFile(`./cookies.json`, JSON.stringify(instagram.cookie), () => console.log(`done`));
	},
	close: async () => {
		await instagram.browser.close();
	},
};

module.exports = instagram;
