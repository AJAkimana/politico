const userMiddleware = {
	verifyUserBody(req, res, next){
		req.assert('firstname', 'Type firstname').notEmpty().isString();
		req.assert('lastname', 'Type lastname').notEmpty();
		req.assert('phoneNumber', 'Type phoneNumber').notEmpty();
		req.assert('email', 'Type email').notEmpty();
		req.assert('passportUrl', 'Upload passport').notEmpty();
		req.assert('password', 'Type password').notEmpty();

		const errors = req.validationErrors();
		const numberOfKeys = Object.keys(req.body).length;
		if (errors) return res.status(400).json({status: 400, error: errors[0].msg});
		
		return next();
	}
};

export default userMiddleware;