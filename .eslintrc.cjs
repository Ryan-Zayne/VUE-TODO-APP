/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
	root: true,

	extends: [
		'eslint:recommended',
		'plugin:vue/vue3-recommended',
		'@vue/eslint-config-typescript',
		'plugin:tailwindcss/recommended',
		'plugin:sonarjs/recommended',
		'plugin:unicorn/recommended',
		'@vue/eslint-config-prettier/skip-formatting',
	],

	plugins: ['tailwindcss', 'unicorn'],

	parserOptions: {
		ecmaVersion: 'latest',
	},

	rules: {
		'max-len': 'off',
		indent: 'off',
		'no-tabs': 'off',
		'eol-last': 'off',
		'no-return-assign': ['error', 'except-parens'],
		'max-classes-per-file': ['error', 2],
		'no-implicit-coercion': 'error',
		'require-await': 'error',
		'no-void': 'off',
		'no-console': 'warn',
		'no-use-before-define': [
			'error',
			{
				functions: false,
			},
		],
		'no-multiple-empty-lines': [
			'warn',
			{
				max: 3,
			},
		],
		'object-curly-newline': 'off',
		'prefer-arrow-callback': [
			'error',
			{
				allowNamedFunctions: true,
			},
		],
		'arrow-body-style': 'off',
		'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
		'no-unused-expressions': 'off',
		'no-return-await': 'off',

		// Unicorn rules
		'unicorn/no-null': 'off',
		'unicorn/filename-case': [
			'warn',
			{
				cases: {
					camelCase: true,
					pascalCase: true,
					kebabCase: true,
				},
			},
		],
		'unicorn/no-negated-condition': 'off',
		'unicorn/prevent-abbreviations': 'off',
		'unicorn/new-for-builtins': 'off',
		'unicorn/numeric-separators-style': 'off',
		'unicorn/no-array-reduce': 'off',
		'unicorn/no-array-for-each': 'off',
		'unicorn/no-useless-undefined': ['error', { checkArguments: true }],

		// SonarJs Rules
		'sonarjs/prefer-immediate-return': 'off',

		// Tailwind rules
		'tailwindcss/no-custom-classname': 'off',
		'tailwindcss/no-contradicting-classname': 'off',
		'tailwindcss/classnames-order': [
			'warn',
			{
				config: './tailwind.config.ts',
			},
		],

		// Vue rules
		'vue/attribute-hyphenation': ['error', 'never'],
		'vue/v-on-event-hyphenation': ['error', 'never'],
	},
};
