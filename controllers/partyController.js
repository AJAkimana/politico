const Party = require('../models/Party');

exports.createNewParty = (req, res) => {
	// Check validity of body
	req.assert('name', 'Type party name').notEmpty()
	req.assert('hqAddress', 'Provide party address').notEmpty()
	req.assert('logoUrl', 'Provide party logo url').notEmpty()
	const errors = req.validationErrors();
	if (errors) return res.status(400).json({status: 400, error: errors[0].msg});

	Party.saveNew(req.body)
		.then(party => {
			res.status(201).json({
				status: 201,
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
		.then(parties => res.status(200).json({
			status: 200,
			data: parties
		}))
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
	// Check valid party id
	req.assert('partId','Invalid party spaecification').isInt();
	const errors = req.validationErrors();
	if (errors) return res.status(400).json({status: 400, error: errors[0].msg});
	const partyId = Number(req.params.partId);

	Party.findOneById(partyId)
	.then(party => res.status(200).json({
		status: 200,
		data: party
	}))
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
	// Check validity of body and params
	req.assert('name', 'Type party name').notEmpty()
	req.assert('hqAddress', 'Provide party address').notEmpty()
	req.assert('logoUrl', 'Provide party logo url').notEmpty()
	req.assert('partId','Invalid party spaecification').isInt();
	const errors = req.validationErrors();
	if (errors) return res.status(400).json({status: 400, error: errors[0].msg});

	const id = Number(req.params.partId);
	Party.findOneAndUpdate(id, req.body)
    .then(party => res.json({
    	status: 201,
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
exports.deleteParty = (req, res) => {}