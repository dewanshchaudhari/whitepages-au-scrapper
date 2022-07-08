const fs = require('fs');
const surnames = require('./Surnames.json');
const arr = [];
for (let i = 0; i < surnames.length; i++) {
	const file = fs.readFileSync(`./data/${i} ${surnames[i]}.json`);
	const data = JSON.parse(file.toString());
	for (let j = 0; j < data.length; j++) {
		arr.push(data[j]);
	}
}
fs.writeFileSync(`main.json`, JSON.stringify(arr));
