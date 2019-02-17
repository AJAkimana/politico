/**
 * Module dependencies.
 */
import express from 'express';
import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';
import expressValidator from 'express-validator';

import apiVersion1 from './routes/apiVersion1';
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