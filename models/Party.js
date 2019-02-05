const helper = require('../dataHelper/helper.js');
const partyFileJson = '../dataHelper/data/parties.json';
let parties = require(partyFileJson);
let theParty = [];
exports.findAll = () => {
	return new Promise((resolve, reject) => {
		if (parties.length === 0) {
			reject({
				message: 'No party available',
				status: 204
			});
		}
		resolve(parties);
	});
};
exports.firstOne = () => {
	return parties[0];
};
exports.findOneById = (id) => {
	return new Promise((resolve, reject) => {
		helper.mustBeInArray(parties, id)
			.then(party => {
				theParty[0] = party;
				resolve(theParty);
			})
			.catch(err => reject(err));
	});
};
exports.saveNew = (newParty) => {
	return new Promise((resolve) => {
		const id = { id: helper.getNewId(parties) };
		const date = { 
			createdAt: helper.newDate(),
			updatedAt: helper.newDate()
		}; 
		newParty = { ...id, ...newParty, ...date };
		parties.push(newParty);
		helper.writeJSONFile(partyFileJson, parties);
		theParty[0] = newParty;
		resolve(theParty); 
	});
};
exports.findOneAndUpdate = (id, newParty) => {
	return new Promise((resolve, reject) => {
		helper.mustBeInArray(parties, id)
			.then(party => {
				const index = parties.findIndex(p => p.id == party.id);
				id = { id: party.id };
				const date = {
					createdAt: party.createdAt,
					updatedAt: helper.newDate()
				}; 
				parties[index] = { ...id, ...newParty, ...date };
				helper.writeJSONFile(partyFileJson, parties);
				theParty[0] = parties[index];
				resolve(theParty);
			})
			.catch(err => reject(err));
	});
};
exports.removeOne = (id) => {
	return new Promise((resolve, reject) => {
		helper.mustBeInArray(parties, id)
			.then(() => {
				parties = parties.filter(p => p.id != id);
				helper.writeJSONFile(partyFileJson, parties);
				resolve();
			})
			.catch(err => reject(err));
	});
};