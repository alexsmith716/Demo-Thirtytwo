const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
	plugins: [
		require('postcss-import'),
		postcssPresetEnv({
			stage: 2,
		}),
	],
};

// https://github.com/postcss/postcss
// https://github.com/postcss/postcss/blob/master/docs/plugins.md
// https://github.com/postcss/postcss-import
// https://github.com/csstools/postcss-preset-env