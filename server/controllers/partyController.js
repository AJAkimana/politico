import DataModel from '../models/DataModel';
const partyFileJson = '../helper/data/parties.json';
const parties = require(partyFileJson);

const partyController = {
	createNewParty(req, res){
		DataModel.saveNew(partyFileJson, parties, req.body)
			.then(party => {
				res.status(201).json({
					status: 201,
					message: 'Successfully created',
					data: party
				});
			})
			.catch(err => {
				console.log('Err:'+err);
				res.status(500).json({ 
					status: 500,
					error: err.message 
				});
			});
	},
	getAllPartiesList(req, res){
		DataModel.findAll(parties, 'party')
			.then(parties => res.status(200).json({
				status: 200,
				message: 'Success',
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
	},
	getSpecificParty(req, res){
		const errors = req.validationErrors();
		if (errors) return res.status(400).json({status: 400, error: errors[0].msg});
		const partyId = Number(req.params.partyId);

		DataModel.findOneById(parties, 'party', partyId)
			.then(party => res.status(200).json({
				status: 200,
				message: 'Success',
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
	},
	modifyParty(req, res){
		const id = Number(req.params.partyId);
		DataModel.findOneAndUpdate(partyFileJson, parties, 'party', id, req.body)
			.then(party => res.status(200).json({
				status: 200,
				message: 'Successfully modified',
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
	},
	deleteParty(req, res){
		const partyId = Number(req.params.partyId);

		DataModel.removeOne(partyFileJson, parties, 'party', partyId)
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
	}
};

export default partyController;