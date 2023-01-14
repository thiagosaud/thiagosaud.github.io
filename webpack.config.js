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
			filename: 'static/css/[name].[contenthash:8].css',
			chunkFilename: 'static/css/[id].[contenthash:8].chunk.css',
		}),
		new CopyPlugin({
			patterns: [{ from: path.resolve(__dirname, 'src/robots.txt'), to: path.resolve(__dirname, 'dist'), context: '*.txt' }],
		}),
	],
	devServer: {
		static: path.resolve(__dirname, 'dist'),
		port: 3000,
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
				terserOptions: {
					// We want terser to parse ecma 8 code. However, we don't want it
					// to apply any minification steps that turns valid ecma 5 code
					// into invalid ecma 5 code. This is why the 'compress' and 'output'
					// sections only apply transformations that are ecma 5 safe
					ecma: 8,
					compress: {
						ecma: 5,
						warnings: false,
						comparisons: false, // Disabled because of an issue with Uglify breaking seemingly valid code:
						inline: 2, // Disabled because of an issue with Terser breaking valid code:
					},
					mangle: {
						safari10: true,
					},
				},
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
		clean: !process.env.WEBPACK_SERVE,
		filename: 'static/js/[name].[contenthash:8].js',
		chunkFilename: 'static/js/[id].[contenthash:8].chunk.js',
		assetModuleFilename: 'static/assets/[name].[contenthash:8][ext]',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		strictExportPresence: true,
		rules: [
			{
				// "oneOf" will traverse all following loaders until one will
				// match the requirements. When no loader matches it will fall
				// back to the "file" loader at the end of the loader list.
				oneOf: [
					{
						test: /\.avif$/,
						type: 'asset/resource',
						mimetype: 'image/avif',
						parser: {
							dataUrlCondition: {
								maxSize: 10000,
							},
						},
					},
					// "url" loader works like "file" loader except that it embeds assets
					// smaller than specified limit in bytes as data URLs to avoid requests.
					// A missing `test` is equivalent to a match.
					{
						test: /\.(png|svg|jpg|jpeg|gif|bmp|ico)$/i,
						type: 'asset/resource',
						parser: {
							dataUrlCondition: {
								maxSize: 10000,
							},
						},
					},
					{
						test: /\.svg$/,
						use: [
							{
								loader: require.resolve('@svgr/webpack'),
								options: {
									prettier: false,
									svgo: false,
									svgoConfig: {
										plugins: [{ removeViewBox: false }],
									},
									titleProp: true,
									ref: true,
								},
							},
							{
								loader: require.resolve('file-loader'),
								options: {
									name: 'static/media/[name].[hash].[ext]',
								},
							},
						],
						issuer: {
							and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
						},
					},
					{
						test: /\.(woff|woff2|eot|ttf|otf)$/i,
						type: 'asset/resource',
					},
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
						test: /\.(sa|sc|c)ss$/, // SASS AND CSS
						use: [
							{
								loader: MiniCssExtractPlugin.loader,
							},
							{
								loader: 'css-loader',
								options: {
									url: true,
								},
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
		],
	},
};
