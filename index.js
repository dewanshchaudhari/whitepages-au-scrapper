const surnames = require('./Surnames.json');
const postcodes = require('./check.json');
const getData = require('./getData');
const fs = require('fs');
const main = async () => {
	const person = [];
	try {
		let i = process.argv[2].toString();
		for (let j = 0; j < postcodes.length; j++) {
			const data = await getData(surnames[i], postcodes[j].toString());
			if (data) {
				for (let k = 0; k < data.length; k++) {
					const per = {
						Postcode: postcodes[j],
						Name: data[k].name,
						Address: data[k].address,
						'Phone number': data[k].phone,
					};

					person.push(per);
				}
				fs.writeFile(`./data1/${+process.argv[2]} ${surnames[i]}.json`, JSON.stringify(person), () =>
					console.log(`${i} ${surnames[i]} - ${j} ${postcodes[j]}`)
				);
			}
		}
	} catch (error) {
		console.log(error);
	}
};

main();
