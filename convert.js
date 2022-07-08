const xl = require('excel4node');
const convert = async (name, data) => {
	console.log(data.length);
	const wb = new xl.Workbook();
	const ws = wb.addWorksheet(name);
	const headingColumnNames = ['Postcode', 'Name', 'Address', 'Phone number'];
	let headingColumnIndex = 1;
	headingColumnNames.forEach((heading) => {
		ws.cell(1, headingColumnIndex++).string(heading.toString());
	});
	let rowIndex = 2;
	data.forEach((record) => {
		let columnIndex = 1;
		Object.keys(record).forEach((columnName) => {
			ws.cell(rowIndex, columnIndex++).string(record[columnName].toString());
		});
		rowIndex++;
	});
	console.log(name);
	wb.write(`./Gold/${name}.xlsx`);
};

module.exports = convert;
