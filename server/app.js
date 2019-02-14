/**
 * Module dependencies.
 */
const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const expressValidator = require('express-validator');
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

app.use(expressValidator());
let apiVersion1 = require('./routes/apiVersion1');

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
	// console.log('Politico app is listening on port %d. Visit http://localhost:%d', app.get('port'),app.get('port'));
});
module.exports = app;