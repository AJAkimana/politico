import DataModel from '../models/DataModel';

const queryInsert = 'INSERT INTO offices(name, type) VALUES ($1, $2) returning *';
const queryEdit = 'UPDATE offices SET name=$1, type=$2, updated_at=NOW() WHERE id=$3 returning *';
const queryAll = 'SELECT * FROM offices';
const queryOne = 'SELECT * FROM offices WHERE id = $1';
const queryDelete = 'DELETE FROM offices WHERE id = $1';

const officeController = {
	createNewOffice(req, res){
		const values = [
			req.body.name,
			req.body.type.toLowerCase().trim(),
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
	getAllOfficesList(req, res){
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
					error: 'No office found'
				});
			}
			res.status(200).json({
				status: 200,
				message: 'Success',
				data: result.rows
			});
		})
	},
	getSpecificOffice(req, res){
		const officeId = Number(req.params.officeId);

		DataModel.execute(queryOne, [officeId], (err, result)=>{
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
			res.status(200).json({
				status: 200,
				message: 'Success',
				data: result.rows[0]
			});
		})
	},
	modifyOffice(req, res){
		req.body.type = req.body.type.toLowerCase().trim();
		const values = [
			req.body.name,
			req.body.type.toLowerCase().trim(),
			req.params.officeId
		] 
		DataModel.execute(queryOne, [req.params.officeId], (err, result)=>{
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
	deleteOffice(req, res){
		const officeId = Number(req.params.officeId);

		DataModel.execute(queryOne, [officeId], (err, result)=>{
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
			DataModel.execute(queryDelete, [officeId], (error, response)=>{
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

export default officeController;