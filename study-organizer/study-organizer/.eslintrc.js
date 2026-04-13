module.exports = {
  root: true,
  env: {
    node: true,
    commonjs: true,
    es2021: true,
    jest: true
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'no-unused-vars': ['error', { 
      'vars': 'all', 
      'args': 'after-used',
      'argsIgnorePattern': '^_',
      'ignoreRestSiblings': true
    }],
    'no-undef': 'error',
    'no-console': 'off',
    'no-constant-condition': 'error',
    'no-unreachable': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'eqeqeq': ['error', 'always', { 'null': 'ignore' }],
    'curly': ['error', 'all'],
    'no-var': 'error',
    'prefer-const': 'error',
    'no-magic-numbers': ['warn', { 
      'ignore': [0, 1, 2, 100, 480], 
      'ignoreArrayIndexes': true,
      'enforceConst': true
    }],
    'no-param-reassign': ['error', { 'props': false }],
    'prefer-template': 'error',
    'template-curly-spacing': ['error', 'never'],
    'indent': ['error', 2, { 
      'SwitchCase': 1,
      'VariableDeclarator': 'first',
      'MemberExpression': 1
    }],
    'quotes': ['error', 'single', { 'avoidEscape': true }],
    'semi': ['error', 'always'],
    'max-len': ['warn', { 
      'code': 100, 
      'ignoreComments': true,
      'ignoreStrings': true,
      'ignoreTemplateLiterals': true
    }],
    'comma-dangle': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'always'
    }],
    'keyword-spacing': ['error', { 'before': true, 'after': true }],
    'space-infix-ops': 'error',
    'require-jsdoc': ['warn', {
      'require': {
        'FunctionDeclaration': true,
        'MethodDefinition': true,
        'ClassDeclaration': true,
        'ArrowFunctionExpression': false
      }
    }],
    'valid-jsdoc': ['warn', {
      'requireReturn': false,
      'requireReturnType': true,
      'requireParamDescription': false,
      'requireReturnDescription': false
    }]
  },
  overrides: [
    {
      files: ['tests/**/*.js'],
      rules: {
        'require-jsdoc': 'off',
        'no-magic-numbers': 'off'
      }
    }
  ]
};
