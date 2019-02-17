const partyMiddleware = {
	verifyPartyBody(req, res, next){
		req.assert('name', 'Type office name').notEmpty();
		req.assert('name', 'Invalid office name').notOnlyWhiteSpace().isString();
		req.assert('hqAddress', 'Provide party address').notEmpty().notOnlyWhiteSpace().isString();
		req.assert('logoUrl', 'Provide party logo url').notEmpty().notOnlyWhiteSpace().isString();

		const errors = req.validationErrors();
		const numberOfKeys = Object.keys(req.body).length;
		if (errors) return res.status(400).json({status: 400, error: errors[0].msg});
		if (numberOfKeys !== 3) return res.status(400).json({status: 400, error: 'Invalid information'});

		return next();
	},
	verifyPartyId(req, res, next){
		req.assert('partyId','Invalid party spacification').isInt();
		
		const errors = req.validationErrors();
		if (errors) return res.status(400).json({status: 400, error: errors[0].msg});

		return next();
	},
};

export default partyMiddleware;