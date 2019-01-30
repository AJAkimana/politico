const Party = require('../models/Party');

exports.createNewParty = (req, res) => {};
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
exports.modifyParty = (req, res) => {}
exports.deleteParty = (req, res) => {}