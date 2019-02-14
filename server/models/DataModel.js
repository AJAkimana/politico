import helper from '../helper/helper.js';
let oneDataInfo = [];

const DataModel = {
	findAll(dataArray){
		return new Promise((resolve, reject) => {
			if (dataArray.length === 0) {
				reject({
					message: 'No data available',
					status: 404
				});
			}
			resolve(dataArray);
		});
	},
	firstOne(dataArray){
		return dataArray[0];
	},
	findOneById(dataArray, id){
		return new Promise((resolve, reject) => {
			helper.mustBeInArray(dataArray, id)
				.then(theData => {
					oneDataInfo[0] = theData;
					resolve(oneDataInfo);
				})
				.catch(err => reject(err));
		});
	},
	saveNew(jsonFile, dataArray, reqBody){
		return new Promise((resolve) => {
			const id = { id: helper.getNewId(dataArray) };
			const date = { 
				createdAt: helper.newDate(),
				updatedAt: helper.newDate()
			}; 
			reqBody = { ...id, ...reqBody, ...date };
			dataArray.push(reqBody);
			helper.writeJSONFile(jsonFile, dataArray);
			oneDataInfo[0] = reqBody;
			resolve(oneDataInfo); 
		});
	},
	findOneAndUpdate(jsonFile, dataArray, id, reqBody){
		return new Promise((resolve, reject) => {
			helper.mustBeInArray(dataArray, id)
				.then(theData => {
					const index = dataArray.findIndex(p => p.id == theData.id);
					id = { id: theData.id };
					const date = {
						createdAt: theData.createdAt,
						updatedAt: helper.newDate()
					}; 
					dataArray[index] = { ...id, ...reqBody, ...date };
					helper.writeJSONFile(jsonFile, dataArray);
					oneDataInfo[0] = dataArray[index];
					resolve(oneDataInfo);
				})
				.catch(err => reject(err));
		});
	},
	removeOne(jsonFile, dataArray, id){
		return new Promise((resolve, reject) => {
			helper.mustBeInArray(dataArray, id)
				.then(() => {
					dataArray = dataArray.filter(p => p.id != id);
					helper.writeJSONFile(jsonFile, dataArray);
					resolve();
				})
				.catch(err => reject(err));
		});
	},
};

export default DataModel;