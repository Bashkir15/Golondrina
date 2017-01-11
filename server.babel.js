import cluster from 'cluster';
import mongoose from 'mongoose';
import Emails from './server/models/emails';
import Categories from './server/models/categories';
import Images from './server/models/images';
//import Users from './server/models/users';

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