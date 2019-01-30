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
exports.modifyParty = (req, res) => {}
exports.deleteParty = (req, res) => {}