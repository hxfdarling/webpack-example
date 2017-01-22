var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js')('production');
var helpers = require('./helpers');

const ENV = process.env.BUILD_RELEASE = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
	devtool: 'none',

	output: {
		path: helpers.root('dist'),
		publicPath: '', //公共资源路径
		filename: '[name].[chunkhash].js',
		chunkFilename: '[id].[chunkhash].chunk.js'
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({
			mangle: {
				keep_fnames: true
			}
		}),
		new ExtractTextPlugin({ filename: '[name].[chunkhash].css' }),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify(ENV)
			}
		})
	]
});