'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _errorhandler = require('errorhandler');

var _errorhandler2 = _interopRequireDefault(_errorhandler);

var _expressValidator = require('express-validator');

var _expressValidator2 = _interopRequireDefault(_expressValidator);

var _apiVersion = require('./routes/apiVersion1');

var _apiVersion2 = _interopRequireDefault(_apiVersion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create Express server.
 */
var app = (0, _express2.default)();
/**
 * Express configuration.
 */
/**
 * Module dependencies.
 */
app.set('port', process.env.PORT || 8080);

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.use((0, _expressValidator2.default)());

app.use('/api', _apiVersion2.default);
app.all('*', function (req, res) {
  return res.status(404).json({
    status: 404,
    error: 'Invalid route'
  });
});

/*
 * Error Handler.
 */
app.use((0, _errorhandler2.default)());
/**
 * Start Express server.
 */
app.listen(app.get('port'), function () {
  console.log('Politico app is listening on port %d. Visit http://localhost:%d', app.get('port'), app.get('port'));
});

exports.default = app;