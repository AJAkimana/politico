import { Pool } from 'pg';
import createTables from '../../config/createTables';
import dropTables from '../../config/dropTables';

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
}); 

pool.on('connect', () => {
	console.log('client connected');
});

const UserDB = {
	createUserTable(){
		pool.query(createTables.User)
		    .then((res) => {
		      console.log(res);
		      pool.end();
		    })
		    .catch((err) => {
		      console.log(err);
		      pool.end();
		    });
	},
	pool,
};
export default UserDB;
