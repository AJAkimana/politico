/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const errorHandler = require('errorhandler');
const path = require('path');
const consolidate = require('consolidate');
const expressValidator = require('express-validator');
/**
 * Create Express server.
 */
const app = express();
/**
 * Express configuration.
 */
app.set('port', 8080);

/**
 * Set views for the app 
 */
app.engine('html', consolidate.swig);
app.set('views', path.join(__dirname, 'UI'));
app.set('view engine', 'html');

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var hours = 3600000;
app.use(cookieParser());

app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: 'MySecretSessionId',
	name : 'NODESESSID',     // simulate Php cookie
	//When still not connected the cookie will live 2 hours
	cookie:{ path: '/', httpOnly: true, secure: false, maxAge: 2*hours },
}));

/**
* Set public directory as our static folder resources
*/
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 2*hours }));
app.use(expressValidator({
	customValidators: {
		isArray:(value)=>{
			return Array.isArray(value);
		},
		gte:(param, num)=>{
			return param >= num;
		},
		hasNoWhiteSpace:(value)=>{
			return value.indexOf(' ') ==-1;
		},
	}
}));
let apiVersion1 = require('./routes/apiVersion1');
app.use('/v1', apiVersion1);
app.all('*', (req, res) => {
    return res.status(404).json({ 
    	status: 404,
    	error: 'Hello world' 
    })
})

/*
 * Error Handler.
 */
app.use(errorHandler());
/**
 * Start Express server.
 */
app.listen(app.get('port'), ()=>{
	console.log('Sneaker app is listening on port %d. Visit http://localhost:%d', 
		app.get('port'),app.get('port'));
});
module.exports = app;