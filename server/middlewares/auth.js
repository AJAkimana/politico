import jwt from 'jsonwebtoken';
import Runner from '../../config/Runner';

const sqlQuery = 'SELECT * FROM users WHERE id = $1';
const auth = {
	verifyToken(req, res, next) {
		const token = req.headers['x-access-token'];
		if(!token) {
			return res.status(400).json({ 
      	status: 400,
      	message: 'Token is not provided' 
			});
		}
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		Runner.execute(sqlQuery, [decoded.userId], (err, result)=>{
			if(err){
				return res.status(500).json({ 
					status: 500,
					error: 'Service not availavle'
				});
			}
			if(!result.rows[0]){
				return res.status(400).json({ 
		      	status: 400,
		      	message: 'No token provided' 
		    });
			}
			req.user = result.rows[0];
      		next();
		});
	},
	isAdmin(req, res, next){
  	const token = req.headers['x-access-token'];
		if(!token) {
			return res.status(401).json({ 
      	status: 401,
      	message: 'Token is not provided' 
			});
		}
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		Runner.execute(sqlQuery, [decoded.userId], (err, result)=>{
			if(err){
				return res.status(500).json({ 
					status: 500,
					error: 'Service not availavle'
				});
			}
			if(!result.rows[0]){
				return res.status(401).json({ 
			      	status: 401,
			      	message: 'No token provided' 
			    });
			}
			if(!result.rows[0].isadmin){
				return res.status(401).json({ 
			      	status: 401,
			      	message: 'Operation is reserved for admin' 
			    });
			}
			req.user = result.rows[0];
      		next();
		});
	}
};

export default auth;
