const path = require('path');
const AutoPrefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const PackageJSON = require('./package.json');

const getHtmlWebPackPluginOptions = (filename, templateName) => ({
	minify: true,
	cache: true,
	filename,
	template: path.resolve(__dirname, templateName),
	favicon: 'src/assets/imgs/favicon.ico',
	meta: {
		viewport: 'width=device-width, initial-scale=1',
		author: PackageJSON.author.name,
		description: PackageJSON.description,
		keywords: `${PackageJSON.keywords}`,
		robots: 'index, follow',
		'og:locale': 'en_US',
		'og:type': 'website',
		'og:url': 'https://thiagosaud.dev',
		'og:title': 'THIAGO SAUD - FRONTEND',
		'og:site_name': 'THIAGO SAUD - FRONTEND',
		'og:description': PackageJSON.description,
		'og:image': 'https://raw.githubusercontent.com/thiagosaud/thiagosaud.github.io/main/temp/imgs/social-preview.png',
		'theme-color': '#171717',
		'msapplication-TileColor': '#171717',
	},
});

module.exports = {
	entry: './src/index.js',
	mode: 'production',
	plugins: [
		new HtmlWebpackPlugin(getHtmlWebPackPluginOptions('index.html', 'src/pages/home.html')),
		new HtmlWebpackPlugin(getHtmlWebPackPluginOptions('about.html', 'src/pages/about.html')),
		new HtmlWebpackPlugin(getHtmlWebPackPluginOptions('portfolio.html', 'src/pages/portfolio.html')),
		new HtmlWebpackPlugin(getHtmlWebPackPluginOptions('contact.html', 'src/pages/contact.html')),
		new HtmlWebpackPlugin(getHtmlWebPackPluginOptions('404.html', 'src/pages/404.html')),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
			chunkFilename: '[id].[contenthash].css',
		}),
		new CopyPlugin({
			patterns: [{ from: path.resolve(__dirname, 'src/*.txt'), to: path.resolve(__dirname, 'dist') }],
		}),
	],
	devServer: {
		static: path.resolve(__dirname, 'dist'),
		port: 8080,
		hot: false,
		liveReload: true,
	},
	optimization: {
		runtimeChunk: 'single',
		minimizer: [
			new CssMinimizerPlugin({
				parallel: true,
				minify: CssMinimizerPlugin.cleanCssMinify,
			}),
			new TerserPlugin({
				test: /\.js(\?.*)?$/i,
				parallel: true,
				minify: TerserPlugin.uglifyJsMinify,
			}),
			new ImageMinimizerPlugin({
				minimizer: {
					implementation: ImageMinimizerPlugin.imageminMinify,
					options: {
						plugins: [
							['gifsicle', { interlaced: true }],
							['jpegtran', { progressive: true }],
							['optipng', { optimizationLevel: 5 }],
							[
								'svgo',
								{
									plugins: [
										{
											name: 'preset-default',
											params: {
												overrides: {
													removeViewBox: false,
													addAttributesToSVGElement: {
														params: {
															attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
														},
													},
												},
											},
										},
									],
								},
							],
						],
					},
				},
			}),
		],
	},
	output: {
		clean: true,
		filename: '[name].[contenthash].js',
		chunkFilename: '[id].[contenthash].js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: 'html-loader',
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true,
						cacheCompression: true,
						presets: ['@babel/preset-env'],
						plugins: ['@babel/plugin-transform-runtime'],
					},
				},
			},
			{
				mimetype: 'image/svg+xml',
				scheme: 'data',
				type: 'asset/resource',
				generator: {
					filename: 'icons/[hash].svg',
				},
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				type: 'asset',
			},
			{
				test: /\.(sa|sc|c)ss$/, // SASS AND CSS
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: () => [AutoPrefixer()],
							},
						},
					},
					{
						loader: 'sass-loader',
					},
				],
			},
		],
	},
};
