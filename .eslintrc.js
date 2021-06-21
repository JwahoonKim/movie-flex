module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    indent: 'off',
    'linebreak-style': ['error', 'windows'],
    'eslintreact/jsx-filename-extension': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-filename-extension': 0,
    'react/prop-types': 0,
    'react/button-has-type': 0,
    'comma-dangle': 0,
    'func-names': 0,
    'prefer-spread': 0,
    'consistent-return': 0,
    'implicit-arrow-linebreak': 0,
    'function-paren-newline': 0,
    'no-console': 0,
    'no-shadow': 0,
    'no-unused-vars': 0,
    'import/prefer-default-export': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'no-unused-expressions': 0,
    'import/no-unresolved': 0,
    'no-undef': 0,
    'max-len': 0,
    'linebreak-style': 0,
    'react/jsx-one-expression-per-line': 0,
    'prefer-destructuring': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'react/no-array-index-key': 0,
    'eol-last': 0,
  },
};
