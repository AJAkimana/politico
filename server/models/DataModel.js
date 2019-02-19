import { pool } from '../../config/tablesDB';

/**
* Queries
*/
const insertQuery = 'INSERT INTO users(firstname, lastname, othername, email, phoneNumber, passportUrl, isAdmin) VALUES ($1, $2, $3, $4, $5, $6,$7) returning *';
const queryAll = 'SELECT * FROM users';
const queryOne = 'SELECT * FROM users WHERE id = $1';
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