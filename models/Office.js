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
exports.firstOne = () => {
	return offices[0];
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
exports.findOneAndUpdate = (id, newOffice) => {
	return new Promise((resolve, reject) => {
		helper.mustBeInArray(offices, id)
			.then(office => {
				const index = offices.findIndex(p => p.id == office.id);
				id = { id: office.id };
				const date = {
					createdAt: office.createdAt,
					updatedAt: helper.newDate()
				}; 
				offices[index] = { ...id, ...newOffice, ...date };
				helper.writeJSONFile(officeFileJson, offices);
				theOffice[0] = offices[index];
				resolve(theOffice);
			})
			.catch(err => reject(err));
	});
};
exports.removeOne = (id) => {
	return new Promise((resolve, reject) => {
		helper.mustBeInArray(offices, id)
			.then(() => {
				offices = offices.filter(p => p.id != id);
				helper.writeJSONFile(officeFileJson, offices);
				resolve();
			})
			.catch(err => reject(err));
	});
};