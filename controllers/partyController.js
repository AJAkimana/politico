const Party = require('../models/Party');

exports.createNewParty = (req, res) => {
	Party.saveNew(req.body)
		.then(party => {
			res.status(201).json({
				status: 201,
				// message: `The party #${party.id} has been created`,
				data: party
			})
		})
		.catch(err => res.status(500).json({ 
			status: 500,
			error: err.message 
		}));
};
exports.getAllPartiesList = (req, res) => {
	Party.findAll()
		.then(parties => res.json(parties))
		.catch(err => {
			let codeStatus = err.status?err.status:500;
			let response = {
				status:codeStatus,
				error:err.message
			}
			return res.status(codeStatus).json(response)
		});
}
exports.getSpecificParty = (req, res) => {
	Party.findOneById(req.params.partId)
	.then(party => res.json(party))
	.catch(err => {
        let codeStatus = err.status?err.status:500;
		let response = {
			status:codeStatus,
			error:err.message
		}
		return res.status(codeStatus).json(response)
    })
}
exports.modifyParty = (req, res) => {
	const id = req.params.partId;
	Party.findOneAndUpdate(id, req.body)
    .then(party => res.json({
    	status: 201,
        message: `The party #${id} has been updated`,
        data: party
    }))
    .catch(err => {
    	let codeStatus = err.status?err.status:500;
		let response = {
			status:codeStatus,
			error:err.message
		}
        res.status(codeStatus).json(response)
    })
}
exports.deleteParty = (req, res) => {
	const id = req.params.partId
    
    Party.removeOne(id)
    .then(party => res.status(201).json({
    	status: 201,
        message: `The party #${id} has been deleted`
    }))
    .catch(err => {
        let codeStatus = err.status?err.status:500;
		let response = {
			status:codeStatus,
			error:err.message
		}
        res.status(codeStatus).json(response)
    })
}