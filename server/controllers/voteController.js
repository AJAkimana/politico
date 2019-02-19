import Runner from '../../config/Runner';
import VoteDB from '../models/VoteDB';

const voteSql = 'INSERT INTO votes(createdby,office,candidate) VALUES ($1,$2,$3) returning *';


const initialise = () => {
	VoteDB.createVoteTable();
}
const voteController = {
	vote(req, res){
		initialise()
		const values = [
			req.user.id,
			req.body.officeId,
			req.body.candidate,
		] 
		Runner.execute(voteSql, values, (err, result)=>{
			if(err){
				return res.status(500).json({ 
					status: 500,
					error: 'Service not availavle'
				});
			} 
			res.status(201).json({
				status: 201,
				message: 'Successfully created',
				data: result.rows[0]
			});
		})
	},
};

export default voteController;