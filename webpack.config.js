const path = require('path');
const webpack = require('webpack');
const dev = process.env.NODE_ENV !== 'production';
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	target: 'web',
	devtool: 'inline-source-map',
	mode: dev ? 'development' : 'production',
	entry: ['babel-polyfill', 'react-hot-loader/patch', path.resolve(__dirname, 'src/index.js')],
	output: {
		filename: dev ? 'main.js' : '[name].[hash].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: dev ? '/' : '/dist'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: [
					dev ? 'style-loader' : MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: dev,
							minimize: !dev
						}
					}
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf|jpg|jpeg|png|svg)$/,
				use: {
					loader: 'file-loader'
				}
			}
		]
	},
	resolve: {
		extensions: ['.js', '.css']
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: dev // set to true if you want JS source maps
			}),
			new OptimizeCSSAssetsPlugin({})
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: dev ? '[name].css' : '[name].[hash].css',
			chunkFilename: dev ? '[id].css' : '[id].[hash].css'
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(dev ? 'development' : 'production')
			}
		}),
		new CleanWebpackPlugin(['dist', 'index.html']),
		new HtmlWebpackPlugin({
			template: 'index.ejs',
			filename: dev ? './index.html' : path.resolve(__dirname, 'index.html')
		})
	],
	devServer: {
		hotOnly: true,
		publicPath: '/',
		historyApiFallback: true
	}
};
