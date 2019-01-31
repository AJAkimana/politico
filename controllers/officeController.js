const Office = require('../models/Office');
const officeTypes = ['federal','legistrative','state','local'];

exports.createNewOffice = (req, res) => {
	// Check validity of body
	req.assert('name', 'Type party name').notEmpty()
	req.assert('type', 'Invalid office type').notIn[officeTypes]
	const errors = req.validationErrors();
	if (errors) return res.status(400).json({status: 400, error: errors[0].msg});

	Office.saveNew(req.body)
		.then(office => {
			res.status(201).json({
				status: 201,
				data: office
			})
		})
		.catch(err => res.status(500).json({ 
			status: 500,
			error: err.message 
		}));
};
exports.getAllOfficesList = (req, res) => {}
exports.getSpecificOffice = (req, res) => {}