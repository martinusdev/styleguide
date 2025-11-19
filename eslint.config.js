import pluginImport from 'eslint-plugin-import';

export default [
  {
    ignores: ['node_modules/*', 'dist/*', 'app/scripts/plugins/**/*.js', 'font-awesome.js'],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        $: 'readonly',
        jQuery: 'readonly',
        Modernizr: 'readonly',
        window: 'readonly',
        document: 'readonly',
      },
    },
    plugins: {
      import: pluginImport,
    },
    rules: {
      'arrow-parens': 'off',
      'comma-dangle': 'off',
      'no-trailing-spaces': [2, { skipBlankLines: true }],
      'no-param-reassign': 0,
      'no-underscore-dangle': 0,
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      'prefer-spread': 'off',
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: ['!gulp/**/*.js'],
        },
      ],
    },
  },
];
