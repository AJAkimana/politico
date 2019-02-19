import { Pool } from 'pg';
import createTables from '../../config/createTables';
import dropTables from '../../config/dropTables';

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
}) 

pool.on('connect', () => {
	console.log('client connected');
});

const PartyDB = {
	createPartyTable(){
		pool.query(createTables.Party)
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
}
pool.on('remove', () => {
	console.log('client removed');
});
export default PartyDB