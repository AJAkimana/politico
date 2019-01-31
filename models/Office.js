const helper = require('../dataHelper/helper.js');
const officeFileJson = '../dataHelper/data/offices.json';
let offices = require(officeFileJson);
let theOffice = [];
exports.findAll = () => {
	return new Promise((resolve, reject) => {
		if (offices.length === 0) {
			reject({
				message: 'No office available',
				status: 404
			});
		}
		resolve(offices);
	});
};
exports.findOneById = (id) => {
	return new Promise((resolve, reject) => {
		helper.mustBeInArray(offices, id)
			.then(office => {
				theOffice[0] = office;
				resolve(theOffice);
			})
			.catch(err => reject(err));
	});
};
exports.saveNew = (newOffice) => {
	return new Promise((resolve) => {
		const id = { id: helper.getNewId(offices) };
		const date = { 
			createdAt: helper.newDate(),
			updatedAt: helper.newDate()
		}; 
		newOffice = { ...id, ...newOffice, ...date };
		offices.push(newOffice);
		helper.writeJSONFile(officeFileJson, offices);
		theOffice[0] = newOffice;
		resolve(theOffice); 
	});
};