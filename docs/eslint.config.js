import { FlatCompat } from '@eslint/eslintrc';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const config = [
  ...compat.extends(
    'next',
    'prettier',
    'next/core-web-vitals',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        browser: true,
        es2021: true,
        node: true,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      import: eslintPluginImport,
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
      prettier: eslintPluginPrettier,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // JavaScript rules
      'prefer-const': 'warn',
      'no-var': 'warn',
      'no-unused-vars': 'off',
      'object-shorthand': 'warn',
      'quote-props': ['warn', 'as-needed'],

      // TypeScript rules
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/array-type': [
        'warn',
        {
          default: 'array',
        },
      ],
      '@typescript-eslint/consistent-type-assertions': [
        'warn',
        {
          assertionStyle: 'as',
          objectLiteralTypeAssertions: 'never',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',

      // React rules
      'react/jsx-fragments': ['warn', 'syntax'],
      'react/jsx-filename-extension': [
        'warn',
        {
          extensions: ['.ts', '.tsx'],
        },
      ],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      'prettier/prettier': 'warn',
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external', 'internal']],
          'newlines-between': 'always',
        },
      ],
    },
    ignores: [
      '.next',
      '.cache',
      'package-lock.json',
      'public',
      'node_modules',
      'next-env.d.ts',
      'next.config.ts',
      'yarn.lock',
    ],
  },
];

export default config;
