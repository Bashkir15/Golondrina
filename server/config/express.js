import express from 'express';
import path from 'path';
import compression from 'compression';
import morgan from 'morgan';
import ejs from 'ejs';
import bodyParser from 'body-parser'

import indexRoutes from '../routes/index.server.routes';
//import userRoutes from '../routes/users.server.routes';
//import adminRoutes from '../routes/admin.server.routes'
import contactRoutes from '../routes/contact.server.routes'


module.exports = (db) => {
	const app = express();

	app.set('view engine', 'ejs');
	app.set('views', path.join(__dirname, '../../public'));


	app.use(morgan('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(compression());
	app.use((req, res, next) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE");
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
		next();
	});

	app.use(express.static(path.join(__dirname, '../../public')));
	app.use(express.static(path.join(__dirname, '../../dist')));
	app.use(express.static(path.join(__dirname, '../../node_modules')));

	app.use('/', indexRoutes);
//	app.use('/users', userRoutes);
	//app.use('/admin', adminRoutes);
	app.use('/contact', contactRoutes);

	return app;
}