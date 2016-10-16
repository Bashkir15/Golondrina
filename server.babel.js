import mongoose from 'mongoose';
import Emails from './server/models/email-list';

var config = require('./server/config/env/' + (process.env.NODE_ENV || 'development'));
var db = mongoose.connect(config.db, () => {
	console.log('The application has connected to this ' + config.db + ' database');
});

var app = require('./server/config/express')(db);
var server = require('http').Server(app);

server.listen(config.server.port, () => {
	console.log('Application is up and running at: ' + config.server.host + config.server.port + ' , and the environment is currently: ' + (process.env.NODE_ENV || 'development'));
});

global = {};


global.config = config;
global.server = server;

module.exports = app;