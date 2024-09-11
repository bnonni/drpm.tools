const eslint = require('@eslint/js');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const mochaPlugin = require('eslint-plugin-mocha');
const globals = require('globals');

module.exports = [
  eslint.configs.recommended,
  mochaPlugin.configs.flat.recommended,
  {
    languageOptions: {
      parser        : tsParser,
      parserOptions : {
        ecmaFeatures : { modules: true },
        ecmaVersion  : '2022'
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021
      }
    },
    plugins: {
      '@typescript-eslint' : tsPlugin,
      'mocha'              : mochaPlugin
    },
    files   : ['**/*.ts'],
    rules: {
      'no-unsafe-optional-chaining' : 'off',
      'key-spacing'                 : [
        'error',
        {
          'singleLine': {
            'beforeColon' : false,
            'afterColon'  : true,
          },
          'multiLine': {
            'beforeColon' : true,
            'afterColon'  : true,
          },
          'align': {
            'beforeColon' : true,
            'afterColon'  : true,
            'on'          : 'colon',
            'mode'        : 'minimum'
          }
        }
      ],
      'quotes': [
        'error',
        'single',
        { 'allowTemplateLiterals': true }
      ],
      'semi'                              : ['error', 'always'],
      'indent'                            : ['error', 2, { 'SwitchCase': 1 }],
      'no-unused-vars'                    : 'off',
      'prefer-const'                      : 'off',
      '@typescript-eslint/no-unused-vars' : [
        'error',
        {
          'vars'               : 'all',
          'args'               : 'after-used',
          'ignoreRestSiblings' : true,
          'argsIgnorePattern'  : '^_',
          'varsIgnorePattern'  : '^_'
        }
      ],
      'no-dupe-class-members'                    : 'off',
      'no-trailing-spaces'                       : ['error'],
      '@typescript-eslint/no-explicit-any'       : 'off',
      '@typescript-eslint/no-non-null-assertion' : 'off',
      '@typescript-eslint/ban-ts-comment'        : 'off',
      'mocha/no-exclusive-tests'                 : 'warn',
      'mocha/no-setup-in-describe'               : 'off',
      'mocha/no-mocha-arrows'                    : 'off',
      'mocha/max-top-level-suites'               : 'off',
      'mocha/no-identical-title'                 : 'off',
      'mocha/no-pending-tests'                   : 'off',
      'mocha/no-skipped-tests'                   : 'off',
      'mocha/no-sibling-hooks'                   : 'off',
    }
  },
  {
    ignores: [
      '**/*.js',
      '**/*.cjs',
      '**/*.mjs',
      '**/*.d.ts',
      '**/prototyping/*'
    ]
  }
];
