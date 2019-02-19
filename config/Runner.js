import { pool } from './database';

const DataModel = {
	execute(sqlQuery, values, callBack){
		pool.connect((err, client, done) => {
			client.query(sqlQuery, values, (err, result) => {
				done();
				callBack(err, result)
			})
		})
	}
}

export default DataModel;