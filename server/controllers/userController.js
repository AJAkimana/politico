import DataModel from '../models/DataModel';

const userController = {
	registerUser(req, res){
		const values = [
			req.body.firstname,
			req.body.lastname,
			req.body.othername,
			req.body.email,
			req.body.phoneNumber,
			req.body.passportUrl,
			req.body.isAdmin
		] 
		DataModel.execute(values, (err, data)=>{
			console.log(values)
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
		})
	}
}

export default userController;