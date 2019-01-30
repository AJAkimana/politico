const User = require('../models/User');

exports.getAllUsers = (req, res) => {
	User.getUsers()
		.then(posts => res.json(posts))
		.catch(err => {
			let codeStatus = err.status?err.status:500;
			let response = {
				status:codeStatus,
				error:err.message
			}
			return res.status(codeStatus).json(response)
		});
};

exports.addNewUser = (req, res) => {
	User.insertUser(req.body)
		.then(user => res.status(201).json({
			message: `The post #${user.id} has been created`,
			content: user
		}))
		.catch(err => res.status(500).json({ message: err.message }));
};