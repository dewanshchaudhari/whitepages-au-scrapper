const whitepages = require('./whitepages');
const main = async () => {
	await whitepages.initialize();
	await whitepages.login();
	await whitepages.getCookie();
	await whitepages.close();
};
(async () => {
	for (let i = 0; i < 10; i++) {
		await main();
	}
})();
