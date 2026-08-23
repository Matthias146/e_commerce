const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const angularTemplateParser = require('@angular-eslint/template-parser');

module.exports = defineConfig([
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
    ],
    rules: {
      semi: ['error', 'always'],
      'prefer-const': 'warn',
      'arrow-body-style': ['warn', 'as-needed'],
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],

      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },

  {
    files: ['**/*.html'],

    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
    languageOptions: {
      parser: angularTemplateParser,
    },
    rules: {
      '@angular-eslint/template/no-negated-async': 'warn',
      '@angular-eslint/template/eqeqeq': 'warn',
    },
  },
]);
