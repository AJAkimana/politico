import Runner from '../../config/Runner';

import UserDB from '../models/UserDB';
import helper from '../helper/helper';

/**
* Queries
*/
const insertQuery = 'INSERT INTO users(firstname, lastname, othername, email, password, phoneNumber, passportUrl) VALUES ($1, $2, $3, $4, $5, $6,$7) returning *';
const queryAll = 'SELECT * FROM users';
const queryOne = 'SELECT * FROM users WHERE id = $1';
const initialise = () => {
	UserDB.createUserTable();
}
const userController = {
	registerUser(req, res){
		initialise();
		const hashPassword = helper.hashPassword(req.body.password);
		const values = [
			req.body.firstname,
			req.body.lastname || null,
			req.body.othername,
			req.body.email,
			hashPassword,
			req.body.phoneNumber,
			req.body.passportUrl,
		] 
		Runner.execute(insertQuery, values, (err, data)=>{
			console.log(err, data)
			if(err){
				return res.status(500).json({ 
					status: 500,
					error: 'Service not availavle'
				});
			} 
			const token = helper.generateToken(data.rows[0].id);
			const response = [{token:token,user: data.rows[0]}]
			res.status(201).json({
				status: 201,
				message: 'Successfully created',
				data: response
			});
		})
	}
}

export default userController;