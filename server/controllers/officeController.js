import DataModel from '../models/DataModel';
const officeFileJson = '../helper/data/offices.json';
const offices = require(officeFileJson);

const officeController = {
	createNewOffice(req, res){
		req.body.type = req.body.type.toLowerCase().trim();
		DataModel.saveNew(officeFileJson, offices, req.body)
			.then(office => {
				res.status(201).json({
					status: 201,
					message: 'Successfully created',
					data: office
				});
			})
			.catch(err => res.status(500).json({ 
				status: 500,
				error: err.message 
			}));
	},
	getAllOfficesList(req, res){
		DataModel.findAll(offices, 'office')
			.then(offices => res.status(200).json({
				status: 200,
				message: 'Success',
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
	},
	getSpecificOffice(req, res){
		const officeId = Number(req.params.officeId);

		DataModel.findOneById(offices, 'office', officeId)
			.then(office => res.status(200).json({
				status: 200,
				message: 'Success',
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
	},
	modifyOffice(req, res){
		const id = Number(req.params.officeId);
		req.body.type = req.body.type.toLowerCase().trim();
		DataModel.findOneAndUpdate(officeFileJson, offices, 'office', id, req.body)
			.then(office => res.status(201).json({
				status: 201,
				message: 'Successfully modified',
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
	},
	deleteOffice(req, res){
		const officeId = Number(req.params.officeId);

		DataModel.removeOne(officeFileJson, offices, 'office', officeId)
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
	}
};

export default officeController;