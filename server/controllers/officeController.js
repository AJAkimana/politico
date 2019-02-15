const DataModel = require('../models/DataModel');
const officeFileJson = '../helper/data/offices.json';
const offices = require(officeFileJson);

exports.createNewOffice = (req, res) => {
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
			const codeStatus = err.status?err.status:500;
			const response = {
				status:codeStatus,
				error:err.message
			};
			return res.status(codeStatus).json(response);
		});
};
exports.getSpecificOffice = (req, res) => {
	const officeId = Number(req.params.officeId);

	DataModel.findOneById(offices, officeId)
		.then(office => res.status(200).json({
			status: 200,
			data: office
		}))
		.catch(err => {
			const codeStatus = err.status?err.status:500;
			const response = {
				status:codeStatus,
				error:err.message
			};
			return res.status(codeStatus).json(response);
		});
};
exports.modifyOffice = (req, res) => {
	const id = Number(req.params.officeId);
	DataModel.findOneAndUpdate(officeFileJson, offices, id, req.body)
		.then(office => res.status(201).json({
			status: 201,
			data: office
		}))
		.catch(err => {
			const codeStatus = err.status?err.status:500;
			const response = {
				status:codeStatus,
				error:err.message
			};
			res.status(codeStatus).json(response);
		});
};
exports.deleteOffice = (req, res) => {
	const officeId = Number(req.params.officeId);

	DataModel.removeOne(officeFileJson, offices, officeId)
		.then(() => res.status(200).json({
			status: 200,
			message: 'The office has been deleted'
		}))
		.catch(err => {
			const codeStatus = err.status?err.status:500;
			const response = {
				status:codeStatus,
				error:err.message
			};
			res.status(codeStatus).json(response);
		});
};