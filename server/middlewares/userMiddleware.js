
import helper from '../helper/helper';
import Runner from '../../config/Runner';

const sql = 'SELECT * FROM users WHERE email=$1';
const userMiddleware = {
	verifyUserBody(req, res, next){
		req.assert('firstname', 'Type firstname').notEmpty().isString();
		req.assert('lastname', 'Type lastname').notEmpty();
		req.assert('phoneNumber', 'Type phoneNumber').notEmpty();
		req.assert('email', 'Type email').notEmpty();
		req.assert('passportUrl', 'Upload passport').notEmpty();
		req.assert('password', 'Type password').notEmpty();

		const errors = req.validationErrors();
		if (errors) return res.status(400).json({status: 400, error: errors[0].msg});

		if(!helper.isValidEmail(req.body.email)){
			return res.status(400).json({status: 400, error: 'Invalid email'});
		}
		Runner.execute(sql, [req.body.email], (err, data)=>{
			if(err){
				return res.status(500).json({ 
					status: 500,
					error: 'Service not available'
				});
			} 
			if(data.rows[0]){
				return res.status(400).json({status: 400, error: 'Email exist'});
			};
			return next();
		})
	}
};

export default userMiddleware;