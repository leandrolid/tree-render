module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'indent': [
      'error',
      2,
      { SwitchCase: 1 }
    ],
    'no-trailing-spaces': 'error',
    'no-multiple-empty-lines': ['warn', { max: 1, maxEOF: 0 }],
    'quotes': ['error', 'single', { allowTemplateLiterals: true }],
    'semi': ['error', 'never']
  },
}
