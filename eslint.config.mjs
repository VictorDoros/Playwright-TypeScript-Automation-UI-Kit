import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import playwright from 'eslint-plugin-playwright'
import eslintConfigPrettier from 'eslint-config-prettier'

export default tseslint.config(
  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ['**/*.ts'],
    plugins: {
      playwright,
    },

    languageOptions: {
      parser: tseslint.parser,
    },

    rules: {
      'max-len': ['error', { code: 120 }],
      /**
       * General TypeScript
       */
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',

      /**
       * Code quality
       */
      'no-console': 'warn',
      'no-duplicate-imports': 'error',

      /**
       * Playwright
       */
      'playwright/no-focused-test': 'error',
      'playwright/no-skipped-test': 'warn',
      'playwright/prefer-web-first-assertions': 'error',
      'playwright/no-networkidle': 'warn',
    },
  },

  eslintConfigPrettier,
)
