const fs = require('fs');
exports.getNewId = (array) => {
	if (array.length > 0) return array[array.length - 1].id + 1;
	else return 1;
};
exports.newDate = () => new Date().toString();
exports.mustBeInArray = (array, id) => {
	return new Promise((resolve, reject) => {
		const row = array.find(r => r.id == id);
		if (!row) {
			reject({
				message: 'No data found',
				status: 404
			});
		}
		resolve(row);
	});
};
exports.writeJSONFile = (filename, content) => {
	let fileName = __dirname+'/'+filename;
	fs.writeFileSync(fileName, JSON.stringify(content), 'utf8', (err,ok) => {
		if (err)  console.log('Err:'+JSON.stringify(err));
		console.log('Ok:'+JSON.stringify(ok));
	});
};