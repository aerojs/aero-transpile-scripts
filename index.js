let babel = require('babel-core')

const babelOptions = {
	plugins: [
		'babel-plugin-transform-es2015-template-literals',
		'babel-plugin-transform-es2015-literals',
		'babel-plugin-transform-es2015-function-name',
		'babel-plugin-transform-es2015-arrow-functions',
		'babel-plugin-transform-es2015-block-scoped-functions',
		'babel-plugin-transform-es2015-classes',
		'babel-plugin-transform-es2015-object-super',
		'babel-plugin-transform-es2015-shorthand-properties',
		'babel-plugin-transform-es2015-computed-properties',
		'babel-plugin-transform-es2015-for-of',
		'babel-plugin-transform-es2015-sticky-regex',
		'babel-plugin-transform-es2015-unicode-regex',
		'babel-plugin-check-es2015-constants',
		'babel-plugin-transform-es2015-spread',
		'babel-plugin-transform-es2015-parameters',
		'babel-plugin-transform-es2015-destructuring',
		'babel-plugin-transform-es2015-block-scoping'
	].map(pluginName => {
		// For backwards compatibility:
		// On older babel versions these need to be included directly,
		// on newer ones a string array is expected.
		try {
			return require(pluginName)
		} catch(e) {
			return pluginName
		}
	})
}

let transpile = function(source, file) {
	return babel.transform(source, Object.assign({
		filename: file
	}, babelOptions)).code
}

module.exports = function(app) {
	app.scripts.modifiers.unshift(transpile)
}