const officeTypes = ['federal','legistrative','state','local'];

exports.verifyOfficeBody = (req, res, next) => {
	req.assert('name', 'Type party name').notEmpty();
	req.assert('type', 'Invalid office type').isIn(officeTypes);

	const errors = req.validationErrors();
	if (errors) return res.status(400).json({status: 400, error: errors[0].msg});

	return next();
};
exports.verifyOfficeBodyWithId = (req, res, next) => {
	req.assert('name', 'Type party name').notEmpty();
	req.assert('type', 'Invalid office type').isIn(officeTypes);
	req.assert('officeId','Invalid office spacification').isInt();
	
	const errors = req.validationErrors();
	if (errors) return res.status(400).json({status: 400, error: errors[0].msg});

	return next();
};
exports.verifyOfficeId = (req, res, next) => {
	req.assert('officeId','Invalid office spacification').isInt();
	
	const errors = req.validationErrors();
	if (errors) return res.status(400).json({status: 400, error: errors[0].msg});

	return next();
};