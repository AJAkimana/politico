const DataModel = require('../models/DataModel');
const officeFileJson = '../dataHelper/data/offices.json';
const offices = require(officeFileJson);
const officeTypes = ['federal','legistrative','state','local'];

exports.createNewOffice = (req, res) => {
	// Check validity of body
	req.assert('name', 'Type party name').notEmpty();
	req.assert('type', 'Invalid office type').isIn(officeTypes);
	const errors = req.validationErrors();
	if (errors) return res.status(400).json({status: 400, error: errors[0].msg});

	DataModel.saveNew(officeFileJson, offices, req.body)
		.then(office => {
			res.status(201).json({
				status: 201,
				data: office
			});
		})
		.catch(err => res.status(500).json({ 
			status: 500,
			error: err.message 
		}));
};
exports.getAllOfficesList = (req, res) => {
	DataModel.findAll(offices)
		.then(offices => res.status(200).json({
			status: 200,
			data: offices
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
exports.getSpecificOffice = (req, res) => {
	// Check valid office id
	req.assert('officeId','Invalid office spacification').isInt();
	const errors = req.validationErrors();
	if (errors) return res.status(400).json({status: 400, error: errors[0].msg});
	const officeId = Number(req.params.officeId);

	DataModel.findOneById(offices, officeId)
		.then(office => res.status(200).json({
			status: 200,
			data: office
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
exports.modifyOffice = (req, res) => {
	// Check validity of body and params
	req.assert('name', 'Type office name').notEmpty();
	req.assert('type', 'Invalid office type').isIn(officeTypes);
	req.assert('officeId','Invalid office spacification').isInt();
	
	const errors = req.validationErrors();
	if (errors) return res.status(400).json({status: 400, error: errors[0].msg});

	const id = Number(req.params.officeId);
	DataModel.findOneAndUpdate(officeFileJson, offices, id, req.body)
		.then(office => res.status(201).json({
			status: 201,
			data: office
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
exports.deleteOffice = (req, res) => {
	// Check valid party id
	req.assert('officeId','Invalid office spacification').isInt();
	const errors = req.validationErrors();
	if (errors) return res.status(400).json({status: 400, error: errors[0].msg});
	const officeId = Number(req.params.officeId);

	DataModel.removeOne(officeFileJson, offices, officeId)
		.then(() => res.status(200).json({
			status: 200,
			message: 'The office has been deleted'
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