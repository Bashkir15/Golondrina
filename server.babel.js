import cluster from 'cluster';

var config = require('./server/config/env/' + (process.env.NODE_ENV || 'development'));

var app = require('./server/config/express')();
var server = require('http').Server(app);

server.listen(config.server.port, () => {
	console.log('Application is up and running at: ' + config.server.host + config.server.port + ' , and the environment is currently: ' + (process.env.NODE_ENV || 'development'));
});


global = {};


global.config = config;
global.server = server;

module.exports = app;