const fs = require('fs');
const convert = require('./convert');
const data = require('./main.json');
const post = require('./check.json');
const postcode = [...new Set(post)];
console.log(postcode.length);
for (let i = 0; i < postcode.length; i++) {
	let arr = [];
	for (let j = 0; j < data.length; j++) {
		if (postcode[i] === data[j].Postcode) {
			arr.push(data[j]);
		}
	}
	console.log(postcode[i]);
	if (arr.length) {
		console.log(i);
		//fs.writeFileSync(`./send/${postcode[i]}.json`, JSON.stringify(arr));
		convert(postcode[i], arr);
	}
}
//console.log(arr);
//fs.writeFileSync(`./main-2.json`, JSON.stringify(arr));
