const officeTypes = ['federal','legistrative','state','local'];

const officeMiddleware = {
	verifyOfficeBody(req, res, next){
		req.assert('name', 'Type office name').notEmpty();
		req.assert('name', 'Invalid office name').isString();
		req.assert('type', 'Specifiy office type').notEmpty();

		const errors = req.validationErrors();
		const numberOfKeys = Object.keys(req.body).length;
		const type = req.body.type.toLowerCase().trim();
		console.log('Office:'+type+', Index :'+officeTypes.indexOf(type))
		if (errors) return res.status(400).json({status: 400, error: errors[0].msg});
		if (numberOfKeys !== 2) return res.status(400).json({status: 400, error: 'Invalid information'});
		if (officeTypes.indexOf(type) ===-1 ) return res.status(400).json({status: 400, error: 'Invalid office type'});

		return next();
	},
	verifyOfficeId(req, res, next){
		req.assert('officeId','Invalid office spacification').isInt();
		
		const errors = req.validationErrors();
		if (errors) return res.status(400).json({status: 400, error: errors[0].msg});

		return next();
	},
};
export default officeMiddleware;