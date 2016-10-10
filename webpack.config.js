var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: './public/main.js',

	output: {
		path: path.resolve(__dirname, './dist/'),
		publicPath: '/',
		filename: 'bundle.js'
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				exclide: /node_modules/
			}
		]
	}
}