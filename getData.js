const { default: axios } = require('axios');
const cheerio = require('cheerio');
const os = require('os');
const fs = require('fs');
let cookies = require('./cookies.json');
const random = Math.floor(Math.random() * cookies.length);
const cookie = cookies[random];
cookies.splice(random, 1);
fs.writeFileSync('./cookies.json', JSON.stringify(cookies));
module.exports = async (name, code) => {
	const arr = [];
	const a = ['a'];
	let counter = 1;
	while (a.length) {
		try {
			a.splice(0, a.length);
			const response = await axios({
				method: 'get',
				url: `https://www.whitepages.com.au/residential/results?name=${name}&location=${code}&page=${counter}`,
				data: null,
				headers: {
					accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
					'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
					'cache-control': 'no-cache',
					pragma: 'no-cache',
					'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
					'sec-ch-ua-mobile': '?0',
					'sec-ch-ua-platform': '"macOS"',
					'sec-fetch-dest': 'document',
					'sec-fetch-mode': 'navigate',
					'sec-fetch-site': 'same-origin',
					'sec-fetch-user': '?1',
					'upgrade-insecure-requests': '1',
					cookie: cookie,
					Referer: 'https://www.whitepages.com.au/residential',
					'Referrer-Policy': 'strict-origin-when-cross-origin',
				},
			});
			if (response.status !== 200) {
				console.log(response);
			}
			const $ = cheerio.load(response.data);
			const check = $('.results-summary:nth-child(1)').text().trim().split(' ').join('').split(os.EOL).join(' ');
			if (!check.includes(code)) {
				console.log(check);
				return null;
			}
			$('.search-result-item.apply-border-bottom.residential').each((i, e) => {
				const temp = $(e).find('.mobile-visible a').attr('href').trim().split(':')[1].split('');
				const person = {
					name: $(e).find('.display-name').text().trim(),
					address: $(e).find('.presence-location').text().trim(),
					phone: `(${temp[0]}${temp[1]}) ${temp[2]}${temp[3]}${temp[4]}${temp[5]} ${temp[6]}${temp[7]}${temp[8]}${temp[9]}`,
				};
				a.push(person);
				arr.push(person);
			});
			if (arr.length > 30) {
				console.log(name, code, 'to large');
				return arr;
			}
			counter++;
		} catch (error) {
			console.log(error);
		}
	}
	return arr;
};
