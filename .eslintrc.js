module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    project: './tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'no-restricted-syntax': [
      'error',
      {
        selector: 'FunctionDeclaration[async=false][id.name=/Async$/]',
        message: "Function ending in 'Async' must be declared async",
      },
      {
        selector: 'FunctionDeclaration[async=true][id.name!=/Async$/]',
        message: "Async function name must end in 'Async'",
      },
      {
        selector: 'MethodDefinition[value.async=false][key.name=/Async$/]',
        message: "Method ending in 'Async' must be declared async",
      },
      {
        selector: 'MethodDefinition[value.async=true][key.name!=/Async$/]',
        message: "Async method name must end in 'Async'",
      },
      {
        selector: 'Property[value.type=/FunctionExpression$/][value.async=false][key.name=/Async$/]',
        message: "Function ending in 'Async' must be declared async",
      },
      {
        selector: 'Property[value.type=/FunctionExpression$/][value.async=true][key.name!=/Async$/]',
        message: "Async function name must end in 'Async'",
      },
      {
        selector: 'VariableDeclarator[init.type=/FunctionExpression$/][init.async=false][id.name=/Async$/]',
        message: "Function ending in 'Async' must be declared async",
      },
      {
        selector: 'VariableDeclarator[init.type=/FunctionExpression$/][init.async=true][id.name!=/Async$/]',
        message: "Async function name must end in 'Async'",
      },
    ],
  },
};
