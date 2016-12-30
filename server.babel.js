import cluster from 'cluster';
import mongoose from 'mongoose';
import Emails from './server/models/emails';
import Categories from './server/models/categories';
import Images from './server/models/images';
import Users from './server/models/users';

var config = require('./server/config/env/' + (process.env.NODE_ENV || 'development'));
var db = mongoose.connect(config.db, () => {
	console.log('The application has connected to this ' + config.db + ' database');
});

if (cluster.isMaster) {

	var cpuCount = require('os').cpus().length;

	for (var i = 0; i < cpuCount; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker) => {
		console.log('worker %d died', worker.id);
		cluster.fork();
	});
} else {

	var app = require('./server/config/express')(db);
	var server = require('http').Server(app);

	server.listen(config.server.port, () => {
		console.log('Application is up and running at: ' + config.server.host + config.server.port + ' , and the environment is currently: ' + (process.env.NODE_ENV || 'development'));
	});
	console.log('Worker %d running!', cluster.worker.id);
	

	global = {};


	global.config = config;
	global.server = server;

	module.exports = app;
}