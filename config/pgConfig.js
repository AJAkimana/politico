const pg = exports; 
exports.constructor = function pg(){};

const pgLib = require('pg');

pg.initialize = function(databaseUrl, cb) {
	let client = new pgLib.Client(databaseUrl);
	client.connect(function(err) {
		if (err) return cb(err);

		pg.client = client;
		cb();
	});
};