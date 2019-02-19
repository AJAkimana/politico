import DataModel from '../models/DataModel';

const queryInsert = 'INSERT INTO parties(name, hqAddress, logoUrl) VALUES ($1, $2, $3) returning *';
const queryEdit = 'UPDATE parties SET name=$1, hqAddress=$2, logoUrl=$3, updated_at=NOW() WHERE id=$4';
const queryAll = 'SELECT * FROM parties';
const queryOne = 'SELECT * FROM parties WHERE id = $1';
const queryDelete = 'DELETE FROM parties WHERE id = $1';

const partyController = {
	createNewParty(req, res){
		const values = [
			req.body.name,
			req.body.hqAddress,
			req.body.logoUrl,
		] 
		DataModel.execute(queryInsert, values, (err, result)=>{
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
	getAllPartiesList(req, res){
		DataModel.execute(queryAll, [], (err, result)=>{
			if(err){
				return res.status(500).json({ 
					status: 500,
					error: 'Service not availavle'
				});
			} 
			if (result.rowCount < 1){
				return res.status(404).json({ 
					status: 404,
					error: 'No party found'
				});
			}
			res.status(200).json({
				status: 200,
				message: 'Success',
				data: result.rows
			});
		})
	},
	getSpecificParty(req, res){
		const partyId = Number(req.params.partyId);

		DataModel.execute(queryOne, [partyId], (err, result)=>{
			if(err){
				return res.status(500).json({ 
					status: 500,
					error: 'Service not availavle'
				});
			} 
			if (!result.rows[0]){
				return res.status(404).json({ 
					status: 404,
					error: 'No party found'
				});
			}
			res.status(200).json({
				status: 200,
				message: 'Success',
				data: result.rows[0]
			});
		})
	},
	modifyParty(req, res){
		const values = [
			req.body.name,
			req.body.hqAddress,
			req.body.logoUrl,
			req.params.partyId
		] 
		DataModel.execute(queryOne, [req.params.partyId], (err, result)=>{
			if(err){
				return res.status(500).json({ 
					status: 500,
					error: 'Service not availavle'
				});
			} 
			if (!result.rows[0]){
				return res.status(404).json({ 
					status: 404,
					error: 'No party found'
				});
			}
			DataModel.execute(queryEdit, values, (error, response)=>{
				console.log(response)
				if(error){
					return res.status(500).json({ 
						status: 500,
						error: 'Service not availavle'
					});
				}
				res.status(200).json({
					status: 200,
					message: 'Successfully modified',
					data: response.rows[0]
				});
			})
		})
	},
	deleteParty(req, res){
		const partyId = Number(req.params.partyId);

		DataModel.execute(queryOne, [partyId], (err, result)=>{
			if(err){
				return res.status(500).json({ 
					status: 500,
					error: 'Service not availavle'
				});
			} 
			if (!result.rows[0]){
				return res.status(404).json({ 
					status: 404,
					error: 'No office found'
				});
			}
			DataModel.execute(queryDelete, [partyId], (error, response)=>{
				console.log(response)
				if(error){
					return res.status(500).json({ 
						status: 500,
						error: 'Service not availavle'
					});
				}
				res.status(200).json({
					status: 200,
					message: 'The office has been deleted'
				});
			})
		})
	}
};

export default partyController;