const cookies = require('./check.json');
console.log([...new Set(cookies)].length);
