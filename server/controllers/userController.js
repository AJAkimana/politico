import Runner from '../../config/Runner';

import UserDB from '../models/UserDB';
import helper from '../helper/helper';

/**
* Queries
*/
const insertQuery = 'INSERT INTO users(firstname, lastname, othername, email, password, phoneNumber, passportUrl) VALUES ($1, $2, $3, $4, $5, $6,$7) returning *';
const queryAll = 'SELECT * FROM users';
const queryOne = 'SELECT * FROM users WHERE email = $1';
const insertCandidate = 'INSERT INTO candidates(office,party,candidate) VALUES ($1,$2,$3) returning *';
const initialise = () => {
	UserDB.createUserTable();
};
const userController = {
	registerUser(req, res){
		const hashPassword = helper.hashPassword(req.body.password);
		const values = [
			req.body.firstname,
			req.body.lastname || null,
			req.body.othername,
			req.body.email,
			hashPassword,
			req.body.phoneNumber,
			req.body.passportUrl,
		]; 
		Runner.execute(insertQuery, values, (err, data)=>{
			if(err){
				return res.status(500).json({ 
					status: 500,
					error: 'Service not available'
				});
			} 
			const token = helper.generateToken(data.rows[0].id);
			const response = [{token:token,user: data.rows[0]}];
			res.status(201).json({
				status: 201,
				message: 'Successfully created',
				data: response
			});
		});
	},
	userLogin(req, res){
		Runner.execute(queryOne, [req.body.email], (err, data)=>{
			if(err){
				return res.status(500).json({ 
					status: 500,
					error: 'Service not availavle'
				});
			}
			if(!data.rows[0]){
				return res.status(401).json({ 
					status: 401,
					error: 'Email not found'
				});
			}
			// console.log(data.rows[0].password, req.body.password)
			if(!helper.comparePassword(data.rows[0].password, req.body.password)){
				return res.status(401).json({ 
					status: 401,
					error: 'Invalid credentials'
				});
			}
			const token = helper.generateToken(data.rows[0].id);
			const response = [{token:token,user: data.rows[0]}];
			res.status(200).json({
				status: 200,
				message: 'Welcome',
				data: response
			});
		});
	},
	setUserAsCandidate(req, res){
		const values = [
			req.params.officeId,
			req.body.party,
			req.body.candidate
		]; 
		Runner.execute(insertCandidate, values, (err, data)=>{
			if(err){
				return res.status(500).json({ 
					status: 500,
					error: 'Service not availavle'
				});
			} 
			res.status(201).json({
				status: 201,
				message: 'Successfully created',
				data: data.rows[0]
			});
		});
	}
};

export default userController;
