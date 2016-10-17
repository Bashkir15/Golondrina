import express from 'express';
import httpProxy from 'http-proxy';
import bodyParser from 'body-parser';

var app = express();
var proxy = new httpProxy.RoutingProxy();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.proxyMiddleware = (apiPort) => {
	function (req, res, next) => {
		proxy.proxyRequest(req, res, {
			host: 'localhost',
			port: apiPort
		});
	}
};

module.exports = app;