import Runner from '../../config/Runner';

const voteSql = 'INSERT INTO votes(createdby,office,candidate) VALUES ($1,$2,$3) returning *';
const resultSql = 'SELECT office, candidate, COUNT(*) AS result FROM votes WHERE office=$1 GROUP BY candidate,office';


const voteController = {
	vote(req, res){
		initialise();
		const values = [
			req.user.id,
			req.body.officeId,
			req.body.candidate,
		]; 
		Runner.execute(voteSql, values, (err, result)=>{
			if(err){
				return res.status(500).json({ 
					status: 500,
					error: 'Service not availavle'
				});
			} 
			res.status(201).json({
				status: 201,
				message: 'Thanks for your vote',
				data: result.rows[0]
			});
		});
	},
	getResult(req, res){
		Runner.execute(resultSql, [req.params.officeId], (err, result)=>{
			if(err){
				return res.status(500).json({ 
					status: 500,
					error: 'Service not availavle'
				});
			} 
			if(!result.rows||!result.rows.length){
				return res.status(404).json({ 
					status: 404,
					error: 'No result found'
				});
			}
			res.status(200).json({
				status: 200,
				message: 'Success',
				data: result.rows
			});
		});
	},
};

export default voteController;
