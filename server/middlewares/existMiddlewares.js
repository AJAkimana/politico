import Runner from '../../config/Runner';
import helper from '../helper/helper';


const userSql = 'SELECT * FROM users WHERE id=$1';
const emailSql = 'SELECT * FROM users WHERE email=$1';
const nullTokenSql = 'UPDATE users SET resettoken=null where email=$1';
const candidateSql = 'SELECT * FROM candidates WHERE candidate=$1 AND office=$2';
const partySql = 'SELECT * FROM parties WHERE id=$1';
const officeSql = 'SELECT * FROM offices WHERE id=$1';
const voteSql = 'SELECT * FROM votes WHERE office=$1 AND createdby=$2';
const existMiddleware = {
	isUserExists(req, res, next){
		const userId = req.body.userId?req.body.userId:req.params.userId;
		Runner.execute(userSql, [userId], (err, data)=>{
			if(err){
				return res.status(500).json({ 
					status: 500,
					error: 'Service not available'
				});
			} 
			if(!data.rows[0]){
				return res.status(404).json({status: 404, error: 'User does not exist'});
			}
			return next();
		});
	},
	isEmailExists(req, res, next){
		if(!helper.isValidEmail(req.body.email)){
			return res.status(400).json({status: 400, error: 'Invalid email'});
		}
		Runner.execute(emailSql, [req.body.email], (err, data)=>{
			if(err){
				return res.status(500).json({ 
					status: 500,
					error: 'Service not available'
				});
			} 
			if(!data.rows[0]||!data.rows[0].email){
				return res.status(404).json({status: 404, error: 'Email does not registered'});
			}
			req.body.token = helper.generateResetToken(15);
			return next();
		});
	},
	notEmailTaken(req, res, next){
		if(!helper.isValidEmail(req.body.email)){
			return res.status(400).json({status: 400, error: 'Invalid email'});
		}
		Runner.execute(emailSql, [req.body.email], (err, data)=>{
			if(err){
				return res.status(500).json({ 
					status: 500,
					error: 'Service not available'
				});
			} 
			if(data.rows[0]&&data.rows[0].email){
				return res.status(400).json({status: 400, error: 'Sorry, this email exists'});
			}
			return next();
		});
	},
	isTokenExists(req, res, next){
		req.assert('m', 'Invalid link').len(1,100); // mail
		req.assert('t', 'Invalid link').notEmpty(); // token
		req.assert('password', 'Enter new password at least 7 character').len(7,100); 
		const errors = req.validationErrors();
		if (errors) {
			return res.status(400).json({ 
				status: 400,
				error: errors[0].msg
			});
		}

		if(!helper.isValidEmail(req.query.m)){
			return res.status(400).json({status: 400, error: 'Invalid link .'});
		}
		Runner.execute(nullTokenSql, [req.query.m], (err, data)=>{
			if(err){
				return res.status(500).json({ 
					status: 500,
					error: 'Service not available'
				});
			}
			return next();
		});
	},
	hasRegistered(req, res, next){
		const values = [
			req.body.userId,
			req.params.officeId
		];
		console.log(values);
		Runner.execute(candidateSql, values, (err, data)=>{
			if(err){
				return res.status(500).json({ 
					status: 500,
					error: 'Service not available'
				});
			} 
			if(data.rows[0]){
				return res.status(400).json({status: 400, error: 'Candidate is already registered'});
			}
			return next();
		});
	},
	isCandidateExist(req, res, next){
		const values = [
			req.body.candidate,
			req.body.officeId
		];
		Runner.execute(candidateSql, values, (err, data)=>{
			if(err){
				return res.status(500).json({ 
					status: 500,
					error: 'Service not available'
				});
			} 
			if(!data.rows[0]){
				return res.status(404).json({status: 404, error: 'Candidate is not on this office'});
			}
			return next();
		});
	},
	isPartyExists(req, res, next){
		const partyId = req.body.party?req.body.party:req.params.partyId;
		Runner.execute(partySql, [partyId], (err, data)=>{
			if(err){
				return res.status(500).json({ 
					status: 500,
					error: 'Service not available'
				});
			} 
			if(!data.rows[0]){
				return res.status(404).json({status: 404, error: 'Party does not exist'});
			}
			return next();
		});
	},
	isOfficeExists(req, res, next){
		const officeId = req.body.officeId?req.body.officeId:req.params.officeId;
		Runner.execute(officeSql, [officeId], (err, data)=>{
			if(err){
				return res.status(500).json({ 
					status: 500,
					error: 'Service not available'
				});
			} 
			if(!data.rows[0]){
				return res.status(404).json({status: 404, error: 'Office does not exist'});
			}
			return next();
		});
	},
	hasVoted(req, res, next){
		const values = [
			req.body.officeId,
			req.user.id
		];
		console.log(values);
		Runner.execute(voteSql, values, (err, data)=>{
			if(err){
				return res.status(500).json({ 
					status: 500,
					error: 'Service not available'
				});
			} 
			if(data.rows[0]){
				return res.status(404).json({status: 404, error: 'You have already voted'});
			}
			return next();
		});
	},
};

export default existMiddleware;
