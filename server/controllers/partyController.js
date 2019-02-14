const DataModel = require('../models/DataModel');
const partyFileJson = '../helper/data/parties.json';
const parties = require(partyFileJson);

exports.createNewParty = (req, res) => {
	DataModel.saveNew(partyFileJson, parties, req.body)
		.then(party => {
			res.status(201).json({
				status: 201,
				data: party
			});
		})
		.catch(err => {
			console.log('Err:'+err)
			res.status(500).json({ 
				status: 500,
				error: err.message 
			})
		});
};
exports.getAllPartiesList = (req, res) => {
	DataModel.findAll(parties)
		.then(parties => res.status(200).json({
			status: 200,
			data: parties
		}))
		.catch(err => {
			let codeStatus = err.status?err.status:500;
			let response = {
				status:codeStatus,
				error:err.message
			};
			return res.status(codeStatus).json(response);
		});
};
exports.getSpecificParty = (req, res) => {
	const errors = req.validationErrors();
	if (errors) return res.status(400).json({status: 400, error: errors[0].msg});
	const partyId = Number(req.params.partyId);

	DataModel.findOneById(parties, partyId)
		.then(party => res.status(200).json({
			status: 200,
			data: party
		}))
		.catch(err => {
			let codeStatus = err.status?err.status:500;
			let response = {
				status:codeStatus,
				error:err.message
			};
			return res.status(codeStatus).json(response);
		});
};
exports.modifyParty = (req, res) => {
	const id = Number(req.params.partyId);
	DataModel.findOneAndUpdate(partyFileJson, parties, id, req.body)
		.then(party => res.status(201).json({
			status: 201,
			data: party
		}))
		.catch(err => {
			let codeStatus = err.status?err.status:500;
			let response = {
				status:codeStatus,
				error:err.message
			};
			res.status(codeStatus).json(response);
		});
};
exports.deleteParty = (req, res) => {
	const partyId = Number(req.params.partyId);

	DataModel.removeOne(partyFileJson, parties, partyId)
		.then(() => res.status(200).json({
			status: 200,
			message: 'The party has been deleted'
		}))
		.catch(err => {
			let codeStatus = err.status?err.status:500;
			let response = {
				status:codeStatus,
				error:err.message
			};
			res.status(codeStatus).json(response);
		});
};