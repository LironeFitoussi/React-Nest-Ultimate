// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-call': 'off',
      
      // Formatting rules - keep them minimal and non-intrusive
      'prettier/prettier': 'off', // Turn off prettier to avoid formatting conflicts
      'no-trailing-spaces': 'off',
      'no-multiple-empty-lines': 'off',
      'indent': 'off',
      'semi': 'off',
      'quotes': 'off',
      'comma-dangle': 'off',
      'space-before-function-paren': 'off',
      'object-curly-spacing': 'off',
      'array-bracket-spacing': 'off',
    },
  },
);