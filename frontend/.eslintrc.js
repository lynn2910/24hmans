module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        'eslint:recommended'
    ],
    parserOptions: {
        parser: '@babel/eslint-parser'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        "no-mixed-spaces-and-tabs": 'off',
        "no-irregular-whitespace": 'off',
        "no-empty": "off",
        'vue/multi-word-component-names': 'off',
        'no-useless-escape': 'off'
    }
}
