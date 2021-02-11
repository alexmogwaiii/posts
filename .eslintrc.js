module.exports = {
  extends: '@mate-academy/eslint-config-react',
  rules: {
    'jsx-a11y/no-autofocus': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'object-curly-newline': [2, {
      ObjectExpression: {
        consistent: true,
        minProperties: 4,
      },
    }],
    'no-console': 0,
    'no-unused-vars': 0,
    'eol-last': 0,
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
    'no-restricted-syntax':
      ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
  },
};
