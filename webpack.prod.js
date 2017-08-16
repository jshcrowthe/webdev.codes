const webpack = require('webpack');
const path = require('path');

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	devtool: 'source-map',
	entry: path.resolve(__dirname, 'src/index.js'),

	output: {
		filename: 'app.bundle.js',
		path: path.resolve(__dirname, 'public/js'),
		publicPath: 'js/'
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',

				options: {
					presets: ['es2015'],
					plugins: ['syntax-dynamic-import']
				}
			}
		]
	},

	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin(),
		new UglifyJSPlugin({
			sourceMap: true
		})
	]
};
