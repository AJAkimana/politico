const partyMiddleware = {
	verifyPartyBody(req, res, next){
		req.assert('name', 'Type party name').notEmpty();
		req.assert('hqAddress', 'Provide party address').notEmpty();
		req.assert('logoUrl', 'Provide party logo url').notEmpty();

		const errors = req.validationErrors();
		if (errors) return res.status(400).json({status: 400, error: errors[0].msg});

		return next();
	},
	verifyPartyBodyWithId(req, res, next){
		req.assert('name', 'Type party name').notEmpty();
		req.assert('hqAddress', 'Provide party address').notEmpty();
		req.assert('logoUrl', 'Provide party logo url').notEmpty();
		req.assert('partyId','Invalid party spacification').isInt();
		
		const errors = req.validationErrors();
		if (errors) return res.status(400).json({status: 400, error: errors[0].msg});

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