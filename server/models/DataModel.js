import helper from '../helper/helper.js';
let oneDataInfo = [];

const DataModel = {
	findAll(dataArray, infoName){
		return new Promise((resolve, reject) => {
			if (dataArray.length === 0) {
				reject({
					message: 'No '+infoName+' available',
					status: 404
				});
			}
			resolve(dataArray);
		});
	},
	firstOne(dataArray){
		return dataArray[0];
	},
	findOneById(dataArray, infoName, id){
		return new Promise((resolve, reject) => {
			helper.mustBeInArray(dataArray, infoName, id)
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
	findOneAndUpdate(jsonFile, dataArray, infoName, reqBody){
		const dataId = Number(reqBody.dataId);
		return new Promise((resolve, reject) => {
			helper.mustBeInArray(dataArray, infoName, dataId)
				.then(theData => {
					const index = dataArray.findIndex(p => p.id == theData.id);
					console.log('id:'+theData.name)
					const id = { id: theData.id };
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
	removeOne(jsonFile, dataArray, infoName, id){
		return new Promise((resolve, reject) => {
			helper.mustBeInArray(dataArray, infoName, id)
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