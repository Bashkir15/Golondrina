import express from 'express';
import path from 'path';
import compression from 'compression';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import ejs from 'ejs';

import indexRoutes from '../routes/index.server.routes';

module.exports = () => {
	const app = express();

	app.set('view engine', 'ejs');
	app.set('views', path.join(__dirname, '../../public'));

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(morgan('dev'));
	app.use(compression());

	app.use(express.static(path.join(__dirname, '../../public')));
	app.use(express.static(path.join(__dirname, '../../dist')));
	app.use(express.static(path.join(__dirname, '../../node_modules')));

	app.use('/', indexRoutes);

	return app;
}