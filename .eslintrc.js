module.exports = {
	root: true,
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
	},
	extends: ['plugin:prettier/recommended', 'airbnb-base', 'prettier'],
	plugins: ['prettier'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		'prettier/prettier': [
			'error',
			{ endOfLine: 'auto' },
			{
				usePrettierrc: true,
				fileInfoOptions: {
					withNodeModules: true,
				},
			},
		],
	},
};
