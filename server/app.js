/**
 * Module dependencies.
 */
import express from 'express';
import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';
import expressValidator from 'express-validator';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import apiVersion1 from './routes/apiVersion1';

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.app.env'});

/**
* Connect database and check connection
*/
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});
pool.query('SELECT NOW()', (err, res) => {
	if(err){
		console.error('Postgres Connection Error. Please make sure that Postgres is running.');
  		process.exit(1);
	}
});
/**
 * Create Express server.
 */
const app = express();
/**
 * Express configuration.
 */

app.set('port', process.env.PORT || 8080);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressValidator({
	customValidators: {
		isString: (value)=>{
			return isNaN(value);
		}
	}
}));

app.use('/api', apiVersion1);
app.all('*', (req, res) => {
	return res.status(404).json({ 
		status: 404,
		error: 'Invalid route' 
	});
});

/*
 * Error Handler.
 */
app.use(errorHandler());
/**
 * Start Express server.
 */
app.listen(app.get('port'), ()=>{
	console.log('Politico app is listening on port %d. Visit http://localhost:%d', app.get('port'),app.get('port'));
});

export default app;
