import Runner from '../../config/Runner';


const userSql = 'SELECT * FROM users WHERE id=$1';
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
	hasRegistered(req, res, next){
		const values = [
			req.body.candidate,
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
				return res.status(404).json({status: 404, error: 'Candidate is already registered'});
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
