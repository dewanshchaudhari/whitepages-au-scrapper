const data = require('./main.json');
const fs = require('fs');
const s = new Set();
const arr = [];
for (let i = 0; i < data.length; i++) {
	console.log(i);
	for (let j = 0; j < data.length; j++) {
		if (!s.has(data[i]['Phone number'])) {
			s.add(data[i]['Phone number']);
			arr.push(data[i]);
		}
	}
}
fs.writeFileSync('./main-2.json', JSON.stringify(arr));
console.log(arr.length);
