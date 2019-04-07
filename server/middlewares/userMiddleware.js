import helper from '../helper/helper';
import Runner from '../../config/Runner';

const sql = 'SELECT * FROM users WHERE email=$1';
const userMiddleware = {
	verifyUserBody(req, res, next){
		req.assert('firstname', 'Enter your first name').notEmpty().isString();
		req.assert('lastname', 'Enter your last name').notEmpty();
		req.assert('phoneNumber', 'Enter your phone number').notEmpty();
		req.assert('email', 'Enter your email').notEmpty();
		req.assert('passportUrl', 'Upload passport').notEmpty();
		req.assert('password', 'Enter password').notEmpty();
		req.assert('password', 'Password must at least have 7 character').len(7,100);

		const errors = req.validationErrors();
		if (errors) return res.status(400).json({status: 400, error: errors[0].msg});

		if(!helper.isValidEmail(req.body.email)){
			return res.status(400).json({status: 400, error: 'Invalid email'});
		}
		return next();
	},
	verifyLoginBody(req, res, next){
		req.assert('email', 'Provide your email').notEmpty();
		req.assert('password', 'Enter password').notEmpty();

		const errors = req.validationErrors();
		if (errors) return res.status(400).json({status: 400, error: errors[0].msg});

		if(!helper.isValidEmail(req.body.email)){
			return res.status(400).json({status: 400, error: 'Invalid email'});
		}
		
		return next();
	}
};

export default userMiddleware;
